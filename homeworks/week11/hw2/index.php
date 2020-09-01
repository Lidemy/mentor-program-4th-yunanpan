<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  }


  $sql = "SELECT * FROM yunanpan_blog_articles WHERE is_deleted = 0 ORDER BY created_at DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: ". $conn->error);
  }
  $result = $stmt->get_result(); 

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
      <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="article">
          <div class="article__headline">
            <h3 class="article__title"><?php echo escape($row['title']) ?></h3>
            <!-- 要是發表文章的人才看得到 -->
            <?php if ($username === $row['username']) { ?>
              <a href="update_blog.php?id=<?php echo $row['id'] ?>" class="article__edit-btn">編輯</a>
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
          <div class="article__content article__content-overflow"><?php echo escape($row['content']) ?></div>
          <a href="view_article.php?id=<?php echo $row['id'] ?>" class="article__readmore">
            READ MORE
          </a>
        </div>
      <?php } ?>
    </div>
    
  </div>
</body>
</html>