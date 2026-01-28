import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ItemInput = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="item-input"
      />
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit" 
        className="add-btn"
      >
        Add
      </motion.button>
    </form>
  );
};

export default ItemInput;
