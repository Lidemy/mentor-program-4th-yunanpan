<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getName($username);
  }

  // 管理員編輯大家的留言
  // 從儲存在 SESSION 的 role 看是不是管理員
  $result = NULL;
  if (isAdmin($user)) {
    $sql = "SELECT * FROM yunanpan_comments WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
  } else {
    // 個人編輯自己的留言
    $sql = "SELECT * FROM yunanpan_comments WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
    }
  ?>
  <main class="board">
    <div class="board__head">
      <h1 class="board__title">Update Comment</h1>
    </div>
    
    <form method="POST" action="handle_update_comment.php" class="board__form">
      <!-- 拿正要編輯的留言 -->
      <textarea  class="board__comment" name="content" cols="30" rows="10"><?php echo $row['content']; ?></textarea>
      <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
      <input type="submit" class="board__btn" value="提交">
    </form>
  </main>
</body>
</html>