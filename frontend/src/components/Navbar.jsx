import { LogOut, MessageSquare, User } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <div className='w-full flex items-center justify-between py-3 px-3 sm:px-6'>
      <Link to={'/'}>
        <div className='flex items-center gap-1'>
          <MessageSquare className='size-6 text-indigo-600'/>
          <h1 className='text-2xl font-bold'>Chatfriends</h1>
        </div>
      </Link>
      
      <div className='flex gap-2'> 
        {authUser && (
          <>
            <Link to={'/profile'}>
                <User className='size-5 text-indigo-600'/>             
            </Link>
              <button onClick={logout}>
                <LogOut className='size-5 text-indigo-600'/>
              </button>
          </>          
        )}        
      </div>
    </div>
  )
}

export default Navbar