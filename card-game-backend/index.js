const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const Redis = require("redis");

const redisClient = Redis.createClient();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const httpServer = require("http").createServer(app);
const options = {
    cors:{
        origin:["http://localhost:3000"]
    }
};
const io = require("socket.io")(httpServer, options);


io.on("connection", socket => { 
    console.log(socket.id);
    socket.on("update-points",async (userId)=>{
        console.log("update-points");
        redisClient.get(userId,(error,userData)=>{
            if(error)
            {
                console.log(error);
            }
            console.log(userData);
            if(userData!==null)
            {
                userData = JSON.parse(userData);
                userData.points +=1;
                redisClient.set(userId,JSON.stringify(userData))
                io.emit("update-leaderboard",userData)
            }
        });
    })
    socket.on("update-game",async (userId,gameId,gameData)=>{
        console.log("update-game");
        redisClient.get(userId,(error,userData)=>{
            if(error)
            {
                console.log(error);
            }
            console.log(userData);
            if(userData!==null)
            {
                userData = JSON.parse(userData);
                userData.games[gameId] = gameData;
                redisClient.set(userId,JSON.stringify(userData))
            }
        });
    })
    socket.on("set-user",async(userId)=>{
        console.log("set user",userId);
        redisClient.get(userId,(error,userData)=>{
            if(error)
            {
                console.log(error);
            }
            console.log(userData);
            if(userData===null)
            {
                const data = {
                    userId:userId,
                    points:0,
                    games:{}
                }
                redisClient.set(userId,JSON.stringify(data))
                io.emit("update-leaderboard",data)
            }
        });
        
    })
});

app.get('/',(request,response)=>{
    response.send("This is get");
})

httpServer.listen(3001,()=>console.log("Listening on port 3001"));