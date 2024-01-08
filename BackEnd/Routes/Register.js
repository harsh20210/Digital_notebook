const express = require('express');
const appForReg = express.Router();
const Regschema = require("./Regscheme");

appForReg.post("/" , async(req , res) => {
    try {
        const reg = new Regschema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
    
        const dataSave = await reg.save();
       
        if(dataSave.name !== "") {
            res.status(200).json({
                status:true,
                message:"Register Successfully",
                record:dataSave
            })
        }
    } catch(e) {
        res.status(404).json({
            status:false,
            message:e.message.includes("duplicate") ? "Email already exits" : `${e.message}`
        })
    }
})

module.exports = appForReg



