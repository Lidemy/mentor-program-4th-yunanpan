<?php
  // 拿留言
  require("conn.php");
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  // 錯誤處理：判斷有沒拿到資料
  if (empty($_GET["site_key"])) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  // 有 get 到 site_key（才能知道從哪個留言板）
  $site_key = $_GET["site_key"];

  $sql = "SELECT * FROM yunanpan_discussions WHERE site_key = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $site_key);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $respons;
    die();
  }

  // 拿留言總數
  $result = $stmt->get_result();
  $total_comments = $result->num_rows;

  $json = array(
    "total" => $total_comments
  );

  $response = json_encode($json);
  echo $response;

?>