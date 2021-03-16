import React from "react";
import './App.css';
import booksFromDB from "./load_books"


function BookItem(book) {
  return (
    <li key={book['title']}>
      <h1>{book['title']}</h1>
      <img src={book['image']} alt="book cover" />
      <h2>Price: {book['price']}</h2>
      <h3>Rating: {book['rating']}</h3>
    </li>
  )
}

function BookList(books) {
  return (
    <div className="bookList" data-columns="2">
        <ul>{books.map((book) => BookItem(book))}</ul>
    </div>
  )
}

function Browse() {
  const [booksDefault, setBooksDefault] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState(' ');

  const getBooks = async () => {
    let books = [];
    books = await booksFromDB;
    books.sort((firstbook, secondbook) => {
      if(firstbook['title'] < secondbook['title']){
        return -1;
      }
      if(firstbook['title'] > secondbook['title']){
        return 1;
      }

      return 0;
    })
    console.log(books)
    setBooks(books);
    setBooksDefault(books);
  }

  const search = (query) => {
    setSearchQuery(query)
    const filtered = booksDefault.filter((book) => {
      const bookName = book['title'].toLowerCase();
      return bookName.includes(query.toLowerCase());
    })
    setBooks(filtered);
  }
  //TODO: Set up a for for filtering. Have that form submit an object to this function and use .filter on books['original'] using filter parameters
  // const fitlerbooks = async (fitlers) => {

  // }

  return (
    <div className="browse">
      <input type="text" placeholder="Search.." name="search" value={searchQuery} onChange={(e) => search(e.target.value)}/>
      <div className="book-list">
        <button onClick={async () => getBooks()}>Get Books</button>
        {BookList(books)}
      </div>
    </div>
  );
}

export default Browse;
