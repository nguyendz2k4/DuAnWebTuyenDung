<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include("../database/db_connect.php");

try {
    // Lấy tất cả categories
    $sql = "SELECT category_id, name, description FROM job_categories ORDER BY name ASC";
    $result = $conn->query($sql);

    if ($result) {
        $categories = [];

        while ($row = $result->fetch_assoc()) {
            $categories[] = [
                'category_id' => $row['category_id'],
                'name' => $row['name'],
                'description' => $row['description']
            ];
        }

        echo json_encode([
            "success" => true,
            "data" => $categories,
            "total" => count($categories)
        ]);
    } else {
        throw new Exception("Lỗi query: " . $conn->error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

$conn->close();
