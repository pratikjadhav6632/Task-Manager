import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ItemInput from './components/ItemInput';
import ItemList from './components/ItemList';
import ErrorModal from './components/ErrorModal';
import ListSidebar from './components/ListSidebar';
import Footer from './components/Footer';
import './index.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
console.log('Current API URL:', API_URL); // Debugging: Check if Env Var is loaded

function App() {
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Fetch Lists on Mount
  useEffect(() => {
    fetchLists();
  }, []);

  // Fetch Items when Active List Changes
  useEffect(() => {
    if (activeListId) {
      fetchItems(activeListId);
    }
  }, [activeListId]);

  const fetchLists = async () => {
    try {
      const response = await fetch(`${API_URL}/lists`);
      if (!response.ok) throw new Error('Failed to fetch lists');
      const data = await response.json();
      setLists(data);
      if (data.length > 0 && !activeListId) {
        setActiveListId(data[0].id);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load lists');
    }
  };

  const createList = async (name) => {
    try {
      const response = await fetch(`${API_URL}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to create list');
      const newList = await response.json();
      setLists(prev => [...prev, newList]);
      setActiveListId(newList.id);
      return newList; // Return the new list so it can be used immediately
    } catch (err) {
      console.error(err);
      alert('Error creating list');
      return null;
    }
  };

  const deleteList = async (listId) => {
    try {
      const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete list');

      const updatedLists = lists.filter(l => l.id !== listId);
      setLists(updatedLists);

      // If we deleted the active list, switch to another one
      if (activeListId === listId) {
        if (updatedLists.length > 0) {
          setActiveListId(updatedLists[0].id);
        } else {
          setActiveListId(null);
          setItems([]); // Clear items if no list is active
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting list');
    }
  };

  const fetchItems = async (listId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/items?listId=${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (text) => {
    // DUPLICATE CHECK
    const isDuplicate = items.some(
      item => item.text.toLowerCase() === text.trim().toLowerCase()
    );

    if (isDuplicate) {
      setModalMessage(`"${text}" is already in your list!`);
      setModalOpen(true);
      return;
    }

    try {
      let targetListId = activeListId;

      // If no list is selected (e.g. no lists exist), create one automatically
      if (!targetListId) {
        const newList = await createList('My List');
        if (newList) {
          targetListId = newList.id;
        } else {
          throw new Error('Could not create a default list to add item to.');
        }
      }

      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, listId: targetListId }),
      });
      if (!response.ok) throw new Error('Failed to add item');
      const newItem = await response.json();
      setItems((prev) => [...prev, newItem]);
    } catch (err) {
      console.error(err);
      alert('Error adding item');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (!response.ok) throw new Error('Failed to update item');
      
      const updatedItem = await response.json();
      setItems((prev) => prev.map(item => item.id === id ? updatedItem : item));
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) throw new Error('Failed to update item');

      const updatedItem = await response.json();
      setItems((prev) => prev.map(item => item.id === id ? updatedItem : item));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      
      setItems((prev) => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Sort: Active items first, Completed items last
  const sortedItems = [...items].sort((a, b) => {
    return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
  });

  const activeListName = lists.find(l => l.id === activeListId)?.name || 'My List';

  return (
    <div className="app-wrapper">
      <div className="app-layout">
        <ListSidebar 
          lists={lists} 
          activeListId={activeListId} 
          onSelectList={setActiveListId} // Use setActiveListId directly here
          onCreateList={createList} 
          onDeleteList={deleteList}
        />
        
        <div className="main-content">
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="title">Task Planner</h1>
            <p className="subtitle">{activeListName}</p>
            
            <ItemInput onAdd={addItem} />
            
            <div className="content-area">
              {loading ? (
                <p className="loading">Loading...</p>
              ) : error ? (
                 <p className="error">Error: {error}</p>
              ) : (
                <ItemList 
                  items={sortedItems} 
                  onToggle={toggleComplete}
                  onDelete={deleteItem}
                  onUpdate={updateItem}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      <ErrorModal 
        isOpen={modalOpen} 
        message={modalMessage} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}

export default App;
