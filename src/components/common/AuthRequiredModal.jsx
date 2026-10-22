import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, X, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Modal hiển thị khi khách chưa đăng nhập bấm vào các tính năng tương tác
 */
const AuthRequiredModal = () => {
  const { authModalOpen, authModalMessage, closeAuthModal } = useAuth();
  const navigate = useNavigate();

  // Khóa cuộn trang nền khi mở modal
  React.useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleGoToLogin = () => {
    closeAuthModal();
    navigate('/login');
  };

  const handleGoToRegister = () => {
    closeAuthModal();
    navigate('/register');
  };

  return (
    <AnimatePresence>
      <div 
        onClick={closeAuthModal}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brown-dark/75 backdrop-blur-md"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-primary-200 text-center"
        >
          {/* Nút đóng */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-brown/60 hover:text-brown rounded-full hover:bg-cream transition-colors"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>

          {/* Linh vật chuối minh họa */}
          <div className="w-24 h-24 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center border-2 border-primary-300 shadow-inner">
            <img
              src="/logo.png"
              alt="Chuối Ơi Mascot"
              className="w-16 h-16 object-contain animate-bounce"
            />
          </div>

          <h3 className="font-display font-extrabold text-2xl text-leaf mb-2">
            Úi bạn ơi! Cần đăng nhập nè
          </h3>
          <p className="text-brown/80 text-sm md:text-base mb-6 leading-relaxed">
            {authModalMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGoToLogin}
              className="btn-primary w-full py-2.5 text-base"
            >
              <LogIn size={18} />
              Đăng nhập ngay
            </button>
            <button
              onClick={handleGoToRegister}
              className="btn-outline w-full py-2.5 text-base"
            >
              <UserPlus size={18} />
              Đăng ký mới
            </button>
          </div>

          <p className="mt-4 text-xs text-brown/50 flex items-center justify-center gap-1">
            <Heart size={12} className="text-secondary-500 fill-secondary-500" />
            Tham gia cộng đồng Chuối Ơi hoàn toàn miễn phí!
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
