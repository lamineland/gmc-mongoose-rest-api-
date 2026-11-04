# Mongoose Users REST API

REST API built with **Express** and **Mongoose** that manipulates a MongoDB
database through four CRUD routes.

## Folder structure

```
mongoose-users-api/
├── config/
│   └── .env          <- environment variables (PORT, MONGO_URI)
├── models/
│   └── User.js       <- mongoose Schema + exported User model
├── server.js         <- express server + the 4 routes
└── package.json
```

## Setup

```bash
npm install        # install express, mongoose and dotenv
npm start          # launch the server
```

Edit `config/.env` to point `MONGO_URI` either to a **local** MongoDB server
(`mongodb://127.0.0.1:27017/usersDB`) or to **MongoDB Atlas** (paste your
`mongodb+srv://...` connection string).

## Routes

| Method | URL            | Description                  | Mongoose method used         |
| ------ | -------------- | ---------------------------- | ---------------------------- |
| GET    | `/users`       | Return all users             | `User.find()`                |
| POST   | `/users`       | Add a new user               | `User.create()`              |
| PUT    | `/users/:id`   | Edit a user by id            | `User.findByIdAndUpdate()`   |
| DELETE | `/users/:id`   | Remove a user by id          | `User.findByIdAndDelete()`   |
