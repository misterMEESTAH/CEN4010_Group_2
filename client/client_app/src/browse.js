import React from "react";
import './App.css';
import getBooksFromDB from "./load_books"


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
function FilterForm() {
  return(
    <form>

    </form>
  )
}


function Browse() {
  const [books, setBooks] = React.useState({filtered: [], original: []});
  const [searchQuery, setSearchQuery] = React.useState('' || '');

  const getBooks = async () => {
    let books = [];
    books = await getBooksFromDB;
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
    setBooks({filtered: books, original: books});
  }
  const search = (query) => {
    const filtered = books['filtered'].filter((book) => {
      const bookName = book['title'].toLowerCase();
      return bookName.includes(query);
    })
    console.log(filtered);
    setBooks({filtered: filtered, original: books['original']});
  }
  //TODO: Set up a for for filtering. Have that form submit an object to this function and use .filter on books['original'] using filter parameters
  const fitlerbooks = async (fitlers) => {

  }


  return (
    <div className="browse">
      <input type="text" placeholder="Search.." name="search" value={searchQuery} onChange={() => setSearchQuery()}></input>
      <button type="submit" onClick={() => search()}>Submit</button>
      <div className="book-list">
        <button onClick={async () => getBooks()}>Get Books</button>
        {BookList(books['filtered'])}
      </div>
    </div>
  );
}

export default Browse;
