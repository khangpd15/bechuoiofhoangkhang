import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, User, Phone, MapPin, Calendar, ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const EditProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender || 'Nam');
  const [birthday, setBirthday] = useState(user?.birthday || '2000-08-15');
  const [address, setAddress] = useState(user?.address || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  // Xử lý upload ảnh đại diện mới
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      error('Họ và tên không được để trống!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      updateProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        gender,
        birthday,
        address: address.trim(),
        bio: bio.trim(),
        avatar: avatarPreview,
      });
      setLoading(false);
      success('Cập nhật hồ sơ cá nhân thành công! 🍌');
      navigate('/profile');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-2xl space-y-6">
      
      {/* Nút quay lại */}
      <Link
        to="/profile"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brown/60 hover:text-brown"
      >
        <ArrowLeft size={16} /> Quay lại xem hồ sơ
      </Link>

      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-3 border-primary-200 shadow-pop space-y-6">
        <div>
          <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs mb-1">
            🍌 Thông tin tài khoản
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
            Cập Nhật Hồ Sơ Cá Nhân
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Đổi ảnh đại diện */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-cream border border-primary-200">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-primary-400 shadow-sm shrink-0">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left space-y-2">
              <p className="font-display font-bold text-sm text-brown">
                Ảnh đại diện thành viên
              </p>
              <label className="btn-primary py-1.5 px-4 text-xs cursor-pointer inline-flex items-center gap-1.5">
                <Camera size={14} />
                <span>Tải ảnh đại diện mới</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-brown/50">Hỗ trợ JPG, PNG, tối đa 5MB</p>
            </div>
          </div>

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
                className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                required
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
            </div>
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-xs font-bold text-brown/60 mb-1 ml-1">
              Địa chỉ Email (Cố định theo tài khoản)
            </label>
            <input
              type="text"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2.5 rounded-2xl bg-gray-100 border-2 border-gray-200 text-sm text-brown/60 cursor-not-allowed"
            />
          </div>

          {/* Số điện thoại & Giới tính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Số điện thoại
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901 234 567"
                  className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                />
                <Phone size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Giới tính
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Ngày sinh & Địa chỉ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Ngày sinh
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                />
                <Calendar size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown mb-1 ml-1">
                Tỉnh / Thành phố
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="TP. Hồ Chí Minh"
                  className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown"
                />
                <MapPin size={16} className="absolute left-3.5 top-3.5 text-brown/40" />
              </div>
            </div>
          </div>

          {/* Tiểu sử Bio */}
          <div>
            <label className="block text-xs font-bold text-brown mb-1 ml-1">
              Tiểu sử bản thân (Bio)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Chia sẻ niềm yêu thích các món chuối của bạn..."
              className="w-full p-3 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-sm text-brown resize-none"
            />
          </div>

          {/* Nút hành động */}
          <div className="flex gap-3 pt-2">
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
              <Save size={18} />
              {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default EditProfilePage;
