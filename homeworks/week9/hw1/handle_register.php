<?php
  // 與資料庫連接
  require_once('conn.php');
  
  // 拿表單資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 檢查資料
  if (empty($nickname) || empty($username) || empty($password)) {
    $code = 1;
    header("Location: register.php?code=" . $code );
    die();
  }

  // 寫入資料庫
  $sql = sprintf("INSERT INTO users (nickname, username, password) VALUES ('%s', '%s', '%s')",
    $nickname,
    $username,
    $password
  );

  $result = $conn->query($sql);
  
  if (!$result) {
    // 代表設成唯一的值重複了
    if ($conn->errno === 1062) {
      $code = 2;
      header("Location: register.php?code=" . $code);
    } 
    die($conn->error);
  }

  header("Location: register.php");
?>