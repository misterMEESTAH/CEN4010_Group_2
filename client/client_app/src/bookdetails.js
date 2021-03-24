import React, { Component } from "react";
import './App.css';
import booksFromDB from "./load_books"
import PrismaZoom from 'react-prismazoom';

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
      this.setState({book: books[0]})
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
        </div>
      );
    }
  }



  export default BookDetails;