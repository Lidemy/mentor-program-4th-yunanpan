<?php
  session_start();
  require_once("conn.php");
  session_destroy();
  /*
    // 把 token 從資料庫刪掉
    print_r($_COOKIE["token"]);
    $sql = sprintf("DELETE FROM tokens WHERE token = '%s'",
      $_COOKIE["token"]
    );
    $result = $conn->query($sql);
    if (!$result) {
      die($result->error);
    }

    // 刪掉 cookie
    $expire = time() - 360;
    setcookie("token", "", $expire);
  */
  header("Location: index.php");
?>