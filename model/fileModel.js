const{text}=require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const filesSchema = new Schema({
    text:{
        type:String
    },
    image:{
        type:String
    }
})
const files = mongoose.model('files',filesSchema);
module.exports = files;