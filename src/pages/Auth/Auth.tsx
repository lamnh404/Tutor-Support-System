import { useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  // console.log(location)
  // console.log(user)
  if (user) {
    navigate('/dashboard', { replace: true })
  }

  return (
    <>
      {isLogin && <Login />}
      {isRegister && <Register />}
    </>
  )
}

export default Auth
