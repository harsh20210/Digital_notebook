const express = require("express");
const getApi = express.Router();
const GetAllRecords = require("./PostApiForInsertSchema");

getApi.post("/", async (req, res) => {
  try {
  const getAlldata = await GetAllRecords.find({ email: req.body.email });

     if(getAlldata.length > 0 ) {
        res.status(200).json({
            status: true,
            data: getAlldata[0].data,
          });
     } else {
        res.status(200).json({
            status: false,
            message:"No Data Found!",
            data: [],
          });
     }

    
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

module.exports = getApi;
