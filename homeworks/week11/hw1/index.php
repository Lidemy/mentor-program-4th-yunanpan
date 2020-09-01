<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getName($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']); // Get the integer value of a variable
  }
  $item_per_page = 5; // limit
  $offset = ($page - 1) * $item_per_page;

  $sql = "SELECT C.id AS id, C.content AS content, C.created_at AS created_at, "
  ."U.nickname AS nickname, U.username AS username FROM yunanpan_comments AS C LEFT JOIN " 
  ."yunanpan_users AS U ON C.username = U.username "
  ."WHERE C.is_deleted = 0"
  ." ORDER BY C.id DESC"
  ." LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $item_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言版</title>
  <link rel="stylesheet" href="./css/basic.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <?php
    if (!empty($_GET["code"])) {
      if ($_GET["code"] === "1") {
        echo '<h2 class="error">資料不齊全</h2>';
      }
      if ($_GET["code"] === "3") {
        echo '<h2 class="error">抱歉，您無權限新增留言。</h2>';
      }
    }
  ?>
  <main class="board">
    <div class="board__head">
      <h1 class="board__title">Comments</h1>
      <div>
        <!-- 身分為管理員時 -->
        <?php if ($user && isAdmin($user)) { ?>
          <a href="users.php" class="board__connect-btn">管理使用者</a>
        <?php } ?>
        <!-- 有登入時 -->
        <?php if ($username) { ?>
          <a href="logout.php" class="board__connect-btn">登出</a>
          <a href="#" class="board__connect-btn board__update-btn">編輯暱稱</a>
        <?php } else { ?> <!-- 沒登入時 -->
          <a href="register.php" class="board__connect-btn">註冊</a>
          <a href="login.php" class="board__connect-btn">登入</a>
        <?php } ?>
      </div>
    </div>
    <!-- 修改暱稱 -->
    <form method="POST" action="handle_update_user.php" class="hide board__update-nickname">
      <div class="board__input">
        <input type="text" name="nickname" placeholder="請輸入要修改的暱稱">
        <input type="submit" class="board__btn" value="提交">
      </div>
    </form>
    
    <form method="POST" action="handle_add_comment.php" class="board__form">
      <?php if ($user) { ?>
        <div class="board__welcome">
          <p>Hello! <?php echo($user['nickname']); ?>(@<?php echo($user['username']) ?>)!</p>
        </div>
      <?php } ?>
      <textarea  class="board__comment" name="content" cols="30" rows="10" placeholder="請輸入留言"></textarea>
      <!-- 沒登入不能留言 -->
      <?php if (!$username) { ?>
        <h3 class="board__warning">請登入後留言</h3>
      <?php } else if (isBanned($user)) { ?> 
        <!-- 被停權帳戶不能留言 -->
        <h3 class="board__warning">你已被停權</h3>
      <?php } else { ?>
        <input type="submit" class="board__btn" value="提交">
      <?php } ?>
    </form>
    
    <!-- 留言們 -->
    <?php  while ($row = $result->fetch_assoc()) { ?>
    <div class="comment">
      <div class="comment__img"></div>
      <div class="comment__body">
        <div class="comment__body-info">
          <p class="comment__body-info-nickname"><?php echo escape($row['nickname']); ?>(@<?php echo escape($row['username']); ?>)</p>
          <p class="comment__body-info-time"><?php echo escape($row['created_at']); ?></p>
        </div>
        <div class="comment__body-wrap">
          <div class="comment__body-content"><?php echo escape($row['content']); ?></div>
          <!-- 只能編輯/ 刪除自己的留言 -->
          <?php if ($row['username'] === $username) { ?>
            <div>
              <a href="update_comment.php?id=<?php echo escape($row['id']) ?>" class="comment__btn">編輯</a>
              <a href="handle_delete_comment.php?id=<?php echo escape($row['id']) ?>" class="comment__btn">刪除</a>
            </div>
          <?php } else if ($user && isAdmin($user)) { ?>
            <!-- 管理員最大，隨意編輯刪除留言 -->
            <div>
              <a href="update_comment.php?id=<?php echo escape($row['id']) ?>" class="comment__btn">編輯</a>
              <a href="handle_delete_comment.php?id=<?php echo escape($row['id']) ?>" class="comment__btn">刪除</a>
            </div>
          <?php } ?>
        </div>
      </div>
    </div>
    <?php } ?>

    <!-- 分頁 -->
    <?php
      // 找 total page
      $sql = "SELECT count(id) AS count FROM yunanpan_comments WHERE is_deleted = 0";
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $item_per_page); // 四捨五入

    ?>
    <div class="paginator">
      <div class="paginator__info">
        <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator__pages">
        <!-- 第一頁不會顯示首頁和上一頁 -->
        <?php if ($page !== 1) { ?>
          <a href="index.php">首頁</a>
          <a href="index.php?page=<?php echo ($page - 1)?>">上一頁</a>
        <?php } ?>
        <!-- 最後一頁不會顯示下一頁和最後一頁 -->
        <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo ($page + 1)?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page?>">最後一頁</a>
        <?php } ?>
      </div>
    </div>

  </main>

  <script>
    const updateBtn = document.querySelector('.board__update-btn');
    updateBtn.addEventListener('click', function() {
      const updateNickname = document.querySelector('.board__update-nickname');
      updateNickname.classList.toggle('hide');
    });
  </script>
</body>
</html>