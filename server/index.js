import express from "express"
import cors from "cors"
import uuid from "uuid"
import bcrypt from "bcrypt"

const app = express()
app.use(cors)
app.use(express.json())

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password } = req.body
  const userID = uuid.v4()
  const hashedPassword = await bcrypt.hash(password, 10)
  res.json({ userId, firstName, lastName, username, hashedPassword })
})

app.post("/login")

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})
