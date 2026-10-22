import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-14 border-4 border-primary-200 shadow-pop max-w-lg w-full text-center space-y-6">
        
        {/* Linh vật chuối đi lạc */}
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-40 h-40 mx-auto"
        >
          <img
            src="/logo.png"
            alt="Chuối Ơi đi lạc"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </motion.div>

        <div className="space-y-2">
          <span className="font-display font-extrabold text-6xl sm:text-7xl text-primary-600 block leading-none">
            404
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
            Úi! Quả Chuối Này Đi Lạc Rồi!
          </h1>
          <p className="text-brown/70 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            Trang bạn đang tìm kiếm có vẻ đã bị rụng khỏi buồng hoặc đã chuyển sang địa chỉ mới.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary py-2.5 px-6 text-sm">
            <Home size={18} />
            Về Trang Chủ
          </Link>
          <Link to="/recipes" className="btn-outline py-2.5 px-6 text-sm">
            <Compass size={18} />
            Khám phá món ngon
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
