import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
 
class Profile extends Component {
  constructor(){
    super()
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
    
      this.state = {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: user.password,
        address: user.address,
        nickname: user.nickname,
        creditcard1No: user.creditcard1No,
        creditcard1Date: user.creditcard1Date,
        creditcard2No: user.creditcard2No,
        creditcard2Date: user.creditcard2Date,
        creditcard3No: user.creditcard3No,
        creditcard3Date: user.creditcard3Date,
        shippingaddress1: user.shippingaddress1,
        shippingaddress2: user.shippingaddress2,
        shippingaddress3: user.shippingaddress3,
        _id: user._id,
        user: user
      }
      this.changeFullName = this.changeFullName.bind(this)
      this.changeUsername = this.changeUsername.bind(this)
      this.changeEmail = this.changeEmail.bind(this)
      this.changePassword = this.changePassword.bind(this)
      this.changeAddress = this.changeAddress.bind(this)
      this.changeNick = this.changeNick.bind(this)
      this.changeCreditCard1No = this.changeCreditCard1No.bind(this)
      this.changeCreditCard1Date = this.changeCreditCard1Date.bind(this)
      this.changeCreditCard2No = this.changeCreditCard2No.bind(this)
      this.changeCreditCard2Date = this.changeCreditCard2Date.bind(this)
      this.changeCreditCard3No = this.changeCreditCard3No.bind(this)
      this.changeCreditCard3Date = this.changeCreditCard3Date.bind(this)
      this.changeShipping1 = this.changeShipping1.bind(this)
      this.changeShipping2 = this.changeShipping2.bind(this)
      this.changeShipping3 = this.changeShipping3.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }
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
  changeCreditCard1No(event){
    this.setState({
        creditcard1No:event.target.value
    })
  }
  changeCreditCard1Date(event){
    this.setState({
        creditcard1Date:event.target.value
    })
  }
  changeCreditCard2No(event){
    this.setState({
        creditcard2No:event.target.value
    })
  }
  changeCreditCard2Date(event){
    this.setState({
        creditcard2Date:event.target.value
    })
  }
  changeCreditCard3No(event){
    this.setState({
        creditcard3No:event.target.value
    })
  }
  changeCreditCard3Date(event){
    this.setState({
        creditcard3Date:event.target.value
    })
  }
  changeShipping1(event){
    this.setState({
        shippingaddress1:event.target.value
    })
  }
  changeShipping2(event){
    this.setState({
        shippingaddress2:event.target.value
    })
  }
  changeShipping3(event){
    this.setState({
        shippingaddress3:event.target.value
    })
  }

  validation() {
    let formIsValid = true
    console.log(Date.parse(this.state.creditcard1Date))
    if (isNaN(this.state.creditcard1No) && this.state.creditcard1No !== "") {
      alert("Invalid Card Number (Card 1)")
      formIsValid = false
    }

    if (isNaN(Date.parse(this.state.creditcard1Date)) && this.state.creditcard1Date !== ""){
      alert("Invalid Card Date (Card 1)")
      formIsValid = false;
    }
    
    if (isNaN(this.state.creditcard2No) && this.state.creditcard2No !== "") {
      alert("Invalid Card Number (Card 2)")
      formIsValid = false
    }

    if (isNaN(Date.parse(this.state.creditcard2Date)) && this.state.creditcard2Date !== ""){
      alert("Invalid Card Date (Card 2)")
      formIsValid = false;
    }

    if (isNaN(this.state.creditcard3No) && this.state.creditcard3No !== "") {
      alert("Invalid Card Number (Card 3)")
      formIsValid = false
    }

    if (isNaN(Date.parse(this.state.creditcard3Date)) && this.state.creditcard3Date !== ""){
      alert("Invalid Card Date (Card 3)")
      formIsValid = false;
    }

    if (this.state.creditcard1Date === "" && this.state.creditcard1No !== ""){
      alert("Please enter a number and date when adding a card")
      formIsValid = false;
    }
    if (this.state.creditcard2Date === "" && this.state.creditcard2No !== ""){
      alert("Please enter a number and date when adding a card")
      formIsValid = false;
    }
    if (this.state.creditcard3Date === "" && this.state.creditcard3No !== ""){
      alert("Please enter a number and date when adding a card")
      formIsValid = false;
    }

    return formIsValid 
  }

  onSubmit(event){
    event.preventDefault()

    if (this.validation()) {
      alert("Changes Saved")
      const updated = {
        fullName: this.state.fullName,
        username: this.state.username,
        email: this.state.email,
        address: this.state.address,
        nickname: this.state.nickname,
        creditcard1No: this.state.creditcard1No,
        creditcard1Date: this.state.creditcard1Date,
        creditcard2No: this.state.creditcard2No,
        creditcard2Date: this.state.creditcard2Date,
        creditcard3No: this.state.creditcard3No,
        creditcard3Date: this.state.creditcard3Date,
        shippingaddress1: this.state.shippingaddress1,
        shippingaddress2: this.state.shippingaddress2,
        shippingaddress3: this.state.shippingaddress3,
      }

      //sending updated data
      axios.put('http://localhost:5000/update', updated)
        .then(loginuser => {
            console.log(loginuser['data']['updateUser'])
            localStorage.setItem('user', JSON.stringify(loginuser['data']['updateUser']))
          })
    }
    
}


render() {
  if (!this.state) {
    return (
      <h1>
        Not Logged In
      </h1>
    )
  }


  return (
      <div>
          <div className='container'>
              <div className='form-div'>
                  <form onSubmit={this.onSubmit}>
                      <h> Email </h>
                      <input type = 'text'
                      placeholder='Email'
                      onChange={this.changeEmail}
                      value={this.state.email}
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

                      <h> Credit Card 1</h>
                      <input type = 'text'
                      placeholder='Card No.'
                      onChange={this.changeCreditCard1No}
                      value={this.state.creditcard1No}
                      className='form-control form-group'
                      />
                      <input type = 'text'
                      placeholder='Card Date'
                      onChange={this.changeCreditCard1Date}
                      value={this.state.creditcard1Date}
                      className='form-control form-group'
                      />

                      <h> Credit Card 2</h>
                      <input type = 'text'
                      placeholder='Card No.'
                      onChange={this.changeCreditCard2No}
                      value={this.state.creditcard2No}
                      className='form-control form-group'
                      />
                      <input type = 'text'
                      placeholder='Card Date'
                      onChange={this.changeCreditCard2Date}
                      value={this.state.creditcard2Date}
                      className='form-control form-group'
                      />

                      <h> Credit Card 3</h>
                      <input type = 'text'
                      placeholder='Card No.'
                      onChange={this.changeCreditCard3No}
                      value={this.state.creditcard3No}
                      className='form-control form-group'
                      />
                      <input type = 'text'
                      placeholder='Card Date'
                      onChange={this.changeCreditCard3Date}
                      value={this.state.creditcard3Date}
                      className='form-control form-group'
                      />

                      <h> Shipping Address </h>
                      <input type = 'text'
                      placeholder='Shipping Address 1'
                      onChange={this.changeShipping1}
                      value={this.state.shippingaddress1}
                      className='form-control form-group'
                      />
                      <input type = 'text'
                      placeholder='Shipping Address 2'
                      onChange={this.changeShipping2}
                      value={this.state.shippingaddress2}
                      className='form-control form-group'
                      />
                      <input type = 'text'
                      placeholder='Shipping Address 3'
                      onChange={this.changeShipping3}
                      value={this.state.shippingaddress3}
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