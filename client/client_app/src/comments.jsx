import React, {useState} from 'react'
import ReactStars from "react-rating-stars-component"
import axios from "axios"
import Button from 'react-bootstrap/Button';




export const Comments = props => {
const [ comment, setComment] = useState(null)
const [rating , setRating] = useState(0)

function getComment(event)
{
  setComment(event.target.value)
}
const ratingChanged = (rating) =>{
  setRating(rating)
}



const submitData = () => {
  let payload = {
    comments: comment, 
    starRating: rating, 
    title: props.bookTitle, 
    username: "JC TEST USER"
  }
  
  axios({
    method: 'post',
    url: 'http://localhost:5000/comments/add',  
    data: payload
  });
}


  return (     
  <div>
    <h2 align = "Left" style ={{color:"black"}}>Review this Book</h2>
    <ReactStars     
    activeColor="Orange"
    value={rating}
    size = {30} 
    count = {5} 
    isHalf = {true} 
    onChange = {ratingChanged}        
    />


    <td><input style = {{height:25, width:350, borderColor: 'grey', borderWidth:2}} maxLength = {200}
    type = "text" value={comment} onChange={getComment}/></td>
    <div class="commentbox"></div> 

    <td><Button variant ="outline-dark" onClick = {submitData} >Add Comment</Button></td>
    <br></br>
    <br></br>
    <h2>Comments</h2>

  </div>
  
  );
}



export default Comments;