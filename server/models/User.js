const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique : true,
      trim:true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    googleID: {
      type: String
    },
    githubID: {
      type: String
    },
    userPhoto:{
      type:String
    },
    code_js:{
      type:String
    },
    code_py:{
      type:String
    },
  });

module.exports = mongoose.model("User", UserSchema);
