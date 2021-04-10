import React, { Component } from "react";
import './App.css';
import booksFromDB from "./load_books"
import PrismaZoom from 'react-prismazoom';
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
     await this.setState({
       comments: commentsResponse.data.comments,
      book: books[0],
    isLoading:false
  })
  }

    
    render() {
      const {isLoading, book, comments} = this.state;
      if (isLoading){
        return <div className='App'>Loading...</div>
        
      }
      let commentsList = [];
      let newestBook = comments.length - 1
      let secondNewestBook = comments.length - 2 
      
      
      commentsList.push(<li>{comments[newestBook].comments} {comments[newestBook].starRating} {comments[newestBook].username}</li>)
      commentsList.push(<li>{comments[secondNewestBook].comments}  {comments[secondNewestBook].starRating} {comments[secondNewestBook].username}</li>)

      return (
        <div>
          <ul>
           
              <h1>{book['title']}</h1>
              <PrismaZoom maxZoom={1.5}>
              <img src={book['image']} alt='book cover' />
              </PrismaZoom>
              
              <a href={book['author']}>{book['author']}</a>
              <h3>Category: {book['category']}</h3>
              <h3>Format: {book['format']}</h3>
              <h3>Price: {book['price']}</h3>
              <h4>Rating: {book['rating']}</h4>
           
          </ul>
         
         
          <p>Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum. Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa. Maecenas hendrerit laoreet augue
          nec molestie. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.</p>
   
          <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>

          
          
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