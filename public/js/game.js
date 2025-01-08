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
                
                pieceElement.innerHTML=GetpieceUnicode(square);
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
            boardElement.appendChild(squareElement);
        });

    });
};

const HandleMove=(source, target)=>{
    const move={
        from: `${String.fromCharCode(97+source.col)}${8-source.row}`,
        to: `${String.fromCharCode(97+target.col)}${8-target.row}`,
        promotion: "q"
    }
};

const GetpieceUnicode=(piece)=>{
    const unicode= {
        k: "&#9818;",
        q: "&#9819;",
        r: "&#9820;",
        b: "&#9821;",
        n: "&#9822;",
        p: piece.color === "w" ? "&#9817;" : "&#9817;",
        K: "&#9812;",
        Q: "&#9813;",
        R: "&#9814;",
        B: "&#9815;",
        N: "&#9816;",
        P: piece.color === "w" ? "&#9817;" : "&#9817;"
    };
    return unicode[piece.type] || "";
};

Renderboard();