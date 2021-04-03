import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
        email:'',
        password:'',
        loggedIn: false
    }
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

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
  

  onSubmit(event){
    event.preventDefault()

    const data = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(data)
    //sending registered data
    axios.post('http://localhost:5000/login', data)
        .then(loginuser => {
            console.log(loginuser['data']['user'])
            if(localStorage.getItem('user') === null && localStorage.getItem('user') === null){
              localStorage.setItem('user', JSON.stringify({}))
              this.setState({
                email:'',
                password:'',
                loggedIn: false
              })
            } else {
              localStorage.setItem('user', JSON.stringify(loginuser['data']['user']))
              this.setState({
                email:'',
                password:'',
                loggedIn: true
              })
            }
          })

    return <Redirect to="/"/>

}



render() {
    let isLoggedIn = this.state.loggedIn;
    if(isLoggedIn){
        return <Redirect to="/"/>
    }
  return (
      <div>
          <div className='container'>
              <div className='form-div'>
                  <form onSubmit={this.onSubmit}>
                      <h1> Login Credentials </h1>
                      <input type = 'text'
                      placeholder='Email'
                      onChange={this.changeEmail}
                      value={this.state.email}
                      className='form-control form-group'
                      />

                      <input type = 'password'
                      placeholder='Password'
                      onChange={this.changePassword}
                      value={this.state.password}
                      className='form-control form-group'
                      />

                      <input type='submit' className='btn btn-danger btn-block' value='Sign In'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default SignIn;