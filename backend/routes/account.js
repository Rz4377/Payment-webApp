const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const authenticateUser = require('./authenticate');
const { default: mongoose } = require('mongoose');
const accountRouter = express();

// protected routes
accountRouter.use(authenticateUser);

accountRouter.get("/balance",authenticateUser,async(req,res)=>{
    try{
        let accountFound = await Account.findOne({
            User : req.user
        })
        if(accountFound){
            res.json({
                balance : accountFound.balance 
            })
        }
    }
    catch(error){
        res.status(403).json({
            error : "couldn't find account or trouble connecting database"
        })
    }
    
})

accountRouter.put("/transfer",authenticateUser,async(req,res)=>{
    console.log("here")
    let {to, amount} = req.body;
    console.log("to" , to)
    console.log("amount" ,amount)
    const session = await mongoose.startSession();
    session.startTransaction();
    // comment it later
    try {
        await Account.findOneAndUpdate({User:req.user},
            { $inc: { balance: -amount }},
            {session}
        );

        await Account.findOneAndUpdate({User:to},
            { $inc: { balance: amount }},
            {session}
        );

        await session.commitTransaction();

        console.log('Transaction committed.');
        res.status(200).json({
            msg : "transaction completed"
        })
    } catch (error) {
        await session.abortTransaction();
        console.error('Transaction aborted due to an error:', error);
        res.status(403).json({
            msg : "transaction failed"
        })
    } finally {
        session.endSession();
    }
});

module.exports = accountRouter;