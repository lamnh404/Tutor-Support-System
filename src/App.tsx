import Header from '~/components/Header/Header'
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom'
import Auth from '~/pages/Auth/Auth'
import NotFound from '~/pages/404/NotFound'
// import Hub from './pages/Hub/Hub.tsx'
import StudentDashboard from './pages/StudentDashboard/StudentDashboard.tsx'
import { useContext } from 'react'
import { type User } from './context/userContext.tsx'
import { ToastContainer } from 'react-toastify'
import { userContext } from '~/context/userContext.tsx'
import TutorSearchPage from './pages/TutorSearch/TutorSearch.tsx'
import Home from '~/pages/Homepage/Home'
interface ProtectedRouteProps {
  user: User | null
}

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function App() {
  const location = useLocation()
  const { user } = useContext(userContext)
  const showHeader = !['/404'].includes(location.pathname)

  return (
    <>
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[71px]' : ''}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/lecturer/*" element={<div>Lecturer Dashboard</div>} />
            <Route path="/admin/*" element={<div>Admin Dashboard</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/dashboard" element={<TutorSearchPage />} />
          </Route>
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace/> }/>
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
