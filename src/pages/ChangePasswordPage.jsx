import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, KeyRound, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ChangePasswordPage = () => {
  const { changePassword } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Tính độ mạnh mật khẩu
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 1, label: 'Yếu', color: 'bg-red-400' };
    if (score <= 3) return { score: 2, label: 'Trung bình', color: 'bg-yellow-400' };
    return { score: 3, label: 'Mạnh mẽ', color: 'bg-leaf' };
  };

  const strength = calculateStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      error('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    const res = await changePassword(oldPassword, newPassword);
    setLoading(false);

    if (res.success) {
      success('Đổi mật khẩu thành công! Tài khoản của bạn đã được bảo vệ 🍌');
      navigate('/profile');
    } else {
      error(res.message || 'Không thể đổi mật khẩu!');
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-xl space-y-6">
      
      <Link
        to="/profile"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brown/60 hover:text-brown"
      >
        <ArrowLeft size={16} /> Quay lại xem hồ sơ
      </Link>

      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-3 border-primary-200 shadow-pop space-y-6">
        <div>
          <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs mb-1">
            🔒 Bảo mật tài khoản
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
            Đổi Mật Khẩu
          </h1>
          <p className="text-xs text-brown/60 mt-1">
            Hãy đổi mật khẩu định kỳ để bảo vệ tài khoản thành viên Chuối Ơi của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Mật khẩu cũ */}
          <div>
            <label className="block text-xs font-bold text-brown mb-1 ml-1">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full px-4 py-2.5 pl-10 pr-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                required
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block text-xs font-bold text-brown mb-1 ml-1">
              Mật khẩu mới (tối thiểu 6 ký tự)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pl-10 pr-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                required
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-brown/40 hover:text-brown"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Thanh đo độ mạnh */}
            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-cream-200 rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-gray-200'}`}></div>
                  <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-gray-200'}`}></div>
                  <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-gray-200'}`}></div>
                </div>
                <p className="text-[11px] font-bold text-brown/70 text-right">
                  Độ mạnh: <span className="text-leaf">{strength.label}</span>
                </p>
              </div>
            )}
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div>
            <label className="block text-xs font-bold text-brown mb-1 ml-1">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pl-10 pr-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                required
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
            </div>
          </div>

          {/* Nút lưu */}
          <div className="flex gap-3 pt-3">
            <Link
              to="/profile"
              className="w-full py-3 rounded-full border-2 border-brown/20 text-center font-display font-bold text-sm text-brown hover:bg-cream"
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
            >
              <KeyRound size={18} />
              {loading ? 'Đang cập nhật...' : 'Đổi Mật Khẩu'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default ChangePasswordPage;
