<?php 
  session_start();
  require_once("conn.php");

    // 要是登入狀態才能使用此頁面
    require_once("check_permission.php");

  // 檢查各項目是否為空
  if (empty($_POST['title']) || empty($_POST['catagory']) || empty($_POST['content'])) {
    header("Location: add_blog.php?errCode=1");
    exit();
  }

  $title = $_POST['title'];
  $catagory = $_POST['catagory'];
  $content = $_POST['content'];
  $username = $_SESSION['username'];

  $sql = "INSERT INTO yunanpan_blog_articles (title, catagory, content, username) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("siss", $title, $catagory, $content, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  // 拿 id 才能知道要顯示哪個剛新增的文章
  $sql = "SELECT id FROM yunanpan_blog_articles WHERE title = ? AND catagory = ? AND content = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sis", $title, $catagory, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $id = $row['id'];
  
  header("Location: view_article.php?id=" . $id);
?>