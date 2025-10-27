import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Feed from "./pages/Feed"
import Profile from "./pages/Profile"

const Rotas = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/feed' element={<Feed />} />
    <Route path='/profile' element={<Profile />} />
  </Routes>
)

export default Rotas
