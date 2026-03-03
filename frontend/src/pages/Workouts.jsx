import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Circle, Clock, Flame, Calendar as CalendarIcon } from 'lucide-react';

const Workouts = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(null);

    // Mock 7-day plan structure
    const weeklyPlan = [
        {
            day: 'Monday',
            focus: 'Upper Body Hypertrophy',
            duration: '45 mins',
            calories: '320 kcal',
            exercises: [
                { id: 1, name: 'Push-ups', sets: 3, reps: '12-15', videoId: 'eiMOxvZKyvM', completed: true },
                { id: 2, name: 'Dumbbell Rows', sets: 3, reps: '10-12', videoId: 'djKXLt7kv7Q', completed: false },
                { id: 3, name: 'Overhead Press', sets: 3, reps: '8-10', videoId: 'KP1sYz2VICk', completed: false },
                { id: 4, name: 'Bicep Curls', sets: 3, reps: '15', videoId: 'XE_pHwbst04', completed: false }
            ]
        },
        {
            day: 'Tuesday',
            focus: 'Lower Body Strength',
            duration: '50 mins',
            calories: '400 kcal',
            exercises: [
                { id: 5, name: 'Squats', sets: 4, reps: '8', videoId: 'gcNh17Ckjgg', completed: false },
                { id: 6, name: 'Romanian Deadlifts', sets: 3, reps: '10', videoId: 'eUvGuXWeHIQ', completed: false },
                { id: 7, name: 'Lunges', sets: 3, reps: '12/leg', videoId: 'QOVaHwm-Q6U', completed: false }
            ]
        },
        { day: 'Wednesday', focus: 'Active Recovery', duration: '20 mins', calories: '150 kcal', exercises: [] },
        { day: 'Thursday', focus: 'Core & Cardio HIIT', duration: '30 mins', calories: '350 kcal', exercises: [] },
        { day: 'Friday', focus: 'Full Body Functional', duration: '45 mins', calories: '380 kcal', exercises: [] },
        { day: 'Saturday', focus: 'Mobility Flow', duration: '20 mins', calories: '100 kcal', exercises: [] },
        { day: 'Sunday', focus: 'Rest Day', duration: '0 mins', calories: '0 kcal', exercises: [] },
    ];

    const currentWorkout = weeklyPlan[selectedDay];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
        >
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Weekly Protocol</h2>
                    <p className="text-gray-400 mt-2">Your AI-optimized 7-day routine</p>
                </div>
                <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-300" />
                    <span className="font-medium text-gray-200">Regenerate Plan</span>
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
                {weeklyPlan.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedDay(idx)}
                        className={`flex-shrink-0 w-32 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border ${selectedDay === idx ? 'bg-primary-500 text-white border-primary-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'glass-panel text-gray-400 hover:bg-white/10 border-white/5'}`}
                    >
                        <span className="font-bold text-sm uppercase tracking-wider">{day.day.substring(0, 3)}</span>
                        <div className={`w-2 h-2 rounded-full ${day.focus === 'Rest Day' ? 'bg-gray-500' : 'bg-emerald-400'}`}></div>
                    </button>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 border-l-4 border-l-primary-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white">{currentWorkout.focus}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400 font-medium">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" /> {currentWorkout.duration}</span>
                                <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-400" /> {currentWorkout.calories}</span>
                            </div>
                        </div>
                        {currentWorkout.exercises.length > 0 && (
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                Start Session
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {currentWorkout.exercises.length > 0 ? (
                            currentWorkout.exercises.map((ex, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-panel p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <button className="text-gray-500 group-hover:text-primary-500 transition-colors">
                                            {ex.completed ? <CheckCircle2 className="w-6 h-6 text-primary-500" /> : <Circle className="w-6 h-6" />}
                                        </button>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-200">{ex.name}</h4>
                                            <p className="text-sm text-gray-400">{ex.sets} Sets × {ex.reps} Reps</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setPlayingVideo(ex.videoId)}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400 transition-all flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Play className="w-4 h-4" /> Watch
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="glass-panel p-10 text-center flex flex-col items-center justify-center border-dashed border-white/10">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-500">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-300">No structured exercises today</h4>
                                <p className="text-gray-500 mt-2">Take time to recover or follow the light activity suggested.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8 glass-panel p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -z-10"></div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary-500" /> Exercise Player
                        </h3>

                        {playingVideo ? (
                            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                                    title="Exercise Tutorial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="w-full aspect-video bg-zinc-900/50 rounded-xl border border-white/5 flex flex-col items-center justify-center text-gray-600 p-6 text-center">
                                <Play className="w-12 h-12 mb-3 opacity-50" />
                                <p className="text-sm">Click "Watch" on any exercise to learn proper form.</p>
                            </div>
                        )}

                        {playingVideo && (
                            <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                                <h4 className="font-bold text-emerald-400 mb-1">Coach's Tip</h4>
                                <p className="text-sm text-gray-300">Maintain a slow, controlled negative on every rep to maximize muscle hypertrophy and prevent injury.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Workouts;
