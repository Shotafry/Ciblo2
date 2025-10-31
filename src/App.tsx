// src/App.tsx
import { useEffect } from 'react'
import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Eventos from './pages/Eventos'
import PanelDeUsuario from './pages/PanelDeUsuario'
import PanelDeOrganizador from './pages/PanelDeOrganizador'
import Page from './pages/Page'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Role } from './types' // Importamos Role

function App() {
  const action = useNavigationType()
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    // ... (el código de scroll se queda igual) ...
  }, [action, pathname])

  useEffect(() => {
    // ... (el código de title y metaDescription se queda igual) ...
  }, [pathname])

  return (
    <AuthProvider>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/loginsign-up' element={<SignUp />} />
        <Route path='/eventos/:slug' element={<Eventos />} />

        {/* --- Rutas Protegidas (Solo para usuarios logueados) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path='/panel-de-usuario' element={<PanelDeUsuario />} />
        </Route>

        {/* --- Rutas Protegidas (Solo para roles específicos) --- */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[Role.Admin, Role.Organizer]} />
          }
        >
          <Route
            path='/panel-de-organizador'
            element={<PanelDeOrganizador />}
          />
          <Route path='/frame-1' element={<Page />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
export default App
