const express=require("express");
const app=express();
const http = require('http').createServer(app);
const mongoose = require("mongoose");
const socketio = require('socket.io');
const xlsx=require("xlsx");
const cors=require("cors");

var Branch_db=require("./models/branch");


corsOptions={
  cors: true,
  origins:["http://localhost:3000"],
 }
 const io = socketio(http, corsOptions);


const mongoURI = 'mongodb+srv://mohan:passwordmohan@cluster0.xtzpa.mongodb.net/super?retryWrites=true&w=majority';
mongoose.connect(mongoURI).then(()=>{
  console.log("db connected");
}).catch((err)=>{
  console.log(err);
});

//for initialisation

// const wb = xlsx.readFile("BeetleNut_Data.xlsx").Sheets["Sheet1"];
// const data=xlsx.utils.sheet_to_json(wb);
// const {seed}=require('./routes/initialise');
// seed(data);

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

var branchRoute=require('./routes/branch');
var alertRoute=require('./routes/alert');


app.use('/alert',alertRoute);
app.use('/branch',branchRoute);


app.get("/",(req,res)=>{
    console.log("app.get");
    res.send("Hello");    
})

  io.on('connection', socket => {

    socket.on('alert', ({pin,contact}) => {
        socket.broadcast.to(pin).emit('notification',pin,contact);
    })
    socket.on('noBranch', ({pin,contact}) => {
      socket.broadcast.to("noBranch").emit('notification',pin,contact);
  })

    socket.on('admin', () => {
      socket.join("noBranch");
      console.log("admin app.js");
      Branch_db.find().distinct('Pincode_Covered', function(error, item) {
      if(error)
      console.log(error);
      else{
        item.forEach(e => {
          socket.join(e);
        });
        
      }
      });
    })

    socket.on('join', ({brname}) => {

      Branch_db.find({Branch_Name: brname},function(err,item){
        if(err){
            console.log(err);
        }else{
        item.forEach(e => {
          socket.join(e['Pincode_Covered']);
        });
        }
     });
    });
  });
  

const PORT = process.env.PORT||5000;
http.listen(PORT,function(){
    console.log("listening");
})