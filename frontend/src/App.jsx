import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast'

// zustand
import useAuthStore from './store/useAuthStore'

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser})
  console.log({onlineUsers})

  if(isCheckingAuth && !authUser) 
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' color='black'/>
      </div>
    )

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex items-center justify-center px-3 sm:px-6'>
        <div className='max-w-[1280px] w-full'>
          <Navbar />
        </div>
      </div>
      
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />}/>
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />}/>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />}/>
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />}/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
