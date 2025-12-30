import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "⚡",
      title: 'Boost Energy',
      description: 'Natural energy enhancement without crashes or jitters. Feel revitalized instantly.',
      color: "from-amber-400/20 to-amber-600/20"
    },
    {
      icon: "🛡️",
      title: 'Enhance Immunity',
      description: 'Strengthen your immune system with essential minerals and fulvic acid.',
      color: "from-green-400/20 to-green-600/20"
    },
    {
      icon: "🔬",
      title: 'Lab-Tested Purity',
      description: 'Every batch is rigorously tested for safety, purity, and potency.',
      color: "from-blue-400/20 to-blue-600/20"
    },
    {
      icon: "🌿",
      title: '100% Natural',
      description: 'Pure, organic, and ethically sourced from the Himalayan mountains.',
      color: "from-emerald-400/20 to-emerald-600/20"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block animate-fade-in">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 animate-slide-up">
            Benefits of Pure Shilajit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            Unlock your body's full potential with nature's most potent resin, packed with <span className="text-primary font-semibold">85+ minerals</span> and fulvic acid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md group-hover:bg-white">
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-gold-dark transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#testimonials"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors group"
          >
            See what our customers say
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;



