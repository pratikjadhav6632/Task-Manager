
import Item from '../models/Item.js';
import List from '../models/List.js';

// @desc    Get items
// @route   GET /api/items
export const getItems = async (req, res) => {
  try {
    const { listId } = req.query;
    let query = {};

    if (listId) {
      query.listId = listId;
    }
    // If no listId, it returns all items, preserving existing behavior mostly,
    // though usually we want to filter by list.

    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a new item
// @route   POST /api/items
export const createItem = async (req, res) => {
  try {
    const { text, listId } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Item text is required' });
    }

    // Check if list exists logic was here, let's keep it robust
    if (listId) {
      const listExists = await List.findById(listId);
      if (!listExists) {
        return res.status(404).json({ error: 'List not found' });
      }
    } else {
        // Handle case where no listId is provided if necessary, 
        // though our model requires it. 
        // For now, let's assume it's required as per new schema.
        return res.status(400).json({ error: 'listId is required' });
    }

    const item = new Item({
      text: text.trim(),
      listId
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
     console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
export const updateItem = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (text !== undefined) item.text = text;
    if (completed !== undefined) item.completed = completed;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await Item.deleteOne({ _id: item._id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
