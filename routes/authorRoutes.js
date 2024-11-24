const express = require('express');
const { getAllAuthors, createAuthor } = require('../controllers/authorController');

const router = express.Router();

router.get('/', getAllAuthors);
router.post('/', createAuthor);

module.exports = router;
