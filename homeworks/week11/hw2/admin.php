<?php 
  // 管理員可以看到自己的文章列表
  // 刪除自己的文章跳到的畫面
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  // 要是登入狀態才能使用此頁面
  require_once("check_permission.php");

  $username = $_SESSION['username'];

  // 分頁
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10; // limit
  $offset = ($page - 1) * $item_per_page; // offset

  $sql = "SELECT A.title AS title, A.created_at AS created_at, A.id"
  ." AS id FROM yunanpan_blog_articles AS A LEFT JOIN yunanpan_blog_users AS U"
  ." ON A.username = U.username WHERE A.is_deleted = 0 AND U.username = ?"
  ." ORDER BY A.created_at DESC LIMIT ? OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sii", $_SESSION['username'], $item_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("Error: " . $conn->eror);
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
      <h2>存放技術之地 - 後台</h2>
      <p><?php echo escape($username) ?></p> 
    </div>
  </header>
  <!-- 編輯 article 區 -->
  <div class="wrap">
    <div class="articles">
      <!-- 一篇一篇 -->
      <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="article-edit__list">
        <div class="article-edit__title">
          <a href="view_article.php?id=<?php echo escape($row['id']) ?>"><?php echo escape($row['title']) ?></a>
        </div>
        <div class="article-edit__info">
          <p class="article-edit__time"><?php echo escape($row['created_at']) ?></p>
          <a href="update_blog.php?id=<?php echo $row['id'] ?>" class="article-edit__btn">編輯</a>
          <a href="handle_delete_article.php?id=<?php echo $row['id'] ?>" class="article-edit__btn">刪除</a>
        </div>
      </div>
      <?php } ?>
      <!-- 分頁 -->
      <?php
        // 找 total pages
        $sql = "SELECT * FROM yunanpan_blog_articles AS A"
        ." LEFT JOIN yunanpan_blog_users AS U"
        ." ON A.username = U.username WHERE A.is_deleted = 0 AND U.username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $_SESSION['username']);
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
          <a href="admin.php">第一頁</a>
          <a href="admin.php?page=<?php echo($page - 1) ?>">上一頁</a>
        <?php } ?>
        <?php for ($i = 1; $i <= $total_pages; $i++) { ?>
          <a href="admin.php?page=<?php echo $i ?>"><?php echo $i ?></a>
        <?php } ?>
        <?php if ($page != $total_pages) { ?>
          <a href="admin.php?page=<?php echo($page + 1) ?>">下一頁</a>
          <a href="admin.php?page=<?php echo $total_pages ?>">最後一頁</a>
        <?php } ?>
      </div>
    </div>
    
  </div>
</body>
</html>