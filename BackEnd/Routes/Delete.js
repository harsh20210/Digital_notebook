const express = require("express");
const appForDelete = express.Router();
const GetAllRecords = require("./PostApiForInsertSchema");

appForDelete.post("/" , async(req,res) => {
    const email = req.body.email;
    const date = req.body.date;
    
    const getRecords = await GetAllRecords.findOne({email:email , data:{ $elemMatch: { date:date } } })

  if(getRecords) {
    try{
        const deleteTheRecord = await GetAllRecords.updateOne({ email:email} , { $pull : { data:  {date:date }  } })
        
        if(deleteTheRecord.acknowledged) {
            res.status(200).json({
                status: true,
                message: "Data deleted",
              });
        } else {
            res.status(200).json({
                status: false,
                message: "Data not deleted",
              });
        }

    } catch(e) {
        res.status(200).json({
            status: false,
            message: e.message,
          });
    }
  } else {
    res.status(200).json({
        status: false,
        message: "Records not present",
      });
  }
})

module.exports = appForDelete;