import React, { useState } from 'react'

import { Loader, MessageSquare } from 'lucide-react'

import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { signup, isSigningUp, isError } = useAuthStore()

  const handleSignup = (e) => {
    e.preventDefault()
    signup(formData)
  }

  return (
      <div className='flex flex-col items-center justify-center p-6 sm:p-9'>
        <div className='w-full max-w-[300px] space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content-60'>Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className='space-y-6'>
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
                <label className='mb-2'>Email:</label>
                <input 
                  className='border border-gray-500 px-3 py-2 outline-none rounded-lg'
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              <div className='flex flex-col'>
                <label className='mb-2'>Confirm Password:</label>
                <input
                  className='border border-gray-500 px-3 py-2 outline-none rounded-lg' 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            {isError && <p className='text-red-400'>{isError}</p>}
            <button disabled={isSigningUp} className='w-full btn btn-primary rounded-lg'>
              {isSigningUp ? (
                <>
                  <Loader className='size-5 animate-spin'/>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className='flex items-center justify-center gap-1'>
            <p>Already have an account?</p>
            <Link to={'/login'}>
              <button className='text-primary underline'>Sign in</button>
            </Link>
          </div>

        </div>
      </div>
  )
}

export default SignupPage