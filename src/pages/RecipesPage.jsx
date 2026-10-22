import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Flame, 
  Bookmark, 
  X, 
  ChefHat, 
  Check, 
  Lightbulb, 
  Share2, 
  UtensilsCrossed,
  Filter,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';
import { MOCK_RECIPES } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const RecipesPage = () => {
  const { success } = useToast();
  const { requireAuth } = useAuth();

  // Bộ lọc 2 tầng:
  // Tầng 1: Loại chuối ('all', 'ripe', 'raw', 'sap')
  const [selectedBananaType, setSelectedBananaType] = useState('all');
  // Tầng 2: Thể loại món ('all', 'sweet', 'savory', 'vegetarian')
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Sắp xếp
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'time' | 'name'
  // Ô tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  // Số lượng hiển thị (Pagination / Load more: 12 món mỗi lượt)
  const [visibleCount, setVisibleCount] = useState(12);

  // Danh sách ID món đã lưu (bookmark)
  const [savedRecipeIds, setSavedRecipeIds] = useState(['recipe-01', 'recipe-19', 'recipe-39']);
  // Món đang mở xem chi tiết modal (null nếu đóng)
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);
  // Checklist nguyên liệu đã chuẩn bị trong modal
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Khóa cuộn trang nền khi mở modal để tránh double scrollbar và tràn layout
  useEffect(() => {
    if (activeRecipeModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveRecipeModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeRecipeModal]);

  // Lọc và sắp xếp danh sách 56 món
  const filteredRecipes = useMemo(() => {
    let result = MOCK_RECIPES.filter((item) => {
      // Lọc theo loại chuối
      if (selectedBananaType === 'ripe' && item.bananaType !== 'ripe') return false;
      if (selectedBananaType === 'raw' && item.bananaType !== 'raw') return false;
      if (selectedBananaType === 'sap' && item.bananaTypeName !== 'Chuối sáp') return false;

      // Lọc theo loại món
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'vegetarian' && item.category !== 'vegetarian') return false;
        if (selectedCategory === 'savory' && item.category !== 'savory') return false;
        if (selectedCategory === 'sweet' && item.category !== 'sweet') return false;
      }

      // Tìm kiếm từ khóa
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        return matchName || matchDesc;
      }
      return true;
    });

    // Sắp xếp
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'time') {
      result.sort((a, b) => parseInt(a.cookTime) - parseInt(b.cookTime));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }

    return result;
  }, [selectedBananaType, selectedCategory, searchQuery, sortBy]);

  // Danh sách hiển thị theo số lượng hiện tại
  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  // Xử lý lưu / bỏ lưu món ăn
  const handleToggleBookmark = (recipeId, e) => {
    e.stopPropagation();
    requireAuth(() => {
      setSavedRecipeIds((prev) => {
        const isSaved = prev.includes(recipeId);
        if (isSaved) {
          success('Đã bỏ lưu món ăn khỏi sổ tay!');
          return prev.filter((id) => id !== recipeId);
        } else {
          success('Đã lưu món ăn vào sổ tay công thức của bạn! 🍌');
          return [...prev, recipeId];
        }
      });
    }, 'Vui lòng đăng nhập để lưu công thức vào sổ tay cá nhân của bạn nhé!');
  };

  // Mở modal xem chi tiết
  const handleOpenDetail = (recipe) => {
    setActiveRecipeModal(recipe);
    setCheckedIngredients({});
  };

  const handleToggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShareRecipe = (recipe) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success(`Đã sao chép liên kết công thức "${recipe.name}"!`);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-10">

      {/* ==================== 1. HEADER TRANG MẸO NẤU ĂN ==================== */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
          📖 Kho tàng ẩm thực Chuối Ơi
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brown-dark">
          Kho 56+ Món Ngon Từ Chuối
        </h1>
        <p className="text-brown/75 text-base sm:text-lg leading-relaxed">
          Tuyển tập đầy đủ món chay, món mặn, món ngọt từ chuối xiêm, chuối tiêu, chuối sáp, bắp chuối... Chuối tây chuối ta, món gì cũng có, hình ảnh chuẩn vị từng món!
        </p>

        {/* Ô tìm kiếm món ăn nhanh */}
        <div className="relative max-w-xl mx-auto pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(12);
            }}
            placeholder="Tìm món: chuối chiên, ốc chuối đậu, lươn om chuối, kem chuối..."
            className="w-full px-5 py-3.5 pl-12 rounded-full bg-white border-2 border-primary-300 focus:border-leaf focus:outline-none shadow-sm text-brown text-sm sm:text-base transition-all"
          />
          <Search size={20} className="absolute left-4 top-5 text-brown/40" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-4 p-1 text-brown/40 hover:text-brown"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>


      {/* ==================== 2. THANH BỘ LỌC 2 TẦNG & SẮP XẾP ==================== */}
      <div className="bg-white rounded-3xl p-6 border-2 border-primary-200 shadow-card space-y-5">
        
        {/* TẦNG 1: LOẠI CHUỐI */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-bold text-leaf uppercase tracking-wider min-w-[100px] flex items-center gap-1.5">
              <Filter size={15} />
              Loại chuối:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất cả loại chuối' },
                { id: 'ripe', label: '🍌 Chuối chín vàng' },
                { id: 'raw', label: '🌿 Chuối sống / Bắp chuối' },
                { id: 'sap', label: '🍯 Chuối sáp nghệ' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedBananaType(type.id);
                    setVisibleCount(12);
                  }}
                  className={`px-4 py-2 rounded-full font-display font-bold text-xs sm:text-sm transition-all ${
                    selectedBananaType === type.id
                      ? 'bg-primary text-brown-dark shadow-sm scale-105'
                      : 'bg-cream text-brown/70 hover:bg-primary-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center gap-2 text-xs font-bold text-brown/70 shrink-0">
            <ArrowUpDown size={14} className="text-leaf" />
            <span>Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream border border-primary-200 rounded-xl px-2.5 py-1 text-xs font-bold text-brown focus:outline-none focus:border-leaf"
            >
              <option value="rating">Được yêu thích nhất ⭐</option>
              <option value="time">Nấu nhanh nhất ⏱️</option>
              <option value="name">Tên món A-Z</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-primary-100"></div>

        {/* TẦNG 2: THỂ LOẠI MÓN */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs font-bold text-brown/60 uppercase tracking-wider min-w-[100px] flex items-center gap-1.5">
            <UtensilsCrossed size={15} />
            Kiểu món:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tất cả kiểu món (56)' },
              { id: 'vegetarian', label: '🥗 Món Chay & Eat-clean (18)' },
              { id: 'savory', label: '🍲 Món Mặn Bữa Cơm (20)' },
              { id: 'sweet', label: '🍰 Món Ngọt & Tráng Miệng (18)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-full font-display font-bold text-xs sm:text-sm transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-leaf text-white shadow-sm scale-105'
                    : 'bg-cream text-brown/70 hover:bg-leaf/10 hover:text-leaf'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Thông tin số lượng món tìm thấy */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-brown/60 px-2">
        <span>
          Đang hiển thị <strong className="text-leaf">{visibleRecipes.length}</strong> / <strong>{filteredRecipes.length}</strong> công thức phù hợp
        </span>
        {(selectedBananaType !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedBananaType('all');
              setSelectedCategory('all');
              setSearchQuery('');
              setVisibleCount(12);
            }}
            className="text-red-500 hover:underline flex items-center gap-1"
          >
            <X size={14} /> Xóa bộ lọc
          </button>
        )}
      </div>


      {/* ==================== 3. LƯỚI CARD MÓN ĂN CHUẨN ẢNH ==================== */}
      {filteredRecipes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-primary-200 max-w-md mx-auto space-y-3">
          <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-3xl">
            🍌
          </div>
          <h3 className="font-display font-extrabold text-xl text-leaf">
            Không tìm thấy món chuối nào!
          </h3>
          <p className="text-xs text-brown/70">
            Hãy thử tìm bằng từ khóa khác hoặc xóa bộ lọc để khám phá thêm công thức nhé.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleRecipes.map((recipe) => {
            const isSaved = savedRecipeIds.includes(recipe.id);
            return (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleOpenDetail(recipe)}
                className="bg-white rounded-3xl overflow-hidden border-2 border-primary-200 shadow-card hover:shadow-pop hover:border-primary-400 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Ảnh món ăn chuẩn xác */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Thẻ phân loại */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-leaf shadow-sm">
                        {recipe.bananaTypeName}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        recipe.category === 'vegetarian'
                          ? 'bg-secondary-400 text-leaf-dark'
                          : recipe.category === 'savory'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-primary text-brown-dark'
                      }`}>
                        {recipe.categoryName}
                      </span>
                    </div>

                    {/* Nút lưu bookmark */}
                    <button
                      onClick={(e) => handleToggleBookmark(recipe.id, e)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                        isSaved
                          ? 'bg-leaf text-white shadow-md'
                          : 'bg-white/90 text-brown/60 hover:text-leaf hover:bg-white'
                      }`}
                      aria-label="Lưu công thức"
                    >
                      <Bookmark size={18} className={isSaved ? 'fill-white' : ''} />
                    </button>
                  </div>

                  {/* Nội dung tóm tắt */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-brown/60">
                      <span className="flex items-center gap-1">
                        <Clock size={15} className="text-leaf" />
                        {recipe.cookTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame size={15} className="text-primary-600" />
                        {recipe.difficulty}
                      </span>
                      <span className="text-amber-500 font-extrabold">
                        ⭐ {recipe.rating}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-brown group-hover:text-leaf transition-colors leading-snug">
                      {recipe.name}
                    </h3>

                    <p className="text-xs text-brown/70 line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="w-full py-2.5 rounded-full bg-cream group-hover:bg-primary border border-primary-300 font-display font-bold text-sm text-brown text-center transition-colors shadow-sm">
                    Xem Công Thức Chi Tiết
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* NÚT TẢI THÊM NẾU CÒN MÓN */}
      {visibleCount < filteredRecipes.length && (
        <div className="text-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="btn-primary py-3 px-8 text-base shadow-banana inline-flex items-center gap-2"
          >
            <span>Khám phá thêm 12 món chuối khác</span>
            <ChevronDown size={18} />
          </button>
          <p className="text-xs text-brown/50 mt-2 font-semibold">
            Đang hiển thị {visibleCount} trong tổng số {filteredRecipes.length} món ngon
          </p>
        </div>
      )}


      {/* ==================== 4. MODAL CHI TIẾT MÓN ĂN HOÀN CHỈNH ==================== */}
      <AnimatePresence>
        {activeRecipeModal && (
          <div 
            onClick={() => setActiveRecipeModal(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-brown-dark/75 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-3 border-primary-200 flex flex-col max-h-[90vh] overflow-hidden my-auto"
            >
              {/* HEADER CỐ ĐỊNH TRÊN CÙNG (KHÔNG BỊ CUỘN MẤT) */}
              <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-primary-100 flex items-start justify-between gap-4 bg-white z-10 shrink-0">
                <div className="space-y-1.5 pr-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs">
                      {activeRecipeModal.bananaTypeName}
                    </span>
                    <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
                      {activeRecipeModal.categoryName}
                    </span>
                    <span className="text-xs font-bold text-brown/60">
                      ⭐ {activeRecipeModal.rating} ({activeRecipeModal.reviewsCount} đánh giá)
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-brown-dark leading-tight">
                    {activeRecipeModal.name}
                  </h2>
                </div>

                {/* Nút đóng modal cố định ở header */}
                <button
                  onClick={() => setActiveRecipeModal(null)}
                  className="p-2 sm:p-2.5 rounded-full bg-cream hover:bg-primary-100 text-brown hover:text-brown-dark transition-colors shadow-sm shrink-0 border border-primary-200 mt-1"
                  aria-label="Đóng chi tiết"
                >
                  <X size={20} />
                </button>
              </div>

              {/* NỘI DUNG CUỘN MƯỢT MÀ BÊN TRONG CÓ PADDING VÀ SCROLLBAR TINH TẾ */}
              <div className="overflow-y-auto custom-scrollbar px-6 sm:px-8 py-5 space-y-6 flex-1">
                {/* Ảnh lớn và thông số nhanh */}
                <div className="relative h-56 sm:h-72 rounded-3xl overflow-hidden shadow-card">
                  <img
                    src={activeRecipeModal.image}
                    alt={activeRecipeModal.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-pop flex justify-around text-center border border-primary-200">
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-brown/50">Thời gian nấu</p>
                      <p className="font-display font-extrabold text-xs sm:text-sm md:text-base text-leaf">
                        {activeRecipeModal.cookTime}
                      </p>
                    </div>
                    <div className="w-px bg-primary-200"></div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-brown/50">Độ khó</p>
                      <p className="font-display font-extrabold text-xs sm:text-sm md:text-base text-primary-700">
                        {activeRecipeModal.difficulty}
                      </p>
                    </div>
                    <div className="w-px bg-primary-200"></div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-brown/50">Khẩu phần</p>
                      <p className="font-display font-extrabold text-xs sm:text-sm md:text-base text-brown">
                        {activeRecipeModal.servings}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-brown/80 leading-relaxed italic bg-cream/50 p-4 rounded-2xl border border-primary-100">
                  "{activeRecipeModal.description}"
                </p>

                {/* DANH SÁCH NGUYÊN LIỆU (CÓ CHECKLIST) */}
                <div className="bg-cream rounded-3xl p-5 sm:p-6 border border-primary-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-leaf flex items-center gap-2">
                      <ChefHat size={20} />
                      Nguyên Liệu Chuẩn Bị
                    </h3>
                    <span className="text-xs font-bold text-brown/60">
                      (Tick chọn khi bạn đã có sẵn)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeRecipeModal.ingredients.map((ing, idx) => {
                      const isChecked = !!checkedIngredients[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggleIngredient(idx)}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-secondary-100 border-secondary-300 line-through text-brown/50'
                              : 'bg-white border-primary-200 text-brown hover:border-primary-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked ? 'bg-leaf border-leaf text-white' : 'border-brown/30 bg-cream'
                            }`}>
                              {isChecked && <Check size={14} />}
                            </div>
                            <span className="text-xs sm:text-sm font-bold">{ing.name}</span>
                          </div>
                          <span className="text-xs font-extrabold text-leaf shrink-0 ml-2">
                            {ing.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CÁC BƯỚC THỰC HIỆN CHI TIẾT */}
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-brown-dark">
                    Các Bước Thực Hiện
                  </h3>
                  <div className="space-y-3">
                    {activeRecipeModal.steps.map((st) => (
                      <div
                        key={st.step}
                        className="p-4 rounded-2xl bg-white border border-primary-150 shadow-sm flex items-start gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-brown-dark font-display font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          {st.step}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-sm sm:text-base text-leaf">
                            {st.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-brown/80 leading-relaxed">
                            {st.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MẸO HAY & CHỌN CHUỐI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-200 text-xs sm:text-sm space-y-1">
                    <strong className="text-leaf font-display text-sm flex items-center gap-1.5">
                      <Lightbulb size={16} /> Mẹo hay từ đầu bếp:
                    </strong>
                    <p className="text-brown/80">{activeRecipeModal.tips}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary-50 border border-primary-200 text-xs sm:text-sm space-y-1">
                    <strong className="text-brown-dark font-display text-sm flex items-center gap-1.5">
                      🍌 Bí quyết chọn chuối:
                    </strong>
                    <p className="text-brown/80">{activeRecipeModal.bananaSelection}</p>
                  </div>
                </div>
              </div>

              {/* FOOTER CỐ ĐỊNH DƯỚI ĐÁY CỦA MODAL (THANH THAO TÁC TIỆN DỤNG) */}
              <div className="px-6 sm:px-8 py-3.5 bg-cream/95 backdrop-blur-sm border-t border-primary-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <button
                  onClick={(e) => handleToggleBookmark(activeRecipeModal.id, e)}
                  className="btn-primary py-2.5 px-6 text-sm sm:text-base"
                >
                  <Bookmark size={18} />
                  <span>{savedRecipeIds.includes(activeRecipeModal.id) ? 'Đã Lưu Vào Sổ Tay' : 'Lưu Vào Sổ Tay Công Thức'}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareRecipe(activeRecipeModal)}
                    className="btn-outline py-2.5 px-4 text-xs sm:text-sm"
                  >
                    <Share2 size={16} />
                    <span>Chia sẻ</span>
                  </button>
                  <button
                    onClick={() => setActiveRecipeModal(null)}
                    className="px-4 py-2.5 rounded-full bg-white hover:bg-primary-100 text-brown/80 hover:text-brown-dark font-display font-bold text-xs sm:text-sm border border-primary-200 transition-colors"
                  >
                    Đóng lại
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RecipesPage;
