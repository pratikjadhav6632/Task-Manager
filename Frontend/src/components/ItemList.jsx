import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ItemList = ({ items, onToggle, onDelete, onUpdate }) => {
  if (items.length === 0) {
    return (
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="empty-state"
      >
        Your list is empty. Start by adding a task above.
      </motion.p>
    );
  }

  return (
    <div className="list-container">
      <ul className="item-list">
        <AnimatePresence initial={false}>
          {items.map((item, index) => (
            <ListItem 
              key={item.id} 
              item={item} 
              index={index}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

const ListItem = ({ item, index, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleUpdate = () => {
    if (editText.trim() && editText !== item.text) {
      onUpdate(item.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <motion.li 
      layout
      initial={{ opacity: 0, height: 0, scale: 0.95 }}
      animate={{ 
        opacity: item.completed ? 0.8 : 1, 
        height: "auto", 
        scale: 1,
        background: item.completed ? 'var(--input-bg)' : '#FFFFFF'
      }}
      exit={{ opacity: 0, height: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`list-item ${item.completed ? 'completed' : ''}`}
    >
      <div className="list-item-content">
        <span 
          className="item-number"
          style={{ 
            color: item.completed ? 'var(--color-green-pastel)' : 'var(--color-pink-dark)',
            fontSize: item.completed ? '1.2rem' : '1rem' 
          }}
        >
          {item.completed ? "●" : `${index + 1}.`}
        </span>
        
        {isEditing ? (
          <input 
            type="text" 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            autoFocus
            className="edit-input"
          />
        ) : (
           <span className={`item-text ${item.completed ? 'strikethrough' : ''}`}>
             {item.text}
           </span>
        )}
      </div>

      <div className="action-buttons">
        <button 
          onClick={() => onToggle(item.id, item.completed)} 
          className="btn-icon btn-complete"
          title={item.completed ? "Undo" : "Complete"}
        >
          {item.completed ? "↩" : "✔"}
        </button>
        
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="btn-icon btn-edit"
          title="Edit"
          disabled={item.completed}
        >
          ✎
        </button>
        
        <button 
          onClick={() => onDelete(item.id)} 
          className="btn-icon btn-delete"
          title="Delete"
        >
          ✖
        </button>
      </div>
    </motion.li>
  );
};

export default ItemList;
