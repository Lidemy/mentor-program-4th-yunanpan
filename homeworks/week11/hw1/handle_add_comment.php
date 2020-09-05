<!-- 處理新增留言的頁面 -->

<?php
  session_start();
  // 1. 和資料庫連接
  require_once("conn.php");
  require_once("utils.php");

  // 2-1. 檢查資料：沒拿到資料的話在原頁面顯示錯誤，並不執行以下程式
  if (empty($_SESSION['username']) || empty($_POST['content'])) {
    $code = "1";
    header("Location: index.php?code=" . $code);
    die("資料不齊全");
  }

  $username = $_SESSION["username"];
  $content = $_POST['content'];

  // 被停權用戶無法新增留言
  if (isBanned(getName($username))) {
    $code = 3;
    header("Location: index.php?code=" . $code);
    die("無權限");
  }

  // 2-2. 有拿到的話將資料存入資料庫
  $sql = "INSERT INTO yunanpan_comments (username, content) VALUES (?, ?)";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $content);
  $result = $stmt->execute();

  // 新增到資料庫失敗
  if (!result) {
    die("新增留言失敗");
  }

  // 3. 新增成功跳回到主頁面
  header("Location: index.php");

?>

