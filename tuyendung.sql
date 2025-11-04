-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 04, 2025 lúc 09:35 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tuyendung`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `seeker_id` int(11) DEFAULT NULL,
  `resume_id` int(11) DEFAULT NULL,
  `cv_id` int(11) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `applied_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `applications`
--

INSERT INTO `applications` (`application_id`, `job_id`, `seeker_id`, `resume_id`, `cv_id`, `cover_letter`, `status`, `applied_at`) VALUES
(1, 1, 1, NULL, NULL, 'Tôi muốn ứng tuyển vị trí Backend PHP.', 'pending', '2025-04-02 08:00:00'),
(2, 2, 1, NULL, NULL, 'Tôi có thể đảm nhiệm cả frontend và backend.', 'reviewed', '2025-04-03 09:30:00'),
(3, 3, 2, NULL, NULL, 'Mong muốn hợp tác lâu dài trong Marketing.', 'accepted', '2025-04-06 10:00:00'),
(4, 4, 4, NULL, NULL, 'Tôi đam mê thiết kế sáng tạo.', 'pending', '2025-04-08 11:00:00'),
(5, 6, 3, NULL, NULL, 'Ứng tuyển vị trí QA/QC.', 'reviewed', '2025-04-12 12:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_categories`
--

CREATE TABLE `article_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_category_map`
--

CREATE TABLE `article_category_map` (
  `article_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_tags`
--

CREATE TABLE `article_tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_tag_map`
--

CREATE TABLE `article_tag_map` (
  `article_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `career_articles`
--

CREATE TABLE `career_articles` (
  `article_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cv_uploads`
--

CREATE TABLE `cv_uploads` (
  `cv_id` int(11) NOT NULL,
  `seeker_id` int(11) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employers`
--

CREATE TABLE `employers` (
  `employer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `company_size` varchar(50) DEFAULT NULL,
  `industry_id` int(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `employers`
--

INSERT INTO `employers` (`employer_id`, `user_id`, `company_name`, `company_website`, `company_size`, `industry_id`, `phone`, `address`, `description`) VALUES
(1, 5, 'Công ty Cổ phần VNGROUP', 'https://vngroup.vn', '1000+', 1, '0281234567', 'TP. HCM', 'Doanh nghiệp công nghệ hàng đầu Việt Nam.'),
(2, 6, 'Công ty TNHH ABC Media', 'https://abcmedia.vn', '200-500', 3, '02422334455', 'Hà Nội', 'Cung cấp giải pháp truyền thông và marketing online.'),
(3, 7, 'FPT Software', 'https://fptsoftware.com', '5000+', 1, '0241112233', 'Đà Nẵng', 'Công ty phần mềm lớn nhất Việt Nam.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employer_reviews`
--

CREATE TABLE `employer_reviews` (
  `review_id` int(11) NOT NULL,
  `seeker_id` int(11) DEFAULT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `industry`
--

CREATE TABLE `industry` (
  `industry_id` int(11) NOT NULL,
  `name_industry` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `industry`
--

INSERT INTO `industry` (`industry_id`, `name_industry`) VALUES
(1, 'Công nghệ thông tin'),
(2, 'Kế toán - Kiểm toán'),
(3, 'Marketing - Truyền thông'),
(4, 'Nhân sự - Hành chính'),
(5, 'Thiết kế - Đồ họa'),
(6, 'Bán hàng - Kinh doanh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_categories`
--

CREATE TABLE `job_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `job_categories`
--

INSERT INTO `job_categories` (`category_id`, `name`, `description`) VALUES
(1, 'Lập trình viên', 'Công việc phát triển phần mềm'),
(2, 'Kế toán', 'Kế toán và kiểm toán doanh nghiệp'),
(3, 'Marketing', 'Truyền thông và tiếp thị'),
(4, 'Thiết kế', 'Thiết kế đồ họa và sáng tạo'),
(5, 'Nhân sự', 'Quản lý và tuyển dụng nhân sự');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_posts`
--

CREATE TABLE `job_posts` (
  `job_id` int(11) NOT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `salary_range` varchar(255) DEFAULT NULL,
  `job_type` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL COMMENT 'Cấp bậc (VD: Nhân viên, Trưởng nhóm, Quản lý)',
  `education` varchar(100) DEFAULT NULL COMMENT 'Học vấn yêu cầu (VD: Trung cấp trở lên)',
  `quantity` int(11) DEFAULT NULL COMMENT 'Số lượng tuyển',
  `work_form` varchar(100) DEFAULT NULL COMMENT 'Hình thức làm việc (VD: Toàn thời gian, Bán thời gian)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `job_posts`
--

INSERT INTO `job_posts` (`job_id`, `employer_id`, `title`, `description`, `requirements`, `salary_range`, `job_type`, `location`, `status`, `created_at`, `updated_at`, `level`, `education`, `quantity`, `work_form`) VALUES
(1, 1, 'Lập trình viên Backend PHP (Laravel)', 'Phát triển hệ thống API và backend', 'Kinh nghiệm Laravel 1-3 năm, biết MySQL', '18-30 triệu', 'Full-time', 'TP. HCM', 'active', '2025-04-01 09:00:00', NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Frontend Developer (ReactJS)', 'Phát triển giao diện website', 'Thành thạo React, HTML, CSS, JavaScript', '15-25 triệu', 'Full-time', 'Hà Nội', 'active', '2025-04-03 10:00:00', NULL, NULL, NULL, NULL, NULL),
(3, 2, 'Chuyên viên Marketing Online', 'Chạy quảng cáo Facebook, Google Ads, Tiktok', 'Kinh nghiệm Digital Marketing 1 năm', '12-20 triệu', 'Full-time', 'Hà Nội', 'active', '2025-04-05 10:30:00', NULL, NULL, NULL, NULL, NULL),
(4, 2, 'Nhân viên Thiết kế đồ họa', 'Thiết kế banner, video ngắn', 'Biết Photoshop, AI, After Effect', '10-18 triệu', 'Full-time', 'Hà Nội', 'active', '2025-04-07 11:00:00', NULL, NULL, NULL, NULL, NULL),
(5, 3, 'Kỹ sư Phần mềm Java', 'Phát triển ứng dụng Java Spring', 'Tối thiểu 2 năm kinh nghiệm', '25-40 triệu', 'Full-time', 'Đà Nẵng', 'active', '2025-04-09 11:30:00', NULL, NULL, NULL, NULL, NULL),
(6, 3, 'Nhân viên QA/QC phần mềm', 'Kiểm thử phần mềm và viết tài liệu test', 'Hiểu quy trình kiểm thử, biết Postman', '15-22 triệu', 'Full-time', 'Đà Nẵng', 'active', '2025-04-11 12:00:00', NULL, NULL, NULL, NULL, NULL),
(7, 1, 'Nhân viên ReactJS', 'Phát triển website bằng React.', 'Có kinh nghiệm 6 tháng.', '15-25 triệu', 'Full time', 'Hồ Chí Minh', 'active', '2025-11-01 04:18:56', '2025-11-01 04:18:56', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_post_categories`
--

CREATE TABLE `job_post_categories` (
  `job_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_seekers`
--

CREATE TABLE `job_seekers` (
  `seeker_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `education_level` varchar(100) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `job_seekers`
--

INSERT INTO `job_seekers` (`seeker_id`, `user_id`, `full_name`, `date_of_birth`, `gender`, `phone`, `address`, `skills`, `education_level`, `experience_years`) VALUES
(1, 1, 'Nguyễn Minh Khoa', '1996-04-10', 'Nam', '0901123456', 'Hà Nội', '[\"PHP\",\"Laravel\",\"MySQL\",\"React\"]', 'Cử nhân CNTT', 3),
(2, 2, 'Lê Thu Trang', '1998-09-05', 'Nữ', '0902234567', 'TP. HCM', '[\"SEO\",\"Content Marketing\",\"Google Ads\"]', 'Cử nhân Marketing', 2),
(3, 3, 'Phan Anh Kiệt', '1995-01-22', 'Nam', '0903345678', 'Đà Nẵng', '[\"Excel\",\"Kế toán tổng hợp\",\"ERP\"]', 'Cử nhân Kế toán', 4),
(4, 4, 'Đỗ Mỹ Anh', '1997-07-14', 'Nữ', '0904456789', 'Hà Nội', '[\"Photoshop\",\"Illustrator\",\"UI/UX\"]', 'Cử nhân Thiết kế đồ họa', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `resumes`
--

CREATE TABLE `resumes` (
  `resume_id` int(11) NOT NULL,
  `seeker_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `experience` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`experience`)),
  `education` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`education`)),
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `seeker_feedback`
--

CREATE TABLE `seeker_feedback` (
  `feedback_id` int(11) NOT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `seeker_id` int(11) DEFAULT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `service_packages`
--

CREATE TABLE `service_packages` (
  `package_id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` float DEFAULT NULL,
  `duration_days` smallint(6) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` enum('job_seeker','employer','admin') DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Nguyễn Công Nhung', 'congnhung@gmail.com', 'hash1', 'job_seeker', 1, '2025-03-10 08:00:00', NULL),
(2, 'Võ Thị Phương Thảo', 'phuongthao622@gmail.com', 'hash2', 'job_seeker', 1, '2025-03-12 09:00:00', NULL),
(3, 'Võ Văn Dũng', 'dung1996@gmail.com', 'hash3', 'job_seeker', 1, '2025-03-15 09:30:00', NULL),
(4, 'Nguyễn Thị Thu Hằng', 'thuhang1977@gmail.com', 'hash4', 'job_seeker', 1, '2025-03-20 10:00:00', NULL),
(5, 'Nguyễn Thanh hải', 'thanhhai1979@gmail.com', 'hash5', 'employer', 1, '2025-03-25 11:00:00', NULL),
(6, 'Nguyễn Anh Dũng', 'dunganhnguyen@gmail.com', 'hash6', 'employer', 1, '2025-03-26 11:30:00', NULL),
(7, 'Nguyễn Viết Thông', 'Vietthong.pro@gmail.com', 'hash7', 'employer', 1, '2025-03-27 12:00:00', NULL),
(8, 'Võ Trung Nguyên', 'votrung920@gmail.com', 'hash8', 'admin', 1, '2025-03-30 13:00:00', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD UNIQUE KEY `application_id` (`application_id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `seeker_id` (`seeker_id`),
  ADD KEY `resume_id` (`resume_id`),
  ADD KEY `cv_id` (`cv_id`);

--
-- Chỉ mục cho bảng `article_categories`
--
ALTER TABLE `article_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `article_category_map`
--
ALTER TABLE `article_category_map`
  ADD PRIMARY KEY (`article_id`,`category_id`);

--
-- Chỉ mục cho bảng `article_tags`
--
ALTER TABLE `article_tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `tag_id` (`tag_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `article_tag_map`
--
ALTER TABLE `article_tag_map`
  ADD PRIMARY KEY (`article_id`,`tag_id`);

--
-- Chỉ mục cho bảng `career_articles`
--
ALTER TABLE `career_articles`
  ADD PRIMARY KEY (`article_id`),
  ADD UNIQUE KEY `article_id` (`article_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `cv_uploads`
--
ALTER TABLE `cv_uploads`
  ADD PRIMARY KEY (`cv_id`),
  ADD UNIQUE KEY `cv_id` (`cv_id`),
  ADD KEY `seeker_id` (`seeker_id`);

--
-- Chỉ mục cho bảng `employers`
--
ALTER TABLE `employers`
  ADD PRIMARY KEY (`employer_id`),
  ADD UNIQUE KEY `employer_id` (`employer_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `industry_id` (`industry_id`);

--
-- Chỉ mục cho bảng `employer_reviews`
--
ALTER TABLE `employer_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD UNIQUE KEY `review_id` (`review_id`),
  ADD KEY `seeker_id` (`seeker_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Chỉ mục cho bảng `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`industry_id`),
  ADD UNIQUE KEY `industry_id` (`industry_id`);

--
-- Chỉ mục cho bảng `job_categories`
--
ALTER TABLE `job_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`job_id`),
  ADD UNIQUE KEY `job_id` (`job_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Chỉ mục cho bảng `job_post_categories`
--
ALTER TABLE `job_post_categories`
  ADD PRIMARY KEY (`job_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `job_seekers`
--
ALTER TABLE `job_seekers`
  ADD PRIMARY KEY (`seeker_id`),
  ADD UNIQUE KEY `seeker_id` (`seeker_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD UNIQUE KEY `message_id` (`message_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Chỉ mục cho bảng `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`resume_id`),
  ADD UNIQUE KEY `resume_id` (`resume_id`),
  ADD KEY `seeker_id` (`seeker_id`);

--
-- Chỉ mục cho bảng `seeker_feedback`
--
ALTER TABLE `seeker_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD UNIQUE KEY `feedback_id` (`feedback_id`),
  ADD KEY `seeker_id` (`seeker_id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Chỉ mục cho bảng `service_packages`
--
ALTER TABLE `service_packages`
  ADD PRIMARY KEY (`package_id`),
  ADD UNIQUE KEY `package_id` (`package_id`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `article_categories`
--
ALTER TABLE `article_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `article_tags`
--
ALTER TABLE `article_tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `career_articles`
--
ALTER TABLE `career_articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cv_uploads`
--
ALTER TABLE `cv_uploads`
  MODIFY `cv_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `employers`
--
ALTER TABLE `employers`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `employer_reviews`
--
ALTER TABLE `employer_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `industry`
--
ALTER TABLE `industry`
  MODIFY `industry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `job_categories`
--
ALTER TABLE `job_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `job_seekers`
--
ALTER TABLE `job_seekers`
  MODIFY `seeker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `resumes`
--
ALTER TABLE `resumes`
  MODIFY `resume_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `seeker_feedback`
--
ALTER TABLE `seeker_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `service_packages`
--
ALTER TABLE `service_packages`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers` (`seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_ibfk_3` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`resume_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `applications_ibfk_4` FOREIGN KEY (`cv_id`) REFERENCES `cv_uploads` (`cv_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Các ràng buộc cho bảng `cv_uploads`
--
ALTER TABLE `cv_uploads`
  ADD CONSTRAINT `cv_uploads_ibfk_1` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers` (`seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `employers`
--
ALTER TABLE `employers`
  ADD CONSTRAINT `employers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employers_ibfk_2` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`industry_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Các ràng buộc cho bảng `employer_reviews`
--
ALTER TABLE `employer_reviews`
  ADD CONSTRAINT `employer_reviews_ibfk_1` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers` (`seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employer_reviews_ibfk_2` FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `job_posts`
--
ALTER TABLE `job_posts`
  ADD CONSTRAINT `job_posts_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `job_post_categories`
--
ALTER TABLE `job_post_categories`
  ADD CONSTRAINT `job_post_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `job_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `job_post_categories_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `job_seekers`
--
ALTER TABLE `job_seekers`
  ADD CONSTRAINT `job_seekers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `resumes_ibfk_1` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers` (`seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `seeker_feedback`
--
ALTER TABLE `seeker_feedback`
  ADD CONSTRAINT `seeker_feedback_ibfk_1` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers` (`seeker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seeker_feedback_ibfk_2` FOREIGN KEY (`employer_id`) REFERENCES `employers` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
