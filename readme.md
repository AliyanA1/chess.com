Chess Game
This is a simple, real-time multiplayer chess game built using Node.js, Express, Socket.io, and Chess.js. Players can play against each other in real-time by dragging pieces on a virtual chessboard.

Features
Real-time multiplayer: Play against a friend in real-time.
Drag and drop: Move pieces by dragging them across the board.
Game state synchronization: Moves and game state are synchronized between players instantly.
Responsive design: Play on desktop or mobile.
Tech Stack
Frontend: HTML, CSS, JavaScript, Socket.io
Backend: Node.js, Express, Socket.io, Chess.js
Prerequisites
Make sure you have the following installed on your system:

Node.js: Install Node.js
Getting Started
Clone the repository:

bash
Copy code
git clone <your-repository-url>
cd <your-repository-folder>
Install dependencies:

Run the following command to install the necessary dependencies for both frontend and backend:

bash
Copy code
npm install
Start the backend server:

In one terminal, run:

bash
Copy code
npm start
This will start the backend server on http://localhost:3000.

Open the game in two terminals:

To play the game in two separate browser windows:

Open one terminal and run the backend server using the command above.
Open the URL http://localhost:3000 in your browser for the first player (Player 1).
Open another terminal or tab and run the backend server again (or run it in a different terminal window). The game will automatically assign Player 2 when connecting to http://localhost:3000.
You can also open the game in different browsers or devices, and the game state will be synchronized.

Playing the Game
First Player (White): The first player is automatically assigned the white pieces and will be able to make the first move.
Second Player (Black): The second player gets the black pieces and can make moves after the first player moves.
Drag and Drop: To make a move, simply drag a piece and drop it onto the target square.
Game State: The game state (board and moves) is synchronized across all connected clients.
Game Rules
Standard chess rules are followed.
You can promote pawns to queens, rooks, bishops, or knights.
Commands
npm start: Start the backend server and the game.
Troubleshooting
Ensure you have all dependencies installed by running npm install.
If the game is not syncing correctly, try refreshing the browser window.
License
This project is licensed under the MIT License.

How to Run the Game in Two Terminals
Open Terminal 1:

Run the following command to start the backend server:

bash
Copy code
npm start
Open Terminal 2:

You can either open a new terminal window or tab in your code editor and run the same command (npm start). Alternatively, if you're using a process manager like pm2, you can run it in a different terminal to manage multiple instances.

Once both terminals are running the server, open the game in two separate browser windows or tabs.

In Player 1's browser, visit http://localhost:3000.
In Player 2's browser, visit http://localhost:3000 as well. The game will assign Player 2 when they connect.