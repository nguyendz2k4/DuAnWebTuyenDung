<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include("../database/db_connect.php");

// --- 1. NHẬN DỮ LIỆU ---
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Log để debug
error_log("Received data: " . print_r($data, true));

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

// Lấy dữ liệu từ request
$user_id      = isset($data['user_id']) ? intval($data['user_id']) : null;
$employer_id  = isset($data['employer_id']) ? intval($data['employer_id']) : null;
$title        = isset($data['title']) ? trim($data['title']) : '';
$description  = isset($data['description']) ? trim($data['description']) : '';
$requirements = isset($data['requirements']) ? trim($data['requirements']) : '';
$salary_range = isset($data['salary_range']) ? trim($data['salary_range']) : '';
$job_type     = isset($data['job_type']) ? trim($data['job_type']) : '';
$location     = isset($data['location']) ? trim($data['location']) : '';
$status       = isset($data['status']) ? trim($data['status']) : 'active';

// Các trường mới
$level        = isset($data['level']) ? trim($data['level']) : '';
$education    = isset($data['education']) ? trim($data['education']) : '';
$quantity     = isset($data['quantity']) ? intval($data['quantity']) : null;
$work_form    = isset($data['work_form']) ? trim($data['work_form']) : '';

$now          = date("Y-m-d H:i:s");
$images       = isset($data['jobImage']) ? $data['jobImage'] : []; // Mảng Base64

// Validate
if (empty($title)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Thiếu tiêu đề bài viết"]);
    exit;
}

// Tìm employer_id từ user_id
if (empty($employer_id) && !empty($user_id)) {
    $sql_find = "SELECT employer_id FROM employers WHERE user_id = ? LIMIT 1";
    $stmt_find = $conn->prepare($sql_find);

    if (!$stmt_find) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Lỗi prepare statement: " . $conn->error]);
        exit;
    }

    $stmt_find->bind_param("i", $user_id);
    $stmt_find->execute();
    $res = $stmt_find->get_result();

    if ($row = $res->fetch_assoc()) {
        $employer_id = intval($row['employer_id']);
    }
    $stmt_find->close();
}

if (empty($employer_id)) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Không xác định được nhà tuyển dụng."]);
    exit;
}

// --- 2. TẠO BÀI VIẾT TRƯỚC (Cột images để trống tạm thời) ---
$sql = "INSERT INTO job_posts (
    employer_id, title, description, requirements, salary_range, 
    job_type, location, status, created_at, updated_at, 
    level, education, quantity, work_form, images
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '')";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi prepare: " . $conn->error]);
    exit;
}

$stmt->bind_param(
    "isssssssssssiss",
    $employer_id,
    $title,
    $description,
    $requirements,
    $salary_range,
    $job_type,
    $location,
    $status,
    $now,
    $now,
    $level,
    $education,
    $quantity,
    $work_form
);

if ($stmt->execute()) {
    $new_job_id = $stmt->insert_id;
    $uploaded_paths = [];

    // --- 3. XỬ LÝ ẢNH VÀ UPDATE ---
    if (!empty($images) && is_array($images)) {
        $target_dir = "../public/uploads/";

        // Tạo thư mục nếu chưa có
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        foreach ($images as $base64_string) {
            // Kiểm tra format Base64
            if (preg_match('/^data:image\/(\w+);base64,/', $base64_string, $type)) {
                $ext = strtolower($type[1]);

                // Chỉ cho phép các định dạng ảnh
                if (!in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                    error_log("Skipping invalid image type: $ext");
                    continue;
                }

                // Decode Base64
                $data_img = base64_decode(substr($base64_string, strpos($base64_string, ',') + 1));

                if ($data_img === false) {
                    error_log("Failed to decode Base64 image");
                    continue;
                }

                // Tạo tên file unique
                $file_name = "job_{$new_job_id}_" . time() . "_" . uniqid() . "." . $ext;
                $file_path = $target_dir . $file_name;

                // Lưu file
                if (file_put_contents($file_path, $data_img)) {
                    $uploaded_paths[] = "/public/uploads/" . $file_name;
                    error_log("Image saved: $file_path");
                } else {
                    error_log("Failed to save image: $file_path");
                }
            }
        }

        // Update database với đường dẫn ảnh
        if (!empty($uploaded_paths)) {
            $json_images = json_encode($uploaded_paths, JSON_UNESCAPED_SLASHES);

            $sql_update = "UPDATE job_posts SET images = ? WHERE job_id = ?";
            $stmt_update = $conn->prepare($sql_update);

            if ($stmt_update) {
                $stmt_update->bind_param("si", $json_images, $new_job_id);
                $stmt_update->execute();
                $stmt_update->close();
                error_log("Images updated in database");
            }
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "Đăng bài thành công",
        "job_id" => $new_job_id,
        "images" => $uploaded_paths // Trả về để Frontend hiển thị ngay nếu cần
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Lỗi khi lưu bài viết: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
