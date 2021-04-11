import React, { useEffect } from "react";
import './App.css';
import DeleteItem from "./deleteItem";
import IncreaseQty from "./increaseQty";



function BookItem(book, removefunc) {
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
       <button onClick={() => {removefunc(book)}}>Remove</button>
      </li>
    )
  }

function BookList(books, bookLayout, bookfunc) {
    if(!Array.isArray(books)){
      books = []
    }
    return (
      <div className="bookList" data-columns="2">
          <ul>{books.map((book) => bookLayout(book, bookfunc))}</ul>
      </div>
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

    const removeButton = (book) => {
        let user = JSON.parse(localStorage.getItem('user'));
        let userCart = user['cart']
        console.log(userCart)
        for(let i = 0; i < userCart.length; i++){
            if(userCart[i]['book']['title'] === book['title']){
                console.log(cart[i]['book'])
                userCart.splice(i, 1);
            }
        }
        setCart(userCart.map((book) => {
            return book['book'];
        }));
        user['cart'] = userCart
        localStorage.setItem('user', JSON.stringify(user))
    }
   

    return (
        <li>
            <div className="cart-left-side">
                {BookList(cart, BookItem, removeButton)}
            </div>

            <div className="cart-total">
                <h1>Total: ${result}</h1>
            </div>
        </li>
    )
}

export default Cart;