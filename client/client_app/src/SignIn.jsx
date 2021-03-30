import React, { Component } from "react";
import axios from 'axios'
class SignIn extends Component {
  constructor(){
    super()
    this.state = {
        username:'',
        password:'',
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)

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

                      <input type='submit' className='btn btn-danger btn-block' value='Sign In'/>
                  </form>
              </div>
          </div>
      </div>
   );
  }
}
 
export default SignIn;