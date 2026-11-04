/**
 * models/User.js
 * --------------
 * Defines the User mongoose Schema and exports the User model.
 * The model is required by server.js to manipulate the `users` collection.
 */

// Import mongoose to build the schema and the model
const mongoose = require('mongoose');

// ---------------------------------------------------------------------------
// User Schema — describes the shape of every user document in the database
// ---------------------------------------------------------------------------
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // validator: a user must have a name
      trim: true, // remove leading/trailing spaces before saving
    },
    email: {
      type: String,
      required: true, // validator: a user must have an email
      unique: true, // two users cannot share the same email
      lowercase: true, // store emails in lowercase for consistency
      trim: true,
    },
    age: {
      type: Number,
      default: 0, // default value when age is not provided
      min: 0, // validator: age cannot be negative
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Create (and export) the User model from the schema
// Mongoose will use the plural, lowercased collection name: "users"
const User = mongoose.model('User', userSchema);

module.exports = User;