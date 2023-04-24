import React, { useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("")

  const [password, setPassword] = useState("")

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: usernameOrEmail,
        password,
      })
      if (response.data?.message) {
        alert(response.data.message)
      } else {
        setCookies("access_token", response.data.token)
        window.localStorage.setItem("userID", response.data.userID)
        window.localStorage.setItem("username", usernameOrEmail)
        navigate("/mainmenu")
      }
    } catch (err) {
      console.error()
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">
      <div className="flex mb-10 text-5xl mb-6 cursor-pointer text-white items-center">
        <span className="text-black">P</span>
        <FiberManualRecordIcon className="text-yellow-400 !h-12 !w-12 mt-2" />

        <span className="text-black">T</span>
        <EuroIcon className="text-green-400 !h-11 !w-11 mt-1" />
      </div>
      <form
        className="flex flex-col bg-white items-center p-10 rounded-lg"
        onSubmit={onSubmit}
      >
        <label className="mb-3 font-bold text-2xl">Login</label>

        <label className="mb-1 font-bold" htmlFor="usernameoremail">
          Username or Email
        </label>
        <input
          type="text"
          className="p-3 border-solid border-2 border-green-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
          onChange={(e) => {
            setUsernameOrEmail(e.target.value)
          }}
          id="usernameoremail"
          value={usernameOrEmail}
        />
        <label className="mb-1 font-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="p-3 border-solid border-2 border-green-600 rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
        />
        <button className="mt-5 p-2 bg-green-600 hover:bg-green-500 text-white min-w-full rounded-lg">
          Login
        </button>

        <span className="text-green-700">Forgot my password</span>
      </form>
    </div>
  )
}

export default Login
