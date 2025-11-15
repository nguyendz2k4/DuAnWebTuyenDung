<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../database/db_connect.php';

$response = ['success' => false];

try {
    if (!isset($_GET['id'])) {
        throw new Exception("Thiếu user_id");
    }

    $userId = intval($_GET['id']);

    // JOIN users + user_profiles
    $sql = "
        SELECT 
            u.user_id, u.username, u.email, u.role, u.status, u.created_at,
            p.full_name, p.phone, p.address, p.bio
        FROM users u
        LEFT JOIN user_profiles p ON u.user_id = p.user_id
        WHERE u.user_id = ?
        LIMIT 1
    ";

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
        throw new Exception("Không tìm thấy người dùng");
    }
} catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

echo json_encode($response);
$conn->close();
