import Header from '~/components/Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '~/pages/Auth/Login'
import NotFound from '~/pages/404/NotFound'

function App() {
  const location = useLocation()

  // show header only on specific routes
  const showHeader = ['/', '/login'].includes(location.pathname)

  return (
    <>
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[71px]' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
