import http from "http";
import express from "express"
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://realtime-chatapp-frontend-gs3c.onrender.com"
    }
})

const userSocketMAp = {}

export const getReceiverSocketId =(receiver)=>{
    return userSocketMAp[receiver]
}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId
    if(userId != undefined){
        userSocketMAp[userId]=socket.id  //userId : socket.id
        // console.log(userId + socket.id)
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMAp))
    
    socket.on("disconnect",()=>{
    delete userSocketMAp[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMAp))

})

})


export { app , server,io}
