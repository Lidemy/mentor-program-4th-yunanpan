<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getName($username);
  }
  
  // 只有管理員可以進來此頁面
  if (!isAdmin($user)) {
    header("Location: index.php");
    exit();
  }

  $sql = "SELECT * FROM yunanpan_users ORDER BY id";
  $stmt = $conn->prepare($sql);
  // $stmt->bind_param("");
  $result = $stmt->execute();
  if (!$result) {
    die("Error" . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言版 後臺管理</title>
  <link rel="stylesheet" href="./css/basic.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <main class="wrap__table">
    <h2>留言板一覽表</h2>
    <table class="table">
      <tr>
        <th>id</th>
        <th>username</th>
        <th>nickname</th>
        <th>role</th>
      </tr>
      <!-- 要從資料庫拿資料擺進去 -->
      <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
          <td><?php echo escape($row['id']) ?></td>
          <td><?php echo escape($row['username']) ?></td>
          <td><?php echo escape($row['nickname']) ?></td>
          <td>
            <?php 
              if ($row["role"] === "ADMIN" ) {
                echo "管理員";
              } else if ($row["role"] === "NORMAL") {
                echo "一般使用者";
              } else {
                echo "遭停權使用者";
              }
            ?>
            <?php if (!empty($_GET['code'])) { ?>
              <?php if ($_GET['code'] == 4 && $row['id'] == $_GET['id']) { ?>
                <span class="table__error">請選擇權限</span>
              <?php } ?>
            <?php } ?>
            <form method="POST" action="<?php echo 'handle_update_role.php?id=' . escape($row['id']) ?>" class="table__select">
              <select name="role" id="role">
                <option disabled selected="select">-----</option>
                <option value="ADMIN">管理員</option>
                <option value="NORMAL">一般使用者</option>
                <option value="BAN">遭停權使用者</option>
              </select>
              <input type="submit" value="提交" class="table__btn">
            </form>
          </td>
        </tr>
      <?php } ?>
    </table>

    <a href="index.php" class="home">回首頁</a>
  </main>
</body>
</html>