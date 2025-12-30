import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SpecialOffer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
            }}></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <div className="lg:w-1/2 text-white">
                        <div className="inline-block bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-1 mb-6">
                            <span className="text-gold font-bold tracking-wider text-sm uppercase">Limited Time Offer</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                            Get <span className="text-gold">20% OFF</span><br />
                            Your First Order
                        </h2>

                        <p className="text-white/80 text-lg mb-8 max-w-xl">
                            Experience the power of authentic Himalayan Shilajit. Use code <span className="font-mono bg-white/10 px-2 py-1 rounded text-gold font-bold">WELCOME20</span> at checkout.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center border border-white/10">
                                <span className="block text-3xl font-bold text-white mb-1">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-xs text-gold uppercase tracking-wider">Hours</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center border border-white/10">
                                <span className="block text-3xl font-bold text-white mb-1">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-xs text-gold uppercase tracking-wider">Mins</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center border border-white/10">
                                <span className="block text-3xl font-bold text-white mb-1">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                <span className="text-xs text-gold uppercase tracking-wider">Secs</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col items-center">
                        {/* CTA Box */}
                        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-primary mb-2">Starter Bundle</h3>
                                <p className="text-gray-500">Perfect for beginners</p>
                            </div>

                            <div className="flex justify-center mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1611095973763-414019e72400?w=400"
                                    alt="Shilajit Bundle"
                                    className="w-48 h-48 object-cover rounded-xl shadow-lg"
                                />
                            </div>

                            <Link to="/products" className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl">
                                Shop Now & Save 20%
                            </Link>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                *Free shipping on orders over PKR 5000
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;
