import Header from '~/components/Header/Header'
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom'
import Auth from '~/pages/Auth/Auth'
import NotFound from '~/pages/404/NotFound'
import { useContext, useEffect } from 'react'
import { type User } from './context/User/userContext.tsx'
import { ToastContainer } from 'react-toastify'
import { userContext } from '~/context/User/userContext.tsx'
import TutorSearchPage from '~/pages/TutorSearch/TutorSearch.tsx'
import Profile from '~/pages/TutorProfile/Profile.tsx'
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop.tsx'
import Home from '~/pages/Homepage/Home.tsx'
import Setting from '~/pages/Setting/Settings.tsx'
import LibraryPage from './pages/Library/LibraryPage.tsx'
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptors } from '~/utils/authorizedAxiosInstance.ts'
import TutorCommunityPlatform from '~/pages/Course/TutorCommunityPlatform.tsx'
import AnimationBackground from '~/components/AnimationBackground/AnimationBackground.tsx'
import { ActiveTabContextProvider } from '~/context/CourseContext/ActiveTabContext.tsx'

import TutorList from '~/pages/TutorList/TutorList.tsx'
import BackToTop from './components/Header/BackToTop.tsx'
// import StudentList from './pages/StudentList/StudentList.tsx'
interface ProtectedRouteProps {
  user: User | null
}

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function App() {
  const location = useLocation()
  const { user, logout } = useContext(userContext)
  const showHeader = !['/404'].includes(location.pathname)
  const navigate = useNavigate()

  useEffect(() => {
    setupAxiosInterceptors(logout, navigate)
  }, [logout, navigate])

  return (
    <>
      <ScrollToTop />
      <AnimationBackground />
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[71px]' : ''}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/settings" element={ <Setting /> } />
            <Route path="/dashboard" element={ <TutorSearchPage /> } />
            <Route path="/library" element={ <LibraryPage /> } />
            <Route path='/:id' element={ <Profile />} />
            <Route path='/course/:id' element={
              <ActiveTabContextProvider>
                <TutorCommunityPlatform/>
              </ActiveTabContextProvider>
            } />

            <Route path='/mytutors' element={ <TutorList />} />
            {/* <Route path='/mymentees' element={ <StudentList />} /> */}
          </Route>
          <Route path='/login' element={ <Auth />} />
          <Route path='/register' element={ <Auth />} />
          <Route path="/" element={ <Home />} />
          <Route path="/404" element={ <NotFound />} />
          <Route path="*" element={ <Navigate to="/404" replace/> }/>
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
      <BackToTop />
    </>
  )
}

export default App
