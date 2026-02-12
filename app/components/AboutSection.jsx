import Image from 'next/image';

const AboutSection = () => {
    return (
        <section id="about" className="py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">About Us</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
                        HerbalSource
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">Pure • Natural • Powerful</p>
                </div>

                {/* Mission Statement */}
                <div className="max-w-4xl mx-auto mb-10 text-center">
                    <p className="text-base text-gray-700 leading-relaxed">
                        HerbalSource is dedicated to bringing people the purest and most authentic herbal products nature has to offer. Our mission is simple: to provide natural health solutions that strengthen the body, boost immunity, and restore the energy that nature intended for human well-being.
                    </p>
                </div>

                {/* Origin Section */}
                <div className="flex flex-col lg:flex-row items-center gap-10 mb-12">
                    <div className="lg:w-1/2 relative group">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800"
                                alt="Himalayan Mountains - Skardu and Hunza"
                                width={800}
                                height={600}
                                className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gold px-3 py-1 rounded-full text-xs font-bold text-primary">Pure Source</span>
                                </div>
                                <h3 className="text-xl font-serif font-bold">Skardu & Hunza</h3>
                                <p className="text-white/80 text-sm">Heart of the Himalayas</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                            Our Origin — From the Heart of the Himalayas
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed">
                            We source our Shilajit from the untouched, high-altitude mountains of Skardu and Hunza. These regions are known for their purity, clean environment, and centuries-old healing traditions. Every step of our process stays true to nature, ensuring the highest quality from mountain to jar.
                        </p>
                    </div>
                </div>

                {/* Sunlight Process Section */}
                <div className="bg-gradient-to-br from-gold/5 to-primary/5 rounded-2xl p-8 mb-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                            ☀️
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                            Our Natural Sunlight Activation Process
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed mb-6">
                            At HerbalSource, we follow a traditional method that has been used for generations. We place our raw Shilajit under pure sunlight for several days, allowing it to naturally cure, mature, and activate.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-white p-5 rounded-xl shadow-md">
                                <div className="text-2xl mb-2">💎</div>
                                <h4 className="font-bold text-primary mb-1">Original Minerals</h4>
                                <p className="text-sm text-gray-600">Preserved in their natural state</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-md">
                                <div className="text-2xl mb-2">⚡</div>
                                <h4 className="font-bold text-primary mb-1">Potent Acids</h4>
                                <p className="text-sm text-gray-600">Fulvic and humic acids activated</p>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-md">
                                <div className="text-2xl mb-2">🌿</div>
                                <h4 className="font-bold text-primary mb-1">Natural Purity</h4>
                                <p className="text-sm text-gray-600">Strength and quality maintained</p>
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-gold mt-6">
                            This is why HerbalSource Shilajit carries the true energy of the Himalayas.
                        </p>
                    </div>
                </div>

                {/* Commitment Section */}
                <div className="max-w-4xl mx-auto mb-10">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4 text-center">
                        Our Commitment — Export Quality for Our Own People
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed text-center mb-4">
                        We proudly offer our customers in Pakistan the same export-quality product and packaging that we ship worldwide. Every batch undergoes strict laboratory testing to ensure safety, authenticity, and unmatched potency. The premium packaging protects freshness, maintains product quality, and meets international export standards.
                    </p>
                    <p className="text-lg font-semibold text-gold text-center">
                        Because we believe our people deserve nothing less than world-class quality.
                    </p>
                </div>

                {/* Why HerbalSource */}
                <div className="bg-primary text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-center">Why HerbalSource?</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">✓</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">100% Pure & Natural</h4>
                                <p className="text-white/80 text-sm">Herbal products from nature</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">☀️</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Sunlight-Cured</h4>
                                <p className="text-white/80 text-sm">Traditional Himalayan method</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">📦</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Export-Quality</h4>
                                <p className="text-white/80 text-sm">Packaging used worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">🧪</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Lab-Tested</h4>
                                <p className="text-white/80 text-sm">Purity and safety verified</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">🌍</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Globally Trusted</h4>
                                <p className="text-white/80 text-sm">Customers worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shrink-0 text-xl">🏔️</div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Himalayan Source</h4>
                                <p className="text-white/80 text-sm">From Skardu & Hunza</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;