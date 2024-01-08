const mongo = require("mongoose");

const postApiForScheme = new mongo.Schema({
    name:{
        type:String,
        required:[true , "name is required"]
    },
    email:{
        type:String,
        required:[true , "name is required"]
    },
    data:{ type : Array , "default" : [] }

    //can also be wriiten has
    //data :[ {date:string , content: string} ]
})

const PostApiForInsert = mongo.model("ALL RECORDS" , postApiForScheme);

module.exports = PostApiForInsert