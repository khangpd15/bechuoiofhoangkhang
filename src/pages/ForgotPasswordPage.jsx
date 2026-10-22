import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

/**
 * Trang Quên Mật Khẩu CHUỐI ƠI
 * Quy trình 3 bước hoàn chỉnh:
 * Bước 1: Nhập Email xác nhận
 * Bước 2: Nhập mã OTP 6 số (Giả lập)
 * Bước 3: Đặt lại mật khẩu mới + thanh đo độ mạnh mật khẩu
 */
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { success, error, info } = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Đếm ngược gửi lại mã OTP
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Xử lý Bước 1: Gửi mã OTP về email
  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(60);
      setCanResend(false);
      success('Mã OTP 6 số đã được gửi tới email của bạn (Mã mẫu: 123456) 🍌');
    }, 800);
  };

  // Xử lý thay đổi từng ô nhập OTP
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Tự động focus sang ô kế tiếp
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Xử lý Bước 2: Xác nhận OTP
  const handleStep2Submit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      error('Vui lòng nhập đủ 6 chữ số mã OTP!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      success('Xác thực OTP thành công! Mời bạn nhập mật khẩu mới.');
    }, 700);
  };

  // Gửi lại OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    setCountdown(60);
    setCanResend(false);
    info('Đã gửi lại mã OTP mới tới email của bạn (Mã mẫu: 123456)');
  };

  // Tính độ mạnh mật khẩu
  const calculatePasswordStrength = (pwd) => {
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

  const passwordStrength = calculatePasswordStrength(newPassword);

  // Xử lý Bước 3: Đặt mật khẩu mới
  const handleStep3Submit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      error('Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success('Đổi mật khẩu thành công! Hãy đăng nhập lại bằng mật khẩu mới 🍌');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-pop border-4 border-primary-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* CỘT TRÁI: Linh vật an ủi */}
        <div className="relative bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400 p-8 sm:p-12 flex flex-col justify-between items-center text-center overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/20 blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-secondary-300/30 blur-xl"></div>

          <div className="relative z-10">
            <span className="badge-tag bg-white/80 text-leaf border border-leaf/30 shadow-sm text-xs mb-4">
              🍌 Hỗ trợ khôi phục tài khoản
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brown-dark tracking-tight">
              Đừng Lo Bạn Ơi!
            </h2>
            <p className="text-brown/80 text-sm mt-2 font-medium">
              Chuối Ơi sẽ giúp bạn lấy lại chìa khóa vào ngôi nhà ẩm thực chuối chỉ với 3 bước siêu đơn giản.
            </p>
          </div>

          {/* Linh vật chuối động viên */}
          <motion.div 
            className="relative z-10 my-6"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/50 p-4 border-4 border-white shadow-banana flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Linh vật Chuối Ơi hỗ trợ"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-2 bg-leaf text-white font-display font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <ShieldCheck size={14} />
              Bảo mật 100%
            </div>
          </motion.div>

          {/* Trạng thái 3 bước */}
          <div className="relative z-10 w-full flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-leaf'
                    : s < step
                    ? 'w-3 bg-secondary-500'
                    : 'w-3 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: Form 3 Bước */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-leaf uppercase tracking-wider bg-secondary-100 px-3 py-1 rounded-full">
              Bước {step} / 3
            </span>
            <Link
              to="/login"
              className="text-xs font-bold text-brown/60 hover:text-brown inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Quay lại đăng nhập
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {/* BƯỚC 1: NHẬP EMAIL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-leaf mb-1">
                  Quên Mật Khẩu?
                </h1>
                <p className="text-brown/70 text-sm mb-6">
                  Nhập email bạn đã đăng ký để Chuối Ơi gửi mã xác thực OTP nhé.
                </p>

                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brown mb-1.5 ml-1">
                      Địa chỉ Email tài khoản
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 pl-11 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm"
                        required
                      />
                      <Mail size={18} className="absolute left-4 top-3.5 text-brown/50" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? 'Đang gửi mã...' : 'Gửi Mã Xác Nhận OTP'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* BƯỚC 2: NHẬP MÃ OTP */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-leaf mb-1">
                  Xác Thực Mã OTP
                </h1>
                <p className="text-brown/70 text-sm mb-6">
                  Mã 6 số đã được gửi đến <strong className="text-brown">{email}</strong>.
                  <br />
                  <span className="text-xs text-leaf font-semibold">(Mẹo thử nghiệm nhanh: Bạn có thể nhập 1 2 3 4 5 6)</span>
                </p>

                <form onSubmit={handleStep2Submit} className="space-y-6">
                  {/* 6 ô OTP */}
                  <div className="flex justify-between gap-2 max-w-xs mx-auto">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-11 h-13 text-center font-display font-extrabold text-2xl rounded-2xl bg-cream border-2 border-primary-300 focus:border-leaf focus:bg-white focus:outline-none text-leaf shadow-inner"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brown/70">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-leaf font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Gửi lại mã OTP mới
                      </button>
                    ) : (
                      <span>Gửi lại mã sau: <strong className="text-brown">{countdown}s</strong></span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? 'Đang kiểm tra...' : 'Xác Nhận Mã OTP'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* BƯỚC 3: ĐẶT MẬT KHẨU MỚI */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-leaf mb-1">
                  Đặt Mật Khẩu Mới
                </h1>
                <p className="text-brown/70 text-sm mb-6">
                  Tạo mật khẩu mới an toàn cho tài khoản Chuối Ơi của bạn.
                </p>

                <form onSubmit={handleStep3Submit} className="space-y-4">
                  {/* Mật khẩu mới */}
                  <div>
                    <label className="block text-xs font-bold text-brown mb-1 ml-1">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full px-4 py-2.5 pl-11 pr-11 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm"
                        required
                      />
                      <Lock size={18} className="absolute left-4 top-3 text-brown/50" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3 text-brown/50 hover:text-brown"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Thanh đo độ mạnh mật khẩu */}
                    {newPassword && (
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 w-full bg-cream-200 rounded-full overflow-hidden flex gap-1">
                          <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                          <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                          <div className={`h-full flex-1 rounded-full ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-gray-200'}`}></div>
                        </div>
                        <p className="text-[11px] font-bold text-brown/70 text-right">
                          Độ mạnh: <span className="text-leaf">{passwordStrength.label}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Xác nhận mật khẩu mới */}
                  <div>
                    <label className="block text-xs font-bold text-brown mb-1 ml-1">
                      Nhập lại mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-11 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm"
                        required
                      />
                      <Lock size={18} className="absolute left-4 top-3 text-brown/50" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
                  >
                    {loading ? 'Đang cập nhật...' : 'Hoàn Tất & Đổi Mật Khẩu'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
