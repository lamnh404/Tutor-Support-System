import { useLocation, Navigate } from 'react-router-dom'
// import { Card } from 'antd'
import Login from './Login'
import Register from './Register.tsx'
import { userContext } from '~/context/userContext'
import { useContext } from 'react'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const { user } = useContext(userContext)
  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      {isLogin && <Login />}
      {isRegister && <Register />}
    </>
  )
}

export default Auth
