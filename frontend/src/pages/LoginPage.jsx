import React, { useState } from 'react'

import { Loader } from 'lucide-react'

import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const { login, isLoggingIn, isError } = useAuthStore()

  const handleLogin = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-[300px] space-y-8'>
          <div className='text-center mb-8'>
              <h1 className='text-2xl text-indigo-600 font-bold mt-2'>Login Account</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col relative'>
                <label className='mb-2'>Username:</label>
                <input 
                  className='border border-gray-500 px-3 py-2 outline-none rounded-lg'
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
             
              <div className='flex flex-col'>
                <label className='mb-2'>Password:</label>
                <input
                  className='border border-gray-500 px-3 py-2 outline-none rounded-lg' 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {isError && <p className='text-red-400'>{isError}</p>}
              
            </div>
            <button disabled={isLoggingIn} className='w-full btn bg-indigo-600 rounded-lg'>
              {isLoggingIn ? (
                <>
                  <Loader className='size-5 animate-spin'/>
                </>
              ) : (
                <p className='text-white'>Login</p>
              )}
            </button>
          </form>

          <div className='flex items-center justify-center gap-1'>
            <p>Don't have an account?</p>
            <Link to={'/signup'}>
              <button className='text-indigo-600 underline'>Sign up</button>
            </Link>
          </div>

        </div>
      </div>
  )
}

export default LoginPage