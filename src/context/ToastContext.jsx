import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = (msg, duration) => addToast(msg, 'success', duration);
  const error = (msg, duration) => addToast(msg, 'error', duration);
  const info = (msg, duration) => addToast(msg, 'info', duration);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, info }}>
      {children}
      {/* Container hiển thị danh sách Toast */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-pop border-2 backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-white/95 border-secondary-400 text-brown'
                  : toast.type === 'error'
                  ? 'bg-white/95 border-red-400 text-brown'
                  : 'bg-white/95 border-primary-400 text-brown'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === 'success' && (
                  <div className="w-8 h-8 rounded-full bg-secondary-100 text-leaf flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>
                )}
                {toast.type === 'error' && (
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertCircle size={18} />
                  </div>
                )}
                {toast.type === 'info' && (
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-brown-dark flex items-center justify-center">
                    <Info size={18} />
                  </div>
                )}
              </div>
              <div className="flex-1 text-sm font-semibold leading-snug">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-brown/40 hover:text-brown p-1 rounded-full transition-colors"
                aria-label="Đóng thông báo"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast phải được dùng bên trong ToastProvider!');
  }
  return context;
};

export default ToastContext;
