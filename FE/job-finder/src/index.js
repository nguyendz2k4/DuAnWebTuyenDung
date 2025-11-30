import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import './style/style.scss';
import { FavoriteProvider } from './pages/users/Context/FavoriteContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <FavoriteProvider>  {/* ← THÊM DÒNG NÀY */}
            <RouterCustom />
        </FavoriteProvider>  {/* ← THÊM DÒNG NÀY */}
    </BrowserRouter>
);