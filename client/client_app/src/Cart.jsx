import React, { useEffect } from "react";
import './App.css';
import BookList from "./bookList";


function BookItem(book) {
    return (
      <li key={book['title']}>
        <img src={book['image']} alt="book cover" />
        <h1>{book['title']}</h1>
        <h2>Author: {book['author']}</h2>
        <h3>Rating: {book['rating']}</h3>
        <h4>Price: {book['price']}</h4>
        <h5>Quantity: {book['quantity']}</h5>
      </li>
    )
  }

function Cart () {
    const [cart, setCart] = React.useState([]);

    useEffect(() => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        setCart(user['cart'].map((book) => {
            return book['book']
        }));
    }, [])
    
    return(
        <div>
            {BookList(cart, BookItem)}
        </div>
    )
}

export default Cart;