<?php 

// 權限檢查：是否為登入狀態
if (empty($_SESSION['username'])) {
  header("Location: index.php");
  exit();
}

?>

