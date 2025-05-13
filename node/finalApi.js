const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();


const { PORT, DB_USER, DB_PASSWORD } = process.env;


const encodedUser = encodeURIComponent(DB_USER);
const encodedPassword = encodeURIComponent(DB_PASSWORD);
const dbURL = `mongodb+srv://${encodedUser}:${encodedPassword}@cluster0.dc318cy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });


  app.use(express.json());

  const UserRouter=require('./router/UserRouter')
  const ProductRouter=require('./router/ProductRouter');
  
  app.use('/api/user',UserRouter);
  app.use('/api/Product',ProductRouter);



//app.get('/search', function(req, res){
 // console.log(req.query);
 // res.status(200).json({
    //message: req.query,
   // status: "success"
 // });
//});


  
// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: '404 Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
