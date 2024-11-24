const { DataTypes } = require('sequelize'); //This is an object provided by Sequelize that contains various data types you can use to define the structure of your table columns. Examples include STRING, INTEGER, BOOLEAN, TEXT, etc.
const sequelize = require('../config/db');

//A model in Sequelize represents a table in your database. Each model is defined using the sequelize.define method,
const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, //Marks this column as the primary key for the table. A primary key uniquely identifies each row in the table
    autoIncrement: true, //automatically increments the value of this column for each new row, starting from 1
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Makes this column mandatory. A row cannot be inserted without a value for name
  },
  bio: {
    type: DataTypes.TEXT, //since no additional constraints (e.g., allowNull) are specified, this column is optional by default, meaning it can store NULL values
  },
});

module.exports = Author;
