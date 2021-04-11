import React, { Component } from "react";
import {Link } from 'react-router-dom';
import './App.css';
import booksFromDB from "./load_books"
import PrismaZoom from 'react-prismazoom';
import authorFromDB from "./load_authors";
import AuthorDetails from "./AuthorDetails";
import Comments  from './comments'
import axios from "axios";


  class BookDetails extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true, 
        book: {}, 
        comments: []
      };
    
  }
  
   async componentDidMount() {
    let books = await booksFromDB        
    let commentsResponse = await axios.get('http://localhost:5000/comments')    
    this.setState({
      comments: commentsResponse.data.comments,
      book: books[0],
      isLoading:false
  })
  //console.log (this.state.comments)
  }

    
    render() {
      const {isLoading, book, comments} = this.state;
      if (isLoading){
        return <div className='App'>Loading...</div>
        
      }
      let commentsList = [];
      let newestBook = comments.length - 1
      let secondNewestBook = comments.length - 2 
      
      //console.log (this.state.comments)
      commentsList.push(<li>{comments[newestBook].comments} {comments[newestBook].starRating} {comments[newestBook].username}</li>)
      commentsList.push(<li>{comments[secondNewestBook].comments}  {comments[secondNewestBook].starRating} {comments[secondNewestBook].username}</li>)

      return (
        <div>
          <ul>
           
              <h1>{book['title']}</h1>
              <PrismaZoom maxZoom={1.5}>
              <img src={book['image']} alt='book cover' />
              </PrismaZoom>
              <li><Link to="/AuthorDetails"><a href={book['author']}>{book['author']}</a></Link></li>
              <h3>Category: {book['category']}</h3>
              <h3>Format: {book['format']}</h3>
              <h3>Price: {book['price']}</h3>
              <h3>Rating: {book['rating']}</h3>
              <h3>Description:</h3> <p>{book['description']}</p> 
           
          </ul> 
          
          <Comments bookTitle={book.title}/>


          <ul>
                <br></br>              
           {commentsList}
          </ul>

        </div>
      );
    }
  }



  export default BookDetails;
