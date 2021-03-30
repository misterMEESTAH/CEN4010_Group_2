import React, { useEffect } from "react";
import './App.css';
import booksFromDB from "./load_books"
import { Dropdown } from 'semantic-ui-react'
import AddToCart from "./AddToCart"


function BookItem(book) {
  return (
    <li key={book['title']}>
      <img src={book['image']} alt="book cover" />
      <h1>{book['title']}</h1>
      <h2>Author: {book['author']}</h2>
      <h3>Rating: {book['rating']}</h3>
      <h4>Price: {book['price']}</h4>
      <AddToCart book={book}></AddToCart>
    </li>
  )
}

function BookList(books, bookLayout) {
  if(!Array.isArray(books)){
    books = []
  }
  return (
    <div className="bookList" data-columns="2">
        <ul>{books.map((book) => bookLayout(book))}</ul>
    </div>
  )
}

function Browse() {
  const [booksDefault, setBooksDefault] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState(' ');
  const [genres, setGenres] = React.useState([]);
  const [pagination, setPagination] = React.useState(10);
  const [isLoading, setLoading] = React.useState(true)
  const [pageNumber, setPageNumber] = React.useState(1);
  const [hideNext, setHideNext] = React.useState(false);
  const [hidePrev, setHidePrev] = React.useState(true);

  const getBooks = async () => {
    let books = [];
    books = await booksFromDB;
    books = [...books].sort((firstbook, secondbook) => {
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
  
  const getGenres = (books) => {
    let categories = [];
    let genre = '';
    for(let i = 0; i < books.length; i++){
      genre = books[i]['category']
        if(!categories.includes(genre)){
            categories.push(genre);
        }
    }
    categories.push('All');
    categories = categories.map((genre) => {
       return {
         key: genre,
         text: genre,
         value: genre
       }
    })
    setGenres(categories)
  }

  useEffect(()=>{
    booksFromDB.then(books => {
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
    setLoading(false);
    });
  }, [])

  if(isLoading){
    return <div className="App">Loading..</div>
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
    if (genre === 'All') {
      setBooks(booksDefault)
      return;
    }
    let filterbygenre = books.filter((book) => {
      return book['category'] === genre;
    })
    if(filterbygenre.length === 0) {
      filterbygenre = booksDefault.filter((book) => {
        return book['category'] === genre;
      })
    }
    setBooks(filterbygenre) 
  }

  const nextPage = () => {
    setPageNumber(pageNumber + 1)
    console.log(books)
  }

  const prevPage = () => {
    setPageNumber(pageNumber - 1)
    console.log(books)
  }
  

  const changePagination = (_, data) => {
    setPagination(data.value)
  }

  const changeRating = (_, data) => {
    let rating = data.value
    let filterbyrating = books.filter((book) => {
      return Math.floor(book['rating']) >= rating;
    })
    if(filterbyrating.length === 0) {
      filterbyrating = booksDefault.filter((book) => {
        return Math.floor(book['rating']) >= rating;
      })
    }
    changePage();
    setBooks(filterbyrating);
  }

  const changePage = () => {
    console.log(books)
    const pages = books.map((e, i) => { 
      return i % pagination === 0 ? books.slice(i, i + pagination) : null; 
    }).filter(e => { return e; });
    
    if(pageNumber + 1 > pages.length && !hideNext){
      setHideNext(true)
    } else if(pageNumber + 1 <= pages.length && hideNext){
      setHideNext(false)
    }

    if(pageNumber - 1 < 0 && !hidePrev){
      setHidePrev(true)
    } else if(pageNumber - 1 > 0 && hidePrev){
      setHidePrev(false)
    }
    if(pageNumber - 1 >= pages.length){
      setPageNumber(1)
    }
    console.log(pages)
    return pages[pageNumber - 1]
  }

  const changeSortBy = (_, data) => {
    const sortBy = data.value
    console.log(sortBy)
    const sortByBooks = books.sort((firstbook, secondbook) => {
      if(firstbook[sortBy] < secondbook[sortBy]){
        return -1;
      }
      if(firstbook[sortBy] > secondbook[sortBy]){
        return 1;
      }
      return 0;
    })
    console.log(sortByBooks)
    setBooks(sortByBooks)
    getGenres(sortByBooks)
  }

  return (
    <div className="browse">
      <input type="text" placeholder="Search.." name="search" value={searchQuery} onChange={(e) => search(e.target.value)}/>
      <Dropdown
        placeholder='Select a Genre'
        onChange={browseByGenre}
        selection
        options={genres}
      />
      <Dropdown
        placeholder='Number of Items per page'
        onChange={changePagination}
        selection
        options={[{key: 10, text: 10, value: 10}, {key: 20, text: 20, value: 20}]}
      />
      <Dropdown
        placeholder='Rating'
        onChange={changeRating}
        selection
        options={[{key: 1, text: 1, value: 1}, 
          {key: 2, text: 2, value: 2}, 
          {key: 3, text: 3, value: 3}, 
          {key: 4, text: 4, value: 4}, 
          {key: 5, text: 5, value: 5}]}
      />
      <Dropdown
        placeholder='Sort By...'
        onChange={changeSortBy}
        selection
        options={[{key: 'Title', text: 'Title', value: 'title'}, 
        {key: 'Author', text: 'Author', value: 'author'}, 
        {key: 'Price', text: 'Price', value: 'price'}, 
        {key: 'Rating', text: 'Rating', value: 'rating'}, 
        {key: 'Date', text: 'Date', value: 'date'}]}
      />
      <div className="book-list">
        <button onClick={async () => getBooks()}>Get Books</button>
        {BookList(changePage(), BookItem)}
        {!hidePrev && <button onClick={() => prevPage()}>Prev</button>}
        <p>Page: {pageNumber}</p>
        {!hideNext && <button onClick={() => nextPage()}>Next</button>}
        
      </div>

    </div>
  );
}

export default Browse;
