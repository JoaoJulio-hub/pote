import {
  Navigate,
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import NavBar from "./Components/NavBar"
import { useCookies } from "react-cookie"
import JoinGame from "./pages/JoinGame"

function App() {
  const [cookies] = useCookies(["access_token"])

  return (
    <div className="">
      <Router>
        {!cookies.access_token && <NavBar />}
        <Routes>
          {cookies.access_token ? (
            <>
              <Route path="/joingame" element={<JoinGame />} />
              <Route path="/*" element={<Navigate to="/joingame" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  )
}

export default App
