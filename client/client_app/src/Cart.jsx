import React, { useEffect } from "react";
import './App.css';
import BookList from "./bookList";


function deleteItem() {
    localStorage.getItem('cart').removeItem("book");
  };


function BookItem(book) {
    return (
      <li key={book['title']}>
        <img src={book['image']} alt="book cover" />
        <h1>{book['title']}</h1>
        <h2>Author: {book['author']}</h2>
        <h3>Rating: {book['rating']}</h3>
        <h4>Price: {book['price']}</h4>
        <h5>Quantity: {book['quantity']}</h5>
        {/* <deleteItem book={book}></deleteItem> */}
        {/* <button className="removeItemBtns" onClick={() => deleteItem(book)}>Remove</button> */}
      </li>
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
    }, []);


    return(
        <div>
            {BookList(cart, BookItem)}
            
        </div>
    )
}

export default Cart;