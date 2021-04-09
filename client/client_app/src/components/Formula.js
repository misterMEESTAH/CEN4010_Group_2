import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
class Formula extends Component{
    
    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    render(){
  
        return(
            <div className="container">
                <div className="collection">
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn">Add to Cart</button>
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapDispatchToProps)(Formula)
