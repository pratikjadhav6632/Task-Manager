
import express from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(createItem);

router.route('/:id')
  .put(updateItem)
  .delete(deleteItem);

export default router;
