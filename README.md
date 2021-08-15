Start Redis Database
redis-server

Node Backend Setup
cd card-game-backend
npm install
node .

Backend will start on http://localhost:3001/


React Frontend Setup

cd card-game-frontend
npm install
npm run start

Game will start in browser on http://localhost:3000/

Game Saving feature is not implemented on frontend yet. Please try with multiple browsers for testing realtime leaderboard points update, as the username is stored in localstorage instance.