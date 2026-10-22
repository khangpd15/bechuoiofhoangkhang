import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Compass, 
  Award, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Code2, 
  Rocket, 
  Facebook, 
  Github, 
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TEAM_MEMBERS } from '../data/mockData';

const AboutPage = () => {
  // Lộ trình phát triển dự án
  const milestones = [
    {
      year: 'Quý 3/2023',
      title: 'Ý Tưởng Bắt Nguồn Từ Gian Bếp Quê',
      desc: 'Nhận thấy buồng chuối chín ở quê thường không kịp ăn hết và bị bỏ phí, Hoàng Khang cùng đội ngũ nung nấu ý tưởng tạo ra một siêu ứng dụng kết nối ẩm thực chuối toàn diện.',
    },
    {
      year: 'Quý 4/2023',
      title: 'Chuẩn Hóa 250+ Công Thức Ba Miền',
      desc: 'Hợp tác cùng các nghệ nhân ẩm thực dân gian để sưu tầm và số hóa công thức từ chuối tây, chuối tiêu, chuối sáp, bắp chuối... đảm bảo chuẩn vị và dễ làm tại gia.',
    },
    {
      year: 'Quý 1/2024',
      title: 'Huấn Luyện Mô Hình AI Nhận Diện Độ Chín',
      desc: 'Thu thập hơn 15.000 hình ảnh các loại chuối Việt Nam để huấn luyện mô hình Computer Vision đạt độ chính xác trên 98.6% trong việc phân loại độ chín và độ ngọt.',
    },
    {
      year: 'Hôm Nay',
      title: 'Ra Mắt Hệ Sinh Thái CHUỐI ƠI',
      desc: 'Chính thức kết nối cộng đồng hàng chục ngàn người yêu ẩm thực Việt, mang đến giải pháp nấu ăn thông minh và nâng tầm giá trị nông sản nước nhà.',
    },
  ];

  // Danh sách công nghệ sử dụng
  const techStack = [
    { name: 'React 18', role: 'Thư viện UI cốt lõi mượt mà, tối ưu re-render' },
    { name: 'Vite', role: 'Công cụ đóng gói siêu tốc độ thế hệ mới' },
    { name: 'Tailwind CSS', role: 'Hệ thống thiết kế chuẩn UI/UX, bảng màu tự nhiên' },
    { name: 'Framer Motion', role: 'Chuyển động linh hoạt, vi hoạt hình sống động' },
    { name: 'React Router v6', role: 'Định tuyến linh hoạt, bảo vệ quyền truy cập' },
    { name: 'AI Computer Vision', role: 'Nhận diện thị giác máy tính và phân loại độ chín' },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 py-8 lg:py-12">
      
      {/* ==================== 1. HERO GIỚI THIỆU ==================== */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-primary-300 shadow-sm">
          <Award size={16} className="text-primary-500" />
          <span className="font-display font-extrabold text-xs sm:text-sm text-leaf">
            Về Ngôi Nhà CHUỐI ƠI
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brown-dark leading-tight">
          Tôn Vinh Nông Sản Việt <br />
          Bằng Cả <span className="text-leaf">Tình Yêu & Công Nghệ</span>
        </h1>

        <p className="text-brown/80 text-base sm:text-xl leading-relaxed">
          Chúng tôi tin rằng cây chuối Việt Nam không chỉ là một loài cây ăn quả quen thuộc bên hiên nhà, mà là một kho báu ẩm thực trù phú nuôi dưỡng bao thế hệ người con đất Việt.
        </p>

        <div className="pt-2 flex justify-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/70 p-4 border-4 border-primary-300 shadow-pop animate-float flex items-center justify-center">
            <img src="/logo.png" alt="Linh vật Chuối Ơi" className="w-full h-full object-contain" />
          </div>
        </div>
      </section>


      {/* ==================== 2. CÂU CHUYỆN & SỨ MỆNH ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Card Câu chuyện & Vấn đề giải quyết */}
          <div className="bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 border-3 border-primary-200 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-leaf flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-brown-dark">
                Câu Chuyện Dự Án
              </h2>
              <p className="text-brown/80 text-sm sm:text-base leading-relaxed">
                Tại Việt Nam, chuối có mặt ở khắp mọi vùng miền — từ chuối ngự tiến vua Nam Định, chuối mốc miền Trung đến chuối sứ, chuối cau ngọt lịm đất phù sa phương Nam. Thế nhưng, bao năm qua có một nghịch lý: <strong>rất nhiều nải chuối chín ăn không kịp đành bỏ phí</strong>, trong khi chuối xanh lại ít ai biết cách chế biến ra món ngon ngoài các bữa tiệc cỗ.
              </p>
              <p className="text-brown/80 text-sm sm:text-base leading-relaxed">
                <strong>CHUỐI ƠI</strong> ra đời với sứ mệnh xóa bỏ sự lãng phí đó! Bằng việc kết hợp kiến thức ẩm thực dân gian và trí tuệ nhân tạo, chúng tôi trao quyền cho bất kỳ ai biến quả chuối trong gian bếp thành những món ngon đỉnh cao.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-primary-200 text-xs sm:text-sm font-bold text-brown flex items-center gap-2">
              <span className="text-xl">🍌</span>
              <span>"Chuối tây chuối ta, món gì cũng có" — Tinh hoa ẩm thực không phân biệt loại chuối.</span>
            </div>
          </div>

          {/* Card Sứ mệnh & Tầm nhìn */}
          <div className="bg-gradient-to-br from-leaf via-leaf-dark to-brown-dark rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-white shadow-pop flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                <Target size={24} />
              </div>

              <div>
                <span className="text-xs font-bold text-secondary-300 uppercase tracking-wider block mb-1">
                  Mục tiêu tối thượng
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                  Sứ Mệnh Của Chúng Tôi
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                  Trở thành người bạn đồng hành tin cậy trong gian bếp của mọi gia đình Việt, thúc đẩy lối sống xanh bền vững, giảm thiểu rác thải thực phẩm và truyền cảm hứng tự hào nông sản nước nhà.
                </p>
              </div>

              <div className="h-px bg-white/20"></div>

              <div>
                <span className="text-xs font-bold text-secondary-300 uppercase tracking-wider block mb-1">
                  Định hướng tương lai
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                  Tầm Nhìn 2030
                </h3>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                  Phát triển CHUỐI ƠI trở thành siêu nền tảng số #1 Đông Nam Á về dữ liệu sinh học, ẩm thực và công nghệ nông nghiệp xoay quanh hệ sinh thái cây chuối.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-secondary-200">
              <ShieldCheck size={16} />
              <span>Cam kết 100% phi lợi nhuận vì cộng đồng yêu ẩm thực</span>
            </div>
          </div>

        </div>
      </section>


      {/* ==================== 3. DANH SÁCH 5 THÀNH VIÊN SÁNG LẬP ==================== */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
            👥 Những con người tâm huyết
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brown-dark">
            ĐỘI NGŨ SÁNG LẬP
          </h2>
          <p className="text-brown/70 text-sm sm:text-base">
            Gặp gỡ 5 thành viên trẻ trung, đam mê công nghệ và yêu văn hóa ẩm thực Việt đứng sau thành công của Chuối Ơi.
          </p>
        </div>

        {/* Lưới 5 thành viên */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {MOCK_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border-2 border-primary-200 shadow-card hover:shadow-pop hover:border-primary-400 transition-all duration-300 flex flex-col justify-between items-center text-center group"
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* Ảnh đại diện */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-300 shadow-inner group-hover:scale-105 transition-transform">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-secondary-100 text-leaf">
                  {member.highlightBadge}
                </span>

                <div>
                  <h4 className="font-display font-extrabold text-lg text-brown-dark leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-xs text-leaf font-bold mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Câu quote */}
                <p className="text-xs text-brown/70 italic leading-relaxed">
                  "{member.quote}"
                </p>
              </div>

              {/* Mạng xã hội */}
              <div className="mt-5 pt-3 border-t border-primary-100 w-full flex justify-center gap-3 text-brown/60">
                <a href={member.social.facebook || '#'} className="hover:text-leaf transition-colors">
                  <Facebook size={16} />
                </a>
                <a href={member.social.github || '#'} className="hover:text-leaf transition-colors">
                  <Github size={16} />
                </a>
                <a href={member.social.linkedin || '#'} className="hover:text-leaf transition-colors">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ==================== 4. CÔNG NGHỆ & CỘT MỐC PHÁT TRIỂN ==================== */}
      <section className="bg-white py-16 border-y-2 border-primary-200">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Cột trái: Công nghệ sử dụng */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
                  ⚡ Công nghệ tiên tiến
                </span>
                <h3 className="font-display font-extrabold text-3xl text-brown-dark">
                  Kiến Trúc Công Nghệ
                </h3>
                <p className="text-brown/70 text-sm leading-relaxed">
                  Được xây dựng trên nền tảng Frontend hiện đại bậc nhất để mang lại tốc độ phản hồi tức thì và trải nghiệm mượt mà trên mọi thiết bị.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-cream border border-primary-200 shadow-sm space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-leaf" />
                      <strong className="font-display font-bold text-sm text-brown">
                        {tech.name}
                      </strong>
                    </div>
                    <p className="text-[11px] text-brown/60 leading-snug">
                      {tech.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Cột mốc phát triển (Roadmap Timeline) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="badge-tag bg-secondary-100 text-leaf border border-secondary-300 text-xs">
                  🚀 Hành trình vươn xa
                </span>
                <h3 className="font-display font-extrabold text-3xl text-brown-dark">
                  Cột Mốc Phát Triển
                </h3>
              </div>

              <div className="relative border-l-3 border-primary-300 ml-4 pl-6 space-y-8">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    {/* Nút mốc */}
                    <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-primary-400 border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>

                    <span className="text-xs font-bold uppercase tracking-wider text-leaf block mb-1">
                      {m.year}
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-brown mb-1">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-brown/75 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ==================== 5. CTA CUỐI TRANG ==================== */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-2xl space-y-5">
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-leaf">
          Hãy Cùng Chúng Tôi Lan Tỏa Tình Yêu Chuối!
        </h3>
        <p className="text-brown/70 text-base leading-relaxed">
          Đăng ký tài khoản để đóng góp công thức mới, kết nối bạn bè hoặc trải nghiệm trí tuệ nhân tạo quét chuối ngay hôm nay.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/recipes" className="btn-primary">
            Khám phá 12+ Món Ăn
            <ArrowRight size={18} />
          </Link>
          <Link to="/community" className="btn-secondary">
            Tham gia Cộng Đồng
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
