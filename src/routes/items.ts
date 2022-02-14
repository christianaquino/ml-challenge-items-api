import express from 'express'
import { itemList, itemDetails } from '../controllers/items'

const router = express.Router();

router.get('/items', itemList);
router.get('/items/:id', itemDetails);

export default router