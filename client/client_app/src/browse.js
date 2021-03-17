import React from "react";
import './App.css';
import booksFromDB from "./load_books"
import { Dropdown } from 'semantic-ui-react'


function BookItem(book) {
  return (
    <li key={book['title']}>
      <img src={book['image']} alt="book cover" />
      <h1>{book['title']}</h1>
      <h2>Author: {book['author']}</h2>
      <h3>Rating: {book['rating']}</h3>
      <h4>Price: {book['price']}</h4>
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
  const [genres, setGenres] = React.useState([])

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
    setBooks(books);
    setBooksDefault(books);
    getGenres(books);
  }

  const search = (query) => {
    setSearchQuery(query)
    const filtered = booksDefault.filter((book) => {
      const bookName = book['title'].toLowerCase();
      return bookName.includes(query.toLowerCase());
    })
    
    setBooks(filtered);
    getGenres(filtered);
  }

  const browseByGenre = (_ , data) => {
    let genre = data.value
    const filterbygenre = books.filter((book) => {
      return book['category'] === genre;
    })
    console.log(filterbygenre)
    setBooks(filterbygenre) 
  }

  const getGenres = (books) => {
    let categories = [];
    let genre = '';
    for(let i = 0; i < books.length; i++){
      genre = books[i]['category']
        if(!categories.includes(genre)){
            categories.push(genre);
        }
    }
    categories = categories.map((genre) => {
       return {
         key: genre,
         text: genre,
         value: genre
       }
    })
    setGenres(categories)
  }


  return (
    <div className="browse">
      <input type="text" placeholder="Search.." name="search" value={searchQuery} onChange={(e) => search(e.target.value)}/>
      {GenreDropdown(genres, browseByGenre)}
      <div className="book-list">
        <button onClick={async () => getBooks()}>Get Books</button>
        {BookList(books)}
      </div>
    </div>
  );
}

const GenreDropdown = (options, func) => {
  return (
  <Dropdown
    placeholder='Select a Genre'
    onChange={func}
    selection
    options={options}
  />
)
}

export default Browse;
