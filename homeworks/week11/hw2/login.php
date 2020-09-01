<?php
  require_once("conn.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>陽春部落格</title>
  <link rel="stylesheet" href="./css/basic.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <form method="POST" action="handle_login.php" class="form">
    <?php if (!empty($_GET['errCode']) && $_GET['errCode'] == 1) { ?>
      <h2 class="error">資料不完全</h2>
    <?php } ?>
    <?php if (!empty($_GET['errCode']) && $_GET['errCode'] == 2) { ?>
      <h2 class="error">帳號或密碼有誤</h2>
    <?php } ?>
    <h2 class="form__title">Log In</h2>
    <div class="form__input">
      <label for="username">USERNAME</label>
      <input type="text" id="username" name="username">
    </div>
    <div class="form__input">
      <label for="password">PASSWORD</label>
      <input type="password" id="password" name="password">
    </div>
    <input type="submit" value="SIGN IN" class="form__btn">
  </form>

</body>
</html>