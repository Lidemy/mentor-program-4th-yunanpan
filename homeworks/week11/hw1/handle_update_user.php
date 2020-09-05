<?php
  require_once("conn.php");
  session_start();

  // TODO: 檢查有沒有拿到資料
  if (empty($_POST["nickname"])) {
    $code = 1;
    header("Location: login.php?code=" . $code );
    die();
  }

  // TODO: 有拿到資料的話更改資料庫
  $nickname = $_POST["nickname"];
  $username = $_SESSION["username"];
  $sql = "UPDATE yunanpan_users SET nickname = ? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>