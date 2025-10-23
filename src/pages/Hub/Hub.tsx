import { useContext, useEffect } from 'react'
import { userContext } from '~/context/User/userContext.tsx'
import Home from '~/pages/Homepage/Home'
import { useNavigate, useLocation } from 'react-router-dom'

const Hub = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(userContext)

  useEffect(() => {
    // If user exists and tries to access root "/", redirect to dashboard
    if (user && location.pathname === '/') {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate, location.pathname])

  // If not logged in, show Home
  if (!user && location.pathname === '/') {
    return <Home />
  }

  return null
}

export default Hub
