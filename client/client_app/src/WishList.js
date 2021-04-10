import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './components/actions/cartActions'
import Formula from './components/Formula'
import AddToCart from './AddToCart'

class WishList extends Component{

    //to remove the item completely
    remove = (book)=>{
        this.props.removeItem(book);
    }
    //to add to the item quantity
    addQuantity = (book)=>{
        this.props.addQuantity(book);
    }
    //to substruct from the item quantity
    subtractQuantity = (book)=>{
        this.props.subtractQuantity(book);
    }
    render(){
      console.log("props")
      console.log(this.props)         
        let addedItems = this.props.items.length > 0 ?
            (  
                this.props.items.map(item=>{
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
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.addQuantity(item.book._id)}}>arrow_drop_up</i></Link>
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.subtractQuantity(item.book._id)}}>arrow_drop_down</i></Link>
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