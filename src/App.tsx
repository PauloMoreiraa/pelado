import { Navigate, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home/Home'
import { Players } from './pages/Players/Players'
import { TeamConfig } from './pages/TeamConfig/TeamConfig'
import { TeamResult } from './pages/TeamResult/TeamResult'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/jogadores"
        element={<Players />}
      />

      <Route
        path="/configuracao"
        element={<TeamConfig />}
      />

      <Route
        path="/resultado"
        element={<TeamResult />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  )
}

export default App