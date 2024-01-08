const PostSchema = require("./PostApiForInsertSchema");
const express = require("express");
const apiForInsert = express.Router();

apiForInsert.post("/", async (req, res) => {                       //email is primary key 
                                                                   // data is array of object
 //To check email is present or not
  const findEmailIsPresent = await PostSchema.findOne({
    email: req.body.email,
  });

  console.log("findEmailIsPresent => " , findEmailIsPresent)

  if (findEmailIsPresent) {

    //checking whether data is presnt or not in data array
    const findDate = findEmailIsPresent.data.filter(
      (v) => v.date === req.body.data[0].date
    );

    const dateToUpdate = req.body.data[0].date;
    const newContent = req.body.data[0].content;
   
    //if date present
    if (findDate.length > 0) {
      const updateData = await PostSchema.updateOne(              //we r finding that data using data(array):{$elemMatch:{date:"24/03/2023"}} elemMatch used to find value of that key
        { data: { $elemMatch: { date: dateToUpdate } } },
        { $set: { "data.$.content": newContent } }               // data.$.content it will insert content in that object only
      );                                                         // data.$[].conctent it will insert in all object if there r same object

      if (updateData.acknowledged) {
        res.status(200).json({
          status: true,
          message: "Data updated",
          record: updateData,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Data not updated updated",
        });
      }
    } else {
      console.log("inserted")
      try {
        const addnewData = await PostSchema.updateOne(                    //if date is not present in data then we have to insert the object in data array
          { email: req.body.email },
          { $push: { data: { date: dateToUpdate, content: newContent } } } //pushing object in data
        );

        if (addnewData.acknowledged) {
          res.status(200).json({
            status: true,
            message: "Data inserted successfully",
          });
        } else {
          res.status(200).json({
            status: false,
            message: "Data not inserted",
          });
        }
      } catch (e) {
        res.status(200).json({
          status: false,
          message: `${e.message}`,
        });
        console.log(e.message);
      }
    }
  } else {
    const insertData = new PostSchema(req.body);   //if email is not present we r inserting data
    const saveData = await insertData.save();

    if (saveData.email !== "") {
      console.log("data SAve")
      res.status(200).json({
        status: true,
        message: "Data saved",
        record: saveData,
      });
    } else {
      console.log("data not saved")
      res.status(404).json({
        status: false,
        message: "Data not save",
      });
    }
  }
});

module.exports = apiForInsert;
