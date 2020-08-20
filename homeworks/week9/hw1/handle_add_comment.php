<!-- 處理新增留言的頁面 -->

<?php
session_start();
// 1. 和資料庫連接
require_once("conn.php");
require_once("utils.php");

// 2. 對用表單透過 post method 拿到的資料作處理

/*
  // 要依存在 cookie 裡面的 token，拿到對應的 username 後去 users 裡拿 nickname
  $token = $_COOKIE["token"];
  $nickname = getToken($token)["nickname"];
*/
$username = $_SESSION["username"];
$nickname = getName($username)["nickname"];
$content = $_POST['content'];

// 2-1. 檢查資料：沒拿到資料的話在原頁面顯示錯誤，並不執行以下程式
if (empty($nickname) || empty($content)) {
  $code = "1";
  header("Location: index.php?code=" . $code);
  die("資料不齊全");
}
// 2-2. 有拿到的話將資料存入資料庫
$sql = sprintf("INSERT INTO comments (nickname, content) VALUES ('%s', '%s')",
  $nickname,
  $content
);

// 新增到資料庫失敗
if (!$conn->query($sql)) {
  die("新增留言失敗");
}

// 3. 新增成功跳回到主頁面
header("Location: index.php");

?>

