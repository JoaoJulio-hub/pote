import React, { useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState(null)

  const [password, setPassword] = useState("")

  const login = () => {}

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-purple-600">
      <div className="flex mb-10 text-5xl mb-6 cursor-pointer text-white items-center">
        <span>P</span>
        <FiberManualRecordIcon className="text-yellow-400 !h-12 !w-12 mt-2" />

        <span>T</span>
        <EuroIcon className="text-green-400 !h-11 !w-11 mt-1" />
      </div>
      <form className="flex flex-col bg-white items-center p-10 rounded-lg">
        <label className="mb-3 font-bold text-2xl">Login</label>

        <label className="mb-1 font-bold">Username or Email</label>
        <input
          className="p-3 border-solid border-2 border-purple-600
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
          onChange={(e) => {
            setUsernameOrEmail(e.target.value)
          }}
        />
        <label className="mb-1 font-bold">Password</label>
        <input
          className="p-3 border-solid border-2 border-purple-600 rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button
          className="mt-5 p-2 bg-purple-600 hover:bg-purple-500 text-white min-w-full rounded-lg"
          onClick={login}
        >
          Login
        </button>

        <span className="text-purple-700">Forgot my password</span>
      </form>
    </div>
  )
}

export default Login
