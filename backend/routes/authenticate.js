const jwt = require('jsonwebtoken');
const { User } = require('../db');

async function authenticateUser(req,res,next){
    console.log("inside")
    let token = req.headers.authorization;
    let tokenCode = token? token.split(" ")[1] : null;

    if(tokenCode === null){
        return res.status(403).json({
            msg : "invalid token / token is null"
        })
    }
    try{
        const decoded = jwt.verify(tokenCode , process.env.SECRET);
        console.log(decoded)
        try{ 
            let response = await User.findOne({
                username : decoded.username,
                _id : decoded.user_id
            })
            console.log(response);
            if(response){
                req.user = response._id;
                console.log("going there")
                next();
            }
            else{
                console.log("couldn't authenticate user")
                res.status(403).json({
                    error : "couldn't authenticate user"
                })
            }
        }catch(error){
            console.log(error);
            res.status(403).json({
                error : "Error while authenticating"
            })
        }
    }
    catch(error){
        console.log("jwt error middleware : ",error)
    }
    
    
    
}

module.exports = authenticateUser;