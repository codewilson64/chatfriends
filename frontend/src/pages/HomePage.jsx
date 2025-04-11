import useChatStore from '../store/useChatStore'

import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='h-screen'>
      <div className='flex items-center justify-center'>
        <div className='rounded-lg w-full max-w-[1280px] h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage