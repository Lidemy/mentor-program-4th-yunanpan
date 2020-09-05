<?php
  session_start();
  // 與資料庫連接
  require_once('conn.php');

  // 檢查資料
  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    $code = 1;
    header("Location: register.php?code=" . $code );
    die();
  }
  
  // 拿表單資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  // TODO: hash 密碼
  $password = $_POST['password'];
  $hash = password_hash($password, PASSWORD_DEFAULT);
  if (password_verify($password, $hash)) {
    echo 'success';
  } else {
    echo 'fail';
  }
  exit();

  $sql = sprintf("INSERT INTO yunanpan_users (nickname, username, `password`) VALUES ('%s', '%s', '%s')",
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

  // TODO: 註冊完直接幫登入
  // TODO: 拿 sessionID
  $_SESSION["username"] = $username;
  header("Location: index.php");
?>