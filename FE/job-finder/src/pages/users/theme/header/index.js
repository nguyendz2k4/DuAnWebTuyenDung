import { memo, useState, useRef, useEffect } from "react";
import { FiBell, FiMessageCircle, FiUser } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import LocationDropdown from "./LocationDropdown";
import JoblistDropdown from "./JoblistDropdown";
import logo from "../../../../assets/imgs/logo/topcv-logo-6.png";
import "./style.scss";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCategory(false);
                setShowLocation(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <header className="header-container">
            <div className="header-top">
                <div className="header-left">
                    <img
                        src={logo}
                        alt="TopCV Logo"
                        className="logo"
                    />
                </div>

                {/* Main nav */}
                <nav className="header-nav">
                    <span className="nav-item">Việc làm
                        <BsChevronDown className="icon-down" />
                        <BsChevronUp className="icon-up" />
                    </span>
                    <span className="nav-item">Tạo CV
                        <BsChevronDown className="icon-down" />
                        <BsChevronUp className="icon-up" />
                    </span>
                    <span className="nav-item">Công cụ
                        <BsChevronDown className="icon-down" />
                        <BsChevronUp className="icon-up" />
                    </span>
                    <span className="nav-item">Cẩm nang nghề nghiệp
                        <BsChevronDown className="icon-down" />
                        <BsChevronUp className="icon-up" />
                    </span>
                    <span className="pro">TopCV Pro</span>
                </nav>
                {/* Icons */}
                <div className="header-icons">
                    <button>
                        <FiBell size={22} style={{
                            opacity: 0.7,
                        }} />
                    </button>
                    <button>
                        <FiMessageCircle size={22} style={{
                            opacity: 0.7,
                        }} />
                    </button>
                    <button>
                        <FiUser size={22} style={{
                            opacity: 0.7,
                        }} />
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Search bar */}
            <div className="header-search" ref={dropdownRef}>
                {/* 1. Nút "Danh mục Nghề" */}
                <div className="category-dropdown-wrapper">
                    <button
                        className="category-btn"
                        onClick={() => setShowCategory(!showCategory)}
                    >
                        <IoIosList size={20} />
                        <span>Danh mục Nghề</span>
                    </button>

                    {showCategory && (
                        <div className="category-dropdown-panel">
                            <JoblistDropdown onClose={() => setShowCategory(false)} />
                        </div>
                    )}
                </div>

                {/* 2. Input "Vị trí tuyển dụng, tên công ty" */}
                <input
                    type="text"
                    placeholder="Vị trí tuyển dụng, tên công ty"
                    className="search-input"
                />

                {/* 3. Địa điểm */}
                <div
                    className="location-select-wrapper"
                    onClick={() => setShowLocation(!showLocation)}
                >
                    <FiMapPin size={18} />
                    <span className="location-text">Địa điểm</span>
                    <BsChevronDown size={14} className={`dropdown-icon ${showLocation ? "open" : ""}`} />
                    {showLocation && (
                        <div className="location-dropdown-wrapper">
                            <LocationDropdown onClose={() => setShowLocation(false)} />
                        </div>
                    )}
                </div>

                {/* 4. Nút "Tìm kiếm" */}
                <button className="search-btn">
                    <IoIosSearch size={18} />
                    <span>Tìm kiếm</span>
                </button>
            </div>

            {/* Mobile nav list */}
            {openMenu && (
                <div className="mobile-nav">
                    <span>Việc làm</span>
                    <span>Tạo CV</span>
                    <span>Công cụ</span>
                    <span>Cẩm nang nghề nghiệp</span>
                    <span className="pro">TopCV Pro</span>
                </div>
            )}
        </header>
    );
};

export default memo(Header);
