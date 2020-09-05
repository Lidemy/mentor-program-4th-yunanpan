<?php
  session_start();
  require_once("conn.php");

  // 看有無拿到值
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: register.php?errCode=1");
    exit();
  }

  // 如果有值
  $username = $_POST['username'];
  $passhash = password_hash($_POST['password'], PASSWORD_DEFAULT);
  
  $sql = "INSERT INTO yunanpan_blog_users (username, passhash) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $passhash);
  $result = $stmt->execute();
  if (!$result) {
    // 資料庫 username 為唯一，檢查是否重複
    if ($conn->errno === 1062) {
      header("Location: register.php?errCode=" . $conn->errno);
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header("Location: index.php");
?>