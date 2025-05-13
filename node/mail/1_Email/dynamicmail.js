const nodemailer=require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const fs=require('fs'); 
process.env.SENDGRID_API_KEY;
const techDetails={
    host:"smtp.sendgrid.net",
    port:465,
    secure:true,
    auth:{
        user:"apikey",
       
        pass:process.env.SENDGRID_API_KEY 
    }
}


const transporter=nodemailer.createTransport(techDetails);
const HTMLTemplateString=fs.readFileSync("../otp.html","utf-8"); 

async function sendEmailHepler(to,subject,html,text){
     try{
        let emailObject={
            to:to,
            from:process.env.SENDER_EMAIL,
            subject:subject,
             text:text,
             html:html
 }        
                  await transporter.sendMail((emailObject).then(()=>{
                      console.log("email is send");
                  }).catch(err=>(console.log(err))))
                }catch(err){
                     console.log(err);
                     throw new Error(err.message); 
                }       

}
async function sendHElper(otp,htmlTemplate,userName,to){
     const nameUpdate=htmlTemplate.replace("#{USER_NAME}",userName) 
     const finalHTml=nameUpdate.replace("#{OTP}" , otp)
     const text=`hi ${userName} is ${otp}`
     const subject="RESET Pass"; 
     await sendEmailHepler(to,subject,finalHTml,text)
     }
sendHElper(1234,HTMLTemplateString,"lavanya","lavanya@ccbp.in");     