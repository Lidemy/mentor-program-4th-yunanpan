<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  // 分頁
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10; // limit
  $offset = ($page - 1) * $item_per_page; // offset

  $sql = "SELECT * FROM yunanpan_blog_articles  WHERE is_deleted = 0 ORDER BY created_at DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $item_per_page, $offset);
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
  <!-- 編輯 article 區 -->
  <div class="wrap">
    <div class="articles">
      <!-- 一篇一篇 -->
      <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="article-edit__list">
          <div class="article-edit__title">
            <a href="view_article.php?id=<?php echo $row['id'] ?>"><?php echo escape($row['title']) ?></a>
          </div>
          <div class="article-edit__info">
            <p class="article-edit__time"><?php echo escape($row['created_at']) ?></p>
          </div>
        </div>
      <?php } ?>
      <!-- 分頁 -->
      <?php
        // 找 total pages
        $sql = "SELECT * FROM yunanpan_blog_articles WHERE is_deleted = 0";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if (!$result) {
          die("Error: " . $conn->error);
        }
        $result = $stmt->get_result();
        $items = $result->num_rows;
        $total_pages = ceil($items / $item_per_page);
      ?>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="article_list.php">第一頁</a>
          <a href="article_list.php?page=<?php echo($page - 1) ?>">上一頁</a>
        <?php } ?>
        <?php for ($i = 1; $i <= $total_pages; $i++) { ?>
          <a href="article_list.php?page=<?php echo $i ?>"><?php echo $i ?></a>
        <?php } ?>
        <?php if ($page != $total_pages) { ?>
          <a href="article_list.php?page=<?php echo($page + 1) ?>">下一頁</a>
          <a href="article_list.php?page=<?php echo $total_pages ?>">最後一頁</a>
        <?php } ?>
      </div>
    </div>    
  </div>
</body>
</html>