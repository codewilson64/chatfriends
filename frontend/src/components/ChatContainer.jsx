import React, { useEffect, useRef } from 'react'
import useChatStore from '../store/useChatStore'
import ChatHeader from '../components/ChatHeader'
import MessageInput from '../components/MessageInput'
import useAuthStore from '../store/useAuthStore'
import blankProfile from '../public/blankProfile.webp'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore()
  const { authUser } = useAuthStore()

  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => unsubscribeFromMessages()
  }, [getMessages, selectedUser._id, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if(messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])


  return (
    <div className='flex-1 flex flex-col border-r border-slate-300 overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message._id} ref={messageEndRef} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                  src={message.senderId === authUser._id ? authUser.profileImg || blankProfile : selectedUser.profileImg || blankProfile} 
                  alt="profileImg" 
                />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className='chat-bubble bg-slate-200/60 flex flex-col'>
              {message.image && (
                <img src={message.image} alt="image" className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer