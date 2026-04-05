import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-md shadow-2xl border border-zinc-200 overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 rounded-md transition-all"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
            <div className="px-8 py-10">
              {children}
            </div>
            {footer && (
              <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all shadow-sm ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-zinc-950 hover:bg-zinc-800 text-white'
            }`}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-zinc-500 font-medium leading-relaxed">{message}</p>
    </Modal>
  );
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />
  };

  const colors = {
    success: 'border-emerald-100 bg-emerald-50/50',
    error: 'border-red-100 bg-red-50/50',
    info: 'border-blue-100 bg-blue-50/50',
    warning: 'border-amber-100 bg-amber-50/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-8 right-8 z-[200] flex items-center gap-4 px-6 py-4 bg-white border rounded-md shadow-2xl min-w-[320px] max-w-md ${colors[type]}`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-bold text-zinc-950 leading-tight">{message}</p>
      <button
        onClick={onClose}
        className="p-1 text-zinc-400 hover:text-zinc-950 transition-all"
      >
        <X className="w-4 h-4 stroke-[2.5]" />
      </button>
    </motion.div>
  );
};
