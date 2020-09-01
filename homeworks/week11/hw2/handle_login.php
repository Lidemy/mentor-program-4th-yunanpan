<?php
  session_start();
  require_once("conn.php");

  // 看值是否為空
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: login.php?errCode=1");
    exit();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM `yunanpan_blog_users` WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: " . $result->error);
  }

  // 看是否為註冊過的帳號
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  // 比對密碼是否一致
  $row = $result->fetch_assoc();
  if (!password_verify($password, $row['passhash'])) {
    header("Location: login.php?errCode=2");
    exit();
  }

  // 有註冊過的帳號
  $_SESSION['username'] = $username;
  header("Location: index.php");
?>