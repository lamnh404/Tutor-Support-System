import Header from '~/components/Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '~/pages/Auth/Login'
import NotFound from '~/pages/404/NotFound'
import Home from './pages/Homepage/Home'
import { useState } from 'react'
import { userContext } from './context/userContext.tsx'
import { type User } from './context/userContext.tsx'
import { MOCK_USERS } from './pages/Auth/mockdata.tsx'

function App() {
  const location = useLocation()
  const [user, setUser] = useState<null | User>(MOCK_USERS[0])

  // show header only on specific routes
  const showHeader = ['/', '/login'].includes(location.pathname)

  return (
    <userContext.Provider value={{ user, setUser }}>
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[71px]' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </userContext.Provider>
  )
}

export default App
