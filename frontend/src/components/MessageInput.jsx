import React, { useRef, useState } from 'react'
import useChatStore from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const fileRef = useRef(null)

  const { sendMessages } = useChatStore()

  const handleSendMessage = async (e) => {
    e.preventDefault()
    await sendMessages({text, image: imagePreview})
    setText('')
    setImagePreview(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file.type.startsWith('image/')) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value=''
  }

  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imagePreview} alt="preview" className='size-20 object-cover rounded-lg border border-zinc-700'/>
            <button 
              onClick={removeImage} 
              className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center'
            >
              <X className='size-3'/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex items-center gap-2'>
          <input 
            type="text" 
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input 
            type="file" 
            accept='image/*'
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
          <button
            type='button'
            className={`flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileRef.current.click()}
          >
            <Image size={20}/>
          </button>

          <button>
            <Send size={22}/>
          </button>
        </div>      
      </form>
    </div>
  )
}

export default MessageInput