import { useState } from "react";
import { FiHeart, FiUserPlus, FiShield, FiMessageSquare, FiHeadphones } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../Context/FavoriteContext"; 
import SupportPopup from "./SupportPopup";

import "./style.scss";

export default function RightSidebar() {
    const [showSupport, setShowSupport] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const { favoriteCount } = useFavorite();
    const navigate = useNavigate();

    const handleHeartClick = () => {
        navigate("/favorite-jobs"); // Chuyển đến trang yêu thích
    };

    return (
        <>
            <div className="right-sidebar">
                {/* 3 ICON TRÊN – chuyển trang */}
                <div className="icon-group">
                    {/* Icon Tim với badge số đếm */}
                    <div className="icon-item-wrapper" onClick={handleHeartClick}>
                        <div className="icon-item">
                            <FiHeart />
                            {favoriteCount > 0 && (
                                <span className="badge">{favoriteCount}</span>
                            )}
                        </div>
                    </div>

                    <a href="/suggest-friends" className="icon-item">
                        <FiUserPlus />
                    </a>
                    <a href="/security" className="icon-item">
                        <FiShield />
                    </a>
                </div>

                {/* 2 ICON DƯỚI – mở popup */}
                <div className="bottom-group">
                    <div
                        className="text-item"
                        onClick={() => setShowFeedback(true)}
                    >
                        <FiMessageSquare /> Góp ý
                    </div>

                    <div
                        className="text-item"
                        onClick={() => setShowSupport(true)}
                    >
                        <FiHeadphones /> Hỗ trợ
                    </div>
                </div>
            </div>

            {/* POPUP GÓP Ý */}
            {/* {showFeedback && (
                <FeedbackPopup onClose={() => setShowFeedback(false)} />
            )} */}

            {/* POPUP HỖ TRỢ */}
            {showSupport && (
                <SupportPopup onClose={() => setShowSupport(false)} />
            )}
        </>
    );
}