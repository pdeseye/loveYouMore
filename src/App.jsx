import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './pages/Landing/Landing'
import LoveArmy from './pages/LoveArmy/LoveArmy'
import Profile from './pages/Profile/Profile'
import LoveArmyForm from './pages/LoveArmy/LoveArmyForm'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Soldier from './pages/Soldier/Soldier'
import * as authService from './services/authService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      { user ? 
        <NavBar handleLogout={handleLogout} /> 
      : 
        ""
      }
      <Routes>
        <Route path="/" element={<Landing handleSignupOrLogin={handleSignupOrLogin}/>} />
        <Route
          path="/loveArmy"
          element={user ? <LoveArmy/>: <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user}/>: <Navigate to="/" />}
        />
        <Route
          path="/loveArmy/new"
          element={user ? <LoveArmyForm/>: <Navigate to="/" />}
        />
        <Route
          path="/loveArmy/:id"
          element={user ? <Soldier/>: <Navigate to="/" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/" />}
        />
      </Routes>
    </>
  )
}

export default App
