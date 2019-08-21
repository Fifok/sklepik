import React, {Component} from "react";
import request from "request";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        request({
            method: "POST",
            url: "http://localhost:8080/login",
            form: this.state
        },(err,res,body)=>{
            console.log(body);
        });

        event.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="nickname" value={this.state.nickname} placeholder="Nickname" onChange={this.handleChange}/>
                    <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Login;