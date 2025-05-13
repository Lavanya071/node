const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config()

const {PORT} = process.env;
const cookieParser=require("cookie-parser"); 
app.use(cookieParser());

  app.get("/",function(req,res){
    res.cookie("prevPage", "home",  
      {maxAge:100000000000,
      httpOnly:true})  
    res.status(200).json({
      message:"thanks"
    })
  })
app.get("/products",function(req,res){
  console.log(req.cookies)
  let msgStr="";
  if(req.cookies.prevPage){
    msgStr=`you have already visited ${req.cookies.prevPage}`
  }
  res.status(200).json({
    message:"thank dfghjk hjyou"
  })
})
app.get("/clearCookies",function(req,res){
   res.clearCookie("prevPage" , {path:"/"});
   res.status(200).json({
    message:"i have cleared cookie"
   })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
