<?php
  session_start();
  // 與資料庫連接
  require_once('conn.php');
  require_once('utils.php');
  
  // 拿表單資料
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 檢查資料
  if (empty($username) || empty($password)) {
    $code = 1;
    header("Location: login.php?code=" . $code );
    die();
  }

  // 看輸入的帳密是否有符合資料庫
  $sql = sprintf("SELECT * FROM yunanpan_users WHERE username = '%s' and password = '%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($result->error);
  }

  if ($result->num_rows) {
    /* 用 PHP 內建 session 機制取代
      // 產生 token，設 cookie
      $token = createToken();
      $sql = sprintf("INSERT INTO tokens (token, username) VALUES ('%s', '%s')",
        $token,
        $username
      );
      $result = $conn->query($sql); // 寫進 tokens 資料表
      $expire = time() + (86400 * 30);
      setcookie("token", $token, $expire);
    */
    $_SESSION["username"] = $username;
    header("Location: index.php");
  } else {
    $code = 2;
    header("Location: login.php?code=" . $code );
    die();
  }
?>