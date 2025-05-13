const express = require('express');
const dotenv=require('dotenv'); 
dotenv.config();
const short=require("short-uuid");
const {status}=require("express/lib/response"); 
const fs = require('fs');
const path = require('path');

const app = express();


app.use(express.json());

const dataFilePath = path.join(__dirname, 'dev-data.json');


let userDataStore;
try {
  const strContent = fs.readFileSync(dataFilePath, 'utf8');
  userDataStore = JSON.parse(strContent);
} catch (error) {
  console.error('Error reading or parsing dev-data.json:', error);
  userDataStore = {}; 
}


app.get('/api/user', getAllUsers)

function getAllUsers(req,res){
    
  try{
    console.log('I am inside get');
    if(userDataStore.length==0){
             throw new Error("No Users Found"); 
    }
    res.status(200).json({
         status: 'good',
         message: userDataStore,
    })

  }catch(err){
res.status(404).json({
    status:"fa",
    message:err.message
})
  }
}


app.get('/api/user/:userId', getUserByid);
function getUserByid(req,res){
  try{
    const usersdetails=req.params.userId; 
    const usersId=getUserByid(usersdetails)
  
    if(usersId=='no user found'){
             throw new Error(`user with ${usersdetails}`); 
    }else{
    res.status(200).json({
         status: 'good',
         message: usersId,
    })
  }
  }catch(err){
res.status(404).json({
    status:"failure",
    message:err.message
})
}
}


app.use(express.json())

app.use(function(req,res,next){
    if (req.method){
        const userDetail=req.body; 
        const isEmpty=Object.keys(userDetail).length==0;
        if (isEmpty){
            res.status(404).json({
                status:'failse',
                message:"dfghjk fghjbn"
            })
        }else{
            next()
        }
    }
})
app.post("/api/user",createUserhandler);

function createUserhandler(){
  const id=short.generate(); 
  const userDetails=req.body;
 userDetails.id=id;  
 userDataStore.push(userDetails); 
 const strUserStore=JSON.stringify(userDataStore);
 fs.writeFileSync("./dev-data.json",strUserStore); 
  res.status(200).json({
     status:"suc",
     message:"good ine" 
  }) 
}


app.use((req, res) => {
  res.status(404).json({
    status: 'failure',
    message: '404 Not Found'
  });
});




const port = process.env.PORT;
app.listen(port, () => {
  console.log(`lavanya ${port} port`);
});
