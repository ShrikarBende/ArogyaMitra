import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AromiFloater from './components/AromiFloater';
import { Activity, Apple, User, CalendarDays, LogOut } from 'lucide-react';
import { useStore } from './store';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Main Layout component for authenticated users
const MainLayout = ({ children }) => {
  const logout = useStore((state) => state.logout);

  return (
    <div className="flex h-screen bg-dark-900 text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 glass-panel m-4 flex flex-col p-6 rounded-2xl relative z-10 border border-white/5 shadow-2xl">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white bg-clip-text bg-gradient-to-r from-white to-gray-400">ArogyaMitra</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white hover:translate-x-1">
            <Activity className="w-5 h-5 text-primary-500" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/workouts" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white hover:translate-x-1">
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Workouts</span>
          </Link>
          <Link to="/nutrition" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white hover:translate-x-1">
            <Apple className="w-5 h-5 text-green-400" />
            <span className="font-medium">Nutrition</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white hover:translate-x-1">
            <User className="w-5 h-5 text-orange-400" />
            <span className="font-medium">Profile</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/10 transition-all duration-300 text-gray-400 hover:text-red-400 hover:translate-x-1"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        {/* Subtle animated background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" style={{ animationDelay: '1s' }}></div>

        {children}
      </div>

      {/* Global AROMI Floater Assistant */}
      <AromiFloater />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes Wrapper */}
        <Route path="/" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><MainLayout><Workouts /></MainLayout></ProtectedRoute>} />
        <Route path="/nutrition" element={<ProtectedRoute><MainLayout><Nutrition /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
