import { getBooks, addBook, updateBook, deleteBook } from "../controllers/bookController.js";
import express from 'express';

const router = express.Router();

// Routes

router.get('/books', getBooks);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;