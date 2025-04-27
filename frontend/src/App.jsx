import './App.css';
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login"
import Home from './pages/Home';
import GuestLogin from './pages/auth/GuestLogin';
import Dashboard from './pages/Dashboard';
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from './pages/events/EditEvent';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventList from './components/events/EventList';
import { Routes, Route, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  console.log("USER:", user)
  console.log("isLoggedIn:", isLoggedIn)
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate])
  return (
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/edit-event/:id" element={<EditEvent />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/guest-login" element={<GuestLogin />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
