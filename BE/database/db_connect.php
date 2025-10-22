<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// THÔNG TIN KẾT NỐI CSDL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tuyendung";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("message" => "Kết nối CSDL thất bại: " . $conn->connect_error));
    die();
}

$conn->set_charset("utf8mb4");
