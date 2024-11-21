import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check')
            set({
                authUser: response.data
            })

            get().connectSocket();  // if loggedIn then socket connection ok
        } catch (error) {
            console.log("Erorr in checkAuth : ", error)
            set({
                authUser: null
            })
        } finally {
            set({
                isCheckingAuth: false
            })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({
                authUser: res.data
            });
            toast.success("Account created successfully");
            get().connectSocket(); // after signup a socket connection is established
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({
                isSigningUp: false
            });
        }
    },

    login: async (data) => {
        set({
            isLoggingIn: true
        });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            // get().connectSocket(); // after login a socket connection is established

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({
                isLoggingIn: false
            });
        }
    },


    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({
                authUser: null
            });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },


    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return; // if not authenticated or already connected then donot make a new connection

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },


    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },


}))

