const express = require('express');
const { getAllBooks, getBookById, createBook, deleteBook, updateBook, getAllBooksByCategory } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.get('/category/:categoryId', getAllBooksByCategory);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
