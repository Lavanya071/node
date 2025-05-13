const express=require('express');
const app=express();

const {PORT} = process.env;
const cookieParser=require("cookie-parser"); 
app.use(cookieParser());

const signupController=async function(req,res){
   try{
const userObject=req.body;
let newUser=await userModel.create(userObject)
res.status(201).json({
    message:"user created",
    user:newUser,
    status:"success"
})
   }catch(err){
    res.status(404).json({
        status:"fail",
        message:err.message
       })
   }
}
const loginController=async function(req,res){
   try{
      let {email,password} = req.body; 
      let user=await userModel.findOne({email}) ;
      if(user){
        let areEqual=password==user.password;
     if(areEqual){
         let token=await promisifiedJWTSign({id:user['id']},JWT_SECRET)
         console.log("sending Token"); 
         res.cookie("JWT",{matchAge:900000,httpOnly:true,path:"/"}); 
         res.status(200).json({
            message:"user logged In",
            status:"success"
        })
     } else{
        res.status(404).json({
            status:"fail",
            message:"email or password is incor"
           })
     }
      }
   }catch(err){
    res.status(404).json({
        status:"fail",
        message:err.message
       })
   }
}
const protectRouteMiddleware=async function(req,res){
     try{
let decrypted=await promisifiedJWTVerify(req.cookies.JWT,JWT_SECRET);
if (decrypted){
    let userId=decrypted.id;
    req.userId=userId;
    next()
}


      } catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message  
           })
        }
     
}
const getUserData=async function(req,res){
     try{
        const id =req.userId;
        const user=await userModel.findById(id); 
        res.status(200).json({
            message:"user successfull",user
        })
     }catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message  
           })
        
     }
}
app.post('/signup',signupController);
app.post('/login',loginController);
app.get('/allowIfloggedInUSer',protectRouteMiddleware,getUserData);
app.use(function(req,res){
   res.status(404).json({
    status:"fail",
    message:"404 Page not there"
   })
})




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
