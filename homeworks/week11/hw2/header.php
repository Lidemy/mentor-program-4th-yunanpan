<?php
  require_once("conn.php");

  // 判斷所在路由
  $uri = $_SERVER["REQUEST_URI"];
  $isAdminPage = (strpos($uri, 'admin.php') !== false);
?>

<nav class="navbar">
  <div class="navbar__info">
    <div class="navbar__name">
      <a href="index.php">Who's Blog</a>
    </div>
    <div class="navbar__list">
      <a href="article_list.php">文章列表</a>
      <a href="article_catagory.php">分類專區</a>
      <a href="about.php">關於我</a>
    </div>
  </div>
  <div class="navbar__admin">
    <?php if ($username) { ?>
      <a href="add_blog.php">新增文章</a>
      <?php if (!$isAdminPage) { ?>
        <a href="admin.php">管理後臺</a>
      <?php } ?>
      <a href="handle_logout.php">登出</a>
    <?php } else { ?>
      <a href="register.php">註冊</a>
      <a href="login.php">登入</a>
    <?php } ?>
  </div>
</nav>