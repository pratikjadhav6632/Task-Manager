
import List from '../models/List.js';
import Item from '../models/Item.js';

// @desc    Get all lists
// @route   GET /api/lists
export const getLists = async (req, res) => {
  try {
    const lists = await List.find().sort({ createdAt: 1 });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a new list
// @route   POST /api/lists
export const createList = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'List name is required' });
    }

    const list = new List({
      name: name.trim()
    });

    const createdList = await list.save();
    res.status(201).json(createdList);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Delete a list
// @route   DELETE /api/lists/:id
export const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    await List.deleteOne({ _id: list._id }); // Use deleteOne or findByIdAndDelete
    
    // Also delete all items in this list
    await Item.deleteMany({ listId: list._id });

    res.status(200).json({ message: 'List removed' });
    // Note: Previous implementation returned 204 No Content, but 200 with JSON is also fine.
    // Frontend expects success, 204 or 200 OK is fine. 
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
