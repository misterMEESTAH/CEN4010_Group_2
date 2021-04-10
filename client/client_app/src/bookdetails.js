import axios from "axios";
import React, { Component } from "react";
import {Link } from 'react-router-dom';
import './App.css';
import booksFromDB from "./load_books"
import PrismaZoom from 'react-prismazoom';
import authorFromDB from "./load_authors";
import AuthorDetails from "./AuthorDetails";

const book = props => (
    <tr>
      <td>{props.book.title}</td>
      <td><img width = {300} height = {500} src={props.book.image} /> </td>
    </tr>
  )

  class BookDetails extends Component{
    constructor(props) {
      super(props);
      this.state = {isLoading: true, book: {}};
  }
  
  componentDidMount() {
    booksFromDB.then(books => {
      this.setState({book: books[24]})
      this.setState({isLoading: false})
      console.log(this.state.book)
      })
  }
    
    render() {
      const {isLoading, book} = this.state;
      if (isLoading){
        return <div className='App'>Loading...</div>
      }
      return (
        <div>
          <ul>
              <h1>{book['title']}</h1>
              <PrismaZoom maxZoom={2}>
              <img src={book['image']} alt='book cover' style={{marginTop: 0, marginBottom: 50, marginLeft: 0, marginRight: 50}}/>
              </PrismaZoom>
              <li><Link to="/AuthorDetails"><a href={book['author']}>{book['author']}</a></Link></li>
              <h3>Category: {book['category']}</h3>
              <h3>Format: {book['format']}</h3>
              <h3>Price: {book['price']}</h3>
              <h3>Rating: {book['rating']}</h3>
              <h3>Description:</h3> <p>{book['description']}</p> 
          </ul>
        </div>
      );
    }
  }



  export default BookDetails;