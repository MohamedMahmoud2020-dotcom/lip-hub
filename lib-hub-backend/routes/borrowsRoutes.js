import express from "express"
import {getBorrows, addBorrow, deleteBorrowedBooks, updateBorrowedBooks} from "../controllers/borrowsController.js"

const router = express.Router();

router.get("/borrows", getBorrows);
router.post("/borrows", addBorrow);
router.delete("/borrows/:id", deleteBorrowedBooks);
router.put("/borrows/:id", updateBorrowedBooks)


export default router