import React from "react";
import './App.css';

function AddToCart (book) {
    const addBook = () => {
        if(localStorage.getItem('cart') === null){
            localStorage.setItem('cart', JSON.stringify([]))
        }
        
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        let inCart = false;
        for(let i = 0; i < cart.length; i++){
            
            if(cart[i]['book']['title'] === book['book']['title']){
                cart[i]['book']['quantity'] = cart[i]['book']['quantity'] + 1;
                console.log(cart[i]['book'])
                inCart = true;
            }
        }
        if(!inCart){
            cart.push(book)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return(
    <div>
        <button className="addToCartBtn" onClick={() => addBook(book)}>Add To Cart</button>
    </div>
    );
}

export default AddToCart;