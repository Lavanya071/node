const mongoose=require('mongoose'); 

const userSchemaRules={
name:{
  type:String,required:true 
},
email:{
  type:String,required:true
},
password:{type:String,required:true,milength:8,validate:function(){
  return this.password==this.confirmedPassword
}
 },
confirmedPassword:{type:String,required:true},
createaAt:{type:Date,default:Date.now()}
}
const userSchema=new mongoose.Schema(userSchemaRules);

const userModel=mongoose.model("userModal",userSchema); 
// ... rest of your Express app setup ...
module.exports=userModel;