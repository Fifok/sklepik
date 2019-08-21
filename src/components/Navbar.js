import React,{Component}from "react";
import Button from "./Button";
import {Link, BrowserRouter as Router} from "react-router-dom";
// import Signup from "./Signup";
// import Login from "./Login";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    render(){
        return (
        <Router>
            <div className='navbar'>
                <Link className="button" to="/login"><Button name="Login"/></Link>
                <Link className="button" to="/signup"><Button name="Sign up"/></Link>
            </div>
        </Router>
    );
    }
}

export default Navbar;