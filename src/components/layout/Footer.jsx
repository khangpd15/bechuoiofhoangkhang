import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Send, 
  Facebook, 
  Youtube, 
  Instagram, 
  Compass, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

/**
 * Footer của website CHUỐI ƠI
 * Bao gồm: Thương hiệu, slogan, liên kết nhanh, kết nối mạng xã hội, form đăng ký nhận bí kíp và bản quyền
 */
const Footer = () => {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success, error } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub || !emailSub.includes('@')) {
      error('Vui lòng nhập địa chỉ email hợp lệ nhé!');
      return;
    }
    setSubscribed(true);
    success('Cảm ơn bạn! Chuối Ơi sẽ gửi công thức ngon vào hòm thư sớm nhất 🍌');
    setEmailSub('');
  };

  return (
    <footer className="relative bg-white border-t-4 border-primary-200 mt-24 overflow-hidden">
      {/* Họa tiết lá chuối trang trí mờ phía trên */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary-400 via-secondary-400 to-leaf opacity-90"></div>

      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Cột 1 & 2: Thương hiệu & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary-100 p-1 border-2 border-primary-300 flex items-center justify-center shadow-soft">
                <img src="/logo.png" alt="Chuối Ơi Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-extrabold text-3xl text-leaf tracking-tight">
                  CHUỐI ƠI
                </span>
                <span className="block text-xs font-bold text-brown/70">
                  Chuối tây chuối ta, món gì cũng có
                </span>
              </div>
            </Link>

            <p className="text-brown/80 text-sm leading-relaxed max-w-sm">
              Hệ sinh thái số tiên phong tôn vinh và khai phá mọi giá trị tinh hoa từ cây chuối Việt Nam. Từ món ăn dân dã ba miền, cộng đồng ẩm thực sẻ chia đến công nghệ AI nhận diện độ chín quả chuối độc đáo.
            </p>

            <div className="pt-2 flex items-center gap-3 text-brown">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream border border-primary-300 flex items-center justify-center hover:bg-primary hover:text-brown-dark transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="Facebook Chuối Ơi"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream border border-primary-300 flex items-center justify-center hover:bg-primary hover:text-brown-dark transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="YouTube Chuối Ơi"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream border border-primary-300 flex items-center justify-center hover:bg-primary hover:text-brown-dark transition-all transform hover:-translate-y-1 shadow-sm"
                aria-label="Instagram Chuối Ơi"
              >
                <Instagram size={18} />
              </a>
              <div className="w-10 h-10 rounded-full bg-cream border border-primary-300 flex items-center justify-center font-display font-extrabold text-xs text-leaf hover:bg-primary transition-all cursor-pointer">
                TikTok
              </div>
            </div>
          </div>

          {/* Cột 3: Khám phá nhanh */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-lg text-leaf mb-4 flex items-center gap-2">
              <Compass size={16} className="text-primary-500" />
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-brown/80">
              <li>
                <Link to="/" className="hover:text-leaf transition-colors flex items-center gap-1.5">
                  <span className="text-primary-500">🍌</span> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-leaf transition-colors flex items-center gap-1.5">
                  <span className="text-primary-500">🍌</span> Giới thiệu dự án
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-leaf transition-colors flex items-center gap-1.5">
                  <span className="text-primary-500">🍌</span> Mẹo nấu ăn chuối
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-leaf transition-colors flex items-center gap-1.5">
                  <span className="text-primary-500">🍌</span> Cộng đồng mê chuối
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-leaf transition-colors flex items-center gap-1.5">
                  <span className="text-primary-500">🍌</span> Trợ lý AI Chuối
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Thông tin liên hệ */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-lg text-leaf mb-4">
              Liên Hệ
            </h4>
            <ul className="space-y-3 text-sm text-brown/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-leaf shrink-0 mt-0.5" />
                <span>Toà nhà Chuối Xanh, TP. Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-leaf shrink-0" />
                <span>Hotline: 1900 888 999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-leaf shrink-0" />
                <span>lienhe@chuoioi.vn</span>
              </li>
            </ul>
          </div>

          {/* Cột 5: Đăng ký nhận bí kíp */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-lg text-leaf">
              Nhận Bí Kíp Nấu Chuối
            </h4>
            <p className="text-xs text-brown/70 leading-relaxed">
              Nhận ngay gợi ý món ngon và mẹo bảo quản chuối tươi lâu mỗi tuần vào hộp thư.
            </p>

            {subscribed ? (
              <div className="p-3 bg-secondary-100 border border-secondary-300 rounded-2xl flex items-center gap-2 text-xs font-bold text-leaf">
                <CheckCircle2 size={16} />
                Đã đăng ký thành công!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    className="w-full px-4 py-2.5 text-xs rounded-full bg-cream border-2 border-primary-200 focus:border-leaf focus:outline-none pr-10 text-brown"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-full bg-primary text-brown-dark font-bold hover:bg-primary-600 transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Gửi email"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bản quyền & Lời cảm ơn */}
        <div className="mt-12 pt-8 border-t border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-brown/60">
          <p>© {new Date().getFullYear()} CHUỐI ƠI. Dự án được ấp ủ và phát triển bởi Hoàng Khang & Đội ngũ.</p>
          <p className="flex items-center gap-1">
            Lan tỏa tình yêu nông sản Việt bằng cả <Heart size={14} className="text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
