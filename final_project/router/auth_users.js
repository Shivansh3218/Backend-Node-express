const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {username: 'example_user', password: 'example_password'}
];

const isValid = (username) => {
  const regex = /^[a-zA-Z0-9]+$/; 
  return regex.test(username);
}


const authenticatedUser = (username, password) => {
  const user = users.find((user) => user.username === username && user.password === password);
  return !!user;
};

//only registered users can login

regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;
  
  console.log( username, password,"req.body");
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let { isbn } = req.params;
  isbn = isbn.substring(1);
  const { review } = req.body;
  if (!review) {
    return res.status(400).json({ error: "Review data is required" });
  }
  
  console.log(isbn, "book");
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  // Add or modify the review for the book
  book.reviews = JSON.stringify(review);

  return res.status(200).json({ message: "Book review added or modified successfully" });

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let { isbn } = req.params;
  isbn = isbn.substring(1);

  
  console.log(isbn, "book");
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  // Add or modify the review for the book
  book.reviews = {};

  return res.status(200).json({ message: "Book review deleted successfully" });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
