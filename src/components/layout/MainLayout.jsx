import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthRequiredModal from '../common/AuthRequiredModal';

/**
 * MainLayout bọc cấu trúc chung của website: Navbar + Nội dung trang (Outlet) + Footer + Modal chặn khi chưa đăng nhập
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-brown font-body">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Modal đăng nhập khi khách click vào các hành động tương tác */}
      <AuthRequiredModal />
    </div>
  );
};

export default MainLayout;
