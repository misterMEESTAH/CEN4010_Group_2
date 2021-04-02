import React from "react";
import './App.css';
import updateUser from './updateUser'

function AddToWishlist (book) {
    const addBook = async () => {
        if(localStorage.getItem('user') === null && !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['wishlist']) {
            user['wishlist'] = []
        }
        let inWishlist = false;
        let wishlist = user['wishlist']
        for(let i = 0; i < user['wishlist'].length; i++){
            
            if(wishlist[i]['book']['title'] === book['book']['title']){
                wishlist[i]['book']['quantity'] = wishlist[i]['book']['quantity'] + 1;
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
        <button className="addToWishlistBtn" onClick={() => addBook(book)}>Add To Wishlist</button>
    </div>
    );
}

export default AddToWishlist;