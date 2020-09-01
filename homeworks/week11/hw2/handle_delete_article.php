<?php
  session_start();
  require_once("conn.php");

  // 要是登入狀態才能使用此頁面
  require_once("check_permission.php");
  
  $id = $_GET['id'];

  // 將 $id 的文章刪除（要是本人）
  $sql = "UPDATE `yunanpan_blog_articles` SET is_deleted = 1 WHERE id = ? AND username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $_SESSION['username']);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: " . $conn->error);
  }

  header("Location: admin.php");

?>