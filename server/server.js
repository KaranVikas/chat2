const express = require('express');
const dotenv = require('dotenv')
// const {chats} = require('./data/data');
const connectDB = require('./config/db');
const colors = require("colors")
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
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
app.use("/api/chat", chatRoutes)

// adding errorhandling api if we go route that doesn't exist 
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`.yellow.bold);
})
