import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/check-session', {
                    withCredentials: true
                });
                if (response.data.data) {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.log("Session verification failed:", error);
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        try {
            setUser(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null)
        } catch (error) {
            console.error("Invalid user data in localStorage:", error);
            localStorage.removeItem('user');
            setUser(null);
        }

        setToken(storedToken && storedToken !== "undefined" ? storedToken : null)
    }, []);

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', userData)
            if (response.data && response.data.data) {
                const { user, accessToken } = response.data.data

                if (!user || !accessToken) {
                    throw new Error("Invalid response")
                }
                setUser(response.data.data.user)
                setToken(response.data.data.accessToken)

                localStorage.setItem('user', JSON.stringify(response.data.data.user))
                localStorage.setItem('token', response.data.data.accessToken)
                return { success: true, message: "Registration successful" }
            } else {
                throw new Error(response.data?.message || "Unexpected response from server");
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Registration failed. Please try again.");
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    }

    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", userData, { withCredentials: true })
            console.log("Login Response:", response)

            if (response.data.data) {
                setUser(response.data.data.user)
                setToken(response.data.data.accessToken)
                localStorage.setItem('user', JSON.stringify(response.data.data.user))
                localStorage.setItem('token', response.data.data.accessToken)
            }

            return response.data.data
        } catch (error) {
            toast.error("Login failed. Please try again.")
        }
    }

    const guestLogin = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/guest-login', userData);

            if (response.data.data) {
                setUser(response.data.data.user)
                localStorage.setItem('user', JSON.stringify(response.data.data.user))
            }
        } catch (error) {
            toast.error("Guest login failed. Please try again.")
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true })

            if (response.status === 200) {
                setUser(null)
                setToken(null)
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                toast.success("Logged out successfully.")
                return true
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.")
            return false
        }
        return false;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!user, user, token, register, login, logout, guestLogin }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
}
