import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/router";
import HomePage from "./pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";

const RouterCustom = () => {
    return (
        <Routes>
            <Route
                path={ROUTES.USER.HOME}
                element={
                    <MasterLayout>
                        <HomePage />
                    </MasterLayout>
                }
            />
        </Routes>
    );
};

export default RouterCustom;
