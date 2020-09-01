<?php
  require_once("conn.php");

  $stmt = $conn->prepare("SELECT * FROM yunanpan_comments ORDER BY id DESC");
  $result = $stmt->execute();
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
  <main class="board">
    <div class="board__head">
      <h1 class="board__title">Comments</h1>
      <div>
        <a href="index.php" class="board__connect-btn">回主頁</a>
        <a href="register.php" class="board__connect-btn">註冊</a>
      </div>
    </div>
    <?php
      if (!empty($_GET)) {
        if ($_GET["code"] === "1") {
          echo '<h2 class="error">資料不齊全</h2>';
        } else if ($_GET["code"] === "2") {
          echo '<h2 class="error">帳號或密碼輸入錯誤</h2>';
        }
      }
    ?>
    <form method="POST" action="handle_login.php" class="board__form">
      <div class="board__input">
        <p>帳號：</p>
        <input type="text" name="username" placeholder="請輸入帳號">
      </div>
      <div class="board__input">
        <p>密碼：</p>
        <input type="password" name="password" placeholder="請輸入密碼">
      </div>
      <input type="submit" class="board__btn" value="登入">
    </form>
  </main>
</body>
</html>