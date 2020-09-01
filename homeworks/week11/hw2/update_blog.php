<?php
  // 管理員編輯自己的文章
  session_start();
  require_once("conn.php");

  // 要是登入狀態才能使用此頁面
  require_once("check_permission.php");

  $id = $_GET['id'];

  $sql = "SELECT * FROM yunanpan_blog_articles WHERE id = ? AND username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $_SESSION['username']);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: " . $conn->eror);
  }
  $result = $stmt->get_result();
  if ($result->num_rows === 0) { // 此文章非登入者所屬，導回首頁
    header("Location: index.php");
    exit();
  }
  $row = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>陽春部落格</title>
  <link rel="stylesheet" href="./css/basic.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <!-- navbar -->
  <?php include_once("header.php"); ?>
  <!-- 存放技術之地 -->
  <header class="header">
    <div>
      <h2>存放技術之地</h2>
      <p>Welcome to my blog</p> 
    </div>
  </header>
  <!-- article 區 -->
  <div class="wrap">
    <div class="articles">
      <!-- article -->
      <div class="edit-blog">
        <?php if (!empty($_GET['errCode']) && $_GET['errCode'] == 1) { ?>
          <h2 class="error">資料不完全</h2>
        <?php } ?>
        <h3>發表文章：</h3>
        <form method="POST" action="handle_update_blog.php">
          <input type="text" name="title" value="<?php echo $row['title'] ?>" class="edit-blog__title">
          <select name="catagory" id="catagory" class="edit-blog__catagory">
            <option selected="select" disabled>請選擇文章分類</option>
            <option value="1">農場文</option>
            <option value="2">廢文</option>
            <option value="3">聳動標題騙點閱文</option>
          </select>
          <textarea name="content" cols="30" rows="10" class="edit-blog__textarea"><?php echo $row['content'] ?></textarea>
          <input type="hidden" name="id" value="<?php echo $id ?>">
          <div class="edit-blog__btn">
            <input type="submit" value="確定編輯文章">
          </div>
        </form>
      </div>
    </div>
    
  </div>
</body>
</html>