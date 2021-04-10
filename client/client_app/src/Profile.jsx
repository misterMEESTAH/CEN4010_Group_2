import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
 
class Profile extends Component {
  constructor(){
    super()
    let user = JSON.parse(localStorage.getItem('user'))
    this.state = {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: user.password,
        address: user.address,
        nickname: user.nickname,
        creditcard: user.creditcard,
        shippingaddress: user.shippingaddress,
        _id: user._id
    }
    this.changeFullName = this.changeFullName.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeAddress = this.changeAddress.bind(this)
    this.changeNick = this.changeNick.bind(this)
    this.changeCreditCard = this.changeCreditCard.bind(this)
    this.changeShipping = this.changeShipping.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  changeFullName(event){
    this.setState({
      fullName:event.target.value
    })
  }
  changeUsername(event){
    this.setState({
        username:event.target.value
    })
  }
  changeEmail(event){
    this.setState({
        email:event.target.value
    })
  }
  changePassword(event){
    this.setState({
        password:event.target.value
    })
  }
  changeAddress(event){
    this.setState({
        address:event.target.value
    })
  }
  changeNick(event){
    this.setState({
        nickname:event.target.value
    })
  }
  changeCreditCard(event){
    this.setState({
        creditcard:event.target.value
    })
  }
  changeShipping(event){
    this.setState({
        shippingaddress:event.target.value
    })
  }

  onSubmit(event){
    event.preventDefault()

    const updated = {
        fullName: this.state.fullName,
        username: this.state.username,
        email: this.state.email,
        address: this.state.address,
        nickname: this.state.nickname,
        creditcard: this.state.creditcard,
        shippingaddress: this.state.shippingaddress,
    }

    //sending updated data
    axios.put('http://localhost:5000/update', updated)
        .then(loginuser => {
            console.log(loginuser['data']['updateUser'])
            localStorage.setItem('user', JSON.stringify(loginuser['data']['updateUser']))
          })
}


render() {
  return (
      <div>
          <div className='container'>
              <div className='form-div'>
                  <form onSubmit={this.onSubmit}>
                      <h> Username </h>
                      <input type = 'text'
                      placeholder='Username'
                      onChange={this.changeUsername}
                      value={this.state.username}
                      className='form-control form-group'
                      />

                      <h> Full Name </h>
                      <input type = 'text'
                      placeholder='Full Name'
                      onChange={this.changeFullName}
                      value={this.state.fullName}
                      className='form-control form-group'
                      />                            

                      <h> Home Address </h>
                      <input type = 'text'
                      placeholder='Address'
                      onChange={this.changeAddress}
                      value={this.state.address}
                      className='form-control form-group'
                      />

                      <h> Nickname </h>
                      <input type = 'text'
                      placeholder='Nickname'
                      onChange={this.changeNick}
                      value={this.state.nickname}
                      className='form-control form-group'
                      />

                      <h> Shipping Address </h>
                      <input type = 'text'
                      placeholder='Shipping Address'
                      onChange={this.changeShipping}
                      value={this.state.shippingaddress}
                      className='form-control form-group'
                      />

                      <h> Credit Card </h>
                      <input type = 'text'
                      placeholder='Credit Card'
                      onChange={this.changeCreditCard}
                      value={this.state.creditcard}
                      className='form-control form-group'
                      />


                      <input type='submit' className='btn btn-danger btn-block' value='Save Changes'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default Profile;