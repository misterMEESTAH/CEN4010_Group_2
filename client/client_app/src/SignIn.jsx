import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Redirect } from "react-router-dom";
import Cart from "./Cart"

class SignIn extends Component {
  constructor(){
    super()
    this.state = {
        username:'',
        password:'',
        loggedIn: false
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  changeUsername(event){
    this.setState({
        username:event.target.value
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
      username: this.state.username,
      password: this.state.password
    }
    console.log(data)
    //sending registered data
    axios.post('http://localhost:5000/login', data)
        .then(loginuser => {
            console.log(loginuser['data']['user'])
            localStorage.setItem('user', JSON.stringify(loginuser['data']['user']))
              this.setState({
                username:'',
                password:'',
                loggedIn: true
              })
          })
          .catch(err => {
            console.log(err.response.data.error)
            alert(err.response.data.error)
          })

    return <Redirect to="/"/>

}



render() {
  if(localStorage.getItem('user')){
        return (
          <div>
            <h1>Already Logged In</h1>
            <button onClick={() => {
              localStorage.removeItem('user')
              window.location.reload(false);
            }}> Logout </button>
          </div>
        )
    }
  return (
      <div>
          <div className='container'>
              <div className='form-div'>
                  <form onSubmit={this.onSubmit}>
                      <h1> Login Credentials </h1>
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

                      <input type='submit' className='btn btn-danger btn-block' value='Sign In'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default SignIn;