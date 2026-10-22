import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag, 
  Image as ImageIcon, 
  Send, 
  Flame, 
  CornerDownRight, 
  X, 
  Smile, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { MOCK_COMMUNITY_POSTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Danh sách 6 cảm xúc thân thiện của Chuối Ơi
const REACTIONS = [
  { key: 'love', emoji: '❤️', label: 'Yêu thích', color: 'text-red-500' },
  { key: 'like', emoji: '👍', label: 'Thích', color: 'text-blue-500' },
  { key: 'yummy', emoji: '🤤', label: 'Thèm quá', color: 'text-amber-500' },
  { key: 'wow', emoji: '😮', label: 'Ngạc nhiên', color: 'text-yellow-500' },
  { key: 'haha', emoji: '😂', label: 'Haha', color: 'text-yellow-500' },
  { key: 'sad', emoji: '😢', label: 'Buồn', color: 'text-gray-500' },
];

const CommunityPage = () => {
  const { user, isAuthenticated, requireAuth } = useAuth();
  const { success, error } = useToast();

  const [posts, setPosts] = useState(MOCK_COMMUNITY_POSTS);
  const [filterMode, setFilterMode] = useState('newest'); // 'newest' | 'popular'

  // State form đăng bài mới
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostTag, setNewPostTag] = useState('Chuối chín');
  const [isPosting, setIsPosting] = useState(false);

  // State hiển thị popup cảm xúc khi hover vào nút like của bài nào
  const [activeReactionPostId, setActiveReactionPostId] = useState(null);

  // State mở rộng ô bình luận cho từng bài viết: { [postId]: boolean }
  const [expandedComments, setExpandedComments] = useState({ 'post-101': true });
  // State text đang nhập bình luận: { [postId]: string }
  const [commentInputs, setCommentInputs] = useState({});
  // State id bình luận đang được reply: { [postId]: string | null }
  const [replyingToComment, setReplyingToComment] = useState({});

  // State Modal Báo cáo bài viết
  const [reportModalPost, setReportModalPost] = useState(null);
  const [reportReason, setReportReason] = useState('spam');
  const [reportNote, setReportNote] = useState('');

  // Khóa cuộn khi mở modal báo cáo
  useEffect(() => {
    if (reportModalPost) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setReportModalPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reportModalPost]);

  // Xử lý chọn ảnh xem trước khi đăng bài
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Đăng bài viết mới
  const handleCreatePost = (e) => {
    e.preventDefault();
    requireAuth(() => {
      if (!newPostContent.trim()) {
        error('Vui lòng chia sẻ đôi lời về món chuối của bạn nhé!');
        return;
      }

      setIsPosting(true);
      setTimeout(() => {
        const newPost = {
          id: `post-${Date.now()}`,
          author: {
            name: user?.fullName || 'Thành viên Chuối Ơi',
            avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
            badge: 'Thành viên mới',
            joinDate: 'Mới gia nhập',
          },
          createdAt: 'Vừa xong',
          content: newPostContent.trim(),
          image: newPostImage || null,
          tags: [newPostTag, 'Gia đình Chuối Ơi'],
          reactions: { like: 1, love: 1, yummy: 0, haha: 0, wow: 0, sad: 0 },
          userReaction: 'love',
          comments: [],
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setNewPostImage(null);
        setIsPosting(false);

        // Bắn pháo giấy confetti chúc mừng
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F4C542', '#A8D96C', '#3F8A3A', '#FF8E72'],
        });

        success('Đăng bài thành công! Cảm ơn bạn đã sẻ chia cùng hội mê chuối 🍌');
      }, 600);
    }, 'Vui lòng đăng nhập để đăng bài chia sẻ món ngon cùng cộng đồng nhé!');
  };

  // Thả cảm xúc
  const handleReact = (postId, reactionKey) => {
    requireAuth(() => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const currentReaction = post.userReaction;
            const newReactions = { ...post.reactions };

            if (currentReaction === reactionKey) {
              // Bỏ cảm xúc
              newReactions[reactionKey] = Math.max(0, newReactions[reactionKey] - 1);
              return { ...post, userReaction: null, reactions: newReactions };
            } else {
              // Giảm cảm xúc cũ nếu có
              if (currentReaction) {
                newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
              }
              // Tăng cảm xúc mới
              newReactions[reactionKey] = (newReactions[reactionKey] || 0) + 1;
              return { ...post, userReaction: reactionKey, reactions: newReactions };
            }
          }
          return post;
        })
      );
      setActiveReactionPostId(null);
    }, 'Vui lòng đăng nhập để thả cảm xúc cho bài viết của bạn bè nhé!');
  };

  // Gửi bình luận
  const handleAddComment = (postId) => {
    requireAuth(() => {
      const text = commentInputs[postId]?.trim();
      if (!text) return;

      const replyTargetId = replyingToComment[postId];

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            // Nếu là trả lời bình luận (nested reply)
            if (replyTargetId) {
              const updatedComments = post.comments.map((c) => {
                if (c.id === replyTargetId) {
                  return {
                    ...c,
                    replies: [
                      ...(c.replies || []),
                      {
                        id: `r_${Date.now()}`,
                        author: {
                          name: user?.fullName || 'Bạn chuối',
                          avatar: user?.avatar,
                        },
                        createdAt: 'Vừa xong',
                        content: text,
                      },
                    ],
                  };
                }
                return c;
              });
              return { ...post, comments: updatedComments };
            }

            // Bình luận mới cấp 1
            const newComment = {
              id: `c_${Date.now()}`,
              author: {
                name: user?.fullName || 'Bạn chuối',
                avatar: user?.avatar,
              },
              createdAt: 'Vừa xong',
              content: text,
              replies: [],
            };
            return { ...post, comments: [...post.comments, newComment] };
          }
          return post;
        })
      );

      setCommentInputs({ ...commentInputs, [postId]: '' });
      setReplyingToComment({ ...replyingToComment, [postId]: null });
      success('Đã gửi bình luận!');
    }, 'Vui lòng đăng nhập để bình luận và giao lưu cùng mọi người!');
  };

  // Chia sẻ bài viết
  const handleSharePost = (post) => {
    requireAuth(() => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        success(`Đã sao chép liên kết bài viết của ${post.author.name}!`);
      }
    }, 'Vui lòng đăng nhập để chia sẻ bài viết này!');
  };

  // Mở modal báo cáo
  const handleOpenReport = (post) => {
    requireAuth(() => {
      setReportModalPost(post);
      setReportReason('spam');
      setReportNote('');
    }, 'Vui lòng đăng nhập để gửi báo cáo bài viết vi phạm!');
  };

  // Gửi báo cáo bài viết
  const handleSubmitReport = (e) => {
    e.preventDefault();
    success('Cảm ơn bạn! Ban quản trị Chuối Ơi đã tiếp nhận báo cáo và sẽ kiểm duyệt sớm nhất.');
    setReportModalPost(null);
  };

  // Lọc bài viết
  const displayedPosts = [...posts].sort((a, b) => {
    if (filterMode === 'popular') {
      const scoreA = Object.values(a.reactions).reduce((acc, v) => acc + v, 0) + a.comments.length * 2;
      const scoreB = Object.values(b.reactions).reduce((acc, v) => acc + v, 0) + b.comments.length * 2;
      return scoreB - scoreA;
    }
    return 0; // newest as is
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 max-w-4xl space-y-8">

      {/* Header Cộng đồng */}
      <div className="text-center space-y-3">
        <span className="badge-tag bg-primary-100 text-brown border border-primary-300 text-xs">
          🍌 Góc sẻ chia ẩm thực
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brown-dark">
          Cộng Đồng Yêu Chuối
        </h1>
        <p className="text-brown/70 text-sm sm:text-base max-w-xl mx-auto">
          Nơi hội tụ những tâm hồn mê chuối! Khoe mâm cơm nhà bạn, học hỏi bí quyết chế biến và cùng nhau lan tỏa niềm vui ẩm thực.
        </p>
      </div>


      {/* FORM ĐĂNG BÀI ("BẠN ĐANG ĂN MÓN CHUỐI GÌ?") */}
      <div className="bg-white rounded-3xl p-6 border-3 border-primary-200 shadow-pop">
        <div className="flex items-start gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
            alt="Avatar"
            className="w-11 h-11 rounded-full object-cover border-2 border-primary-400 shrink-0"
          />
          <div className="flex-1 space-y-3">
            <textarea
              rows={3}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Bạn đang thưởng thức món chuối gì hôm nay? Chia sẻ bí quyết với cả nhà nhé..."
              className="w-full p-3.5 rounded-2xl bg-cream border-2 border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-brown text-sm sm:text-base resize-none transition-all"
            />

            {/* Xem trước ảnh tải lên nhỏ gọn, thẩm mỹ */}
            {newPostImage && (
              <div className="relative inline-block rounded-2xl overflow-hidden border-2 border-primary-300 shadow-sm max-w-xs group bg-cream">
                <img 
                  src={newPostImage} 
                  alt="Xem trước ảnh món" 
                  className="w-48 sm:w-56 h-32 sm:h-36 object-cover" 
                />
                <button
                  type="button"
                  onClick={() => setNewPostImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-brown-dark/75 hover:bg-red-500 text-white shadow-md transition-colors"
                  title="Xóa ảnh này"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent py-1 px-2.5 text-[11px] text-white font-bold flex items-center justify-between">
                  <span>Ảnh đính kèm</span>
                </div>
              </div>
            )}

            {/* Thanh công cụ đính kèm & Chọn Thẻ */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream hover:bg-primary-100 text-xs font-bold text-leaf border border-primary-200 transition-colors">
                  <ImageIcon size={16} />
                  <span>Thêm ảnh món</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Chọn tag món chuối */}
                <select
                  value={newPostTag}
                  onChange={(e) => setNewPostTag(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-cream text-xs font-bold text-brown border border-primary-200 focus:outline-none focus:border-leaf"
                >
                  <option value="Chuối chín">🍌 Chuối chín</option>
                  <option value="Chuối sống">🌿 Chuối sống</option>
                  <option value="Món ngọt">🍰 Món ngọt</option>
                  <option value="Món mặn">🍲 Món mặn</option>
                  <option value="Ăn vặt">🍟 Ăn vặt</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleCreatePost}
                disabled={isPosting}
                className="btn-primary py-2 px-6 text-sm"
              >
                {isPosting ? 'Đang đăng...' : 'Đăng Bài Ngay'}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* THANH LỌC BÀI VIẾT (MỚI NHẤT / NỔI BẬT) */}
      <div className="flex items-center justify-between px-2">
        <h3 className="font-display font-extrabold text-xl text-brown-dark flex items-center gap-2">
          <Flame size={18} className="text-secondary-500" />
          Bảng Tin Hoạt Động
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterMode('newest')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterMode === 'newest'
                ? 'bg-primary text-brown-dark shadow-sm'
                : 'bg-white text-brown/70 hover:bg-cream border border-primary-200'
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => setFilterMode('popular')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              filterMode === 'popular'
                ? 'bg-leaf text-white shadow-sm'
                : 'bg-white text-brown/70 hover:bg-cream border border-primary-200'
            }`}
          >
            <TrendingUp size={13} />
            Nổi bật nhất
          </button>
        </div>
      </div>


      {/* DANH SÁCH BÀI VIẾT FEED */}
      <div className="space-y-6">
        {displayedPosts.map((post) => {
          const totalReactions = Object.values(post.reactions).reduce((sum, v) => sum + v, 0);
          const userCurrentReaction = REACTIONS.find((r) => r.key === post.userReaction);
          const isCommentsOpen = !!expandedComments[post.id];

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-primary-200 shadow-card hover:shadow-banana/50 transition-shadow space-y-4"
            >
              {/* Header tác giả bài đăng */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-400"
                  />
                  <div>
                    <h4 className="font-display font-extrabold text-base text-leaf leading-tight">
                      {post.author.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-brown/50 font-semibold mt-0.5">
                      <span>{post.createdAt}</span>
                      <span>•</span>
                      <span className="text-primary-600 font-bold">{post.author.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Nút báo cáo */}
                <button
                  onClick={() => handleOpenReport(post)}
                  className="p-2 text-brown/40 hover:text-red-500 rounded-full hover:bg-cream transition-colors"
                  title="Báo cáo bài viết"
                >
                  <Flag size={16} />
                </button>
              </div>

              {/* Thẻ món */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="badge-tag bg-cream text-leaf border border-primary-200 text-[11px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Nội dung bài viết */}
              <p className="text-sm sm:text-base text-brown/85 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Ảnh bài viết gọn gàng, vừa mắt */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden max-h-72 sm:max-h-80 md:max-h-84 shadow-sm border border-primary-150 bg-cream/40 flex items-center justify-center">
                  <img
                    src={post.image}
                    alt="Ảnh bài đăng"
                    className="w-full h-full max-h-72 sm:max-h-80 md:max-h-84 object-cover hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
              )}

              {/* Thống kê cảm xúc & bình luận */}
              <div className="flex items-center justify-between text-xs font-bold text-brown/60 pt-2 pb-1 border-b border-primary-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">❤️🤤👍</span>
                  <span>{totalReactions} lượt cảm xúc</span>
                </div>
                <span>{post.comments.length} bình luận</span>
              </div>

              {/* Thanh nút bấm tương tác (Like, Comment, Share) */}
              <div className="relative flex items-center justify-between pt-1">
                
                {/* Popup chọn 6 cảm xúc khi hover/click */}
                {activeReactionPostId === post.id && (
                  <div className="absolute -top-12 left-0 bg-white rounded-full p-1.5 shadow-pop border-2 border-primary-300 flex items-center gap-1.5 z-20 animate-fadeIn">
                    {REACTIONS.map((re) => (
                      <button
                        key={re.key}
                        onClick={() => handleReact(post.id, re.key)}
                        className="w-8 h-8 rounded-full hover:scale-125 transition-transform flex items-center justify-center text-lg hover:bg-cream"
                        title={re.label}
                      >
                        {re.emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* Nút Thả cảm xúc */}
                <button
                  onClick={() => {
                    if (activeReactionPostId === post.id) {
                      setActiveReactionPostId(null);
                    } else {
                      setActiveReactionPostId(post.id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-display font-bold text-xs sm:text-sm transition-colors ${
                    userCurrentReaction
                      ? `${userCurrentReaction.color} bg-cream`
                      : 'text-brown/70 hover:bg-cream'
                  }`}
                >
                  <span className="text-lg">
                    {userCurrentReaction ? userCurrentReaction.emoji : '❤️'}
                  </span>
                  <span>{userCurrentReaction ? userCurrentReaction.label : 'Thả tim'}</span>
                </button>

                {/* Nút Bình luận */}
                <button
                  onClick={() =>
                    setExpandedComments({
                      ...expandedComments,
                      [post.id]: !isCommentsOpen,
                    })
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-display font-bold text-xs sm:text-sm text-brown/70 hover:bg-cream transition-colors"
                >
                  <MessageCircle size={18} className="text-leaf" />
                  <span>Bình luận</span>
                </button>

                {/* Nút Chia sẻ */}
                <button
                  onClick={() => handleSharePost(post)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-display font-bold text-xs sm:text-sm text-brown/70 hover:bg-cream transition-colors"
                >
                  <Share2 size={18} className="text-primary-600" />
                  <span>Chia sẻ</span>
                </button>

              </div>

              {/* KHU VỰC BÌNH LUẬN */}
              {isCommentsOpen && (
                <div className="pt-4 border-t border-primary-100 space-y-4">
                  {/* Danh sách bình luận */}
                  <div className="space-y-3">
                    {post.comments.map((cm) => (
                      <div key={cm.id} className="space-y-2">
                        <div className="flex items-start gap-2.5">
                          <img
                            src={cm.author.avatar}
                            alt={cm.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-primary-300 shrink-0"
                          />
                          <div className="bg-cream rounded-2xl p-3 flex-1 text-xs sm:text-sm">
                            <span className="font-display font-bold text-leaf block leading-tight">
                              {cm.author.name}
                            </span>
                            <p className="text-brown/85 mt-1">{cm.content}</p>
                            <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-brown/50">
                              <span>{cm.createdAt}</span>
                              <button
                                onClick={() => {
                                  setReplyingToComment({
                                    ...replyingToComment,
                                    [post.id]: cm.id,
                                  });
                                }}
                                className="text-leaf hover:underline"
                              >
                                Trả lời
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Danh sách câu trả lời con (Nested replies) */}
                        {cm.replies?.map((rp) => (
                          <div key={rp.id} className="ml-10 flex items-start gap-2">
                            <CornerDownRight size={14} className="text-brown/40 mt-2 shrink-0" />
                            <img
                              src={rp.author.avatar}
                              alt={rp.author.name}
                              className="w-7 h-7 rounded-full object-cover border border-primary-300 shrink-0"
                            />
                            <div className="bg-primary-50 rounded-2xl p-2.5 flex-1 text-xs">
                              <span className="font-display font-bold text-leaf block">
                                {rp.author.name}
                              </span>
                              <p className="text-brown/85 mt-0.5">{rp.content}</p>
                              <span className="text-[10px] text-brown/40 font-semibold block mt-1">
                                {rp.createdAt}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Form nhập bình luận */}
                  <div className="pt-2">
                    {replyingToComment[post.id] && (
                      <div className="flex items-center justify-between text-xs text-leaf font-bold mb-1.5 px-2">
                        <span>Đang trả lời bình luận...</span>
                        <button
                          onClick={() =>
                            setReplyingToComment({
                              ...replyingToComment,
                              [post.id]: null,
                            })
                          }
                          className="text-brown/50 hover:text-brown"
                        >
                          Hủy trả lời
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({
                            ...commentInputs,
                            [post.id]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        placeholder="Viết cảm nghĩ của bạn về món này..."
                        className="flex-1 px-4 py-2.5 rounded-full bg-cream border border-primary-200 focus:border-leaf focus:bg-white focus:outline-none text-xs sm:text-sm text-brown"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="p-2.5 rounded-full bg-primary text-brown-dark hover:bg-primary-600 transition-colors shadow-sm"
                        aria-label="Gửi bình luận"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>


      {/* MODAL BÁO CÁO BÀI VIẾT VI PHẠM */}
      <AnimatePresence>
        {reportModalPost && (
          <div 
            onClick={() => setReportModalPost(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brown-dark/75 backdrop-blur-md"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-3 border-red-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-xl text-red-600 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Báo Cáo Bài Viết
                </h3>
                <button
                  onClick={() => setReportModalPost(null)}
                  className="p-1 rounded-full hover:bg-cream text-brown/50"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-brown/70">
                Hãy cho ban quản trị Chuối Ơi biết lý do bài viết của <strong>{reportModalPost.author.name}</strong> không phù hợp:
              </p>

              <form onSubmit={handleSubmitReport} className="space-y-3">
                <div className="space-y-2 text-xs sm:text-sm font-semibold text-brown">
                  {[
                    { val: 'spam', label: 'Quảng cáo, spam nội dung rác' },
                    { val: 'inappropriate', label: 'Nội dung bạo lực, xúc phạm, không phù hợp' },
                    { val: 'offtopic', label: 'Sai chủ đề (hoàn toàn không liên quan đến chuối)' },
                    { val: 'other', label: 'Lý do khác' },
                  ].map((item) => (
                    <label
                      key={item.val}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cream cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={item.val}
                        checked={reportReason === item.val}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-leaf focus:ring-leaf accent-leaf"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Ghi chú thêm thông tin (không bắt buộc)..."
                  className="w-full p-2.5 rounded-xl bg-cream border border-primary-200 text-xs focus:outline-none focus:border-leaf resize-none"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalPost(null)}
                    className="w-full py-2.5 rounded-full border border-brown/30 text-xs font-bold text-brown hover:bg-cream"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-display font-bold shadow-md"
                  >
                    Gửi Báo Cáo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CommunityPage;
