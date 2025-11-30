import { useFavorite } from "../Context/FavoriteContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import logo1 from "../../../assets/imgs/logo_cty/conca.jpg";
import "./style.scss";

const FavoriteJobs = () => {
    const { favorites, toggleFavorite } = useFavorite();

    // Dữ liệu giả (lấy từ HomePage)
    const allJobs = [
        {
            id: 1,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 2,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime",
            company: "CÔNG TY ABC",
            salary: "15 - 30 triệu",
            location: "TP.HCM",
        },
        {
            id: 3,
            logo: logo1,
            title: "Nhân Viên Marketing",
            company: "CÔNG TY XYZ",
            salary: "10 - 20 triệu",
            location: "Đà Nẵng",
        },
        // Thêm các job khác tương tự HomePage
    ];

    // Lọc các job đã yêu thích
    const favoriteJobs = allJobs.filter(job => favorites.includes(job.id));

    return (
        <div className="favorite-jobs-page">
            <h1 className="page-title">Việc làm đã lưu ({favorites.length})</h1>
            
            {favoriteJobs.length === 0 ? (
                <div className="empty-state">
                    <p>Bạn chưa lưu việc làm nào</p>
                    <Link to="/" className="back-home-btn">
                        Về trang chủ
                    </Link>
                </div>
            ) : (
                <div className="job-list">
                    {favoriteJobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <div className="job-logo">
                                <img src={job.logo} alt={job.company} />
                            </div>

                            <div className="job-info">
                                <h3 className="job-title">
                                    <Link to={`/job/${job.id}`}>{job.title}</Link>
                                </h3>
                                <p className="company-name">{job.company}</p>
                                <div className="job-meta">
                                    <span className="salary">{job.salary}</span>
                                    <span className="location">{job.location}</span>
                                </div>
                            </div>

                            <button 
                                className="save-icon active"
                                onClick={() => toggleFavorite(job.id)}
                            >
                                <FaHeart size={20} color="#00b14f" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteJobs;