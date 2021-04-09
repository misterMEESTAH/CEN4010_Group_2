
import { ADD_TO_WISHLIST,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './action-types/cart-actions'

//add list action
export const addToWishList= (book)=>{
    return{
        type: ADD_TO_WISHLIST,
        book
    }
}
//remove item action
export const removeItem=(book)=>{
    return{
        type: REMOVE_ITEM,
        book
    }
}
//subtract qt action
export const subtractQuantity=(book)=>{
    return{
        type: SUB_QUANTITY,
        book
    }
}
//add qt action
export const addQuantity=(book)=>{
    return{
        type: ADD_QUANTITY,
        book
    }
}
