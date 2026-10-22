import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  KeyRound, 
  Bookmark, 
  Award, 
  MessageSquare, 
  Heart,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_RECIPES, MOCK_COMMUNITY_POSTS } from '../data/mockData';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'saved' | 'badges'

  // Lấy các bài viết của user hoặc mock
  const userPosts = MOCK_COMMUNITY_POSTS;
  // Các món đã lưu
  const savedRecipes = MOCK_RECIPES.slice(0, 3);

  // Huy hiệu thành viên
  const badges = [
    { title: 'Tân Binh Chuối Con 🍌', desc: 'Gia nhập đại gia đình Chuối Ơi', date: 'Tháng 1/2024', unlocked: true },
    { title: 'Đầu Bếp Siêu Đẳng 🍳', desc: 'Nấu thành công trên 10 món chuối', date: 'Tháng 2/2024', unlocked: true },
    { title: 'Chuyên Gia AI Quét Chuối 🤖', desc: 'Thực hiện 20 lượt quét ảnh', date: 'Tháng 3/2024', unlocked: true },
    { title: 'Đại Sứ Chuối Vàng ⭐', desc: 'Đóng góp 50 bài chia sẻ cộng đồng', desc2: 'Cần thêm 38 bài nữa', unlocked: false },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-5xl space-y-8">
      
      {/* ẢNH BÌA & THÔNG TIN CHÍNH */}
      <div className="bg-white rounded-3xl sm:rounded-4xl border-3 border-primary-200 overflow-hidden shadow-pop">
        
        {/* Ảnh bìa */}
        <div className="h-48 sm:h-64 relative overflow-hidden bg-gradient-to-r from-primary-300 via-secondary-300 to-leaf-light">
          <img
            src={user?.coverPhoto || 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80'}
            alt="Ảnh bìa"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Khu vực Avatar & Nút chức năng */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            
            {/* Avatar lớn */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden shadow-pop bg-white shrink-0">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
                    {user?.fullName || 'Hoàng Khang'}
                  </h1>
                  <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs">
                    🍌 Thành viên VIP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-brown/60 font-semibold">
                  Gia nhập từ: {user?.joinDate || '15/01/2024'}
                </p>
              </div>
            </div>

            {/* Các nút Chỉnh sửa & Đổi mật khẩu */}
            <div className="flex items-center gap-2.5">
              <Link
                to="/profile/edit"
                className="btn-primary py-2 px-4 text-xs sm:text-sm"
              >
                <Edit3 size={16} />
                Cập nhật hồ sơ
              </Link>
              <Link
                to="/profile/change-password"
                className="btn-outline py-2 px-4 text-xs sm:text-sm"
              >
                <KeyRound size={16} />
                Đổi mật khẩu
              </Link>
            </div>
          </div>

          {/* Tiểu sử Bio */}
          {user?.bio && (
            <p className="text-sm text-brown/80 bg-cream p-4 rounded-2xl border border-primary-200 mb-6 leading-relaxed">
              "{user.bio}"
            </p>
          )}

          {/* Chi tiết liên hệ nhanh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-brown/70 pt-2 border-t border-primary-100">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-leaf shrink-0" />
              <span className="truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-leaf shrink-0" />
              <span>{user?.phone || '0901 234 567'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-leaf shrink-0" />
              <span className="truncate">{user?.address || 'TP. Hồ Chí Minh'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-leaf shrink-0" />
              <span>Sinh nhật: {user?.birthday || '15/08/2000'}</span>
            </div>
          </div>

          {/* 3 Thông số tương tác của User */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-primary-100 text-center">
            <div className="p-3 rounded-2xl bg-cream/70">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-leaf block">
                {user?.stats?.postsCount || 12}
              </span>
              <span className="text-[11px] font-bold text-brown/60">Bài chia sẻ</span>
            </div>
            <div className="p-3 rounded-2xl bg-cream/70">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-primary-600 block">
                {user?.stats?.reactionsCount || 358}
              </span>
              <span className="text-[11px] font-bold text-brown/60">Lượt tương tác</span>
            </div>
            <div className="p-3 rounded-2xl bg-cream/70">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-blush-dark block">
                {user?.stats?.recipesSaved || 24}
              </span>
              <span className="text-[11px] font-bold text-brown/60">Công thức đã lưu</span>
            </div>
          </div>

        </div>
      </div>


      {/* TABS NỘI DUNG TRANG CÁ NHÂN */}
      <div className="flex gap-2 border-b-2 border-primary-200 pb-2">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'posts'
              ? 'bg-leaf text-white shadow-md'
              : 'bg-white text-brown/70 hover:bg-cream border border-primary-200'
          }`}
        >
          <MessageSquare size={16} />
          Bài đăng của tôi
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'saved'
              ? 'bg-leaf text-white shadow-md'
              : 'bg-white text-brown/70 hover:bg-cream border border-primary-200'
          }`}
        >
          <Bookmark size={16} />
          Sổ tay đã lưu
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'badges'
              ? 'bg-leaf text-white shadow-md'
              : 'bg-white text-brown/70 hover:bg-cream border border-primary-200'
          }`}
        >
          <Award size={16} />
          Huy hiệu Chuối
        </button>
      </div>


      {/* NỘI DUNG TỪNG TAB */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 border-2 border-primary-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
              {post.image && (
                <img
                  src={post.image}
                  alt="Ảnh bài đăng"
                  className="w-full sm:w-44 h-32 rounded-2xl object-cover shrink-0"
                />
              )}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-brown/50">
                  <Clock size={14} />
                  <span>{post.createdAt}</span>
                </div>
                <p className="text-xs sm:text-sm text-brown/85 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-leaf pt-2">
                  <span>❤️ {post.reactions.love + post.reactions.like} cảm xúc</span>
                  <span>💬 {post.comments.length} bình luận</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-3xl overflow-hidden border-2 border-primary-200 shadow-sm flex flex-col justify-between">
              <div>
                <img src={recipe.image} alt={recipe.name} className="h-40 w-full object-cover" />
                <div className="p-4 space-y-1">
                  <span className="text-[11px] font-bold text-leaf">{recipe.bananaTypeName}</span>
                  <h4 className="font-display font-bold text-sm text-brown leading-snug">{recipe.name}</h4>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link to="/recipes" className="btn-primary w-full py-2 text-xs text-center block">
                  Xem lại công thức
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border-2 flex items-center gap-4 transition-all ${
                b.unlocked
                  ? 'bg-white border-primary-300 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                b.unlocked ? 'bg-primary-100' : 'bg-gray-200'
              }`}>
                {b.unlocked ? '🏆' : '🔒'}
              </div>
              <div>
                <h4 className="font-display font-extrabold text-base text-brown-dark leading-tight">
                  {b.title}
                </h4>
                <p className="text-xs text-brown/70 mt-0.5">{b.desc}</p>
                <span className="text-[11px] font-bold text-leaf block mt-1">
                  {b.unlocked ? `Đạt được: ${b.date}` : b.desc2}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
