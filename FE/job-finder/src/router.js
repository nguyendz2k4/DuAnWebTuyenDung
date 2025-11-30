import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/router";
import HomePage from "./pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import DetailJob from "./pages/users/homePage/detailJob";
import FavoriteJobs from "./pages/users/favoriteJobs"; // ← THÊM DÒNG NÀY (nếu có trang này)

const RouterCustom = () => {
    return (
        <Routes>
            {/* Trang chủ */}
            <Route
                path={ROUTES.USER.HOME}
                element={
                    <MasterLayout>
                        <HomePage />
                    </MasterLayout>
                }
            />

            {/* Trang chi tiết công việc */}
            <Route
                path="/job/:id"
                element={
                    <MasterLayout>
                        <DetailJob />
                    </MasterLayout>
                }
            />

            {/* Trang việc làm yêu thích - THÊM ROUTE NÀY */}
            <Route
                path="/favorite-jobs"
                element={
                    <MasterLayout>
                        <FavoriteJobs />
                    </MasterLayout>
                }
            />
        </Routes>
    );
};

export default RouterCustom;