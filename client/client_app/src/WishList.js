import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './components/actions/cartActions'
import Formula from './components/Formula'

class WishList extends Component{

    //to remove the item completely
    remove = (id)=>{
        this.props.removeItem(id);
    }
    //to add to the item quantity
    addQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the item quantity
    subtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
      console.log("props")
      console.log(this.props)         
        let addedItems = this.props.items.length > 0 ?
            (  
                this.props.items.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.id}>
                                    <div className="item-img"> 
                                        <img src={item.img} alt={item.img} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.title}</span>
                                        <p>{item.desc}</p>
                                        <p><b>Price: ${item.price}</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.addQuantity(item.id)}}>arrow_drop_up</i></Link>
                                            <Link to="/WishList"><i className="material-icons" onClick={()=>{this.subtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.remove(item.id)}}>Remove</button>
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
                <Formula />          
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    console.log("stateToProps")
    console.log(state)
    return{
        items: state.items,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WishList)