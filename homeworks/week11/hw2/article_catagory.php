<?php
  session_start();
  require_once("conn.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

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
  <!-- 編輯 article 區 -->
  <div class="wrap">
    <div class="articles">
      <div class="article-edit__list">
        <div class="article-edit__title">
          <img src="./img/folder-24-px.png" >
          <a href="article_catagory_view.php?catagory=1">農場文</a>
        </div>
      </div>
      <div class="article-edit__list">
        <div class="article-edit__title">
          <img src="./img/folder-24-px.png" >
          <a href="article_catagory_view.php?catagory=2">廢文</a>
        </div>
      </div>
      <div class="article-edit__list">
        <div class="article-edit__title">
          <img src="./img/folder-24-px.png" >
          <a href="article_catagory_view.php?catagory=3">聳動標題騙點閱文</a>
        </div>
      </div>
    </div>
    
  </div>
</body>
</html>