import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as HashRouter,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Browse from "./browse";
import Users from "./Users";
import WishList from "./WishList";
import './load_books';

function App() {
  return (
    <HashRouter>
            <div>
                <h1>Book Barn</h1>
                <ul className="header">
                    <li><NavLink exact to = "/">Home</NavLink></li>
                    <li><NavLink to = "/Browse">Browse</NavLink></li>
                    <li><NavLink to = "/Users">Users</NavLink></li>
                    <li><NavLink to = "/WishList">WishList</NavLink></li>
                </ul>
                <div className = "content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/Browse" component={Browse}/>
                  <Route path="/Users" component={Users}/>
                  <Route path="/WishList" component={WishList}/>
                </div>
                </div>
        </HashRouter>  

  );
}

//function Home() {
//  return <h2>Home</h2>;
//}

//function Users() {
//  return <h2>Users</h2>;
//}

export default App;