import React, { useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      if (response.data.message == "User registered successfully") {
        alert("Registration completed! Now you can login :)")
        navigate("/login")
      } else {
        alert(response.data.message)
      }
    } catch (err) {
      console.error()
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-purple-600">
      <div className="flex mb-10 text-5xl mb-6 cursor-pointer text-white items-center">
        <span className="text-white">P</span>
        <FiberManualRecordIcon className="text-yellow-400 !h-12 !w-12 mt-2" />

        <span className="text-white">T</span>
        <EuroIcon className="text-green-400 !h-11 !w-11 mt-1" />
      </div>
      <form
        className="flex flex-col bg-white items-center p-10 rounded-lg border-2 border-slate-200"
        onSubmit={onSubmit}
      >
        <label className="mb-3 font-bold text-2xl">Sign Up</label>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            id="firstname"
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            value={firstName}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            id="lastname"
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            value={lastName}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            value={username}
          />

          <input
            type="text"
            placeholder="Email"
            className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            id="password"
          />
        </div>

        <button className="mt-5 p-2 bg-purple-600 hover:bg-purple-500  text-white w-32 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
