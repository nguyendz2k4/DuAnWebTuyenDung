<?php
include '../database/db_connect.php';

// Thêm CORS headers để React có thể gọi API
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kiểm tra method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Method không được hỗ trợ"
    ]);
    exit();
}

// Lấy dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Vui lòng nhập đầy đủ thông tin"
    ]);
    exit();
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// Kiểm tra empty
if (empty($username) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Tài khoản và mật khẩu không được để trống"
    ]);
    exit();
}

// Truy vấn user theo username hoặc email
$sql = "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    // Kiểm tra mật khẩu đã hash (AN TOÀN)
    if (password_verify($password, $user["password_hash"])) {
        echo json_encode([
            "success" => true,
            "role" => $user["role"],
            "user" => $user["username"],
            "email" => $user["email"],
            "id" => $user["user_id"]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Sai tài khoản hoặc mật khẩu"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Sai tài khoản hoặc mật khẩu"
    ]);
}

$stmt->close();
$conn->close();
