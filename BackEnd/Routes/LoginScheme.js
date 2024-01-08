const mongo = require("mongoose");


const mongoScheme = new mongo.Schema({
    email:{
        type:String,
        required:[true , "userId is required"]
    },
    password: {
        type:String,
        required:[true , "Password is required"]
    },
    date: {
        type:Date,
        default:Date.now,
    }
})

const Login = mongo.model("LoginDetails" , mongoScheme)

module.exports = Login