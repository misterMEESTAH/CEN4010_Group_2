import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './components/actions/cartActions'
import Formula from './components/Formula'
import AddToCart from './AddToCart'

class WishList extends Component{

    constructor(){
        super()
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user['wishlist']){
            user['wishlist'] = []
        }
        this.state = {
            wishlist: user['wishlist']
        }
    }
    //to remove the item completely
    remove = (book)=>{
        let user = JSON.parse(localStorage.getItem('user'))
        const wishlist = this.state.wishlist
        for(let i = 0; i < wishlist.length; i++){
            if(wishlist[i]['book']['title'] === book['title']){
                wishlist.splice(i, 1);
            }
        }
        this.setState({wishlist: wishlist})
        user['wishlist'] = this.state.wishlist;
    }
    //to add to the item quantity
    addQuantity = (book)=>{
        let user = JSON.parse(localStorage.getItem('user'))
        const wishlist = this.state.wishlist
        for(let i = 0; i < wishlist.length; i++){
            if(wishlist[i]['book']['title'] === book['title']){
                wishlist[i]['book']['quantity'] = wishlist[i]['book']['quantity'] + 1
            }
        }
        this.setState({wishlist: wishlist})
        user['wishlist'] = this.state.wishlist;
        localStorage.setItem('user', JSON.stringify(user))
    }
    //to subtract from the item quantity
    subtractQuantity = (book)=>{
        let user = JSON.parse(localStorage.getItem('user'))
        const wishlist = this.state.wishlist
        for(let i = 0; i < wishlist.length; i++){
            if(wishlist[i]['book']['title'] === book['title']){
                wishlist[i]['book']['quantity'] = wishlist[i]['book']['quantity'] - 1
                if(wishlist[i]['book']['quantity'] <= 0){
                    wishlist.splice(i, 1);
                }
            }
        }
        this.setState({wishlist: wishlist})
        user['wishlist'] = this.state.wishlist;
        localStorage.setItem('user', JSON.stringify(user))
    }
    render(){
      console.log("props")
      console.log(this.props)         
        let addedItems = this.state.wishlist.length > 0 ?
            (  
                this.state.wishlist.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.book._id}>
                                    <div className="item-img"> 
                                        <img src={item.book.image} alt={item.book.image} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.book.title}</span>
                                        <p>{item.book.desc}</p>
                                        <p><b>Price: ${item.book.price}</b></p> 
                                        <p>
                                            <b>Quantity: {item.book.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.addQuantity(item.book)}}>arrow_drop_up</i></Link>
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.subtractQuantity(item.book)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.remove(item.book)}}>Remove</button>
                                        <AddToCart book={item.book}></AddToCart>
                                    </div>
                                    
                                </li>
                         
                    )
                })
            ):

             (
                <p>No books added to your wish list yet. Click on your favorites in the Browse Books page to add.</p>
             )
       return(
            <div className="container">
                <div className="WishList">
                    <h5>Saved Items:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>         
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.items,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (book)=>{dispatch(removeItem(book))},
        addQuantity: (book)=>{dispatch(addQuantity(book))},
        subtractQuantity: (book)=>{dispatch(subtractQuantity(book))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WishList)