import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/layout/AppLayout'

import { TeamConfig } from './pages/TeamConfig/TeamConfig'
import { TeamResult } from './pages/TeamResult/TeamResult'
import { Players } from './pages/Players/Players'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/jogadores"
              replace
            />
          }
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
      </Routes>
    </AppLayout>
  )
}

export default App