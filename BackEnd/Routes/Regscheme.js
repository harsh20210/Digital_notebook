const moongo = require("mongoose");
const bcrypt = require("bcryptjs");
// const AutoIncrement = require('mongoose-sequence')(moongo);


const regscheme = new moongo.Schema({
//   _id: Number,
  name: { type: String, required: [true, "email is required field"] },
  email: { type: String, required: [true, "email is required field"] , unique:true },
  password: { type: String, required: [true, "password is required"] },
}
// { _id: false }
);

// regscheme.plugin(AutoIncrement);

regscheme.pre("save" , async function(next) {
    if(this.isModified("password")) {
        try {
            const bcryptData = await bcrypt.hash(this.password , 10);
            this.password = bcryptData;
        } catch(e) {
            console.log("Something Went wrong can not bcrypt the password")
        }
    }
    next();
})

const Registration = moongo.model("register", regscheme);

module.exports = Registration;