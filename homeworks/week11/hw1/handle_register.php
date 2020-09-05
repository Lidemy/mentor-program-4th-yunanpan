<?php
  session_start();
  // 與資料庫連接
  require_once('conn.php');

  // 檢查資料
  if (empty($_POST['nickname']) || 
    empty($_POST['username']) || 
    empty($_POST['password'])
  ) {
    $code = 1;
    header("Location: register.php?code=" . $code );
    die();
  }
  
  // 拿表單資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  // hash 密碼
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  // $password = $_POST['password'];

  // 寫入資料庫
  // 註冊時都預設為一般使用者(1)
  $sql = "INSERT INTO yunanpan_users (nickname, username, `password`) VALUES (?, ?, ?)";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nickname, $username, $password);
  $result = $stmt->execute();
  
  if (!$result) {
    // 代表設成唯一的值重複了
    if ($conn->errno === 1062) {
      $code = 2;
      header("Location: register.php?code=" . $code);
    } 
    die($conn->error);
  }

  // 註冊完直接幫登入
  // 拿 sessionID
  $_SESSION["username"] = $username;
  header("Location: index.php");
?>