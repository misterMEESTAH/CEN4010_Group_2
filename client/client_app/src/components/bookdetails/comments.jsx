import React from 'react';
import ReactStars from "react-rating-stars-component";
import React, {useState} from 'react'



function App() {
const [ data, setData] = useState(null)
const [ print, setPrint] = useState(false)

function getData(val)r
{
  setData(val.target.value)
  setPrint(false)
  console.warn(val.target.value)
}
const ratingChanged = (rating) =>{
alert (`You have given this book a ${rating} star rating.`)
}

  return ( 

    
    
  <div className = "App">
    {
      print?
      <h1>{data}</h1>
      :null
    }
    
    <h2>Write a Comment</h2>
    <input type = "text" onChange = {getData}/>
    <div class="commentbox"></div>
    <button onClick = {()=>setPrint(null)}>Add Comment</button>
    
    
    <ReactStars    
    activeColor="Turquoise "
    size = {42} 
    count = {5} 
    isHalf = {true} 
    onChange = {ratingChanged}

    
        
    />
    
  </div>
  
  );
}



export default Comments;