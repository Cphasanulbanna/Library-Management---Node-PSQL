const { Book, Author, Category } = require('../models'); // Import Book and related models for relationships

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
        include: [
            { model: Author },    // Include the Author details with each book
            { model: Category,   through: { attributes: [] } }   // Include the Category details with each book
          ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

exports.getAllBooksByCategory = async (req, res) => {
try {
    const categoryId = req.params.categoryId; 

    const books = await Book.findAll({
        include: [
            {
                model: Category,
                where: {id: categoryId},
                through: {attributes: []},
                attributes: ['name'],
            },
            {
                model: Author, // Include Author model
                // through: {attributes: []}
                attributes: ['name'] // Only include the name of the author
              }
        ],
        attributes: ['id', 'title', 'publishedDate'], // Only include book-specific fields
        raw: true // This makes sure the result is returned as plain JSON, not Sequelize instances
    })

    if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for this category' });
      }


      const formattedBooks = books.map(book => {
        console.log(book,'book')
        return {
          id: book.id,
          title: book.title,
          publishedDate: book.publishedDate,
          authorName: book['Author.name'], // Get the author's name directly
          categoryName: book['Categories.name'], // Get the category name directly
        };
      });
  
      // Return the books with the necessary data
      res.json(formattedBooks);

    
} catch (error) {
    res.status(500).json({ message: 'Error fetching books by category', error });
}
}

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: [
        {model: Category, through: {attributes: []}},
        {model: Author }
    ] });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, publishedDate, authorId, categoryIds } = req.body;
    const newBook = await Book.create({ title, publishedDate, authorId });

      // Step 2: Associate Categories (if provided)
      if (categoryIds && categoryIds.length > 0) {
        const categories = await Category.findAll({
          where: { id: categoryIds }, // Find categories matching the IDs
        });
        await newBook.setCategories(categories); // Establish many-to-many relationship
      }

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, publishedDate, authorId, categoryIds } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.update({ title, publishedDate, authorId });

    if (categoryIds && categoryIds.length > 0) {
        const categories = await Category.findAll({
          where: { id: categoryIds },
        });
        await book.setCategories(categories);
      }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};
