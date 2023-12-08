const axios = require('axios');

//Fetch all books or the default route
function getBooks() {
  return axios.get('http://localhost:5000/')
    .then(response => console.log(response.data))
    .catch(error => {
      console.error('Error fetching books:', error.message);
      throw error;
    });
}

getBooks();


//Fetch books by isbn

function getBooksByIsbn() {
    return axios.get('http://localhost:5000/isbn/:1')
      .then(response => console.log(response.data))
      .catch(error => {
        console.error('Error fetching books:', error.message);
        throw error;
      });
  }

  getBooksByIsbn()

//Fetch books by author


function getBooksByAuthor() {
    return axios.get('http://localhost:5000/author/:Dante Alighieri')
      .then(response => console.log(response.data))
      .catch(error => {
        console.error('Error fetching books:', error.message);
        throw error;
      });
  }

  getBooksByAuthor()

//Fetch books by title


function getBooksByTitle() {
    return axios.get('http://localhost:5000/title/:The Epic Of Gilgamesh')
      .then(response => console.log(response.data))
      .catch(error => {
        console.error('Error fetching books:', error.message);
        throw error;
      });
  }

  getBooksByTitle()