import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Flame, 
  Heart, 
  MessageCircle, 
  CheckCircle2, 
  Sprout, 
  Trees, 
  Flower2, 
  Layers, 
  Sun, 
  UtensilsCrossed,
  Maximize2,
  X,
  Info,
  ChevronRight,
  ZoomIn,
  Compass,
  Cpu
} from 'lucide-react';
import { 
  BANANA_LIFECYCLE_STAGES, 
  MOCK_RECIPES, 
  MOCK_COMMUNITY_POSTS, 
  PROJECT_STATISTICS 
} from '../data/mockData';

// Map icon name sang icon component cho vòng đời chuối
const iconMap = {
  Sprout: Sprout,
  Trees: Trees,
  Flower2: Flower2,
  Layers: Layers,
  Sun: Sun,
  UtensilsCrossed: UtensilsCrossed,
};

/**
 * Animated Counter cho số liệu thống kê
 */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const isFloat = !Number.isInteger(target);
    const end = parseFloat(target);
    const increment = end / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-leaf tracking-tight">
      {count.toLocaleString('vi-VN')}
      <span className="text-primary-600">{suffix}</span>
    </span>
  );
};

const HomePage = () => {
  // Giai đoạn vòng đời chuối đang được chọn xem
  const [activeStageId, setActiveStageId] = useState(1);

  // State Modal phóng to ảnh và hiển thị điểm ghi chú (Hotspots)
  const [zoomModalStage, setZoomModalStage] = useState(null);
  // Điểm hotspot đang được hover hoặc click chọn xem chi tiết
  const [activeHotspotId, setActiveHotspotId] = useState(null);

  // Khóa cuộn trang nền khi mở modal kính lúp giải phẫu
  useEffect(() => {
    if (zoomModalStage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomModalStage(null);
        setActiveHotspotId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomModalStage]);

  // 3 công thức nổi bật
  const featuredRecipes = MOCK_RECIPES.filter((r) => r.isFeatured).slice(0, 3);
  // 3 bài viết cộng đồng mới nhất
  const recentPosts = MOCK_COMMUNITY_POSTS.slice(0, 3);

  const currentStage = BANANA_LIFECYCLE_STAGES.find((s) => s.id === activeStageId) || BANANA_LIFECYCLE_STAGES[0];

  // Tọa độ góc cho 6 giai đoạn xếp thành VÒNG TRÒN TUẦN HOÀN (360 độ / 6 = 60 độ mỗi nấc)
  // Góc xuất phát từ đỉnh trên cùng (0 độ = 12h) quay theo chiều kim đồng hồ
  const circleAngles = [270, 330, 30, 90, 150, 210]; // 12h, 2h, 4h, 6h, 8h, 10h

  return (
    <div className="space-y-20 lg:space-y-28 overflow-hidden pb-12">

      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 banana-dots-bg opacity-30 pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Cột trái: Tiêu đề, slogan & Call to Action */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-primary-300 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-leaf animate-ping"></span>
                <span className="font-display font-extrabold text-xs sm:text-sm text-leaf">
                  🍌 Chuối tây chuối ta, món gì cũng có!
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brown-dark leading-[1.15]">
                Hệ Sinh Thái Khám Phá <br className="hidden sm:inline" />
                Thế Giới <span className="text-leaf relative inline-block">
                  CHUỐI ƠI
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-400" viewBox="0 0 100 15" preserveAspectRatio="none">
                    <path d="M0,8 Q50,15 100,8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span> Toàn Diện!
              </h1>

              <p className="text-brown/80 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Tôn vinh nông sản Việt qua kho tàng hơn 50+ món ngon chuẩn vị từ chuối chín lẫn chuối sống, kết nối cộng đồng yêu ẩm thực và trải nghiệm trợ lý AI nhận diện độ chín độc quyền.
              </p>

              {/* Nhóm nút hành động */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/recipes" className="btn-primary">
                  <span>Khám phá 50+ công thức</span>
                  <ArrowRight size={20} />
                </Link>

                <Link to="/ai" className="btn-secondary">
                  <span className="text-xl">🍌</span>
                  <span>Hỏi AI Chuối</span>
                </Link>
              </div>

              {/* Điểm nhấn tin cậy */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-brown/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-leaf" />
                  <span>50+ Mẹo nấu ăn ba miền</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-leaf" />
                  <span>AI Quét chuối chuẩn 98%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-leaf" />
                  <span>Cộng đồng 48.000+ thành viên</span>
                </div>
              </div>

            </div>

            {/* Cột phải: Linh vật chuối 3D mới toanh không chữ */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                className="relative cursor-pointer"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-300 blur-2xl opacity-70 transform scale-110"></div>

                <div className="relative w-72 h-72 sm:w-84 sm:h-84 lg:w-96 lg:h-96 rounded-full bg-white/70 backdrop-blur-md p-6 border-4 border-white shadow-pop flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Linh vật Chuối Ơi nháy mắt 3D"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Bong bóng lời thoại nổi */}
                <motion.div 
                  className="absolute -top-4 -left-4 sm:top-2 sm:-left-8 bg-white px-4 py-2 rounded-2xl shadow-card border-2 border-primary-300 text-xs sm:text-sm font-display font-extrabold text-leaf flex items-center gap-1.5"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span>Chào bạn yêu chuối! 🍌</span>
                </motion.div>

                {/* Thẻ AI nổi góc dưới */}
                <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:-right-6 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-pop border-2 border-secondary-300 flex items-center gap-2.5 text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-brown-dark flex items-center justify-center text-xl">
                    🍌
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-brown/60">Trợ Lý Thông Minh</p>
                    <p className="font-display font-extrabold text-xs text-leaf">Nhận diện chuối tức thì</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================== 2. VÒNG ĐỜI CỦA CÂY CHUỐI DẠNG VÒNG TRÒN TUẦN HOÀN ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs">
            🌱 Vòng tuần hoàn kỳ diệu
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brown-dark">
            VÒNG ĐỜI CỦA CÂY CHUỐI
          </h2>
          <p className="text-brown/70 text-base sm:text-lg">
            Nhấn vào từng nấc trong <strong>vòng tròn sinh trưởng</strong> để xem mô tả, hoặc <strong>bấm vào hình ảnh</strong> để phóng to xem các điểm ghi chú giải phẫu sinh học chi tiết!
          </p>
        </div>

        {/* ==================== GIAO DIỆN VÒNG TRÒN SINH TRƯỞNG & CARD CHI TIẾT ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* CỘT TRÁI: VÒNG TRÒN TUẦN HOÀN 6 GIAI ĐOẠN (CIRCULAR WHEEL) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-dashed border-primary-300 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-soft">
              
              {/* Vòng quay trung tâm */}
              <div
                onClick={() => setZoomModalStage(currentStage)}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white border-4 border-primary-400 p-3 shadow-banana flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all group"
                title="Bấm để phóng to và xem điểm ghi chú giải phẫu"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-inner mb-1.5">
                  <img
                    src={currentStage.image}
                    alt={currentStage.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={20} className="text-white drop-shadow" />
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-leaf tracking-wider block">
                  {currentStage.stage}
                </span>
                <span className="font-display font-extrabold text-sm sm:text-base text-brown-dark leading-tight block">
                  {currentStage.name}
                </span>
                <span className="text-[10px] text-primary-700 font-bold flex items-center gap-1 mt-0.5 group-hover:underline">
                  <ZoomIn size={12} /> Bấm phóng to
                </span>
              </div>

              {/* 6 NODE XẾP TRÊN ĐƯỜNG TRÒN */}
              {BANANA_LIFECYCLE_STAGES.map((stg, index) => {
                const Icon = iconMap[stg.icon] || Sprout;
                const isActive = stg.id === activeStageId;
                
                // Tính tọa độ x, y trên vòng tròn bán kính R = 150px (hoặc 175px trên desktop)
                const angleRad = (circleAngles[index] * Math.PI) / 180;
                // Bán kính quỹ đạo
                const radius = 142; // pixel
                const leftPos = `calc(50% + ${Math.cos(angleRad) * radius}px)`;
                const topPos = `calc(50% + ${Math.sin(angleRad) * radius}px)`;

                return (
                  <button
                    key={stg.id}
                    onClick={() => setActiveStageId(stg.id)}
                    style={{ left: leftPos, top: topPos, transform: 'translate(-50%, -50%)' }}
                    className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center border-3 transition-all duration-300 shadow-md ${
                      isActive
                        ? 'bg-primary text-brown-dark border-leaf scale-125 z-20 shadow-banana'
                        : 'bg-white text-brown/70 border-primary-200 hover:scale-110 hover:border-primary-400 z-10'
                    }`}
                    title={`${stg.stage}: ${stg.name}`}
                  >
                    <Icon size={20} className={isActive ? 'text-brown-dark animate-pulse' : 'text-leaf'} />
                    <span className="text-[10px] font-display font-extrabold mt-0.5">
                      {stg.id}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* CỘT PHẢI: CHI TIẾT GIAI ĐOẠN ĐƯỢC CHỌN VÀ NÚT PHÓNG TO XEM GHI CHÚ */}
          <div className="lg:col-span-7">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 border-3 border-primary-200 shadow-pop space-y-5"
            >
              {/* Header giai đoạn */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentStage.bgBadge}`}>
                  {currentStage.stage} • {currentStage.subtitle}
                </span>
                <span className="text-xs font-bold text-brown/50">
                  Nấc {currentStage.id} trong 6 giai đoạn
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
                {currentStage.name}
              </h3>

              {/* Ảnh minh họa có nút Phóng to xem điểm ghi chú */}
              <div 
                onClick={() => setZoomModalStage(currentStage)}
                className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-primary-300 cursor-pointer group shadow-card"
              >
                <img
                  src={currentStage.image}
                  alt={currentStage.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                  <div className="w-full flex items-center justify-between text-white">
                    <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40">
                      <ZoomIn size={16} /> Bấm để phóng to & xem điểm ghi chú
                    </span>
                    <span className="badge-tag bg-primary text-brown-dark font-display text-xs">
                      {currentStage.hotspots.length} điểm chú thích
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-brown/85 text-sm sm:text-base leading-relaxed">
                {currentStage.description}
              </p>

              <div className="p-4 rounded-2xl bg-cream border border-primary-200 text-xs sm:text-sm text-brown/90 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary-200 text-brown-dark flex items-center justify-center shrink-0 mt-0.5">
                  💡
                </div>
                <div>
                  <strong className="block text-brown font-display text-sm">Đặc điểm sinh học & Ứng dụng:</strong>
                  <span>{currentStage.details}</span>
                </div>
              </div>

              {/* Nút thao tác dưới card */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setZoomModalStage(currentStage)}
                  className="btn-primary py-2.5 px-5 text-sm"
                >
                  <Maximize2 size={16} />
                  <span>Phóng To & Khám Phá Điểm Ghi Chú</span>
                </button>

                {currentStage.linkTo && (
                  <Link to={currentStage.linkTo} className="btn-secondary py-2.5 px-5 text-sm">
                    <UtensilsCrossed size={16} />
                    <span>Xem ngay 50+ Món Ăn</span>
                  </Link>
                )}
              </div>

            </motion.div>
          </div>

        </div>

      </section>


      {/* ==================== 3. MODAL PHÓNG TO ẢNH VÀ HIỂN THỊ CÁC ĐIỂM GHI CHÚ (HOTSPOT PINS) ==================== */}
      <AnimatePresence>
        {zoomModalStage && (
          <div 
            onClick={() => {
              setZoomModalStage(null);
              setActiveHotspotId(null);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-brown-dark/75 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-3 border-primary-200 flex flex-col max-h-[90vh] overflow-hidden my-auto"
            >
              {/* HEADER CỐ ĐỊNH TRÊN CÙNG */}
              <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-primary-100 flex items-start justify-between gap-4 bg-white z-10 shrink-0">
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs">
                      🔍 Kính lúp giải phẫu thực vật
                    </span>
                    <span className="text-xs font-bold text-brown/60">
                      {zoomModalStage.stage}
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-brown-dark">
                    {zoomModalStage.name} — Điểm Ghi Chú Sinh Học
                  </h2>
                  <p className="text-xs sm:text-sm text-brown/70 hidden sm:block">
                    Rê chuột hoặc chạm vào các <strong>chấm tròn số (1, 2, 3)</strong> trên ảnh để xem chú thích chi tiết.
                  </p>
                </div>

                {/* Nút đóng cố định */}
                <button
                  onClick={() => {
                    setZoomModalStage(null);
                    setActiveHotspotId(null);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-cream hover:bg-primary-100 text-brown hover:text-brown-dark transition-colors shadow-sm shrink-0 border border-primary-200 mt-1"
                  aria-label="Đóng phóng to"
                >
                  <X size={20} />
                </button>
              </div>

              {/* NỘI DUNG CUỘN BÊN TRONG */}
              <div className="overflow-y-auto custom-scrollbar px-6 sm:px-8 py-5 space-y-6 flex-1">
                {/* KHU VỰC ẢNH PHÓNG TO VỚI CÁC ĐIỂM HOTSPOT NHẤP NHÁY TRÊN ẢNH */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-primary-200 h-72 sm:h-96 md:h-[420px] bg-black/5 shadow-inner">
                  <img
                    src={zoomModalStage.image}
                    alt={zoomModalStage.name}
                    className="w-full h-full object-cover"
                  />

                  {/* CÁC ĐIỂM GHI CHÚ HOTSPOT PINS */}
                  {zoomModalStage.hotspots.map((hs, index) => {
                    const isSelected = activeHotspotId === hs.id;
                    return (
                      <div
                        key={hs.id}
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                      >
                        {/* Vòng lan tỏa xung quanh điểm ghim */}
                        <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></span>
                        
                        {/* Chấm tròn số thứ tự */}
                        <button
                          type="button"
                          onClick={() => setActiveHotspotId(isSelected ? null : hs.id)}
                          onMouseEnter={() => setActiveHotspotId(hs.id)}
                          className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full font-display font-extrabold text-xs sm:text-sm flex items-center justify-center border-2 border-white shadow-pop transition-transform duration-200 ${
                            isSelected
                              ? 'bg-leaf text-white scale-125 ring-4 ring-primary-300'
                              : 'bg-primary text-brown-dark hover:scale-110'
                          }`}
                        >
                          {index + 1}
                        </button>

                        {/* Tooltip bay ngay trên điểm ghi chú */}
                        {isSelected && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-white rounded-2xl shadow-pop border-2 border-leaf text-left z-30 animate-fadeIn pointer-events-none">
                            <h4 className="font-display font-extrabold text-sm text-leaf mb-0.5">
                              {index + 1}. {hs.title}
                            </h4>
                            <p className="text-xs text-brown/80 leading-relaxed">
                              {hs.desc}
                            </p>
                            {/* Mũi tên tam giác tooltip */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* DANH SÁCH CHI TIẾT CÁC ĐIỂM GHI CHÚ BÊN DƯỚI ĐỂ ĐỌC DỄ DÀNG */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {zoomModalStage.hotspots.map((hs, index) => {
                    const isSelected = activeHotspotId === hs.id;
                    return (
                      <div
                        key={hs.id}
                        onClick={() => setActiveHotspotId(hs.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-secondary-50 border-leaf shadow-sm scale-102 ring-2 ring-leaf/20'
                            : 'bg-cream border-primary-200 hover:border-primary-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-6 h-6 rounded-full font-display font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-leaf text-white' : 'bg-primary text-brown-dark'
                          }`}>
                            {index + 1}
                          </span>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-brown-dark">
                            {hs.title}
                          </h4>
                        </div>
                        <p className="text-xs text-brown/70 leading-relaxed">
                          {hs.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FOOTER CỐ ĐỊNH DƯỚI ĐÁY */}
              <div className="px-6 sm:px-8 py-3.5 bg-cream/95 backdrop-blur-sm border-t border-primary-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <Link
                  to="/recipes"
                  onClick={() => setZoomModalStage(null)}
                  className="btn-primary py-2.5 px-6 text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <UtensilsCrossed size={16} />
                  <span>Khám phá 50+ món ăn từ chuối</span>
                </Link>

                <button
                  onClick={() => {
                    setZoomModalStage(null);
                    setActiveHotspotId(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-primary-100 text-brown font-display font-bold text-xs sm:text-sm border border-primary-200 transition-colors"
                >
                  Đóng lại
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ==================== 4. GIỚI THIỆU DỰ ÁN ("FLEX" NHẸ VỚI ANIMATED COUNTERS) ==================== */}
      <section className="bg-gradient-to-b from-white via-cream/80 to-white py-16 border-y-2 border-primary-200">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
              ✨ Niềm tự hào nông sản Việt
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brown-dark">
              CHUỐI ƠI CÓ GÌ ĐẶC BIỆT?
            </h2>
            <p className="text-brown/70 text-base sm:text-lg">
              Một dự án được tạo dựng từ tình yêu bất tận với cây chuối quê hương, ứng dụng công nghệ hiện đại để đưa ẩm thực chuối lên một tầm cao mới.
            </p>
          </div>

          {/* Lưới 4 con số ấn tượng */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {PROJECT_STATISTICS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 text-center border-2 border-primary-200 shadow-card hover:shadow-banana transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="font-display font-extrabold text-base sm:text-lg text-brown mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-brown/60 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 3 Trụ cột cốt lõi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-banana space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary-100 text-leaf flex items-center justify-center text-2xl shadow-inner">
                🍳
              </div>
              <h3 className="font-display font-extrabold text-2xl text-leaf">
                Kho 50+ Công Thức Ba Miền
              </h3>
              <p className="text-brown/80 text-sm leading-relaxed">
                Tất tần tật món mặn, món ngọt, món chay từ chuối xiêm, chuối tiêu, chuối sáp, bắp chuối... được chuẩn hóa nguyên liệu và từng bước nấu chi tiết.
              </p>
              <Link to="/recipes" className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-leaf hover:underline">
                Khám phá kho món ăn <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card-banana space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-brown-dark flex items-center justify-center text-2xl shadow-inner">
                💬
              </div>
              <h3 className="font-display font-extrabold text-2xl text-brown-dark">
                Cộng Đồng Yêu Chuối
              </h3>
              <p className="text-brown/80 text-sm leading-relaxed">
                Nơi những tín đồ ẩm thực cùng nhau chia sẻ thành phẩm bữa cơm gia đình, thả tim, bình luận và rủ nhau trổ tài biến tấu những món chuối độc lạ.
              </p>
              <Link to="/community" className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-brown-dark hover:underline">
                Tham gia cộng đồng <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card-banana space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blush-light/30 text-blush-dark flex items-center justify-center text-2xl shadow-inner">
                🍌
              </div>
              <h3 className="font-display font-extrabold text-2xl text-blush-dark">
                Trợ Lý AI Chuối Độc Quyền
              </h3>
              <p className="text-brown/80 text-sm leading-relaxed">
                Chỉ cần tải ảnh quả chuối trong bếp, AI nhận diện ngay mức độ chín và gợi ý món ăn chuẩn xác nhất giúp bạn không bao giờ bỏ phí chuối thừa!
              </p>
              <Link to="/ai" className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-blush-dark hover:underline">
                Thử nghiệm AI ngay <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ==================== 5. PREVIEW: 3 MÓN ĂN NỔI BẬT ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs mb-2">
              👨‍🍳 Bếp nhà Chuối Ơi
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brown-dark">
              Món Chuối Nổi Bật Tuần Này
            </h2>
            <p className="text-brown/70 text-sm sm:text-base mt-1">
              Tuyển tập những công thức được yêu thích nhất bởi hàng ngàn đầu bếp gia đình
            </p>
          </div>
          <Link to="/recipes" className="btn-outline py-2.5 px-5 text-sm shrink-0">
            Xem tất cả 50+ món ăn
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-primary-200 shadow-card hover:shadow-pop hover:border-primary-400 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-leaf shadow-sm">
                      {recipe.bananaTypeName}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-brown-dark shadow-sm">
                      {recipe.categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-bold text-brown/60">
                    <span className="flex items-center gap-1">
                      <Clock size={15} className="text-leaf" />
                      {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={15} className="text-primary-600" />
                      {recipe.difficulty}
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
                <Link
                  to="/recipes"
                  className="w-full py-2.5 rounded-full bg-cream hover:bg-primary border border-primary-300 font-display font-bold text-sm text-brown text-center block transition-colors shadow-sm"
                >
                  Xem công thức chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================== 6. PREVIEW: 3 BÀI ĐĂNG CỘNG ĐỒNG ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs mb-2">
              💬 Chuyện bếp - Chuyện chuối
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brown-dark">
              Khoảnh Khắc Từ Cộng Đồng
            </h2>
            <p className="text-brown/70 text-sm sm:text-base mt-1">
              Lắng nghe và chiêm ngưỡng những tác phẩm ẩm thực do chính các thành viên chia sẻ
            </p>
          </div>
          <Link to="/community" className="btn-outline py-2.5 px-5 text-sm shrink-0">
            Ghé thăm cộng đồng
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl p-6 border-2 border-primary-200 shadow-card hover:shadow-banana transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-leaf">
                      {post.author.name}
                    </h4>
                    <span className="text-[11px] text-brown/50">
                      {post.createdAt} • {post.author.badge}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-brown/80 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                {post.image && (
                  <div className="h-44 rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={post.image}
                      alt="Hình ảnh bài đăng"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-primary-100 flex items-center justify-between text-xs text-brown/60 font-bold">
                <span className="flex items-center gap-1.5 text-red-500">
                  <Heart size={16} className="fill-red-500" />
                  {post.reactions.love + post.reactions.like + post.reactions.yummy} lượt thích
                </span>
                <span className="flex items-center gap-1.5 text-leaf">
                  <MessageCircle size={16} />
                  {post.comments.length} bình luận
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================== 7. BANNER CTA ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-4xl bg-gradient-to-r from-leaf-dark via-leaf to-secondary-500 p-8 sm:p-14 text-white overflow-hidden shadow-pop">
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-primary-400/20 blur-2xl"></div>

          <div className="relative z-10 max-w-2xl space-y-5 text-center sm:text-left">
            <span className="badge-tag bg-white/20 text-white border border-white/40 text-xs">
              🍌 Ngôi nhà chung của những người yêu chuối
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Sẵn Sàng Trở Thành Tín Đồ Ẩm Thực Chuối?
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Tạo tài khoản thành viên ngay hôm nay để đăng tải công thức yêu thích của bạn, nhận tư vấn độ chín chuối từ AI và tham gia giao lưu cùng 48.000+ bạn chuối trên khắp mọi miền!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link to="/register" className="btn-primary">
                <span>Đăng ký thành viên ngay</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-outline text-white border-white hover:bg-white/10">
                Tìm hiểu thêm về dự án
              </Link>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 bottom-6 w-56 h-56 animate-float">
            <img
              src="/logo.png"
              alt="Chuối Ơi Mascot"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
