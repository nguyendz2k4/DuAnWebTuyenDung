<?php
// job-post.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS + JSON header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Kết nối DB
include("../database/db_connect.php"); // sửa lại đường dẫn nếu khác

// Đọc JSON
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Không nhận được dữ liệu JSON"]);
    exit;
}

// Lấy giá trị
$user_id     = isset($data['user_id']) ? intval($data['user_id']) : null;
$employer_id = isset($data['employer_id']) ? intval($data['employer_id']) : null;
$title       = isset($data['title']) ? trim($data['title']) : '';
$description = isset($data['description']) ? trim($data['description']) : '';
$requirements = isset($data['requirements']) ? trim($data['requirements']) : '';
$salary_range = isset($data['salary_range']) ? trim($data['salary_range']) : '';
$job_type    = isset($data['job_type']) ? trim($data['job_type']) : '';
$location    = isset($data['location']) ? trim($data['location']) : '';
$status      = isset($data['status']) ? trim($data['status']) : 'active';
$now         = date("Y-m-d H:i:s");

// Validate bắt buộc cơ bản
if (empty($title)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Thiếu trường title"]);
    exit;
}

// Nếu employer_id không có, nhưng user_id có -> tìm employer_id từ bảng employers
if (empty($employer_id) && !empty($user_id)) {
    $sql = "SELECT employer_id FROM employers WHERE user_id = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($row = $res->fetch_assoc()) {
        $employer_id = intval($row['employer_id']);
    }
    $stmt->close();
}

// Nếu vẫn không có employer_id -> trả lỗi (đề xuất)
if (empty($employer_id)) {
    // Option: bạn có thể thay bằng $employer_id = null để cho phép chèn NULL,
    // nhưng theo nghiệp vụ thường nên yêu cầu employer để đảm bảo bài đăng thuộc 1 công ty.
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "message" => "Không xác định được employer_id. Vui lòng đăng nhập bằng tài khoản employer hoặc cung cấp employer_id."
    ]);
    exit;
}

// Chuẩn bị SQL insert theo cấu trúc trong tuyendung.sql
$sql = "INSERT INTO job_posts (employer_id, title, description, requirements, salary_range, job_type, location, status, created_at, updated_at, level, education, quantity, work_form)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Prepare failed: " . $conn->error]);
    exit;
}

// bind params (tất cả là string trừ employer_id)
$stmt->bind_param(
    "isssssssss",
    $employer_id,
    $title,
    $description,
    $requirements,
    $salary_range,
    $job_type,
    $location,
    $status,
    $now,
    $now
);

$exec = $stmt->execute();
if ($exec) {
    $insert_id = $stmt->insert_id;
    echo json_encode(["success" => true, "message" => "Đăng bài thành công", "job_id" => $insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi khi thêm bài: " . $stmt->error]);
}

$stmt->close();
$conn->close();
