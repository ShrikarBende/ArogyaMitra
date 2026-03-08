import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Activity, ArrowRight, Mail, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const login = useStore((state) => state.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            login({ name: 'User', email });
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-md p-8 relative z-10 glass-panel">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] mb-4">
                        <Activity className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        ArogyaMitra
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 relative group">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative group">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                        {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <a href="#" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
