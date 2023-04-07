import mongoose from "mongoose"

const gamesSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  board: { type: JSON, required: true },
  index: { type: Number, required: true },
})

export const GameModel = mongoose.model("games", gamesSchema)
