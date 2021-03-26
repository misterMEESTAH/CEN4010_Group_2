import React from "react";
import './App.css';

function AddToCart (book) {
    const addBook = () => {
        if(localStorage.getItem('cart') === null){
            localStorage.setItem('cart', JSON.stringify([]))
        }
        
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        cart.push(book)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return(
    <div>
        <button className="addToCartBtn" onClick={() => addBook(book)}>Add To Cart</button>
    </div>
    );
}

export default AddToCart;