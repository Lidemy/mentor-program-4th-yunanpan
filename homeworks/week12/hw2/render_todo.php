<?php
  session_start();
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  // 果有 session id => 把資料顯示在前端
  if (empty($_SESSION["id"])) {
    $json = array(
      "ok" => false,
      "message" => "empty id"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  if (!empty($_SESSION["id"])) {
    $id = $_SESSION["id"];
    $sql = "SELECT active, completed FROM yunanpan_todolist WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
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
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    $json = array(
      "ok" => true,
      "todolist" => $row
    );
  
    $response = json_encode($json);
    echo $response;
  }
?>