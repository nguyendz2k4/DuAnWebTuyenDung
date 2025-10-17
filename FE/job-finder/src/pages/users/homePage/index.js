import { memo, useState, useRef } from "react";
import logo_title from "../../../assets/imgs/logo/label-toppy-ai.png";
import {
    IoIosArrowDropleft,
    IoIosArrowDropright,
} from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaChevronDown, FaCheck } from "react-icons/fa6";
import logo1 from "../../../assets/imgs/logo_cty/conca.jpg";
import "./style.scss";
import Pagination from "./Pagination";

const HomePage = () => {
    const [selected, setSelected] = useState("Ngẫu nhiên");
    const [filterType, setFilterType] = useState("Địa điểm");
    const scrollRef = useRef();
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [openDropdown, setOpenDropdown] = useState(false);

    const locations = [
        "Ngẫu nhiên",
        "Hà Nội",
        "Thành phố Hồ Chí Minh",
        "Miền Bắc",
        "Miền Nam",
    ];

    const listJobs = [
        "IT",
        "Ngân hàng",
        "Bất động sản",
        "Kế toán",
        "Marketing",
        "tài chính",
        "sản xuất",
        "hành chính",
        "nhân sự",
        "kinh doanh",
        "bán hàng",
        "giáo dục",
        "y tế",
        "du lịch",
    ];

    const jobs = [
        {
            id: 1,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 2,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 3,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 4,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 5,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 6,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 7,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 8,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 9,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 10,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 11,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
        {
            id: 12,
            logo: logo1,
            title: "Chuyên Viên Kinh Doanh Fulltime -Có Sẵn DATA - Chỉ Tuyển Nữ (Thu Nhập Tháng Đầu Tối Thiểu 8 - 18,5 Triệu, Tổng Thu Nhập Từ 20 - 50 Triệu/Tháng)",
            company: "CÔNG TY TNHH TRƯỜNG QUỐC TẾ PALFISH SINGAPORE - VIETNAM",
            salary: "20 - 50 triệu",
            location: "Hà Nội",
        },
    ];

    const companies = [
        {
            id: 1,
            name: "CÔNG TY CỔ PHẦN TẬP ĐOÀN KAROFI",
            industry: "Điện tử / Điện lạnh",
            jobs: 54,
            logo: "/images/fpt-logo.png", // đường dẫn ảnh logo
        },
        {
            id: 2,
            name: "CÔNG TY CỔ PHẦN VNVC",
            industry: "Y tế / Dịch vụ",
            jobs: 32,
            logo: "/images/vnvc-logo.png",
        },
        {
            id: 3,
            name: "CÔNG TY GOLDEN GATE",
            industry: "Nhà hàng / Dịch vụ",
            jobs: 21,
            logo: "/images/goldengate-logo.png",
        },
    ];

    const filterOptions = ["Địa điểm", "Mức lương", "Kinh nghiệm", "Ngành nghề"];

    // Phân trang
    const [page, setPage] = useState(1);
    const jobsPerPage = 12;
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    // Tính các job của trang hiện tại
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -700, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 700, behavior: "smooth" });
    };

    return (
        <div className="job-section">
            {/* ---- HEADER ---- */}
            <div className="box-header">
                <div className="box-header-left">
                    <div className="box-header-title">Việc làm tốt nhất</div>
                    <div className="box-logo">
                        <img src={logo_title} alt="logo" />
                    </div>
                </div>
                <div className="box-header-right">
                    <span className="box-header-right-text">Xem tất cả</span>
                    <div className="box-header-right-icon">
                        <IoIosArrowDropleft className="icon-left" size={32} color="#00b14f" />
                        <IoIosArrowDropright className="icon-right" size={32} color="#00b14f" />
                    </div>
                </div>
            </div>

            {/* ---- THANH LỌC ---- */}
            <div className="box-filter">
                <div className="filter-left">
                    <IoFilterSharp className="filter-icon" />
                    <span className="filter-label">Lọc theo:</span>

                    {/* Dropdown */}
                    <div className="filter-dropdown">
                        <button
                            className="filter-btn"
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            {filterType}
                            <FaChevronDown
                                className={`dropdown-icon ${openDropdown ? "rotate" : ""}`}
                            />
                        </button>

                        {openDropdown && (
                            <div className="dropdown-menu">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option}
                                        className={`dropdown-item ${filterType === option ? "active" : ""
                                            }`}
                                        onClick={() => {
                                            setFilterType(option);
                                            setOpenDropdown(false);
                                        }}
                                    >
                                        <span>{option}</span>
                                        {filterType === option && (
                                            <FaCheck className="check-icon" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Các vùng */}
                <div className="filter-tags">
                    <IoIosArrowDropleft className="icon-left" size={32} color="#00b14f" />
                    {locations.map((loc) => (
                        <button
                            key={loc}
                            className={`tag-btn ${selected === loc ? "active" : ""}`}
                            onClick={() => setSelected(loc)}
                        >
                            {loc}
                        </button>
                    ))}
                    <IoIosArrowDropright className="icon-left1" size={32} color="#00b14f" />
                </div>
            </div>
            <div className="job-list">
                {currentJobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <div className="job-logo">
                            <img src={job.logo} alt={job.company} />
                        </div>

                        <div className="job-info">
                            <h3 className="job-title">
                                <a href="">{job.title}</a>
                            </h3>
                            <p className="company-name">{job.company}</p>

                            <div className="job-meta">
                                <span className="salary">{job.salary}</span>
                                <span className="location">{job.location}</span>
                            </div>
                        </div>
                        <button className="save-icon"> <FaRegHeart size={20} /> </button>
                    </div>
                ))}
            </div>
            {/* Phân trang */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                prevIcon={<IoIosArrowDropleft />}
                nextIcon={<IoIosArrowDropright />}
                color="#00b14f"
            />
            {/* ---- DANH SÁCH CÔNG TY THEO NGÀNH ---- */}
            <div className="section-divider">
                <div className="company-list">
                    <div className="category-container" ref={scrollRef}>
                        <button
                            className={`category-btn ${selectedCategory === "Tất cả" ? "active" : ""}`}
                            onClick={() => setSelectedCategory("Tất cả")}
                        >
                            Tất cả
                        </button>

                        {listJobs.map((job) => (
                            <button
                                key={job}
                                className={`category-btn ${selectedCategory === job ? "active" : ""}`}
                                onClick={() => setSelectedCategory(job)}
                            >
                                {job}
                            </button>
                        ))}
                    </div>
                    <div className="company-header">
                        <div className="scroll-controls">
                            <button className="scroll-btn" onClick={scrollLeft}>
                                <IoIosArrowDropleft />
                            </button>
                            <button className="scroll-btn" onClick={scrollRight}>
                                <IoIosArrowDropright />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="company-list-divider">
                    {companies.map((company) => (
                        <article key={company.id} className="company-card" aria-labelledby={`company-${company.id}`}>
                            <div className="card-inner">
                                <div className="left">
                                    <div className="logo-wrap">
                                        <img src={company.logo} alt={company.name} />
                                    </div>
                                </div>

                                <div className="center">
                                    <h3 id={`company-${company.id}`} className="company-title">
                                        <a href="#" aria-label={`Xem chi tiết ${company.name}`}>{company.name}</a>
                                    </h3>
                                    <p className="company-industry">{company.industry}</p>

                                    <div className="meta-row">
                                        <div className="meta-left">
                                            <span className="icon-briefcase" aria-hidden="true">🧳</span>
                                            <span className="jobs-count">{company.jobs} việc làm</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="right">
                                    <button className="follow-btn" type="button" aria-pressed="false">
                                        + Theo dõi
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>


            </div>
        </div >
    );
};

export default memo(HomePage);
