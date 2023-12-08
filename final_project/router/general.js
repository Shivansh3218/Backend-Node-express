const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body, "req.body");

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({
        error: "Both username and password are required for registration",
      });
  }

  // Check if the username already exists
  if (users.includes(username)) {
    return res
      .status(409)
      .json({
        error: "Username already exists. Please choose a different one.",
      });
  }

  // If all checks pass, register the new user
  users.push(username, { username, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json({ message: books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  isbn = isbn.substring(1);
  console.log(books[isbn], "isbn", isbn);
  if (books[isbn]) {
    return res.status(200).json({ message: books[isbn] });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const requestedAuthor = req.params.author;
  for (const bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      const author = books[bookId].author;
      if (author === requestedAuthor.substring(1))
        return res.status(200).json({ message: books[bookId] });
    }
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const requestedtitle = req.params.title;
  for (const bookId in books) {
    if (books.hasOwnProperty(bookId)) {
      const author = books[bookId].title;
      if (author === requestedtitle.substring(1))
        return res.status(200).json({ message: books[bookId] });
    }
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  isbn = isbn.substring(1);
  console.log(books[isbn], "isbn", isbn);
  if (books[isbn]) {
    return res.status(200).json({ message: books[isbn].reviews });
  }
});

module.exports.general = public_users;
