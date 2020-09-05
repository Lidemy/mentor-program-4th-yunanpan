<?php 
  session_start();
  require_once("conn.php");
  // 要是登入狀態才能使用此頁面
  require_once("check_permission.php");

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
        <form method="POST" action="handle_add_blog.php">
          <input type="text" name="title" placeholder="請輸入文章標題" class="edit-blog__title">
          <select name="catagory" id="catagory" class="edit-blog__catagory">
            <option disabled selected="select">請選擇文章分類</option>
            <option value="1">農場文</option>
            <option value="2">廢文</option>
            <option value="3">聳動標題騙點閱文</option>
          </select>
          <textarea name="content" cols="30" rows="10" class="edit-blog__textarea"></textarea>
          <div class="edit-blog__btn">
            <input type="submit" value="送出文章">
          </div>
        </form>
      </div>
    </div>
    
  </div>
</body>
</html>