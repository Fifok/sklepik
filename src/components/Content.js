import React, {Component} from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

class Content extends Component{
    render(){
        return (
            <Router>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={Signup}></Route>
            </Router>
        )
    }
}

export default Content;