import React from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function MainMenu() {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(["access_token"])

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("username")
    navigate("/login")
  }

  const handleButtonClick = (url) => () => {
    const currentPath = window.location.pathname
    navigate(`${currentPath}/${url}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-lg"
      >
        Logout
      </button>
      <button
        onClick={handleButtonClick("creategame")}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-l border-r border-gray-400"
      >
        Create Game
      </button>
      <button
        onClick={handleButtonClick("joingame")}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        Join Game
      </button>
    </div>
  )
}

export default MainMenu
