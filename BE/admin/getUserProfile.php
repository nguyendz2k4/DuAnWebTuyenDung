<?php
// Thêm CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../database/db_connect.php';
$response = ['success' => false, 'message' => 'Lỗi không xác định'];

try {
    // 1. Lấy ID từ URL (ví dụ: ?id=1)
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('Không cung cấp ID người dùng');
    }

    $userId = (int)$_GET['id'];

    // 2. Truy vấn CSDL (Dùng các cột bạn đã cung cấp trong ảnh)
    $sql = "SELECT user_id, username, email, role, status, created_at FROM users WHERE user_id = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        $response = [
            'success' => true,
            'user' => $user
        ];
    } else {
        throw new Exception('Không tìm thấy người dùng');
    }
} catch (Exception $e) {
    http_response_code(400);
    $response = ['success' => false, 'message' => $e->getMessage()];
}

echo json_encode($response);

$conn->close();
