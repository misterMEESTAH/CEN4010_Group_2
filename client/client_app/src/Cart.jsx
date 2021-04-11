import React, { useEffect } from "react";
import './App.css';
import DeleteItem from "./deleteItem";
import IncreaseQty from "./increaseQty";

function BookItem(book, removefunc) {
    return (
      <ul key={book['title']}>          
                <div class="container">
                    <div class="row">
                        <div class="card grey darken-0">
                            <div class="card-content white-text">
                                    <img src={book['image']} alt="book cover"/>
                                    <li class="card-title"><h1>{book['title']}</h1></li>
                                    <li><h2>Author: {book['author']}</h2></li>
                                    <li><h3>Rating: {book['rating']}</h3></li>
                                    <li><h4>Price: {book['price']}</h4></li>
                                    <li><h5>Quantity: {book['quantity']}</h5></li>
                            </div>    
                        <div class='card-action'>
                            <DeleteItem book={book}></DeleteItem>
                            <IncreaseQty book={book}></IncreaseQty>
                            <button className= "waves-effect waves-light btn pink" onClick={() => {removefunc(book)}}>Remove</button>
                        </div>
                    </div>        
                </div> 
            </div>
                
      </ul>
    )
  }

function BookList(books, bookLayout, bookfunc) {
    if(!Array.isArray(books)){
      books = []
    }
    return (
        
      <div className="box">
          <div className="box" data-columns="2">
            <ul>{books.map((book) => bookLayout(book, bookfunc))}</ul>
          </div>
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