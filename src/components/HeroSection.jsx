import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroTexts = [
    'Pure Himalayan Shilajit',
    'Ancient Wisdom',
    'Nature\'s Potent Resin',
    'Premium Wellness'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: '👥' },
    { number: '4.9★', label: 'Average Rating', icon: '⭐' },
    { number: '100%', label: 'Authentic', icon: '✓' },
    { number: '84+', label: 'Minerals', icon: '💎' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Parallax Effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=1920)',
          }}
        >
          <div className="absolute inset-0 hero-gradient-overlay"></div>
        </div>

        {/* Animated Particles/Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gold-light/10 rounded-full blur-3xl animate-float"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className={`inline-block mb-6 ${isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
            <div className="glass-effect px-6 py-2 rounded-full text-white text-sm font-medium tracking-wide border border-white/20">
              ✨ Source of Eternal Youth from 18,000ft
            </div>
          </div>

          {/* Animated Heading */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="block mb-2">Pure Himalayan Shilajit</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold block">
              for Energy & Wellness
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            Experience the original resin, rich in fulvic acid and 84+ minerals. <br className="hidden md:block" />
            Lab-tested for purity, sourced with respect.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
            <Link
              to="/products"
              className="group relative bg-gradient-to-r from-gold to-gold-dark text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Shop Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <a
              href="#benefits"
              className="group glass-effect border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Learn More
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust Stats - Replaced stats array with direct content to match request */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
            <div className="glass-effect p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-gold/30 transition-colors">
              <div className="text-3xl mb-2">🌿</div>
              <div className="font-bold text-white mb-1">100% Organic</div>
              <div className="text-xs text-white/70">Certified Pure</div>
            </div>
            <div className="glass-effect p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-gold/30 transition-colors">
              <div className="text-3xl mb-2">🔬</div>
              <div className="font-bold text-white mb-1">Lab-Tested</div>
              <div className="text-xs text-white/70">Safety Assured</div>
            </div>
            <div className="glass-effect p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-gold/30 transition-colors">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold text-white mb-1">High Potency</div>
              <div className="text-xs text-white/70">85% Fulvic Acid</div>
            </div>
            <div className="glass-effect p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-gold/30 transition-colors">
              <div className="text-3xl mb-2">⭐</div>
              <div className="font-bold text-white mb-1">4.9/5 Rating</div>
              <div className="text-xs text-white/70">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <a
            href="#benefits"
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
          >
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <svg
              className="w-6 h-6 group-hover:translate-y-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 hidden lg:block animate-float">
        <div className="glass-effect p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-white">
              <div className="font-semibold">Free Shipping</div>
              <div className="text-sm text-white/70">On orders PKR 50+</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-10 hidden lg:block animate-float-delayed">
        <div className="glass-effect p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-white">
              <div className="font-semibold">100% Authentic</div>
              <div className="text-sm text-white/70">Lab tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
