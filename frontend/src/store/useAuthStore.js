import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4001" : "/"

const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isError: null,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check')    
      set({authUser: response.data})
      get().connectSocket()
    } 
    catch (error) {
      console.log("Error in checkAuth", error.message)
    }
    finally {
      set({isCheckingAuth: false})
    }
  },

  signup: async (data) => {
    set({isSigningUp: true})
    try {
      const response = await axiosInstance.post('/auth/signup', data)  
      set({authUser: response.data})
      get().connectSocket()
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
    finally {
      set({isSigningUp: false})
    }
  },

  login: async (data) => {
    set({isLoggingIn: true})
    try {
      const response = await axiosInstance.post('/auth/login', data)
      set({authUser: response.data})
      get().connectSocket()
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
    finally {
      set({isLoggingIn: false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({authUser: null})  
      get().disconnectSocket()
    } 
    catch (error) {
      console.log("Logout unsuccessful")
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile: true})
    try {
      const response = await axiosInstance.put('/auth/update', data)
      set({authUser: response.data})  
    } 
    catch (error) {
      set({isError: error.response.data.error})
    }
    finally {
      set({isUpdatingProfile: false})
    }
  },

  connectSocket: () => {
    const { authUser } = get()
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    socket.connect()
    set({socket: socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },

  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect()
  }
}))

export default useAuthStore