import Header from '~/components/Header/Header'
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom'
import Auth from '~/pages/Auth/Auth'
import NotFound from '~/pages/404/NotFound'
import { useContext, useEffect } from 'react'
import { type User } from './context/User/userContext.tsx'
import { ToastContainer } from 'react-toastify'
import { userContext } from '~/context/User/userContext.tsx'
import TutorSearchPage from '~/pages/TutorSearch/TutorSearch.tsx'
import TutorProfile from '~/pages/TutorProfile/TutorProfile.tsx'
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop.tsx'
import Home from '~/pages/Homepage/Home.tsx'
import Setting from '~/pages/Setting/Settings.tsx'
import LibraryPage from './pages/Library/LibraryPage.tsx'
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptors } from '~/utils/authorizedAxiosInstance.ts'
import TutorCommunityPlatform from '~/pages/Course/TutorCommunityPlatform.tsx'
import AnimationBackground from '~/components/AnimationBackground/AnimationBackground.tsx'
import { ActiveTabContextProvider } from '~/context/CourseContext/ActiveTabContext.tsx'
import { NotificationProvider } from '~/context/NotificationContext/NotificationContext'
import NotificationDemo from '~/components/NotificationDemo/NotificationDemo'
import BackToTop from '~/components/Header/BackToTop.tsx'
import Overview from '~/pages/admin/Overview.tsx'
import UserManagement from '~/pages/admin/UserManagement.tsx'
import Analytics from '~/pages/admin/Analytics.tsx'
import Logs from '~/pages/admin/Logs.tsx'
import Dashboard from '~/pages/TutorList/Dashboard.tsx'
import StudentProfile from '~/pages/StudentProfile/StudentProfile.tsx'
interface ProtectedRouteProps {
  user: User | null
  allowedRoles?: string[]
}

const ProtectedRoute = ({ user, allowedRoles }: ProtectedRouteProps) => {
  if (!user)
    return <Navigate to="/login" replace />

  if (allowedRoles && !user.roles.some(role => allowedRoles.includes(role)))
    return <Navigate to="/404" replace />
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
      <NotificationProvider>
        <ScrollToTop />
        <AnimationBackground />
        {showHeader && <Header />}
        <main className={showHeader ? 'mt-[71px]' : ''}>
          <Routes>

            # Routes accessible by any authenticated user
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/settings" element={ <Setting /> } />
            </Route>

            # Routes accessible by STUDENT and TUTOR roles
            <Route element={<ProtectedRoute user={user} allowedRoles={['STUDENT', 'TUTOR']} />}>
              <Route path="/search" element={ <TutorSearchPage /> } />
              <Route path="/library" element={ <LibraryPage /> } />

              # Routes to view profiles of tutors and students
              <Route path='/tutor/:id' element={ <TutorProfile />} />
              <Route path='/student/:id' element={ <StudentProfile />} />

              <Route path='/dashboard' element={ <Dashboard />} />

              <Route path='/course/:id' element={
                <ActiveTabContextProvider>
                  <TutorCommunityPlatform/>
                </ActiveTabContextProvider>
              } />
              {/* <Route path='/mymentees' element={ <StudentList />} /> */}
            </Route>

            # Routes only accessible by ADMIN role
            <Route element={<ProtectedRoute user={user} allowedRoles={['ADMIN']} />}>
              <Route path='/admin/overview' element={ <Overview/>} />
              <Route path='/admin/users' element={<UserManagement />}/>
              <Route path='admin/analytics' element={ <Analytics /> }/>
              <Route path ='/admin/logs' element={<Logs/>} />
            </Route>

            <Route path='/login' element={ <Auth />} />
            <Route path='/register' element={ <Auth />} />
            <Route path="/" element={ <Home />} />
            <Route path="/404" element={ <NotFound />} />
            <Route path="*" element={ <Navigate to="/404" replace/> }/>
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
        <NotificationDemo />
        <BackToTop />
      </NotificationProvider>
    </>
  )
}

export default App
