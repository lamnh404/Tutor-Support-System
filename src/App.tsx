import Header from '~/components/Header/Header'
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom'
import Login from '~/pages/Auth/Login'
import NotFound from '~/pages/404/NotFound'
import Home from './pages/Homepage/Home'
import Settings from './pages/Homepage/Settings'
import { useState } from 'react'
import { userContext } from './context/userContext.tsx'
import { type User } from './context/userContext.tsx'

interface ProtectedRouteProps {
  user: User | null
}

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function App() {
  const location = useLocation()
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  // const username = localStorage.getItem('user')

  // show header only on specific routes
  const showHeader = ['/', '/login'].includes(location.pathname)

  return (
    <userContext.Provider value={{ user, setUser }}>
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[71px]' : ''}>
        <Routes>
          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="/student/*" element={<div>Student Dashboard</div>} />
            <Route path="/lecturer/*" element={<div>Lecturer Dashboard</div>} />
            <Route path="/admin/*" element={<div>Admin Dashboard</div>} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </userContext.Provider>
  )
}

export default App
