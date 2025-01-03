require("dotenv").config();
const express=require("express");
const socket=require("socket.io");
const http=require("http");
const {Chess}=require("chess.js");
const path=require("path");
const { title } = require("process");
const port= process.env.PORT || 3000;

const app=express();
const server=http.createServer(app);
const io=socket(server);

const chess= new Chess();
let player={};
const currentPlayer='w';

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{title:"Chess Game"});
})

//socket connection
io.on("connection",(uniqueSocket)=>{
    
    if(!player.white){
        player.white=uniqueSocket.id;
        uniqueSocket.emit("playerRole","w");
    }
    else if(!player.black){
        player.black=uniqueSocket.id;
        uniqueSocket.emit("playerRole","b");
    }
    else{
        uniqueSocket.emit("spectator");
    }

    uniqueSocket.on("disconnect",()=>{
        if(uniqueSocket.id==player.white){
           delete player.white;
        }
        else if(uniqueSocket.id==player.black){
            delete player.black;
        }
    })
})


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});