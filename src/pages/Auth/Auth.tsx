import { useLocation, useNavigate } from 'react-router-dom'
// import { Card } from 'antd'
import Login from './Login'
import Register from './Register.tsx'
import { userContext } from '~/context/User/userContext.tsx'
import { useContext, useEffect } from 'react'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const { user } = useContext(userContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [navigate, user])
  return (
    <>
      {isLogin && <Login />}
      {isRegister && <Register />}
    </>
  )
}

export default Auth
