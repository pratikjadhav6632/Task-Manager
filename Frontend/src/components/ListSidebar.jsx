import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';

const ListSidebar = ({ lists, activeListId, onSelectList, onCreateList, onDeleteList }) => {
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
      setIsCreating(false);
    }
  };

  const handleSelect = (id) => {
    onSelectList(id);
    setMobileMenuOpen(false); // Close menu on selection on mobile
  };

  const requestDelete = (e, id, name) => {
    e.stopPropagation();
    setListToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      onDeleteList(listToDelete.id);
    }
    setDeleteModalOpen(false);
    setListToDelete(null);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container - conditional class for mobile visibility */}
      <div className={`list-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <h3 className="sidebar-title">My Lists</h3>
        
        <ul className="list-menu">
          {lists.map(list => (
            <li 
              key={list.id}
              className={`list-menu-item ${activeListId === list.id ? 'active' : ''}`}
              onClick={() => handleSelect(list.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <span className="list-icon">📝</span>
                <span className="list-name">{list.name}</span>
              </div>
              <button 
                className="btn-delete-list"
                onClick={(e) => requestDelete(e, list.id, list.name)}
                title="Delete List"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        {isCreating ? (
          <form onSubmit={handleSubmit} className="create-list-form">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="List Name..."
              autoFocus
              className="new-list-input"
            />
            <div className="create-list-actions">
              <button type="submit" className="btn-small btn-primary">Add</button>
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="btn-small btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            className="btn-create-list"
            onClick={() => setIsCreating(true)}
          >
            + New List
          </button>
        )}
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete List?"
        message={`Are you sure you want to delete "${listToDelete?.name}"? This will allow delete all tasks within it.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default ListSidebar;
