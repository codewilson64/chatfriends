import { create } from "zustand";
import axiosInstance from "../lib/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isError: null,

  getUsers: async () => {
    set({isUsersLoading: true})
    try {
      const response = await axiosInstance.get('/messages/users')
      set({users: response.data})
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
    finally {
      set({isUsersLoading: false})
    }
  },

  getMessages: async (userId) => {
    set({isMessagesLoading: true})
    try {
      const response = await axiosInstance.get(`/messages/${userId}`)    
      set({messages: response.data})
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
    finally {
      set({isMessagesLoading: false})
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get()
    try {
      const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      set({messages: [...messages, response.data]})    
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get()
    if(!selectedUser) return

    const socket = useAuthStore.getState().socket

    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) {
        return;
      }
      set({messages: [...get().messages, newMessage]})
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({selectedUser})
}))

export default useChatStore