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

  export default BookList;