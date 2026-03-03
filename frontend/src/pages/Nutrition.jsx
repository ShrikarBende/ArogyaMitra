import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Droplet, Leaf, ShoppingCart, ChevronDown, Check, Apple, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Nutrition = () => {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [isExporting, setIsExporting] = useState(false);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const element = document.getElementById('nutrition-content');
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#0f172a' // match background
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('ArogyaMitra_Nutrition_Plan.pdf');
        } catch (error) {
            console.error('Error generating PDF', error);
        } finally {
            setIsExporting(false);
        }
    };

    const mockNutritionPlan = {
        targetCalories: 2400,
        macros: { protein: 180, carbs: 250, fats: 75 },
        meals: [
            { id: 1, type: 'Breakfast', name: 'High-Protein Oatmeal', calories: 450, macros: '30g P | 50g C | 15g F', icon: <Droplet className="w-5 h-5 text-blue-400" /> },
            { id: 2, type: 'Lunch', name: 'Grilled Chicken & Sweet Potato', calories: 650, macros: '50g P | 70g C | 20g F', icon: <Utensils className="w-5 h-5 text-orange-400" /> },
            { id: 3, type: 'Snack', name: 'Greek Yogurt & Almonds', calories: 300, macros: '20g P | 15g C | 15g F', icon: <Apple className="w-5 h-5 text-red-400" /> },
            { id: 4, type: 'Dinner', name: 'Baked Salmon with Quinoa & Asparagus', calories: 750, macros: '45g P | 60g C | 30g F', icon: <Leaf className="w-5 h-5 text-green-400" /> },
            { id: 5, type: 'Pre-Bed', name: 'Casein Protein Shake', calories: 250, macros: '35g P | 5g C | 5g F', icon: <Droplet className="w-5 h-5 text-purple-400" /> }
        ]
    };

    const [groceryList, setGroceryList] = useState([
        { category: 'Proteins', items: [{ name: 'Chicken Breast (2 lbs)', checked: false }, { name: 'Salmon Fillets (2)', checked: false }, { name: 'Greek Yogurt (32oz)', checked: false }, { name: 'Whey/Casein Protein', checked: false }] },
        { category: 'Carbs', items: [{ name: 'Sweet Potatoes (4)', checked: false }, { name: 'Quinoa (1 bag)', checked: false }, { name: 'Rolled Oats', checked: false }, { name: 'Jasmine Rice', checked: false }] },
        { category: 'Fats/Misc', items: [{ name: 'Almonds', checked: false }, { name: 'Olive Oil', checked: false }, { name: 'Avocado (3)', checked: false }, { name: 'Asparagus (2 bunches)', checked: false }] }
    ]);

    const toggleGroceryItem = (categoryIndex, itemIndex) => {
        const newList = [...groceryList];
        newList[categoryIndex].items[itemIndex].checked = !newList[categoryIndex].items[itemIndex].checked;
        setGroceryList(newList);
    };

    return (
        <motion.div
            id="nutrition-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto space-y-8"
        >
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Nutrition Plan</h2>
                    <p className="text-gray-400 mt-2">Fuel your body efficiently based on your goals.</p>
                </div>
            </div>

            {/* Macro Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary-500/5 group-hover:bg-primary-500/10 transition-colors"></div>
                    <span className="text-gray-400 text-sm font-medium mb-1">Daily Target</span>
                    <span className="text-3xl font-extrabold text-white">{mockNutritionPlan.targetCalories} <span className="text-base font-normal text-gray-500">kcal</span></span>
                </div>
                <div className="glass-panel p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
                    <span className="text-gray-400 text-sm font-medium mb-1">Protein</span>
                    <span className="text-3xl font-extrabold text-white">{mockNutritionPlan.macros.protein}<span className="text-base font-normal text-gray-500">g</span></span>
                </div>
                <div className="glass-panel p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                    <span className="text-gray-400 text-sm font-medium mb-1">Carbs</span>
                    <span className="text-3xl font-extrabold text-white">{mockNutritionPlan.macros.carbs}<span className="text-base font-normal text-gray-500">g</span></span>
                </div>
                <div className="glass-panel p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
                    <span className="text-gray-400 text-sm font-medium mb-1">Fats</span>
                    <span className="text-3xl font-extrabold text-white">{mockNutritionPlan.macros.fats}<span className="text-base font-normal text-gray-500">g</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Meal Plan List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Day Selector */}
                    <div className="flex gap-2 p-2 glass-panel rounded-xl overflow-x-auto scrollbar-none">
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 ${selectedDay === day ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'} rounded-lg whitespace-nowrap transition-all flex-1`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {mockNutritionPlan.meals.map((meal, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={meal.id}
                                className="glass-panel p-5 flex items-center justify-between hover:border-white/20 transition-all border-l-4 border-l-transparent hover:border-l-primary-500"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-inner">
                                        {meal.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-primary-400 font-bold uppercase tracking-wider mb-1">{meal.type}</p>
                                        <h4 className="text-lg font-bold text-gray-200">{meal.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{meal.macros}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-white">{meal.calories}</span>
                                    <span className="block text-xs text-gray-500">kcal</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Grocery List */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 sticky top-8">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Grocery List</h3>
                                <p className="text-sm text-gray-400">Week of Oct 24 - Oct 31</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {groceryList.map((category, catIdx) => (
                                <div key={catIdx}>
                                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">{category.category}</h4>
                                    <ul className="space-y-2">
                                        {category.items.map((item, itemIdx) => (
                                            <li
                                                key={itemIdx}
                                                onClick={() => toggleGroceryItem(catIdx, itemIdx)}
                                                className="flex items-center gap-3 group cursor-pointer"
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-primary-500 border-primary-500' : 'border-white/20 group-hover:border-primary-500'}`}>
                                                    {item.checked && <Check className="w-3 h-3 text-white font-bold" />}
                                                </div>
                                                <span className={`transition-colors ${item.checked ? 'text-gray-500 line-through' : 'text-gray-400 group-hover:text-white'}`}>{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={exportToPDF}
                            disabled={isExporting}
                            className="w-full mt-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isExporting ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <><Download className="w-5 h-5" /> Export to PDF</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Nutrition;
