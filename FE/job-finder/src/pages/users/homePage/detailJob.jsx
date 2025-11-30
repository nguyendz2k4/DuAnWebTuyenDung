import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import "./detailJob.scss";

const DetailJob = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);

    // Dữ liệu mẫu để xem giao diện
    const mockJob = {
        id: 1,
        title: "Nhân Viên Kinh Doanh Bất Động Sản",
        salary: "10-15 triệu",
        location: "Hồ Chí Minh",
        company: "Công ty TNHH Bất Động Sản ABC",
        logo: "https://via.placeholder.com/120x120?text=Logo",
        deadline: "06/11/2025",
        experience: "Không yêu cầu kinh nghiệm",
        companySize: "25-99 nhân viên",
        industry: "Bất động sản",
        address: "Số 116 Nguyễn Văn Thủ, Quận 1, TP.HCM",
        tags: ["Bán hàng tại cửa hàng", "B2B", "B2C", "Có hỗ trợ Data"],
        description: [
            "Liên hệ và chăm sóc khách hàng qua các nền tảng có sẵn.",
            "Hỗ trợ giải đáp thắc mắc cho khách hàng.",
            "Trao đổi, hỗ trợ thông tin cho khách hàng về sản phẩm.",
            "Thực hiện công việc theo chỉ đạo của quản lý."
        ],
        // Thêm mục Yêu cầu
        jobRequirements: [
            "Tốt nghiệp THPT trở lên",
            "Có kỹ năng giao tiếp tốt",
            "Nhiệt tình, năng động",
            "Có laptop và điện thoại cá nhân"
        ],
        // Thêm mục Chuyên môn
        expertise: [
            "Kiến thức cơ bản về bất động sản",
            "Kỹ năng đàm phán và thương lượng",
            "Sử dụng thành thạo Excel, Word",
            "Khả năng làm việc độc lập và teamwork"
        ],
        benefits: [
            "Lương cơ bản + hoa hồng hấp dẫn",
            "Được đào tạo miễn phí",
            "Môi trường làm việc chuyên nghiệp"
        ],
        // Thêm ảnh
        images: [
            "https://via.placeholder.com/300x200?text=Office+1",
            "https://via.placeholder.com/300x200?text=Office+2",
            "https://via.placeholder.com/300x200?text=Team+Photo",
            "https://via.placeholder.com/300x200?text=Workplace"
        ],
        level: "Nhân viên",
        education: "THPT trở lên",
        quantity: "1 người"
    };

    // Sử dụng dữ liệu từ state nếu có, không thì dùng mock data
    const job = state?.job || mockJob;

    if (!job) {
        return (
            <div className="detail-job__notfound">
                <p>Không tìm thấy thông tin công việc.</p>
            </div>
        );
    }

    // Hàm mở modal xem ảnh
    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    // Hàm đóng modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="detail-job">
            {/* ===== HEADER ===== */}
            <header className="detail-job__header">
                <div className="header-left">
                    <h1 className="job-title">{job.title}</h1>
                    <div className="job-meta">
                        <div className="meta-item">
                            <span className="icon">💰</span>
                            <span>{job.salary}</span>
                        </div>
                        <div className="meta-item">
                            <span className="icon">📍</span>
                            <span>{job.location}</span>
                        </div>
                        <div className="meta-item">
                            <span className="icon">🎓</span>
                            <span>{job.experience}</span>
                        </div>
                    </div>

                    <div className="job-deadline">
                        <span>🕒 Hạn nộp hồ sơ: {job.deadline}</span>
                    </div>

                    <div className="job-actions">
                        <button className="btn-apply">Ứng tuyển ngay</button>
                        <button className="btn-save">♡ Lưu tin</button>
                    </div>
                </div>

                <div className="header-right">
                    <div className="company-card">
                        <img src={job.logo} alt={job.company} className="company-logo" />
                        <h3 className="company-name">{job.company}</h3>

                        <ul className="company-info">
                            <li>👥 Quy mô: {job.companySize}</li>
                            <li>🏢 Lĩnh vực: {job.industry}</li>
                            <li>📍 Địa điểm: {job.address}</li>
                        </ul>
                        <a href="#" className="view-company">Xem trang công ty →</a>
                    </div>
                </div>
            </header>

            {/* ===== MAIN ===== */}
            <main className="detail-job__main">
                <section className="detail-job__content">
                    <div className="section">
                        <h2>Chi tiết tin tuyển dụng</h2>
                        <div className="tags">
                            {job.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>

                        <h3>Mô tả công việc</h3>
                        <ul className="list-disc">
                            {job.description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        {/* Mục Yêu cầu */}
                        <h3>Yêu cầu</h3>
                        <ul className="list-disc">
                            {job.jobRequirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        {/* Mục Chuyên môn */}
                        <h3>Chuyên môn</h3>
                        <ul className="list-disc">
                            {job.expertise.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3>Quyền lợi</h3>
                        <ul className="list-disc">
                            {job.benefits.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        {/* Gallery ảnh */}
                        {job.images && job.images.length > 0 && (
                            <div className="job-images">
                                <h3>Hình ảnh văn phòng</h3>
                                <div className="image-gallery">
                                    {job.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="gallery-item"
                                            onClick={() => openImageModal(image)}
                                        >
                                            <img src={image} alt={`Ảnh ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <aside className="detail-job__sidebar">
                    <div className="sidebar-box">
                        <h3>Thông tin chung</h3>
                        <ul>
                            <li>🧑‍💼 Cấp bậc: {job.level}</li>
                            <li>🎓 Học vấn: {job.education}</li>
                            <li>👥 Số lượng tuyển: {job.quantity}</li>
                        </ul>
                    </div>

                    <div className="sidebar-box">
                        <h3>Địa điểm làm việc</h3>
                        <p>📍 {job.address}</p>
                    </div>

                    <div className="sidebar-box">
                        <h3>Cách thức ứng tuyển</h3>
                        <p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm <strong>Ứng tuyển ngay</strong> dưới đây.</p>
                        <button className="btn-apply-sidebar">Ứng tuyển ngay</button>
                        <p className="deadline-note">Hạn nộp hồ sơ: {job.deadline}</p>
                    </div>
                </aside>
            </main>

            {/* Modal xem ảnh */}
            {selectedImage && (
                <div className="image-modal" onClick={closeImageModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={closeImageModal}>&times;</span>
                        <img src={selectedImage} alt="Preview" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailJob;