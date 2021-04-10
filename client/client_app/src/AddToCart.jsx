import React from "react";
import './App.css';
import updateUser from './updateUser'

function AddToCart (book) {
    const addBook = async () => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        console.log(book)
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        let cart = user['cart'];
        
        let inCart = false;
        for(let i = 0; i < cart.length; i++){
            if(cart[i]['book']['title'] === book['book']['title']){
                cart[i]['book']['quantity'] = cart[i]['book']['quantity'] + book['book']['quantity'];
                console.log(cart[i]['book'])
                inCart = true;
            }
        }
        if(!inCart){
            cart.push(book)
        }
        user['cart'] = cart
        if(user['email']) {
            user = await updateUser(user);
        }
        localStorage.setItem('user', JSON.stringify(user))
    }
    return(
    <div>
        <button className="waves-effect waves-light btn" onClick={() => addBook(book)}>Add To Cart</button>
    </div>
    );
}

export default AddToCart;