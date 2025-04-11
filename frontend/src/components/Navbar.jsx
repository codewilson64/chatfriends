import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <div className='w-full flex items-center justify-between py-3'>
      <Link to={'/'}>
        <div className='flex items-center gap-1'>
          <MessageSquare className='size-6 text-primary'/>
          <h1 className='text-2xl font-bold'>Chatfriends</h1>
        </div>
      </Link>
      
      <div className='flex gap-2'> 
        <Link to={'/settings'}>
          <Settings className='size-5'/>
        </Link>
        {authUser && (
          <>
            <Link to={'/profile'}>
              <User className='size-5'/>
            </Link>
            <button onClick={logout}>
              <LogOut className='size-5'/>
            </button>
          </>          
        )}        
      </div>
    </div>
  )
}

export default Navbar