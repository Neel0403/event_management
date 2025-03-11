import './App.css';
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login"
import Home from './pages/Home';
import GuestLogin from './pages/auth/GuestLogin';
import Dashboard from './pages/Dashboard';
import CreateEvent from "./pages/events/CreateEvent";
import EditEvent from './pages/events/EditEvent';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventList from './components/events/EventList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/guest-login" element={<GuestLogin />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
