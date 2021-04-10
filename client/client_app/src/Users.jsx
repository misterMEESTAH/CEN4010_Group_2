import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Redirect } from "react-router";
 
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
    }
    this.changeFullName = this.changeFullName.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeAddress = this.changeAddress.bind(this)
    this.changeNick = this.changeNick.bind(this)
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

  validation() {
    let formIsValid = true
    if (this.state.password === '') {
      alert("Password cannot be empty")
      formIsValid = false
      return formIsValid
    }
    
    if (this.state.email == '') {
      alert("Email cannot be empty")
      formIsValid = false
      return formIsValid
    }

    if (this.state.username == '') {
      alert("Username cannot be empty")
      formIsValid = false
      return formIsValid
    }
    return formIsValid 
  }

  onSubmit(event){
    event.preventDefault()

    if (this.validation()) {
      alert("User Registered")



      const registered = {
        fullName: this.state.fullName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        nickname: this.state.nickname,
      }

    
      //sending registered data
      axios.post('http://localhost:5000/signup', registered)
        .then(response => console.log(response.data))

      this.setState({
        fullName:'',
        username:'',
        email:'',
        password:'',
        address:'',
        nickname:'',
      })
    }
    
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



                      <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default Users;