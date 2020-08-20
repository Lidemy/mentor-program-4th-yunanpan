<?php
  session_start();
  require_once("conn.php");
  // TODO: 不知道為何 devtool 不會顯示 php 內建的 token
  /*
    // 拿登入後儲存在 cookie 的 token
    $username = NULL;
    if (!empty($_COOKIE["token"])) {
      // 從 tokens 裡拿 username
      $sql = sprintf("SELECT username FROM tokens WHERE token = '%s'",
        $_COOKIE["token"]
      );
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      $username = $row["username"];
    }
  */
  $username = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  }

  $result = $conn->query("SELECT * FROM comments ORDER BY id DESC");
  if (!$result) {
    die('Error:' . $conn->error);
  }

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
    if (!empty($_GET)) {
      if ($_GET["code"] === "1") {
        echo '<h2 class="error">資料不齊全</h2>';
      }
    }
  ?>
  <main class="board">
    <div class="board__head">
      <h1 class="board__title">Comments</h1>
      <div>
        <!-- 有登入時 -->
        <?php if ($username) { ?>
          <a href="logout.php" class="board__connect-btn">登出</a>
        <?php } else { ?> <!-- 沒登入時 -->
          <a href="register.php" class="board__connect-btn">註冊</a>
          <a href="login.php" class="board__connect-btn">登入</a>
        <?php } ?>
      </div>
    </div>
    <form method="POST" action="handle_add_comment.php" class="board__form">
      <?php if ($username) { ?>
        <div class="board__welcome">
          <p>Hello! <?php echo($username); ?>!</p>
        </div>
      <?php } ?>
      <textarea  class="board__comment" name="content" cols="30" rows="10" placeholder="請輸入留言"></textarea>
      <!-- 沒登入不能留言 -->
      <?php if (!$username) { ?>
        <h3 class="board__warning">請登入後留言</h3>
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
          <p class="comment__body-info-nickname"><?php echo $row['nickname']; ?></p>
          <p class="comment__body-info-time"><?php echo $row['created_at']; ?></p>
        </div>
        <div class="comment__body-content"><?php echo $row['content'] ?></div>
      </div>
    </div>
    <?php } ?>

  </main>
</body>
</html>