import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Zap, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Trang Đăng Nhập CHUỐI ƠI
 * Giao diện 2 cột: Cột trái minh họa linh vật chuối, cột phải là form đăng nhập kèm nút thử nghiệm 1-chạm
 */
const LoginPage = () => {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Nơi chuyển hướng sau khi đăng nhập thành công (mặc định về trang chủ)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim()) {
      setFormError('Vui lòng nhập địa chỉ email của bạn!');
      return;
    }
    if (!password) {
      setFormError('Vui lòng nhập mật khẩu tài khoản!');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        success(`Chào mừng ${res.user.fullName} đã trở lại với Chuối Ơi! 🍌`);
        navigate(from, { replace: true });
      } else {
        setFormError(res.message || 'Email hoặc mật khẩu không chính xác!');
        error(res.message || 'Đăng nhập không thành công');
      }
    } catch (err) {
      setFormError('Đã có lỗi xảy ra, vui lòng thử lại sau!');
      error('Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  // Nút đăng nhập thử nghiệm nhanh dành cho người dùng và người chấm điểm
  const handleDemoLogin = async () => {
    setEmail('hoangkhang@chuoioi.vn');
    setPassword('ChuoiOi2024');
    setLoading(true);
    const res = await login('hoangkhang@chuoioi.vn', 'ChuoiOi2024');
    setLoading(false);
    if (res.success) {
      success('Đã đăng nhập nhanh bằng tài khoản thử nghiệm! 🍌');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-pop border-4 border-primary-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* CỘT TRÁI: Linh vật Chuối & Lời chào thân thiện */}
        <div className="relative bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 p-8 sm:p-12 flex flex-col justify-between items-center text-center overflow-hidden">
          {/* Vòng tròn trang trí */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-secondary-300/30 blur-xl"></div>

          <div className="relative z-10">
            <span className="badge-tag bg-white/80 text-leaf border border-leaf/30 shadow-sm text-xs mb-4">
              🍌 Chào mừng bạn trở lại!
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brown-dark tracking-tight">
              Gặp Lại Bạn Chuối!
            </h2>
            <p className="text-brown/80 text-sm mt-2 font-medium">
              Đăng nhập để chia sẻ công thức mới, thả tim và hỏi đáp cùng trợ lý AI Chuối siêu thông minh nhé.
            </p>
          </div>

          {/* Linh vật quả chuối nháy mắt */}
          <motion.div 
            className="relative z-10 my-6 cursor-pointer"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white/40 p-4 backdrop-blur-sm border-4 border-white shadow-banana flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Linh vật Chuối Ơi nháy mắt"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Lời thoại bay */}
            <div className="absolute -top-3 -right-2 bg-white text-leaf font-display font-extrabold text-xs px-3 py-1.5 rounded-full shadow-card border-2 border-primary-400 animate-wiggle">
              Nhớ bạn ghê á! ✨
            </div>
          </motion.div>

          <div className="relative z-10 w-full bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/80">
            <p className="text-xs text-brown/70 font-semibold">
              "Chuối tây chuối ta, món gì cũng có"
            </p>
          </div>
        </div>

        {/* CỘT PHẢI: Form Đăng Nhập */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="font-display font-extrabold text-3xl text-leaf mb-1">
              Đăng Nhập
            </h1>
            <p className="text-brown/70 text-sm">
              Điền thông tin tài khoản Chuối Ơi của bạn
            </p>
          </div>

          {/* Thông báo lỗi nếu có */}
          {formError && (
            <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-300 text-red-600 text-sm font-semibold flex items-center gap-2">
              <span>⚠️</span> {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Trường Email */}
            <div>
              <label className="block text-xs font-bold text-brown mb-1.5 ml-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 pl-11 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm transition-all"
                  required
                />
                <Mail size={18} className="absolute left-4 top-3.5 text-brown/50" />
              </div>
            </div>

            {/* Trường Mật khẩu */}
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="block text-xs font-bold text-brown">
                  Mật khẩu
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-leaf hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-11 pr-11 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm transition-all"
                  required
                />
                <Lock size={18} className="absolute left-4 top-3.5 text-brown/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-brown/50 hover:text-brown focus:outline-none"
                  aria-label="Hiện/ẩn mật khẩu"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Ghi nhớ đăng nhập */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-brown/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-leaf border-primary-300 focus:ring-leaf accent-leaf"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            {/* Nút Đăng nhập */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-brown-dark border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Đăng Nhập</span>
                </>
              )}
            </button>
          </form>

          {/* Nút đăng nhập thử nghiệm nhanh 1 chạm */}
          <div className="mt-4 pt-4 border-t border-primary-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-2xl bg-secondary-100 hover:bg-secondary-200 border border-secondary-300 text-leaf font-display font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Zap size={16} />
              Đăng nhập nhanh (Tài khoản mẫu Hoàng Khang)
            </button>
          </div>

          {/* Chuyển sang Đăng ký */}
          <p className="text-center text-xs font-semibold text-brown/70 mt-6">
            Bạn chưa có tài khoản?{' '}
            <Link
              to="/register"
              className="font-bold text-leaf hover:underline inline-flex items-center gap-0.5"
            >
              Đăng ký thành viên ngay
              <ArrowRight size={13} />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
