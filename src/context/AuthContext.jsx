import React, { createContext, useContext, useState, useEffect } from 'react';

// Khởi tạo Context cho xác thực người dùng
const AuthContext = createContext(null);

// Dữ liệu người dùng mẫu mặc định để demo khi đăng nhập thành công
const MOCK_DEFAULT_USER = {
  id: 'user_chuoi_01',
  fullName: 'Hoàng Khang',
  email: 'hoangkhang@chuoioi.vn',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  coverPhoto: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80',
  bio: 'Người đam mê chuối số 1 Việt Nam! Thích làm bánh chuối nướng và chia sẻ công thức ngon cho cộng đồng.',
  phone: '0901 234 567',
  gender: 'Nam',
  birthday: '2000-08-15',
  address: 'TP. Hồ Chí Minh, Việt Nam',
  joinDate: '15/01/2024',
  stats: {
    postsCount: 12,
    reactionsCount: 358,
    recipesSaved: 24,
  },
};

export const AuthProvider = ({ children }) => {
  // Trạng thái user lấy từ localStorage nếu đã lưu trước đó
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('chuoi_oi_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Lỗi khi đọc thông tin đăng nhập từ localStorage:', error);
      return null;
    }
  });

  // State điều khiển modal yêu cầu đăng nhập khi khách click vào các tính năng cần tài khoản
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState('Vui lòng đăng nhập để tiếp tục khám phá tính năng này cùng Chuối Ơi!');

  // Tự động đồng bộ với localStorage mỗi khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem('chuoi_oi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chuoi_oi_user');
    }
  }, [user]);

  // Hàm đăng nhập (giả lập)
  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Giả lập kiểm tra tài khoản cơ bản
        if (!email || !password) {
          resolve({ success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu!' });
          return;
        }

        // Tạo user đăng nhập (sử dụng họ tên lấy từ email nếu không có sẵn)
        const nameFromEmail = email.split('@')[0];
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        
        const loggedInUser = {
          ...MOCK_DEFAULT_USER,
          email: email,
          fullName: user?.fullName || formattedName,
        };

        setUser(loggedInUser);
        resolve({ success: true, user: loggedInUser, message: 'Đăng nhập thành công! Chào mừng bạn trở lại.' });
      }, 500);
    });
  };

  // Hàm đăng ký (giả lập)
  const register = async (fullName, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!fullName || !email || !password) {
          resolve({ success: false, message: 'Vui lòng điền đầy đủ tất cả các trường!' });
          return;
        }

        const newUser = {
          ...MOCK_DEFAULT_USER,
          id: `user_${Date.now()}`,
          fullName,
          email,
          joinDate: new Date().toLocaleDateString('vi-VN'),
          stats: {
            postsCount: 0,
            reactionsCount: 0,
            recipesSaved: 0,
          },
        };

        setUser(newUser);
        resolve({ success: true, user: newUser, message: 'Đăng ký tài khoản thành công! Chào mừng bạn gia nhập Chuối Ơi.' });
      }, 600);
    });
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('chuoi_oi_user');
  };

  // Hàm cập nhật hồ sơ cá nhân
  const updateProfile = (updatedFields) => {
    if (!user) return false;
    const updatedUser = {
      ...user,
      ...updatedFields,
    };
    setUser(updatedUser);
    return true;
  };

  // Hàm đổi mật khẩu (giả lập)
  const changePassword = async (oldPassword, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!oldPassword || !newPassword) {
          resolve({ success: false, message: 'Vui lòng nhập đầy đủ mật khẩu cũ và mới!' });
          return;
        }
        if (newPassword.length < 6) {
          resolve({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
          return;
        }
        resolve({ success: true, message: 'Đổi mật khẩu thành công!' });
      }, 500);
    });
  };

  // Hàm yêu cầu đăng nhập nếu là khách (dùng để bọc các tương tác như like, comment, share, report)
  const requireAuth = (callbackAction, customMessage) => {
    if (user) {
      if (typeof callbackAction === 'function') {
        callbackAction();
      }
      return true;
    } else {
      setAuthModalMessage(customMessage || 'Vui lòng đăng nhập để tiếp tục trải nghiệm trọn vẹn Chuối Ơi nhé!');
      setAuthModalOpen(true);
      return false;
    }
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openAuthModal = (message) => {
    if (message) setAuthModalMessage(message);
    setAuthModalOpen(true);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    requireAuth,
    authModalOpen,
    authModalMessage,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook tiện lợi
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider!');
  }
  return context;
};

export default AuthContext;
