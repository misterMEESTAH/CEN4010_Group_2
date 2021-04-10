import React from "react";
import './App.css';
import updateUser from './updateUser'

function IncreaseQty (book) {
    const addBook = async () => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        let cart = user['cart'];
        
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
        user['cart'] = cart
        if(user['email']) {
            user = await updateUser(user);
        }
        localStorage.setItem('user', JSON.stringify(user))


        window.location.reload();
        return false;
        
    }
    return(
    <div>
        <button className="increaseQtyBtn" onClick={() => addBook(book)}>+</button>
    </div>
    );
}

export default IncreaseQty;