const { Author } = require('../models');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors', error });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = await Author.create({ name, bio });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error });
  }
};
