
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Rename _id to id for frontend compatibility
itemSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
