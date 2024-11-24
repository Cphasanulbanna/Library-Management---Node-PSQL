const sequelize = require('../config/db');
const Author = require('./author');
const Book = require('./book');
const Category = require('./category');

// One-to-Many: Author -> Books
// hasMany: Indicates the Author table is on the "one" side of the relationship.
Author.hasMany(Book, { foreignKey: 'authorId', onDelete: 'CASCADE' });//A one-to-many relationship means one record in the Author table can be associated with multiple records in the Book table.
// Creates a column authorId in the books table to store the id of the related author
// When an Author is deleted, all their associated Books will also be deleted automatically (cascade behavior).
Book.belongsTo(Author, { foreignKey: 'authorId' }); //Each book belongs to exactly one author.

// Many-to-Many: Books <-> Categories
//belongsTo: Indicates the Book table is on the "many" side of the relationship (each book belongs to one author).
//A single book can belong to multiple categories (e.g., "Fantasy," "Adventure").
//A single category can have multiple books (e.g., "Fantasy" can include multiple books).
const BookCategory = sequelize.define('BookCategory', {}, { timestamps: false });
//This creates a junction table (BookCategory) to handle the many-to-many relationship between books and categories
//Empty object {}: The table has no additional columns besides the foreign keys.
Book.belongsToMany(Category, { through: BookCategory });
//Links the Book model to the Category model via the BookCategory junction table
//through: BookCategory: Specifies the intermediary table for the relationship.
Category.belongsToMany(Book, { through: BookCategory });
//Links the Category model to the Book model via the BookCategory table.

module.exports = { Author, Book, Category };
