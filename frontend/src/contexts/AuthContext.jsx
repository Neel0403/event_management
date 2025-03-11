import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    token: null,
    register: () => { },
    login: () => { },
    logout: () => { },
    guestLogin: () => { }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                toast.error("Failed to load user data. Invalid data format.");
            }
        }
        if (storedToken) {
            setToken(storedToken)
        }
    }, []);

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', userData)

            if (response.data) {
                setUser(response.data.user)
                setToken(response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
            }

            return response.data
        } catch (error) {
            toast.error("Registration failed. Please try again.")
        }
    }

    const login = async (userData) => {
        try {
            const response = await axios.post("/auth/login", userData)

            if (response.data) {
                setUser(response.data.user)
                setToken(response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
            }

            return response.data
        } catch (error) {
            toast.error("Login failed. Please try again.")
        }
    }

    const guestLogin = async (userData) => {
        try {
            const response = await axios.post('/auth/guest-login', userData);

            if (response.data) {
                setUser(response.data.user)
                localStorage.setItem('user', JSON.stringify(response.data.user))
            }
        } catch (error) {
            toast.error("Guest login failed. Please try again.")
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post("/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                setUser(null)
                setToken(null)
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.")
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!user, user, token, register, login, logout, guestLogin }}>
            {children}
        </AuthContext.Provider>)
};

export const useAuth = () => {
    return useContext(AuthContext);
}
