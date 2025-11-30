<?php
// api/add_user.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include '../database/db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password) && !empty($data->role)) {

    $username_val = $data->username;
    $email = $data->email;
    $password_raw = $data->password;
    $role = $data->role;

    $checkQuery = "SELECT email FROM users WHERE email = '$email'";
    $result = $conn->query($checkQuery);
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email này đã được sử dụng!"]);
        exit();
    }

    $password_hash = password_hash($password_raw, PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, email, password_hash, role, status, created_at, avatar) 
            VALUES ('$username_val', '$email', '$password_hash', '$role', 1, NOW(), '')";

    if ($conn->query($sql) === TRUE) {
        $new_user_id = $conn->insert_id;

        $sql_profile = "INSERT INTO user_profiles (user_id, created_at, updated_at) 
                        VALUES ('$new_user_id', NOW(), NOW())";
        $conn->query($sql_profile);

        if ($role === 'employer') {
            $sql_employer = "INSERT INTO employers (user_id) VALUES ('$new_user_id')";
            $conn->query($sql_employer);
        }

        echo json_encode(["status" => "success", "message" => "Thêm tài khoản thành công!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Lỗi hệ thống: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Vui lòng điền đầy đủ thông tin"]);
}

$conn->close();
