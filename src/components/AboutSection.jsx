import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Content */}
                    <div className="lg:w-1/2 relative group">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1518002171953-a080ee32bed2?w=800"
                                alt="Himalayan Mountains"
                                className="w-full h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            <div className="absolute bottom-8 left-8 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gold px-3 py-1 rounded-full text-xs font-bold text-primary">Original Source</span>
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">18,000 Ft</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold">Gilgit-Baltistan</h3>
                                <p className="text-white/80 text-sm">The heart of pure Shilajit</p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-10 -left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>

                        {/* Experience Badge */}
                        <div className="absolute top-8 -right-8 bg-white p-6 rounded-2xl shadow-xl animate-float hidden lg:block">
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-gold mb-1">100%</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pure Gold Grade</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                            Sourced from the Roof of the World
                        </h2>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Our journey begins in the pristine peaks of the Himalayas, where nature has been perfecting its most potent elixir for centuries. Unlike commercially processed alternatives, our Shilajit is wild-harvested at altitudes above 16,000 feet.
                            </p>
                            <p>
                                We work directly with local communities in Gilgit-Baltistan who have preserved the ancient art of purification. This ensures that every jar contains only the most potent, resinous gold-grade Shilajit.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0 text-2xl">🏔️</div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg">High Altitude</h4>
                                    <p className="text-sm text-gray-500">Harvested above 16,000ft for maximum potency</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0 text-2xl">🧪</div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg">Lab Verified</h4>
                                    <p className="text-sm text-gray-500">Tested for heavy metals and purity</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <a
                                href="#products"
                                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/30"
                            >
                                Experience the Purity
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
