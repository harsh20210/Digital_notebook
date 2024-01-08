const express = require('express');
const app = express();
const mongoos = require('mongoose');
const cors = require('cors')
require('dotenv').config()

//Routes
const register = require("./Routes/Register");
const loging = require("./Routes/Login");
const insertData = require("./Routes/PostApiForInsert");
const deleteFile = require("./Routes/Delete");
const getApi = require("./Routes/GetAPi");
const logoutApi = require("./Routes/Logout");

console.log("new => " , `${process.env.MONGODB_URL}` );

mongoos.connect(`${process.env.MONGODB_URL}/TestingDocker`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('connection establish......'))
.catch((error) => console.log("Error in connection => " ,  error) )

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb' , extended: true }));
app.use(cors())

app.use('/backend/register' , register );
app.use('/backend/login' , loging);
app.use('/backend/insertValue' , insertData);
app.use('/backend/deleteCommand' , deleteFile);
app.use('/backend/getApi' , getApi );
app.use('/backend/logout' , logoutApi );

const port = process.env.PORT || 5001

app.listen(port , () => {
    console.log(`listening on port ${port}`);
})


