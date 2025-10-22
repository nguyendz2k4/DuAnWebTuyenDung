import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/router";
import HomePage from "./pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import DetailJob from "./pages/users/homePage/detailJob"; // 👉 thêm dòng này

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
        </Routes>
    );
};

export default RouterCustom;
