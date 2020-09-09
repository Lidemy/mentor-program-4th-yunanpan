<?php
  require_once("conn.php");
  session_start();
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  // 錯誤處理：如果什麼都沒填
  if ($_POST["active"] === "{}" && $_POST["completed"] === "{}" ) {
    $json = array(
      "ok" => false,
      "message" => "You haven't written anything."
    );
    // 變成 json 的格式
    $response = json_encode($json);
    echo $response;
    die();
  }

  $active = $_POST["active"];
  $completed = $_POST["completed"];
 

  // 如果 session 沒有 id 
  if (empty($_SESSION["id"])) {
     // 存 todo
    $sql = "INSERT INTO yunanpan_todolist (completed, active) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $completed, $active);
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
    $json = array(
      "ok" => true,
      "message" => "success"
    );
    $response = json_encode($json);
    echo $response;

    // 設 id
    $sql = "SELECT id FROM yunanpan_todolist WHERE completed = ? AND active = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $completed, $active);
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
    $id = $row["id"];
    $_SESSION["id"] = $id;
    die();
  } 

  if (!empty($_SESSION["id"])) {
    // 改 todo 內容
    $sql = "UPDATE yunanpan_todolist SET completed = ?, active = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $completed, $active, $_SESSION["id"]);
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
    print_r($result);
    $json = array(
      "ok" => true,
      "message" => "success",
      "result" => $result
    );
    $response = json_encode($json);
    echo $response;
  }

?>