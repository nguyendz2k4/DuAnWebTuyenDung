<?php
include 'db_connect.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(array("message" => "Phương thức không hợp lệ."));
    $conn->close();
    die();
}

if (isset($_GET['table']) && !empty($_GET['table'])) {
    $table_name = $_GET['table'];
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Thiếu tham số 'table' trong yêu cầu."));
    $conn->close();
    die();
}

$allowed_tables = [
    'users',
    'transactions',
    'service_packages',
    'seeker_feedback',
    'resumes',
    'messages',
    'job_seekers',
    'job_posts',
    'job_categories',
    'industry',
    'employer_reviews',
    'employers',
    'cv_uploads',
    'career_articles',
    'article_tag_map',
    'article_tags',
    'article_category_map',
    'article_categories',
    'applications'
];

if (!in_array($table_name, $allowed_tables)) {
    http_response_code(403);
    echo json_encode(array("message" => "Tên bảng không hợp lệ hoặc không được phép truy cập."));
    $conn->close();
    die();
}

$sql = "SELECT * FROM `" . $table_name . "`";

$result = $conn->query($sql);

$data = array();

if ($result === FALSE) {
    http_response_code(500);
    echo json_encode(array("message" => "Lỗi truy vấn CSDL: " . $conn->error));
    $conn->close();
    die();
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
http_response_code(200);
echo json_encode($data);

$conn->close();
