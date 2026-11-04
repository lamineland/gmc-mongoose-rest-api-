/**
 * server.js
 * ---------
 * REST API with Express + Mongoose.
 * Exposes 4 routes to manipulate the users collection:
 *   GET    /users      -> return ALL users
 *   POST   /users      -> add a NEW user to the database
 *   PUT    /users/:id  -> EDIT a user by id
 *   DELETE /users/:id  -> REMOVE a user by id
 *
 * Run it with:  npm start
 */

// ---------------------------------------------------------------------------
// 1) Environment variables — load them from the config/.env file
// ---------------------------------------------------------------------------
require('dotenv').config({ path: './config/.env' });

// Import express and mongoose
const express = require('express');
const mongoose = require('mongoose');

// Import the User model defined in models/User.js
const User = require('./models/User');

// Create the express application
const app = express();

// Middleware: parse JSON request bodies (so req.body works on POST / PUT)
app.use(express.json());

// ---------------------------------------------------------------------------
// 2) Database connection — using the MONGO_URI from config/.env
//    (works with a local MongoDB server or with MongoDB Atlas)
// ---------------------------------------------------------------------------
mongoose.set('strictQuery', false); // silence the Mongoose strictQuery warning

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// ---------------------------------------------------------------------------
// 3) Routes
// ---------------------------------------------------------------------------

// GET : RETURN ALL USERS
app.get('/users', async (req, res) => {
  try {
    // User.find() with no filter returns every document of the collection
    const users = await User.find();
    res.status(200).json(users); // respond with the list of users
  } catch (err) {
    res.status(500).json({ message: err.message }); // server error
  }
});

// POST : ADD A NEW USER TO THE DATABASE
app.post('/users', async (req, res) => {
  try {
    // User.create() validates the body and saves a new document
    const newUser = await User.create(req.body);
    res.status(201).json(newUser); // 201 = resource created
  } catch (err) {
    res.status(400).json({ message: err.message }); // invalid data
  }
});

// PUT : EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
  try {
    // findByIdAndUpdate() looks up the user by _id and applies the changes
    // { new: true } -> return the UPDATED document (not the original one)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // re-run schema validators on the update
    });

    // If no user matches this id, return 404
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser); // respond with the edited user
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE : REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
  try {
    // findByIdAndDelete() removes the document with this _id
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // If no user matches this id, return 404
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(deletedUser); // respond with the removed user
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ---------------------------------------------------------------------------
// 4) Start the server on the PORT from config/.env (default 3000)
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});