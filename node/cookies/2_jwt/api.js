const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config()

const {PORT} = process.env;
const cookieParser=require("cookie-parser"); 
const jwt=require('jsonwebtoken'); 
const promisify=require('util').promisify;
const promisifiedJWTSign=promisify(jwt.sign); 
const promisifiedJWTVerify=promisify(jwt.verify);
app.use(cookieParser());

const payload="1234";
const secretKey="i am secret"; 

app.get('/sign', async function(req,res){
         try{
          const authToken=await promisifiedJWTSign({data:payload},secretKey,{expiresIn:"1hr",algorithm:"HS256"}) ;
          res.cookie("jwt",authToken,{maxAge:10000000,httpOnly:true});           
        res.status(200).json({
            message:"signed the jwt and sending it in cookie",
            authToken 
        })
                 }catch(err){
                    res.status(400).json({
                        message:err.message,
                        status:"failu"              
                    })
         }
})
app.get('/verify',async function(req,res){
  try{
    const token = req.cookies.jwt;
  const decodedToken = await promisifiedJWTVerify(token,secretKey);
  res.status(200).json({
    message:"good lavanya",
    decodedToken 
  })
}catch(err){
    res.status(400).json({
        message:err.message,
        status:"failure" 
    })
}
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
