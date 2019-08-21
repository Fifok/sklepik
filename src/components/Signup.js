import React, {Component} from "react";
import request from "request";

class Signup extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            nickname: "",
            email: "",
            password: "",
            userList: []
        }
    }

    componentWillMount(){
        this.updateUserList();
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event){
        request({
            method:"POST",
            url: "http://localhost:8080/signup",
            form: this.state
        },(err,res,body) => {
            const obj = JSON.parse(body);
            this.state.userList.push(obj);
            const newList = this.state.userList;
            this.setState({userList: newList});
        });
        event.preventDefault();
    }

    handleClick(event){
        request({
            method:"POST",
            url: "http://localhost:8080/deleteUser",
            form: {userID: event.target.name}
        },(err, res, body)=>{
            if(err) console.error(err);
            if(res.statusCode === 200){
                console.log(JSON.parse(body).message);
                this.updateUserList();
            }else{
                console.log(body.message);
            }
        });
    }

    render(){
        const list = this.state.userList.map((user)=>{
            return (
                <li key={user._id}>
                    {`${user._id} ${user.nickname}`} <button name={user._id} onClick={this.handleClick}> click here </button>
                </li>
            )
        });
        return (
            <div>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <input className="input" name="nickname" value={this.state.nickname} placeholder="Nickname" onChange={this.handleChange}/>
                    <input className="input" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange}/>
                    <input className="input" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}/>
                    <input type="submit" value="Sign up"/>
                </form>
                <ul> 
                {list}
                </ul>
            </div>
        )
    }

    updateUserList(){
        request.get("http://localhost:8080/getAllUsers",{},(err, res, body)=>{
            this.setState({userList: JSON.parse(body)});
        });
    }
}


export default Signup;