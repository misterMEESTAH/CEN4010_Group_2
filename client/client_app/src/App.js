import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Browse from "./browse";
import Users from "./Users";
import WishList from "./WishList";
import './load_books';
import BookDetails from "./bookdetails";
import Cart from "./Cart"
import React, { useEffect } from "react";
import SignIn from './SignIn';
import Profile from './Profile'

function App() {
  return (
    <BrowserRouter>
            <div>
                <h1>Book Barn</h1>
                <ul className="header">
                    <li><NavLink exact to = "/">Home</NavLink></li>
                    <li><NavLink to = "/Browse">Browse</NavLink></li>
                    <li><NavLink to = "/Users">Register</NavLink></li>
                    <li><NavLink to = "/WishList">WishList</NavLink></li>
                    <li><NavLink to = "/BookDetails">BookDetails</NavLink></li>
                    <li><NavLink to = "/Cart">Cart</NavLink></li>
                    <li><NavLink to = "/SignIn">Sign In</NavLink></li>
                    <li><NavLink to = "/Profile">My Profile</NavLink></li>
                </ul>
                <div className = "content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/Browse" component={Browse}/>
                  <Route path="/Users" component={Users}/>
                  <Route path="/WishList" component={WishList}/>
                  <Route path="/BookDetails" component={BookDetails}/>
                  <Route path="/Cart" component={Cart}/>
                  <Route path="/SignIn" component={SignIn}/>
                  <Route path="/Profile" component={Profile}/>
                </div>
            </div>
        </BrowserRouter>  
  );
}

//function Home() {
//  return <h2>Home</h2>;
//}

//function Users() {
//  return <h2>Users</h2>;
//}

export default App;