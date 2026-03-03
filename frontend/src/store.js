import { create } from 'zustand'

export const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    // Mock initial data
    stats: {
        caloriesBurned: 1450,
        workoutStreak: 12,
        charityImpact: "$5.50"
    },
    setStats: (stats) => set({ stats })
}))
