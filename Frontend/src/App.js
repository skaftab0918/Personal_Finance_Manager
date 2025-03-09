import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login'; // Import Login component
import Register from './pages/Register'; // Import Register component
import EditProfile from './pages/EditProfile';
import { SocketProvider } from "./SocketContext";


function App() {
  return (
    <SocketProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/profile" element={<Profile />} /> {/* Profile page */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* EditProfile page */}

      </Routes>
    </Router>
    </SocketProvider>
  );
}

export default App;