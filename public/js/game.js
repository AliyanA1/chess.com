// Initiate socket connection
const chess = new Chess();
const socket=io();

const boardElement=document.querySelector(".chessboard");

let draggedPiece=null;
let Sourcesquare=null;
let playerRole=null;


const Renderboard=()=>{
    boardElement.innerHTML="";
    chess.board().forEach((row,rowIndex)=>{
        row.forEach((square,squareIndex)=>{
            const squareElement=document.createElement("div");
            squareElement.classList.add("square",
                (rowIndex+squareIndex)%2==0? "light":"dark"
            );

            squareElement.dataset.row=rowIndex;
            squareElement.dataset.col=squareIndex;
            //square if there is a valid piece
            if(square){
                const pieceElement=document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");
                
                pieceElement.innertext="";
                pieceElement.draggable= playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e)=>{
                draggedPiece=pieceElement;
                Sourcesquare={row: rowIndex, col: squareIndex};
                e.dataTransfer.setData("text/plain","");
              })

               pieceElement.addEventListener("dragend",(e)=>{
                 draggedPiece=null;
                 Sourcesquare=null;
               })

               squareElement.appendChild(pieceElement);
            }
            
            squareElement.addEventListener("dragover",(e)=>{
                e.preventDefault();
            });

            squareElement.addEventListener("drop",(e)=>{
                e.preventDefault();
               if(draggedPiece){
                    const targetSource={
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    HandleMove(Sourcesquare,targetSource);
               }
              
               
            });
            
        })
    })
};

const HandleMove=()=>{};

const GetpieceUnicode=()=>{};

Renderboard();