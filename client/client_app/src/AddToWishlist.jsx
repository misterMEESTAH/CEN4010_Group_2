import React from "react";
import './App.css';
import updateUser from './updateUser'

function AddToWishlist (book) {
    const addBook = async () => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        console.log(book)
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['wishlist']) {
            user['wishlist'] = []
        }
        let wishlist = user['wishlist'];
        
        let inWishlist = false;
        for(let i = 0; i < wishlist.length; i++){
            if(wishlist[i]['book']['title'] === book['book']['title']){
                wishlist[i]['book']['quantity'] = wishlist[i]['book']['quantity'] + book['book']['quantity'];
                console.log(wishlist[i]['book'])
                inWishlist = true;
            }
        }
        if(!inWishlist){
            wishlist.push(book)
        }
        user['wishlist'] = wishlist
        if(user['email']) {
            user = await updateUser(user);
        }
        localStorage.setItem('user', JSON.stringify(user))
    }
    return(
    <div>
        <button className="waves-effect waves-light btn" onClick={() => addBook(book)}>Add To Wishlist</button>
    </div>
    );
}

export default AddToWishlist;