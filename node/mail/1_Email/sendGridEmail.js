const sgMail=require("@sendgrid/mail");
const dotenv=require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg={
    to:"lavanyamaila3153@gmail.com",
    from:"abc@support.com",
    subject:"Testing Sendgrid to send email",
    text:"and easy to anywhere, even with node.js" ,
    html:"<strong>Current POC for sendGrid</strong>",
     
}
sgMail 
       .send(msg)
       .then(()=>{})
       .catch((err)=>{
        console.log(err); 
       })
