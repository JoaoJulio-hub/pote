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
import MainMenu from "./pages/MainMenu"
import NavBar from "./Components/NavBar"
import { useCookies } from "react-cookie"
import JoinGame from "./pages/JoinGame"
import CreateGame from "./pages/CreateGame"

function App() {
  const [cookies] = useCookies(["access_token"])

  return (
    <div className="">
      <Router>
        {!cookies.access_token && <NavBar />}
        <Routes>
          {cookies.access_token ? (
            <>
              <Route path="/mainmenu" element={<MainMenu />} />
              <Route path="/mainmenu/creategame" element={<CreateGame />} />
              <Route path="/mainmenu/joingame" element={<JoinGame />} />
              <Route path="/*" element={<Navigate to="/mainmenu" />} />
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
