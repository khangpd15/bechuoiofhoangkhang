import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  KeyRound, 
  LogOut, 
  Bot, 
  ChevronDown,
  BookOpen,
  Users,
  Compass,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

/**
 * Navbar chính của CHUỐI ƠI
 * Hỗ trợ giao diện khách và thành viên đã đăng nhập với Dropdown menu & Mobile drawer
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tự động đóng menu mobile khi đổi route
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    success('Bạn đã đăng xuất thành công! Hẹn sớm gặp lại bạn nha 🍌');
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Trang chủ', icon: Compass },
    { to: '/about', label: 'Giới thiệu', icon: Info },
    { to: '/recipes', label: 'Mẹo nấu ăn', icon: BookOpen },
    { to: '/community', label: 'Cộng đồng', icon: Users },
    { to: '/ai', label: 'AI Chuối', icon: Bot, badge: 'Mới' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-primary-200 shadow-soft transition-all">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Slogan */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-2xl p-1">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-300 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="Logo Chuối Ơi" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-leaf tracking-tight leading-none group-hover:text-leaf-dark transition-colors">
                CHUỐI ƠI
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-ping hidden sm:inline-block"></span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-brown/70 leading-tight">
              Chuối tây chuối ta, món gì cũng có
            </span>
          </div>
        </Link>

        {/* Desktop Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-cream/70 p-1.5 rounded-full border border-primary-200 shadow-inner">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-full font-display font-bold text-base transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-brown-dark shadow-sm scale-105'
                      : 'text-brown/80 hover:text-leaf hover:bg-white/80'
                  }`
                }
              >
                <Icon size={17} className="opacity-80" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-blush text-white shadow-sm -ml-0.5 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Side: Auth Buttons hoặc User Dropdown */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            /* User Dropdown khi đã đăng nhập */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-cream border-2 border-primary-300 hover:border-primary-500 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={user?.fullName || 'Người dùng'}
                  className="w-9 h-9 rounded-full object-cover border-2 border-primary-400 shadow-inner"
                />
                <span className="font-display font-bold text-sm text-leaf max-w-[120px] truncate">
                  {user?.fullName || 'Bạn chuối'}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-brown/60 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl p-2 shadow-pop border-2 border-primary-200 z-50 animate-fadeIn">
                  <div className="px-3 py-2.5 mb-1 bg-cream/70 rounded-2xl border border-primary-100">
                    <p className="font-display font-bold text-sm text-leaf truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-brown/60 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-brown rounded-2xl hover:bg-primary-100 hover:text-leaf transition-colors"
                    >
                      <User size={16} className="text-primary-600" />
                      Xem hồ sơ
                    </Link>

                    <Link
                      to="/profile/edit"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-brown rounded-2xl hover:bg-primary-100 hover:text-leaf transition-colors"
                    >
                      <Settings size={16} className="text-leaf" />
                      Cập nhật hồ sơ
                    </Link>

                    <Link
                      to="/profile/change-password"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-brown rounded-2xl hover:bg-primary-100 hover:text-leaf transition-colors"
                    >
                      <KeyRound size={16} className="text-brown-light" />
                      Đổi mật khẩu
                    </Link>

                    <div className="h-px bg-primary-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-red-600 rounded-2xl hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Chưa đăng nhập */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full font-display font-bold text-sm text-leaf hover:text-leaf-dark hover:bg-leaf/10 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="btn-primary py-2 px-5 text-sm shadow-banana"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated && (
            <Link to="/profile" className="sm:hidden">
              <img
                src={user?.avatar}
                alt={user?.fullName}
                className="w-8 h-8 rounded-full border-2 border-primary object-cover"
              />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-2xl bg-cream border border-primary-300 text-brown hover:bg-primary-100 transition-colors focus:outline-none"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b-2 border-primary-200 px-4 pt-3 pb-6 space-y-4 shadow-pop animate-fadeIn">
          {/* Menu links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl font-display font-bold text-base transition-colors ${
                      isActive
                        ? 'bg-primary text-brown-dark'
                        : 'text-brown hover:bg-cream'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} className="text-leaf" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blush text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="h-px bg-primary-200"></div>

          {/* User Section Mobile */}
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-cream rounded-2xl">
                <img
                  src={user?.avatar}
                  alt={user?.fullName}
                  className="w-10 h-10 rounded-full border border-primary-400 object-cover"
                />
                <div className="overflow-hidden">
                  <p className="font-display font-bold text-sm text-leaf truncate">{user?.fullName}</p>
                  <p className="text-xs text-brown/60 truncate">{user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <Link to="/profile" className="p-2 rounded-xl bg-primary-50 text-brown hover:bg-primary-100">
                  Hồ sơ
                </Link>
                <Link to="/profile/edit" className="p-2 rounded-xl bg-primary-50 text-brown hover:bg-primary-100">
                  Cập nhật
                </Link>
                <Link to="/profile/change-password" className="p-2 rounded-xl bg-primary-50 text-brown hover:bg-primary-100">
                  Mật khẩu
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2.5 rounded-2xl border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link to="/login" className="btn-outline w-full py-2.5 text-base">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn-primary w-full py-2.5 text-base">
                Đăng ký tài khoản
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
