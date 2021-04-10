import React from "react";
import './App.css';
import updateUser from './updateUser'
import {addToWishList} from './components/actions/cartActions'
import { useDispatch } from 'react-redux'


function AddToWishlist (book) {

    const dispatch = useDispatch()

    const addBook = () => {
        dispatch(addToWishList(book))
    }
    return(
    <div>
        <button className="waves-effect waves-light btn" onClick={addBook}>Add To Wishlist</button>
    </div>
    );
}



export default (AddToWishlist);