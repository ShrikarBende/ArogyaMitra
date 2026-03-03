import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AromiFloater = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: "Hi! I'm AROMI, your personal wellness coach. How can I help you crush your goals today?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = message;
        setMessage('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:8000/coach/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await res.json();

            setChatHistory(prev => [...prev, { role: 'ai', content: data.response || "Sorry, I couldn't process that." }]);
        } catch (err) {
            setChatHistory(prev => [...prev, { role: 'ai', content: "Network error. Please make sure the backend is running." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] glass-panel bg-dark-900/95 flex flex-col overflow-hidden border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-4 bg-gradient-to-r from-primary-500/20 to-transparent border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                    <span className="text-white font-bold text-xs tracking-wider">AI</span>
                                </div>
                                <h3 className="font-bold text-white tracking-wide">AROMI Coach</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col min-h-0 bg-transparent scrollbar-thin scrollbar-thumb-white/10">
                            {chatHistory.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`max-w-[85%] p-3 px-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary-500 text-white self-end rounded-br-sm shadow-[0_5px_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 text-gray-200 self-start rounded-bl-sm border border-white/10 shadow-inner'}`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-white/5 p-4 rounded-2xl rounded-bl-sm border border-white/5 w-16">
                                    <div className="flex justify-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask for advice, tips, or adjustments..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500 shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 p-2 bg-primary-500 hover:bg-primary-400 text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-primary-500"
                                    disabled={!message.trim() || isTyping}
                                >
                                    <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer border hover:scale-110 active:scale-95 shadow-2xl ${isOpen ? 'bg-white/10 border-white/20 text-white' : 'bg-gradient-to-tr from-primary-500 to-emerald-300 border-emerald-400/30 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]'}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <span className="font-extrabold tracking-widest text-sm">AI</span>}
            </button>
        </div>
    );
};

export default AromiFloater;
