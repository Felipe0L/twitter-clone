import { BrowserRouter } from "react-router-dom"

import Rotas from "./routes"
import EstiloGlobal from "./styles"

function App() {
  return (
    <BrowserRouter>
      <EstiloGlobal />
      <Rotas />
    </BrowserRouter>
  )
}

export default App
