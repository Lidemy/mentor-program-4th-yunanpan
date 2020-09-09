<?php
  // 新增評論的 API
  require_once("conn.php");

  // 要輸出 JSON 的資料的話，要加上此 header，Browser 才知道是 JSON 的資料格式
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  // 錯誤處理：如果沒有接到值
  if (empty($_POST["content"]) || empty($_POST["nickname"]) || empty($_POST["site_key"]) ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );
    // 變成 json 的格式
    $response = json_encode($json);
    echo $response;
    die();
  }

  // 沒有錯誤就可拿資料
  $nickname = $_POST["nickname"];
  $site_key = $_POST["site_key"];
  $content = $_POST["content"];

  // 寫入資料庫
  $sql = "INSERT INTO yunanpan_discussions (site_key, nickname, content) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $site_key, $nickname, $content);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  // 成功寫入資訊
  $json = array(
    "ok" => true,
    "message" => "success"
  );
  $response = json_encode($json);
  echo $response;

?>