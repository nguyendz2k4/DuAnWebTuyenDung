import { useParams, useLocation } from "react-router-dom";
import "./detailJob.scss";

const DetailJob = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const job = state?.job;

    if (!job) {
        return (
            <div className="detail-job__notfound">
                <p>Không tìm thấy thông tin công việc.</p>
            </div>
        );
    }

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
                            <span>Không yêu cầu kinh nghiệm</span>
                        </div>
                    </div>

                    <div className="job-deadline">
                        <span>🕒 Hạn nộp hồ sơ: 06/11/2025</span>
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
                            <li>👥 Quy mô: 25-99 nhân viên</li>
                            <li>🏢 Lĩnh vực: Bất động sản</li>
                            <li>📍 Địa điểm: Số 116 Nguyễn Văn Thủ, Quận 1, TP.HCM</li>
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
                            <span className="tag">Bán hàng tại cửa hàng</span>
                            <span className="tag">B2B</span>
                            <span className="tag">B2C</span>
                            <span className="tag">Có hỗ trợ Data</span>
                        </div>
                        <h3>Mô tả công việc</h3>
                        <ul>
                            <li>Liên hệ và chăm sóc khách hàng qua các nền tảng có sẵn.</li>
                            <li>Hỗ trợ giải đáp thắc mắc cho khách hàng.</li>
                            <li>Trao đổi, hỗ trợ thông tin cho khách hàng về sản phẩm.</li>
                            <li>Thực hiện công việc theo chỉ đạo của quản lý.</li>
                        </ul>
                    </div>
                </section>

                <aside className="detail-job__sidebar">
                    <div className="sidebar-box">
                        <h3>Thông tin chung</h3>
                        <ul>
                            <li>🧑‍💼 Cấp bậc: Nhân viên</li>
                            <li>🎓 Học vấn: THPT trở lên</li>
                            <li>👥 Số lượng tuyển: 1 người</li>
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default DetailJob;
