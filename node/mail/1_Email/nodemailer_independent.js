let emailObject={
    to:"lavanyamaila3153@gmail.com",
    from:"pepcoding@ccbp.in",
    subject:"Testing SendGrid to send mail",
     text:"and easy",
     html:'<strong>Current POC </strong>'
}
transporter.sendMail((emailObject).then(()=>{
    console.log("email is send");
}).catch(err=>(console.log(err))))