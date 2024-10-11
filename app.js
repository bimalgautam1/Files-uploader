const express = require('express');
const app = express();
const mongoose = require("mongoose");
const connecttodb = require('./database/index.js');
const blog = require('./model/fileModel.js');
// const multer = require('multer');
const {multer, storage} = require('./middleware/multerConfig.js');
const upload = multer({storage:storage});
require('dotenv').config();
app.use(express.json());
connecttodb();
const { STATUS_CODES } = require('http');

app.get('/',(req,res)=>{
    res.status(200).send("This is home page");
})

app.post('/upload',upload.single('image') ,async(req,res)=>{
    const {text} = req.body
    const filename = req.file? req.file.filename : null;
    if(!text){
        return res.status(404).json({
            message: "Please Enter the Text"
        })
    }
        await blog.create({
            text,
            image:filename
        })
        res.status(200).json({
            message: "Success"
        })
});



app.listen(process.env.PORT,()=>{
    console.log(`Server running`)
})
