const express = require('express');
var jwt = require('jsonwebtoken');

const {User , Account} = require('../db');
const authenticateUser = require('./authenticate');

const userRouter = express()
const SECRET = process.env.SECRET;

userRouter.post("/signup",async(req,res)=>{
    let {firstName , username , password} = req.body;
    try{
        let existingUser = await User.findOne({
            username
        })
        if(existingUser){
            res.status(403).json({
                msg : "User already exists"
            })
            return ;
        }
    }
    catch(error){
        res.json({
            msg : "issue connecting database"
        })
        return ;
    }
    try{
        let response = await User.create({
            firstName,
            username,
            password
        })
        if(response){
            try{
                let accountData = {
                    User : response._id ,
                    balance:parseInt(process.env.DEFAULT_BALANCE)
                };
                await Account.create(
                    accountData
                );

                res.status(201).json({
                    msg : "account created successfully"
                })
            }
            catch(error){
                res.status(404).json({
                    error : error
                })
                return ;
            }
            
        }   
    }
    catch(error){
        res.status(404).json({
            error : "error occured while creating user"
        })
    }
    
})

userRouter.post("/signin",async(req,res)=>{
    let {username , password}  = req.body;
    try{
        let response = await User.findOne({
            username,
            password
        })
        if(!response){
            res.status(403).json({
                msg : "User dosen't exist"
            })
            return ;
        }
        else{
            let token = jwt.sign({username : username , user_id : response._id},SECRET);
            res.status(200).json({
                authorization : token,
                firstName : response.firstName,
                username : username 
            })
        }
    }
    catch(error){
        res.json({
            error : "database can't be connected"
        })
    }
})

userRouter.get("/me",authenticateUser,async(req,res)=>{
    
    try{
        let response = await User.findOne({
            _id : req.user
        })
        if(response){
            res.status(200).json({
                firstName : response.firstName,
                username : response.username
            })
        }
        else{
            throw error;
        }
    }
    catch(error){
        res.status(403).json({
            error : error
        })
        console.log(error)
    }
})

userRouter.get("/users",authenticateUser,async(req,res)=>{
    console.log("inside users")
    try{
        
        let response = await User.find();
        console.log("inside here")
        if(response){
            let mappedData = response.map((user)=>{
                return {
                    userId : user._id,
                    username : user.username ,
                    firstName : user.firstName
                }
            })
            console.log("mapped data",mappedData)
            res.status(200).json({
                mappedData
            });
        }
        else{
            res.status(403).json({
                msg : "no user found"
            })
        }
    }  
    catch(error){
        res.status(404).json({
            error: "unable to send request : " + error
        })
    }
})

module.exports = userRouter;