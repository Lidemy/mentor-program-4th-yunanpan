<?php

require_once("conn.php");

// 隨機產生 token
function createToken() {
  $token = NULL;
  for ($i = 1; $i <= 16; $i += 1) {
    $token .= chr(rand(65, 90));
  }
  return $token;
}

function getName($username) {
  global $conn;
  $sql = sprintf("SELECT * FROM yunanpan_users WHERE username = '%s'",
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}

/*
  // 透過 tokens 拿 username 去 users 拿資料
  function getToken($token) {
    // 拿 global 的變數
    global $conn;
    $sql = sprintf("SELECT username FROM tokens WHERE token = '%s'",
      $token
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $username = $row["username"];

    $sql = sprintf("SELECT * FROM users WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }
*/

?>