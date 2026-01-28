import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel} // Close on backdrop click
        >
          <motion.div 
            className="modal-content confirmation-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            <div className="modal-icon">⚠️</div>
            <h3 className="modal-title">{title}</h3>
            <p className="modal-message">{message}</p>
            
            <div className="modal-actions">
              <button onClick={onCancel} className="modal-btn btn-cancel-modal">
                {cancelText}
              </button>
              <button onClick={onConfirm} className="modal-btn btn-confirm-modal">
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
