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

  $sql = "SELECT * FROM yunanpan_discussions WHERE site_key = ?" . (empty($_GET["before"]) ? '' : ' AND id < ?') 
  . " ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  if (empty($_GET["before"])) {
    $stmt->bind_param("s", $site_key);
  } else {
    $stmt->bind_param("si", $site_key, $_GET["before"]);
  }
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

  // 把資料拿出來
  $result = $stmt->get_result();
  $discussions = array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions,
  );

  $response = json_encode($json);
  echo $response;

?>