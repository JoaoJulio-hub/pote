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

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", async (data) => {
    socket.join(data)
    const clientsInRoom = io.sockets.adapter.rooms.size
    if (clientsInRoom == 1) {
      const numbers = scoreBoardGenerator()
      const newGame = new GameModel({
        roomId: data,
        board: { numbers },
        index: 0,
      })
      await newGame.save()
    }
    const boardGenerate = boardGenerator()
    console.log(boardGenerate)
    socket.emit("send_board", boardGenerate)
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
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

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://joaodjulio:Galitos13@potecluster.57nsofu.mongodb.net/potecluster?retryWrites=true&w=majority"
)

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

server.listen(3001, () => {
  console.log("Server is running on port 3001")
})
