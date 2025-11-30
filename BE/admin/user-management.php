<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

include '../database/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] === "GET" && !isset($_GET["user_id"])) {

    $role = $_GET["role"] ?? "all";
    $search = $_GET["search"] ?? "";

    $sql = "SELECT user_id, username, email, role, status, created_at FROM users WHERE 1";

    $params = [];
    $types = "";

    if ($role !== "all") {
        $sql .= " AND role = ?";
        $params[] = $role;
        $types .= "s";
    }

    if (!empty($search)) {
        $sql .= " AND (username LIKE ? OR email LIKE ?)";
        $searchVal = "%$search%";
        $params[] = $searchVal;
        $params[] = $searchVal;
        $types .= "ss";
    }

    $stmt = $conn->prepare($sql);

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode(["success" => true, "data" => $users]);
    exit;
}
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["user_id"])) {

    $user_id = intval($_GET["user_id"]);

    $sql = "
        SELECT 
            u.user_id,
            u.username,
            u.email,
            u.role,
            u.status,
            u.created_at,
            p.full_name,
            p.date_of_birth,
            p.gender,
            p.phone,
            p.address,
            p.bio,
            p.education_level,
            p.experience_years,
            p.skills,
            p.company_name,
            p.company_website,
            p.company_address,
            p.company_phone,
            p.company_description
        FROM users u
        LEFT JOIN user_profiles p ON u.user_id = p.user_id
        WHERE u.user_id = ?
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $detail = $result->fetch_assoc();

    if (!$detail) {
        echo json_encode(["success" => false, "message" => "Không tìm thấy tài khoản"]);
        exit;
    }

    echo json_encode(["success" => true, "data" => $detail]);

    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data["user_id"] ?? null;

    if (!$user_id) {
        echo json_encode(["success" => true, "data" => $detail]);

        exit;
    }
    $stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "data" => $detail]);
    } else {
        echo json_encode(["success" => true, "data" => $detail]);
    }

    exit;
}

http_response_code(405);
echo json_encode(["success" => true, "data" => $detail]);
