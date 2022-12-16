const express = require('express');
const dotenv = require('dotenv')
// const {chats} = require('./data/data');
const connectDB = require('./config/db');
const colors = require("colors")
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes")
const router = require('./routes/chatRoutes')


const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config();
connectDB();
const app = express();

// tell our server to accept json data
// to accept json data
app.use(express.json());

// app.get('/', (req,res) => {
//     res.send("API is running successfully")
// })


// app.get('/api/chat', (req,res) => {
//     console.log("testing");
//     res.send(chats);
// })


// app.get("/api/chat/:id", (req, res) => {
//   console.log(req.params.id);
//   const singlechat = chats.find((c) => c._id === req.params.id)
//   res.send(singlechat);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message",messageRoutes);

// adding errorhandling api if we go route that doesn't exist 
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`.yellow.bold);
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",

    }
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        // create a room for a particular user
        socket.join(userData._id);
        console.log(userData._id);
        // emit in the socket
        socket.emit("connected", () => setSocketConnected(true));
    });

    // create a room with user and other user
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined Room : " + room)
    })

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        // chat recived to others except me in a group
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return 

            socket.in(user._id).emit("message received", newMessageRecieved);
        })

    })
})
