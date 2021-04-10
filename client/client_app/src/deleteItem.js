import React from "react";
import './App.css';
import updateUser from './updateUser'


function DeleteItem (book) {
    const deleteBook = async () => {
        
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        let cart = user['cart'];
        
        for(let i = 0; i < cart.length; i+= 1){
            if(cart[i]['book']['title'] === book['book']['title']){
                cart[i]['book']['quantity'] = cart[i]['book']['quantity'] - 1;
                if (cart[i]['book']['quantity'] === 0) {
                    cart.splice(i,1)
                }
            }
        }
        
        user['cart'] = cart
        if(user['email']) {
            user = await updateUser(user);
        }
        localStorage.setItem('user', JSON.stringify(user))

        window.location.reload();
        return false;
    }
            return (
              <div>
                <button onClick={() => deleteBook(book)}>-</button>
              </div>
            )
          }
    
export default DeleteItem;