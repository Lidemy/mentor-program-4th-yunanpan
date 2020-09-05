<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getName($username);
  }

  // 看是否為管理者權限
  if (!isAdmin($user)) {
    header("Location: index.php");
    exit();
  }

  $id = $_GET['id'];

  if (empty($_POST['role'])) {
    $code = 4;
    header("Location: users.php?code=" . $code . "&id=" . $id);
    exit();
  } 

  $selected_role = $_POST['role'];
  
  // 改身分
  $sql = "UPDATE yunanpan_users SET role = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $selected_role, $id);
  $result = $stmt->execute();
  if (!$result) {
    die("Error" . $conn->error);
  }

  header("Location: users.php");
?>