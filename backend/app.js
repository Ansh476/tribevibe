const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 

const communityRoutes = require('./routes/communityroutes');
const userRoutes = require('./routes/userroutes');
const adminRoutes = require('./routes/adminroutes');

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/community', communityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

mongoose
  .connect(process.env.MONGODB_URI) 
  .then(() => {
    app.listen(port,(req,res)=>{
      console.log("listening to port 5000")
    })
  })
  .catch(err => console.log(err));

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.status || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
