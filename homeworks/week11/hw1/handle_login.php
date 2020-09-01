<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  if (
    empty($_POST['username']) ||
    empty($_POST['password']) 
  ) {
    $code = 1;
    header("Location: login.php?code=" . $code );
    die();
  }
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql ="SELECT * FROM yunanpan_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    $code = 2;
    header("Location: login.php?code=" . $code );
    die();
  }
  // 有查到使用者
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    // 登入成功
    /*
      1. 產生 session id (token)
      2. 把 username 寫入檔案
      3. set-cookie: session-id
    */
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    $code = 2;
    header("Location: login.php?code=" . $code );
    die();
  }
?>