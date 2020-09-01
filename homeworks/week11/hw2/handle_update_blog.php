<?php
  // 管理員修改自己的文章
  session_start();
  require_once("conn.php");

  // 要是登入狀態才能使用此頁面
  require_once("check_permission.php");

  // 檢查各項目是否為空
  if (empty($_POST['title']) || empty($_POST['catagory']) || empty($_POST['content'])) {
    header("Location: update_blog.php?errCode=1&id=" . $_POST['id']);
    exit();
  }

  $title = $_POST['title'];
  $catagory = $_POST['catagory'];
  $content = $_POST['content'];
  $id = $_POST['id'];
  $username = $_SESSION['username'];

  $sql = "UPDATE yunanpan_blog_articles SET title = ?, content = ?, catagory = ? WHERE id = ? AND username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssiis", $title, $content, $catagory, $id, $username);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: ". $result);
  }
  $result = $stmt->get_result();
  if ($result->num_rows === 0) { // 此文章非登入者所屬，導回首頁
    header("Location: index.php");
    exit();
  }

  // 導回檢視文章頁面
  header("Location: view_article.php?id=" . $id);
?>