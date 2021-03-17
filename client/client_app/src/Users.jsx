import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
 
class Users extends Component {
  constructor(){
    super()
    this.state = {
        fullName:'',
        username:'',
        email:'',
        password:'',
        address:'',
        nickname:'',
        creditcard:'',
        shippingaddress:''
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

    const registered = {
        fullName: this.state.fullName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        nickname: this.state.nickname,
        creditcard: this.state.creditcard,
        shippingaddress: this.state.shippingaddress
    }
    //sending registered data
    axios.post('http://localhost:4000/users/signup', registered)
        .then(response => console.log(response.data))

    this.setState({
        fullName:'',
        username:'',
        email:'',
        password:'',
        address:'',
        nickname:'',
        creditcard:'',
        shippingaddress:''
    })
}



render() {
  return (
      <div>
          <div className='container'>
              <div className='form-div'>
                  <form onSubmit={this.onSubmit}>
                      <h> Login Credentials </h>
                      <input type = 'text'
                      placeholder='Username'
                      onChange={this.changeUsername}
                      value={this.state.username}
                      className='form-control form-group'
                      />

                      <input type = 'password'
                      placeholder='Password'
                      onChange={this.changePassword}
                      value={this.state.password}
                      className='form-control form-group'
                      />

                      <h> Personal Information</h>
                      <input type = 'text'
                      placeholder='Full Name'
                      onChange={this.changeFullName}
                      value={this.state.fullName}
                      className='form-control form-group'
                      />                            

                      <input type = 'text'
                      placeholder='Email'
                      onChange={this.changeEmail}
                      value={this.state.email}
                      className='form-control form-group'
                      />

                      <input type = 'text'
                      placeholder='Address'
                      onChange={this.changeAddress}
                      value={this.state.address}
                      className='form-control form-group'
                      />

                      <input type = 'text'
                      placeholder='Nickname'
                      onChange={this.changeNick}
                      value={this.state.nickname}
                      className='form-control form-group'
                      />

                      <h> Payment </h>
                      <input type = 'text'
                      placeholder='Credit Card'
                      onChange={this.changeCreditCard}
                      value={this.state.creditcard}
                      className='form-control form-group'
                      />

                      <input type = 'text'
                      placeholder='Shipping Address'
                      onChange={this.changeShipping}
                      value={this.state.shippingaddress}
                      className='form-control form-group'
                      />

                      <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default Users;