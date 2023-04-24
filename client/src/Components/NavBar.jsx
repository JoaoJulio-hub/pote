import React from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"

function NavBar() {
  const [cookies, setCookies] = useCookies(["access_token"])

  return (
    <div className="bg-green-900 text-white py-4 px-6 flex justify-center items-center">
      <Link className="mr-6" to="/">
        Home
      </Link>
      <a className="mr-6" href="#">
        About Us
      </a>
      <a className="mr-6" href="#">
        How to play
      </a>
      <a className="mr-6" href="">
        Contacts
      </a>
      <Link className="mr-6" to="/login">
        Login
      </Link>
      <Link className="" to="/signup">
        SignUp
      </Link>
    </div>
  )
}

export default NavBar
