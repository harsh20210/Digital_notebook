const express = require("express");
const appForLogout = express.Router();
const LogoutSchema = require("./LoginScheme");

appForLogout.post("/" , async(req,res) => {
    const email = req.body.email;
    const getRecords = await LogoutSchema.findOne({email:email })
    
    if(getRecords) {
       const deleteRecordsFormLogin = await LogoutSchema.deleteOne({email:email})
       if(deleteRecordsFormLogin.acknowledged) {
        res.status(200).json({
            status: true,
            message: "Logout successfully",
        });
       } else {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
        });
    }
    } else {
        res.status(200).json({
            status: false,
            message: "User have not login",
        });
    }
    console.log("getRecords => " , getRecords);
})


module.exports = appForLogout;