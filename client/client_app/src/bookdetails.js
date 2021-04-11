import React, { Component } from "react";
import {Link } from 'react-router-dom';
import './App.css';
import booksFromDB from "./load_books"
import PrismaZoom from 'react-prismazoom';
import Comments  from './comments'
import axios from "axios";
import Browse from "./browse";
import AuthorDetails from "./AuthorDetails"


  class BookDetails extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true, 
        book: {}, 
        comments: []
      };
      console.log(this.props)
  }
  
   async componentDidMount() {
    let books = await booksFromDB        
    let commentsResponse = await axios.get('http://localhost:5000/comments')    
    this.setState({
      comments: commentsResponse.data.comments,
      book: this.props.book,
      isLoading:false,
      back: false,
      authordetails: false
    })
    console.log(this.state.comments)
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

      if(this.state.back){
        return <Browse></Browse>;
      }
      if(this.state.authordetails){
        return <AuthorDetails author={book['author']}></AuthorDetails>
      }

      return (
        <div>
          <button className= "waves-effect waves-light btn" onClick={() => {this.setState({back: true})}}>Back</button>
          <ul> 
            <div class="container">
              <div clas="row">
                <div class="col s6">
                  <div class="card" key={book['title']}>
                    <PrismaZoom maxZoom={1.5}>
                      <img src={book['image']} alt='book cover' />
                    </PrismaZoom>
                    <button onClick={() => {this.setState({authordetails: true})}}>{book['author']}</button>
                      <div class='card-action'>
                        <h3>Category: {book['category']}</h3>
                        <h3>Format: {book['format']}</h3>
                        <h3>Price: {book['price']}</h3>
                        <h3>Rating: {book['rating']}</h3>
                        <h3>Description:</h3> <p>{book['description']}</p> 
                      </div>
                  </div>
                </div>
              </div>
            </div>            
          </ul> 
          
          <Comments bookTitle={book.title}/>

<div class="container">
        <ul class="card">  
            <div class="material-icons">comment<h2>Comments</h2></div>
            <br></br>
            <div class='card-action'><span>{commentsList}</span></div>
        </ul>

</div>
</div>
      );
    }
  }



  export default BookDetails;
