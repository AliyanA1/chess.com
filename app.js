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

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{title:"Chess Game"});
})

//socket connection
io.on("connection",(uniqueSocket)=>{
    console.log("conected")
})


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});