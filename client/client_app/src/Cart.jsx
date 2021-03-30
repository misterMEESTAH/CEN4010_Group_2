import React, { useEffect } from "react";
import './App.css';


function BookItem(book) {
    return (
      <li key={book['title']}>
        <img src={book['image']} alt="book cover" />
        <h1>{book['title']}</h1>
        <h2>Author: {book['author']}</h2>
        <h3>Rating: {book['rating']}</h3>
        <h4>Price: {book['price']}</h4>
        <h5>Quantity: {book['quantity']}</h5>
        {console.log(book)}
      </li>
    )
  }
  
  function BookList(books) {
    if(!Array.isArray(books)){
      books = []
    }
    return (
      <div className="bookList" data-columns="2">
          <ul>{books.map((book) => BookItem(book))}</ul>
      </div>
    )
  }

function Cart () {
    const [cart, setCart] = React.useState([]);

    useEffect(() => {
        if(localStorage.getItem('cart') === null){
            localStorage.setItem('cart', JSON.stringify([]))
        }
    
        setCart(JSON.parse(localStorage.getItem('cart')).map((book) => {
            return book['book']
        }));
    }, [])
    
    const getQuantities = () => {
        let books = [...cart];
        let count = 1;
        console.log(books)
        for(let i = 0; i < books.length;i++){
            console.log(books[i])
            for(let j = 0; j < books.length; j++){
                if (i !== j){
                    if(books[i]['_id'] === books[j]['_id']){
                        books.splice(j, 1);
                        count++;
                        j--;
                    }
                }
                
                console.log(books)
            }
            books[i]['quantity'] = count;
            console.log(books[i])
            count = 1;
        }
        return books
    }

    
    
    return(
        <div>
            {BookList(getQuantities())}
        </div>
    )
}

export default Cart;