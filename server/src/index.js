import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { UserModel } from "./models/Users.js"
import { GameModel } from "./models/Games.js"
import { boardGenerator } from "./BoardNumbersGenerator.js"
import { scoreBoardGenerator } from "./GameNumbersGenerator.js"
import http from "http"
import { Server } from "socket.io"
// Import the variables from config.js
import config from "../../config.js"

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://joaodjulio:Galitos13@potecluster.57nsofu.mongodb.net/potecluster?retryWrites=true&w=majority"
)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    const { room, userId } = data
    socket.join(room)
    const boardGenerate = boardGenerator()
    console.log(boardGenerate)
    socket.emit("send_board", { board: boardGenerate })
    console.log(`User with ID: ${userId} joined room: ${room}`)
  })

  socket.on("start_game", async (data) => {
    const { room } = data
    const numbers = scoreBoardGenerator()
    const newGame = new GameModel({
      roomId: room,
      board: { numbers },
      index: 0,
    })
    await newGame.save()

    io.to(room).emit("game_started")
    const scoreBoard = scoreBoardGenerator()
    let index = 0 // Variable to keep track of the current index in the scoreBoard array

    // Define a function to handle the "foundWinner" event
    const handleFoundWinner = () => {
      clearInterval(intervalId) // Stop emitting events when "foundWinner" event is triggered
    }

    // Emit "send_number" event with numbers from scoreBoard in order, starting from the first index
    const intervalId = setInterval(() => {
      const randomNumber = scoreBoard[index] // Get the number from the scoreBoard using the current index
      io.to(room).emit("send_number", { number: randomNumber })
      index++ // Update the index to the next position

      if (index === scoreBoard.length) {
        clearInterval(intervalId) // Stop emitting when the last element is reached
      }
    }, 1500) // Change the interval time in milliseconds to adjust the frequency of emits
  })

  socket.on("line_winner", (data) => {
    const { username, room } = data
    io.to(room).emit("send_line_winner", { username: username })
  })

  socket.on("pote_winner", (data) => {
    const { username, room } = data
    io.to(room).emit("send_pote_winner", { username: username })
  })

  // socket.on("create_room", (data) => {
  //   socket.join(data)
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`)
  //   socket.emit("send_board", { board: generator() })
  // })

  socket.on("leave_room", (data) => {
    socket.leave(data.room, data.id)
    console.log("User left")
  })

  io.on("disconnect", (socket) => {
    console.log(`User Disconnected: ${socket.id}`)
  })
})

app.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  const user = await UserModel.findOne({ username })

  if (user) {
    return res.json({ message: "Username already exists!" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  })
  await newUser.save()

  res.json({ message: "User registered successfully" })
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({ username })

  if (!user) {
    return res.json({ message: "User doesn't exist" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Incorrect" })
  }

  const token = jwt.sign({ id: user._id }, "secret")
  res.json({ token, userID: user._id })
})

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
