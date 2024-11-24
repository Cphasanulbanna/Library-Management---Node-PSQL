const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');

const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);

// Synchronizes your database with your Sequelize models
//{ force: true }: Drops and recreates the tables every time the server restarts. This is useful for development but should be avoided in production.
sequelize.sync().then(() => console.log('Database synced'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
