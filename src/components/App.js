import React, {Component} from "react";
import Navbar from "./Navbar";
import Content from "./Content";

class App extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            shouldComponentRerender: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    
    render(){
        return(
        <div>
            <Navbar/>
            <Content/>
        </div>
        )
    }
}

export default App;