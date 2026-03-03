import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import AromiFloater from './components/AromiFloater';
import { Activity, Apple, User, CalendarDays } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-dark-900 text-gray-100 overflow-hidden font-sans">
        {/* Sidebar */}
        <div className="w-64 glass-panel m-4 flex flex-col p-6 rounded-2xl relative z-10 border border-white/5 shadow-2xl">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ArogyaMitra</h1>
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
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Subtle animated background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" style={{ animationDelay: '1s' }}></div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Global AROMI Floater Assistant */}
        <AromiFloater />
      </div>
    </Router>
  );
}

export default App;
