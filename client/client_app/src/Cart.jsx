import React, { useEffect } from "react";
import { get } from "superagent";
import './App.css';
import BookList from "./bookList";
import DeleteItem from "./deleteItem";
import IncreaseQty from "./increaseQty";


function BookItem(book) {
    return (
      <li key={book['title']}>
        <img src={book['image']} alt="book cover" />
        <h1>{book['title']}</h1>
        <h2>Author: {book['author']}</h2>
        <h3>Rating: {book['rating']}</h3>
        <h4>Price: {book['price']}</h4>
        <h5>Quantity: {book['quantity']}</h5>
       <DeleteItem book={book}></DeleteItem>
       <IncreaseQty book={book}></IncreaseQty>
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
            return book['book'];
           
        }));

    }, []);
    
    // TOTALING THE PRICES OF BOOKS IN CART
    const getTotalPrice = () => {
        let sum = 0
        cart.map((book) => {
            sum += (book['price'] * book['quantity'])
            return book
        })
        return sum;
    }
    
    // FORMATTING THE TOTAL TO 2 DECIMAL PLACES
    const result = getTotalPrice().toFixed(2);
    console.log(result); 
   

    return (
        <li>
            <div className="cart-left-side">
                {BookList(cart, BookItem)}
            </div>

            <div className="cart-total">
                <h1>Total: ${result}</h1>
            </div>
        </li>
    )
}

export default Cart;