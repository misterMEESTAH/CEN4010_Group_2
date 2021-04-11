import axios from "axios";
import React, { Component } from "react";
import './App.css';
import authorFromDB from "./load_authors"

class AuthorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          authors: {},
          isLoading: true
        };
    }

    componentDidMount() {
      authorFromDB.then(authors => {
        for(let i = 0; i < authors.length; i++){
          if(this.props.author === authors[i]['name']){
            console.log(authors[i])
            this.setState({author: authors[i]})
          }
        }
        this.setState({isLoading: false})
        console.log(this.state.author)
        })
    }
  
  render() {
    const {isLoading, author} = this.state;
    if (isLoading){
      return <div className='App'>Loading...</div>
    }
    return (
      <div>
        <ul>
        <h1>Meet the author</h1>
          <h2>Name: {author['name']}</h2>
          <h3>Biography: {author['bio']}</h3>
        </ul>
      </div>
      )
    }
}

export default AuthorDetails;
