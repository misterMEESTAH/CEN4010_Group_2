import React, {useState} from 'react'
import ReactStars from "react-rating-stars-component"
import axios from "axios"
import Button from 'react-bootstrap/Button';



export const Comments = props => {
const [ comment, setComment] = useState(null)
const [rating , setRating] = useState(0)
const [showNickName, setShowNickName] = useState(false)

function getComment(event)
{
  setComment(event.target.value)
}
const ratingChanged = (rating) =>{
  setRating(rating)
}

const getCheckboxValue = (event) => {
  setShowNickName(event.target.checked)
}

const submitData = () => {
  let payload = {
    comments: comment, 
    starRating: rating, 
    title: props.bookTitle, 
    username: showNickName  ? JSON.parse(localStorage.getItem('user')).nickname : "anonymous"
  }
  axios({
    method: 'post',
    url: 'http://localhost:5000/comments/add',  
    data: payload
  });
}

const checkboxStyle =  {
  position: "relative", 
  opacity: "100", 
  pointerEvents: "all",
marginRight: "10px"}

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
   <input type="checkbox" style={checkboxStyle} id="nickname" onChange={getCheckboxValue}></input>    
    <label for="nickname"> show nickmame?</label>
    <td><Button variant ="outline-dark" onClick = {submitData} >Add Comment</Button></td>
    <br></br>
    <br></br>
    <h2>Comments</h2>

  </div>
  
  );
}


    /* position: relative; */
    /* opacity: 0; */
    /* pointer-events: none; */
export default Comments;