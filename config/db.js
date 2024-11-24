const { Sequelize } = require('sequelize'); //provides an abstraction over raw SQL queries,Sequelize is an ORM
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', //The dialect option tells Sequelize that you’re using PostgreSQL.
  logging: false, //logging: false: Disables logging of SQL queries to the console.
});

sequelize
  .authenticate() //This checks if Sequelize can successfully connect to the database with the provided credentials.
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Error connecting to the database:', err));

module.exports = sequelize;
