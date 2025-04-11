import { useState } from 'react';
import blankProfile from '../public/blankProfile.webp'
import useAuthStore from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore()

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setImageUrl(base64Image)
      await updateProfile({profileImg: base64Image})
    }
  }

  return (
    <div className='max-w-[600px] w-full mx-auto'>
      <div className='px-6 py-3'>
        <h1 className='text-xl font-bold'>Profile</h1>
      </div>

      <div className='flex items-center justify-center py-8'>
        <div className='relative '>
          <img 
            src={ imageUrl || authUser.profileImg || blankProfile} 
            alt="profile" 
            className='size-32 rounded-full object-cover'
          />
          <label 
            htmlFor='avatar-upload' 
            className={`absolute bottom-1 right-1 bg-white rounded-full p-1 ${isUpdatingProfile ? "animate-pulse" : ""}`}
          >
            <Camera 
              className='size-6 cursor-pointer' 
              color='gray'
            />
            <input type="file" id='avatar-upload' hidden accept='image/*' onChange={handleImageUpload}/>
            </label>        
        </div>
      </div>

      <div className='flex flex-col gap-5 px-6'>
        <div className='flex items-center gap-5'>
          <User className='size-8'/>
          <div>
            <p className='font-semibold'>Name</p>
            <p className='text-sm'>{authUser.username}</p>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <Mail className='size-8'/>
          <div>
            <p className='font-semibold'>Email</p>
            <p className='text-sm'>{authUser.email}</p>
          </div>
        </div>        
      </div>
        
    </div>
  )
}

export default ProfilePage