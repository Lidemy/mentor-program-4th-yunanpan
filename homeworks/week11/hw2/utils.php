<?php
  require_once("conn.php");
  
  // 為了預防 XSS 的攻擊
  function escape($str) {
    return(htmlspecialchars($str, ENT_QUOTES));
  }
?>