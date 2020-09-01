<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_GET["id"])) {
    $code = "1";
    header("Location: update_comment.php?code=" . $code . "&id=" .$_GET['id']);
    die("資料不齊全");
  }

  $username = $_SESSION['username'];
  $id = $_GET['id'];

  // 如果是管理員
  $result = NULL;
  if (isAdmin(getName($username))) {
    $sql = "UPDATE yunanpan_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
  } else { // 本人刪自己的留言
    $sql = "UPDATE yunanpan_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $id, $username);
  }
  $result = $stmt->execute();
  if (!result) {
    die($conn->error);
  }

  header("Location: index.php");

?>

