require("dotenv").config();
const express=require("express");
const socket=require("socket.io");
const http=require("http");
const {Chess}=require("chess.js");
const path=require("path");
const { title } = require("process");
const port= process.env.PORT || 5000;

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
    //come form frontend
    uniqueSocket.on("move", (move) => {
        try {
            if (chess.turn() === 'w' && uniqueSocket.id !== player.white) return;
            else if (chess.turn() === 'b' && uniqueSocket.id !== player.black) return;
    
            const result = chess.move(move);
            if (result) {
                io.emit("move", move); // Send move to all players
                io.emit("boardState", chess.fen()); // Send updated board state to all
            } else {
                uniqueSocket.emit("Invalid Move", move);
            }
        } catch (error) {
            uniqueSocket.emit("Invalid Move", move);
        }
    });
    
})


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});