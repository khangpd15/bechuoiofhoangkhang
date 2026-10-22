import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Trang Đăng Ký Tài Khoản CHUỐI ƠI
 * Giao diện 2 cột: Cột trái minh họa linh vật, cột phải là form đăng ký với validation tiếng Việt chi tiết
 */
const RegisterPage = () => {
  const { register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Hàm validate form chi tiết bằng tiếng Việt
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn!';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự!';
    }

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Địa chỉ email không đúng định dạng (ví dụ: chuoi@gmail.com)!';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu bảo vệ tài khoản!';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự!';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu để xác nhận!';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không trùng khớp với mật khẩu ở trên!';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'Bạn cần đồng ý với điều khoản dịch vụ để tạo tài khoản!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      error('Vui lòng kiểm tra lại thông tin chưa hợp lệ!');
      return;
    }

    setLoading(true);
    try {
      const res = await register(fullName.trim(), email.trim(), password);
      if (res.success) {
        success(res.message || 'Chúc mừng bạn đã gia nhập đại gia đình Chuối Ơi! 🍌');
        navigate('/', { replace: true });
      } else {
        error(res.message || 'Đăng ký không thành công!');
      }
    } catch (err) {
      error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-pop border-4 border-primary-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* CỘT TRÁI: Linh vật & Quyền lợi thành viên */}
        <div className="relative bg-gradient-to-br from-secondary-300 via-secondary-400 to-leaf p-8 sm:p-12 flex flex-col justify-between items-center text-center text-white overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary-300/30 blur-xl"></div>

          <div className="relative z-10">
            <span className="badge-tag bg-white/25 text-white border border-white/40 shadow-sm text-xs mb-4">
              🍌 Tham gia hoàn toàn miễn phí
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Gia Nhập Chuối Ơi!
            </h2>
            <p className="text-white/90 text-sm mt-2 font-medium">
              Kết nối hàng ngàn người yêu thích món ăn từ chuối, lưu công thức độc quyền và trải nghiệm AI nấu ăn.
            </p>
          </div>

          {/* Linh vật chuối */}
          <motion.div 
            className="relative z-10 my-6"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/90 p-4 border-4 border-primary-300 shadow-leaf flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Linh vật Chuối Ơi"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Quyền lợi thành viên */}
          <div className="relative z-10 w-full bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/40 text-left space-y-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary-300 shrink-0" />
              <span>Đăng bài, bình luận và thả cảm xúc trong cộng đồng</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary-300 shrink-0" />
              <span>Trợ lý AI nhận diện độ chín quả chuối không giới hạn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary-300 shrink-0" />
              <span>Lưu sổ tay công thức nấu chuối tây chuối ta</span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Form Đăng Ký */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="font-display font-extrabold text-3xl text-leaf mb-1">
              Đăng Ký Tài Khoản
            </h1>
            <p className="text-brown/70 text-sm">
              Trở thành thành viên của ngôi nhà Chuối Ơi hôm nay
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Họ và tên */}
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Họ và tên
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn Chuối"
                  className={`w-full px-4 py-2.5 pl-11 rounded-2xl bg-cream border-2 text-brown text-sm focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-primary-200 focus:border-leaf focus:bg-white'
                  }`}
                />
                <User size={18} className="absolute left-4 top-3 text-brown/50" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-2.5 pl-11 rounded-2xl bg-cream border-2 text-brown text-sm focus:outline-none transition-all ${
                    errors.email ? 'border-red-400 bg-red-50/50' : 'border-primary-200 focus:border-leaf focus:bg-white'
                  }`}
                />
                <Mail size={18} className="absolute left-4 top-3 text-brown/50" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.email}</p>
              )}
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Mật khẩu (tối thiểu 6 ký tự)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pl-11 pr-11 rounded-2xl bg-cream border-2 text-brown text-sm focus:outline-none transition-all ${
                    errors.password ? 'border-red-400 bg-red-50/50' : 'border-primary-200 focus:border-leaf focus:bg-white'
                  }`}
                />
                <Lock size={18} className="absolute left-4 top-3 text-brown/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-brown/50 hover:text-brown focus:outline-none"
                  aria-label="Hiện/ẩn mật khẩu"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.password}</p>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pl-11 rounded-2xl bg-cream border-2 text-brown text-sm focus:outline-none transition-all ${
                    errors.confirmPassword ? 'border-red-400 bg-red-50/50' : 'border-primary-200 focus:border-leaf focus:bg-white'
                  }`}
                />
                <Lock size={18} className="absolute left-4 top-3 text-brown/50" />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Đồng ý điều khoản */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-brown/80">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-leaf border-primary-300 focus:ring-leaf accent-leaf"
                />
                <span>
                  Tôi đã đọc và đồng ý với{' '}
                  <span className="text-leaf font-bold hover:underline">Điều khoản dịch vụ</span>{' '}
                  và <span className="text-leaf font-bold hover:underline">Chính sách bảo mật</span> của Chuối Ơi.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Nút Đăng ký */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-brown-dark border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng ký tài khoản...</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Đăng Ký Thành Viên</span>
                </>
              )}
            </button>
          </form>

          {/* Chuyển sang Đăng nhập */}
          <p className="text-center text-xs font-semibold text-brown/70 mt-5">
            Bạn đã có tài khoản rồi?{' '}
            <Link
              to="/login"
              className="font-bold text-leaf hover:underline inline-flex items-center gap-0.5"
            >
              Đăng nhập tại đây
              <ArrowRight size={13} />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
