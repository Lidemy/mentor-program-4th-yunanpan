<?php
  // 看全文
  
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  if (empty($_GET['id'])) {
    header("Location: article_list.php");
    exit();
  }

  $id = $_GET['id'];
  $sql = "SELECT * FROM yunanpan_blog_articles WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
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
      <div class="article">
        <div class="article__headline">
          <h3 class="article__title"><?php echo escape($row['title']) ?></h3>
          <?php if ($username === $row['username']) { ?>
            <div>
              <a href="update_blog.php?id=<?php echo $row['id'] ?>" class="article__edit-btn">編輯</a>
              <a href="handle_delete_article.php?id=<?php echo $row['id'] ?>" class="article__edit-btn">刪除</a>
            </div>
          <?php } ?>
        </div>
        <div class="article__info">
          <div class="article__time">
            <img src="./img/watch-later-24-px.png" >
            <p><?php echo escape($row['created_at']) ?></p>
          </div>
          <div class="article__folder">
            <img src="./img/folder-24-px.png" >
            <p>
              <?php 
                switch ($row['catagory']) {
                  case "1":
                    echo "農場文";
                    break;
                  case "2":
                    echo "廢文";
                    break;
                  case "3":
                    echo "聳動標題騙點閱文";
                    break;
                  default:
                    echo "";
                }
              ?>
            </p>
          </div>
        </div>
        <div class="article__content"><?php echo escape($row['content']) ?></div>
      </div>
    </div>
    
  </div>
</body>
</html>