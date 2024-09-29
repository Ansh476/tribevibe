const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');


const communityroutes = require('./routes/communityroutes');
const userroutes = require('./routes/userroutes');
const adminroutes = require('./routes/adminroutes');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/api/community', communityroutes)
app.use('/api/users', userroutes)
app.use('/api/admin', adminroutes)

mongoose
  .connect("mongodb+srv://anshsarfare:qnRjkR2dj9gcaUvU@cluster0.3m3h0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(()=>{
    app.listen(5000)
  })
  .catch(err => console.log(err));