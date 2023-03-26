import React, { useState } from "react"
import EuroIcon from "@mui/icons-material/Euro"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import Axios from "axios"
import Cookies from "universal-cookie"

function SignUp() {
  const cookies = new Cookies()
  const [user, setUser] = useState(null)

  const signUp = () => {
    Axios.post("http:localhost:3001/signup", user).then((res) => {
      const { userId, firstName, lastName, username, hashedPassword } = res.data
      cookies.set("userId", userId)
      cookies.set("firstName", firstName)
      cookies.set("lastName", lastName)
      cookies.set("username", username)
      cookies.set("hashedPassword", hashedPassword)
    })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex mb-10 text-5xl mb-6 cursor-pointer text-white items-center">
        <span className="text-black">P</span>
        <FiberManualRecordIcon className="text-yellow-400 !h-12 !w-12 mt-2" />

        <span className="text-black">T</span>
        <EuroIcon className="text-green-400 !h-11 !w-11 mt-1" />
      </div>
      <form className="flex flex-col bg-white items-center p-10 rounded-lg border-2 border-slate-200">
        <label className="mb-3 font-bold text-2xl">Sign Up</label>

        <div>
          <input
            placeholder="First Name"
            className="p-3 border-solid border-2 border-green-500
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value })
            }}
          />

          <input
            placeholder="Last Name"
            className="p-3 border-solid border-2 border-green-500
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value })
            }}
          />
        </div>

        <div>
          <input
            placeholder="Username"
            className="p-3 border-solid border-2 border-green-500
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value })
            }}
          />

          <input
            placeholder="Email"
            className="p-3 border-solid border-2 border-green-500
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value })
            }}
          />
        </div>

        <div>
          <input
            placeholder="Password"
            className="p-3 border-solid border-2 border-green-500
          rounded-lg outline-none focus:bg-slate-200 hover:bg-slate-200 m-2"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value })
            }}
          />
        </div>

        <button
          className="mt-5 p-2 bg-yellow-500 hover:bg-yellow-600 text-white w-32 rounded-lg"
          onClick={signUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
