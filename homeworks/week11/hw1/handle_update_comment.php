<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["content"])) {
    $code = "1";
    header("Location: update_comment.php?code=" . $code . "&id=" .$_POST['id']);
    die("資料不齊全");
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $id = $_POST['id'];

  // 管理員編輯
  $result = NULL;
  if (isAdmin(getName($username))) {
    $sql = "UPDATE yunanpan_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $content, $id);
  } else {
    // 一般使用者權限
    $sql = "UPDATE yunanpan_comments SET content = ? WHERE id = ? AND  username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sis", $content, $id, $username);
  }
  $result = $stmt->execute();
  if (!result) {
    die($conn->error);
  }

  header("Location: index.php");

?>

