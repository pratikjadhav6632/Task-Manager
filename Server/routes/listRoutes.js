
import express from 'express';
import { getLists, createList, deleteList } from '../controllers/listController.js';

const router = express.Router();

router.route('/')
  .get(getLists)
  .post(createList);

router.route('/:id')
  .delete(deleteList);

export default router;
