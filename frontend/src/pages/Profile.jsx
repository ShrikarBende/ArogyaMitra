import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, AlertTriangle, Target, Save } from 'lucide-react';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        age: 28,
        weight: 82.5,
        height: 180,
        goal: 'Muscle Hypertrophy & Fat Loss',
        medical: 'None',
        allergies: 'Peanuts'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="mb-8">
                <h2 className="text-4xl font-extrabold text-white">Health Profile</h2>
                <p className="text-gray-400 mt-2">Update your metrics to ensure AROMI generates the most accurate plans.</p>
            </div>

            <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-xl font-bold border-b border-white/10 pb-3 mb-5 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" /> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Biometrics & Goals */}
                    <div>
                        <h3 className="text-xl font-bold border-b border-white/10 pb-3 mb-5 mt-8 flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-400" /> Metrics & Objectives
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                                <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-colors" />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Primary Goal</label>
                                <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer">
                                    <option>Weight Loss</option>
                                    <option>Muscle Hypertrophy & Fat Loss</option>
                                    <option>Endurance & Stamina</option>
                                    <option>General Fitness</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Medical & Restrictions */}
                    <div>
                        <h3 className="text-xl font-bold border-b border-white/10 pb-3 mb-5 mt-8 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-400" /> Health Conditions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Medical History / Injuries</label>
                                <textarea name="medical" value={formData.medical} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors placeholder:text-gray-600" placeholder="e.g. lower back pain, knee surgery..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Dietary Allergies</label>
                                <textarea name="allergies" value={formData.allergies} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors placeholder:text-gray-600" placeholder="e.g. dairy, gluten, nuts..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end">
                        <button className="px-8 py-3 bg-primary-500 hover:bg-primary-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                            <Save className="w-5 h-5" /> Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Profile;
