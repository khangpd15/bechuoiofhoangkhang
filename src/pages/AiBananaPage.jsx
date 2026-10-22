import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot,
  BrainCircuit, 
  UploadCloud, 
  Camera, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  Lightbulb, 
  UtensilsCrossed,
  Info,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_AI_SAMPLES, MOCK_RECIPES } from '../data/mockData';
import { useToast } from '../context/ToastContext';

/**
 * Hàm phân tích ảnh chuối (Mô phỏng gọi API AI)
 * Dễ dàng tích hợp API Computer Vision thật sau này
 */
export const analyzeBanana = async (imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Giả lập phân tích ngẫu nhiên hoặc theo ảnh mẫu
      const sample = MOCK_AI_SAMPLES[Math.floor(Math.random() * MOCK_AI_SAMPLES.length)];
      resolve({
        success: true,
        data: sample,
      });
    }, 1800);
  });
};

const AiBananaPage = () => {
  const { success, error } = useToast();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('vegetarian'); // 'vegetarian' | 'savory' | 'sweet'

  // Xử lý kéo thả / chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        error('Vui lòng chọn một file ảnh định dạng PNG, JPG hoặc WEBP!');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Chọn ảnh mẫu có sẵn để demo nhanh
  const handleSelectSample = (sample) => {
    setSelectedImage(sample.thumbnail);
    setAnalysisResult(sample);
    success(`Đã chọn ảnh mẫu: ${sample.label}`);
  };

  // Bắt đầu phân tích AI
  const handleStartAnalysis = async () => {
    if (!selectedImage) {
      error('Vui lòng tải lên hoặc chọn một ảnh trái chuối cần phân tích!');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setAnalysisResult(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 250);

    const res = await analyzeBanana(selectedImage);
    clearInterval(interval);
    setAnalysisProgress(100);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(res.data);
      success('AI đã phân tích xong độ chín và hoàn tất đề xuất món ngon! 🍌');
    }, 400);
  };

  // Lấy danh sách các món đề xuất từ kết quả
  const recommendedDishes = analysisResult
    ? MOCK_RECIPES.filter((r) => analysisResult.recommendedDishIds.includes(r.id))
    : [];

  const tabDishes = recommendedDishes.filter((r) => {
    if (activeTab === 'vegetarian') return r.category === 'vegetarian';
    if (activeTab === 'savory') return r.category === 'savory';
    return r.category === 'sweet';
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-5xl space-y-12">
      
      {/* ==================== 1. HEADER AI BANANA ==================== */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-primary-300 shadow-sm">
          <Bot size={18} className="text-leaf" />
          <span className="font-display font-extrabold text-xs sm:text-sm text-leaf">
            Trí Tuệ Nhân Tạo CHUỐI ƠI
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brown-dark leading-tight">
          Quét Chuối Thông Minh, <br className="hidden sm:inline" />
          <span className="text-leaf">Biết Ngay Món Chuẩn Vị</span>
        </h1>

        <p className="text-brown/70 text-sm sm:text-base leading-relaxed">
          Tải lên hoặc chụp ảnh nải chuối trong gian bếp của bạn. AI Chuối Ơi sẽ nhận diện chính xác độ chín, hàm lượng đường tự nhiên và đề xuất ngay những món ăn hấp dẫn nhất!
        </p>
      </div>


      {/* ==================== 2. KHU VỰC TẢI ẢNH & SCAN AI ==================== */}
      <div className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-3 border-primary-200 shadow-pop space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* CỘT TẢI ẢNH (KÉO THẢ) */}
          <div className="lg:col-span-7">
            {selectedImage ? (
              <div className="relative rounded-3xl overflow-hidden border-3 border-primary-300 h-80 sm:h-96 bg-cream shadow-inner flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Chuối cần phân tích"
                  className="w-full h-full object-cover"
                />

                {/* Nút xóa ảnh để chọn lại */}
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysisResult(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-brown/70 text-white hover:bg-brown shadow-md"
                  title="Chọn ảnh khác"
                >
                  <X size={18} />
                </button>

                {/* Hiệu ứng quét tia Laser AI khi đang phân tích */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-leaf/10 backdrop-blur-[1px] flex flex-col justify-center items-center overflow-hidden">
                    <motion.div
                      className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#F4C542]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-pop text-center space-y-2 border border-primary-300">
                      <div className="w-10 h-10 mx-auto animate-pulse text-leaf">
                        <BrainCircuit size={36} />
                      </div>
                      <p className="font-display font-extrabold text-sm text-leaf">
                        AI đang phân tích từng đốm vỏ... {analysisProgress}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <label className="border-3 border-dashed border-primary-300 hover:border-leaf rounded-3xl h-80 sm:h-96 flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-cream/50 hover:bg-cream transition-all group">
                <div className="w-20 h-20 rounded-full bg-primary-100 group-hover:scale-110 text-leaf flex items-center justify-center mb-4 transition-transform shadow-sm">
                  <UploadCloud size={38} />
                </div>
                <h3 className="font-display font-extrabold text-lg text-brown-dark mb-1">
                  Kéo thả hoặc tải ảnh trái chuối lên
                </h3>
                <p className="text-xs text-brown/60 max-w-xs mb-4">
                  Hỗ trợ định dạng PNG, JPG, WEBP chụp rõ nét quả chuối hoặc nải chuối
                </p>
                <span className="btn-primary py-2 px-5 text-xs shadow-sm">
                  <Camera size={16} /> Chọn ảnh từ máy
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* CỘT NÚT PHÂN TÍCH & ẢNH MẪU SẴN */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-xl text-brown-dark mb-2">
                1. Bắt Đầu Phân Tích
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed mb-4">
                Sau khi tải ảnh xong, bấm nút bên dưới để mô hình học máy đối chiếu với 15.000+ mẫu chuối ba miền.
              </p>

              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={isAnalyzing || !selectedImage}
                className="btn-primary w-full py-3.5 text-base shadow-banana disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Đang nhận diện độ chín...</span>
                  </>
                ) : (
                  <>
                    <Bot size={20} />
                    <span>Phân Tích Độ Chín Bằng AI</span>
                  </>
                )}
              </button>
            </div>

            <div className="h-px bg-primary-100"></div>

            {/* Thử nhanh với 3 ảnh mẫu */}
            <div>
              <h4 className="font-display font-bold text-sm text-brown mb-2 flex items-center gap-1.5">
                <span>💡</span> Chưa có sẵn ảnh? Thử ngay 3 mẫu sau:
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {MOCK_AI_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-2xl border-2 border-primary-200 hover:border-leaf bg-white hover:bg-cream transition-all text-center flex flex-col items-center group"
                  >
                    <div className="w-full h-16 rounded-xl overflow-hidden mb-1.5 shadow-sm">
                      <img
                        src={sample.thumbnail}
                        alt={sample.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-brown leading-tight">
                      {sample.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* ==================== 3. KẾT QUẢ PHÂN TÍCH AI HOÀN CHỈNH ==================== */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-3 border-leaf shadow-pop space-y-8"
        >
          {/* Header kết quả */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-primary-100">
            <div>
              <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs mb-2">
                ✅ Kết quả kiểm định AI thành công
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brown-dark">
                Tình Trạng: <span className="text-leaf">{analysisResult.ripeness}</span>
              </h2>
            </div>
            
            {/* Điểm tin cậy */}
            <div className="bg-cream border-2 border-primary-300 px-5 py-2.5 rounded-2xl text-right">
              <span className="text-[11px] font-bold text-brown/60 block">Độ tin cậy AI</span>
              <span className="font-display font-extrabold text-2xl text-leaf">
                {analysisResult.confidence}%
              </span>
            </div>
          </div>

          {/* Thanh đo mức độ chín */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-brown">
              <span>Độ Chín Quả Chuối</span>
              <span>{analysisResult.ripenessLevel}% chín</span>
            </div>
            <div className="h-4 bg-cream-200 rounded-full overflow-hidden p-0.5 border border-primary-300">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisResult.ripenessLevel}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-secondary-400 via-primary-500 to-amber-500 shadow-sm"
              />
            </div>
          </div>

          {/* ĐẶC TÍNH VỊ GIÁC & CÁCH BẢO QUẢN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-3xl bg-secondary-50 border border-secondary-200 space-y-2">
              <h3 className="font-display font-extrabold text-base text-leaf flex items-center gap-2">
                <Bot size={18} />
                Đặc Tính Vị Giác & Dinh Dưỡng:
              </h3>
              <p className="text-xs sm:text-sm text-brown/80 leading-relaxed">
                {analysisResult.tasteProfile}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-primary-50 border border-primary-200 space-y-2">
              <h3 className="font-display font-extrabold text-base text-brown-dark flex items-center gap-2">
                <Lightbulb size={18} />
                Cách Bảo Quản Chuẩn Nhất:
              </h3>
              <p className="text-xs sm:text-sm text-brown/80 leading-relaxed">
                {analysisResult.storageAdvice}
              </p>
            </div>
          </div>

          {/* ==================== ĐỀ XUẤT MÓN THEO 3 NHÓM TAB ==================== */}
          <div className="space-y-6 pt-4 border-t-2 border-primary-100">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-brown-dark mb-1">
                Gợi Ý Món Ngon Phù Hợp Cho Quả Chuối Này
              </h3>
              <p className="text-xs sm:text-sm text-brown/70">
                Chọn danh mục bạn muốn chế biến để xem ngay công thức tương ứng:
              </p>
            </div>

            {/* 3 Tab: Món chay / Món mặn / Món ngọt */}
            <div className="flex gap-2 border-b border-primary-200 pb-2">
              {[
                { id: 'vegetarian', label: '🥗 Món Chay / Thanh Đạm' },
                { id: 'savory', label: '🍲 Món Mặn Ăn Cơm' },
                { id: 'sweet', label: '🍰 Món Ngọt & Tráng Miệng' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-leaf text-white shadow-md'
                      : 'bg-cream text-brown/70 hover:bg-primary-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Lưới card món gợi ý */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tabDishes.length > 0 ? (
                tabDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-cream/60 rounded-3xl overflow-hidden border-2 border-primary-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-40 overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-display font-bold text-base text-leaf">
                          {dish.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-brown/60">
                          <span>⏱️ {dish.cookTime}</span>
                          <span>🔥 {dish.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <Link
                        to="/recipes"
                        className="btn-primary w-full py-2 text-xs"
                      >
                        Xem công thức chi tiết
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-6 text-center text-xs text-brown/60">
                  Chưa có món phù hợp trong tab này. Bạn hãy thử chọn các tab khác ở trên nhé!
                </div>
              )}
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
};

export default AiBananaPage;
