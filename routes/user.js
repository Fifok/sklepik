const router = require("express").Router();
const bodyParser = require("body-parser");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post("/signup", (req,res) => {
    if(!req.body.nickname || !req.body.password || !req.body.email){
        console.log("400 Invalid Details");
        res.status(400).send("400 Invalid Details");
    }else{
        userSchema.findOne({$or: [{nickname: req.body.nickname},{email: req.body.email}]}, (err, user)=>{
            if(err) console.error(err);
            if(user){
                console.log("400 User Actually Exists");
                res.status(400).send("400 User Actually Exists");
            }else{
                bcrypt.hash(req.body.password,10).then((hashedPassword)=>{
                    const newUser = new userSchema({
                        nickname: req.body.nickname,
                        email: req.body.email,
                        password: hashedPassword
                    },(err)=>{if(err) console.error(err);});
                     
                    newUser.save((err)=>{
                        if(err) console.error(err);
                        console.log("200 OK. User has been added to db");
                        res.status(200).json(newUser);
                    });                    
                });
               
            }
        });
    }
});

router.post("/login",(req,res)=>{
    if(!req.body.nickname || !req.body.password){
        console.log("400 Invalid Details. Empty input");
        res.status(400).send("400 Invalid Details. Empty input");
    }else{
        userSchema.findOne({nickname: req.body.nickname},(err,user)=>{
            if(err) console.error(err);
            if(!user){
                console.log("400 Invalid Details. Wrong nickname or password");
                res.status(400).json({"message":"400 Invalid Details. Wrong nickname or password."});
            }else{
                bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
                    if(err) console.error(err);
                    if(isMatch){
                        console.log("200 OK. User logged in");
                        res.status(200).json({"message": "200 OK. User logged in"});
                    }else{
                        console.log("400 Invalid Details. Wrong nickname or password");
                        res.status(400).json({"message":"400 Invalid Details. Wrong nickname or password."});
                    }
                });
            }    
        });
    }
});

router.post("/deleteUser", (req,res)=>{    
    userSchema.findByIdAndDelete(req.body.userID,(err,user)=>{
        if(err) console.error(err);
        if(user){
            console.log("200 OK. User removed");
            res.status(200).json({message: "User has been removed"});
        }else{
            console.log("User hasn't existed in db");
            res.status(400).json({message: "User hasn't existed in db"});
        }
        
    });
   
});

router.get("/getAllUsers", (req,res)=>{
    userSchema.find((err, userList)=>{
        if(err){
            return console.error(err);
        } 
        console.log("UserList created successfully. Sending.");
        return res.status(200).json(userList);
    });
});


module.exports = router;