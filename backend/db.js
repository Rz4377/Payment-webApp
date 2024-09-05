const mongoose = require('mongoose');
const { Schema } = mongoose;

let connect = async() =>{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("connected")
}
connect();

// userSchema
const userSchema = new Schema({
    firstName : {type:String , required: false},
    username : {type:String , required: true},
    password : {type:String , required: true}
});

const User = mongoose.model('User', userSchema);

// accountSchema
const accountSchema = new Schema({
    User : {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        default:0
    }
})
const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account
};