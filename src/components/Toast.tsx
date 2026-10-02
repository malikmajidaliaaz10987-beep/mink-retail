import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-50 border-red-800'
                : toast.type === 'info'
                ? 'bg-[#1C1C1C]/90 text-white border-white/10'
                : 'bg-[#1C1C1C]/95 text-white border-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-neutral-300 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#C49773] shrink-0" />
              )}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors ml-3 text-neutral-400 hover:text-white"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
