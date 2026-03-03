import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, HeartPulse, ArrowRight, Play, Utensils } from 'lucide-react';
import { useStore } from '../store';

const Dashboard = () => {
    const { stats } = useStore();
    const [isPlaying, setIsPlaying] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div
            className="space-y-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text pb-2">
                        Welcome back, User
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-400 mt-1 text-lg">Let's crush your goals today. 💪</motion.p>
                </div>
                <motion.button variants={itemVariants} className="px-6 py-3 bg-primary-500/10 text-primary-500 border border-primary-500/30 rounded-xl hover:bg-primary-500 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center gap-2 group font-medium">
                    Health Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="glass-panel p-6 flex items-center gap-5 hover:border-white/20 transition-all hover:translate-y-[-2px]">
                    <div className="p-4 bg-orange-500/20 rounded-2xl text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                        <Flame className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Calories Burned</p>
                        <h3 className="text-3xl font-bold tracking-tight">{stats.caloriesBurned} <span className="text-sm font-normal text-gray-500">kcal</span></h3>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-6 flex items-center gap-5 hover:border-white/20 transition-all hover:translate-y-[-2px]">
                    <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Workout Streak</p>
                        <h3 className="text-3xl font-bold tracking-tight">{stats.workoutStreak} <span className="text-sm font-normal text-gray-500">days</span></h3>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-6 flex items-center gap-5 hover:border-white/20 transition-all hover:translate-y-[-2px]">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <HeartPulse className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Charity Impact</p>
                        <h3 className="text-3xl font-bold tracking-tight">{stats.charityImpact} <span className="text-sm font-normal text-gray-500">donated</span></h3>
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Workout Card */}
                <div className="glass-panel p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-colors"></div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Today's Protocol</h3>
                            <p className="text-gray-400">Upper Body Hypertrophy (45 mins)</p>
                        </div>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300 border border-white/5">Medium Intensity</span>
                    </div>

                    {isPlaying ? (
                        <div className="w-full h-40 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 relative">
                            <iframe
                                className="w-full h-full absolute inset-0"
                                src="https://www.youtube.com/embed/lWhBGowNAVM?autoplay=1"
                                title="Upper Body Workout"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div
                            onClick={() => setIsPlaying(true)}
                            className="w-full h-40 bg-zinc-800/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-gray-500 relative overflow-hidden group-hover:border-white/20 transition-colors cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <Play className="w-12 h-12 text-white/80 z-20 group-hover:scale-110 transition-transform mb-2" fill="currentColor" />
                            <span className="z-20 text-sm text-gray-300 font-medium">Watch Tutorial</span>
                        </div>
                    )}

                    <button className="w-full mt-6 py-4 bg-white text-black font-extrabold text-lg rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-gray-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all">
                        Start Workout
                    </button>
                </div>

                {/* Nutrition Card */}
                <div className="glass-panel p-8 backdrop-blur-3xl bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Nutrition Target</h3>
                            <p className="text-gray-400">2400 kcal | 180g Protein</p>
                        </div>
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Utensils className="w-5 h-5" />
                        </div>
                    </div>

                    <ul className="space-y-3 mt-8">
                        <li className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-medium">Breakfast: Omelette & Avocado</span>
                            </div>
                            <span className="text-primary-500 font-bold">450 kcal</span>
                        </li>
                        <li className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="font-medium">Lunch: Grilled Chicken Quinoa</span>
                            </div>
                            <span className="text-primary-500 font-bold">650 kcal</span>
                        </li>
                        <li className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                <span className="font-medium">Dinner: Salmon & Asparagus</span>
                            </div>
                            <span className="text-primary-500 font-bold">550 kcal</span>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
