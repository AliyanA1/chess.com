// Initiate socket connection
const socket=io();
const chess=new chess();
const boardElement=document.querySelector(".chessboard");

let draggedPiece=null;
let squareSource=null;
let playerRole=null;


const Renderboard=()=>{
    boardElement.innerHTML="";
    chess.board().forEach((row,rowIndex)=>{
        row.forEach((square,squareIndex)=>{
            const squareElement=document.createElement("div");
            squareElement.classList.add("square",
                (rowIndex+squareIndex)%2==0? "light":"dark"
            );
        })
    })
};

const HandleMove=()=>{};

const GetpieceUnicode=()=>{};

Renderboard();