import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Import các trang
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import RecipesPage from '../pages/RecipesPage';
import CommunityPage from '../pages/CommunityPage';
import AiBananaPage from '../pages/AiBananaPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Cấu hình toàn bộ đường dẫn (Routes) của ứng dụng CHUỐI ƠI
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Các trang công khai */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="ai" element={<AiBananaPage />} />

        {/* Các trang xác thực (Auth) */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        {/* Các trang người dùng (Được bảo vệ bởi ProtectedRoute) */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/edit"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/change-password"
          element={
            <ProtectedRoute>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Trang 404 khi không tìm thấy đường dẫn */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
