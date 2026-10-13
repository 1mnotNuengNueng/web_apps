import React from 'react';

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type || 'info'}`}>
      <div className="toast-icon">
        {toast.type === 'success' && '✓'}
        {toast.type === 'error' && '✕'}
        {toast.type === 'info' && 'ℹ'}
      </div>
      <div className="toast-content">
        <p className="toast-message">{toast.message}</p>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
};

export default Toast;
