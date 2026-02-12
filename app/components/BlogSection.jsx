import React from 'react';
import Image from 'next/image';

const BlogSection = () => {
    const posts = [
        {
            id: 1,
            title: "Himalayan Shilajit: 11 Possible Health Benefits",
            excerpt: "Discover the ancient Himalayan remedy used for thousands of years in Ayurvedic medicine. From promoting longevity and cognitive health to supporting immune function and male fertility, explore what modern science says about this powerful natural supplement.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
            category: "Wellness",
            readTime: "12 min read",
            date: "Dec 28, 2024",
            link: "https://health.clevelandclinic.org/shilajit-benefits"
        },
        {
            id: 2,
            title: "Shilajit: A Natural Phytocomplex with Cognitive Benefits",
            excerpt: "Scientific research reveals how fulvic acid in Shilajit blocks tau protein aggregation, opening new pathways for Alzheimer's prevention. Learn about this potent antioxidant's neuroprotective properties, traditional uses, and molecular composition backed by peer-reviewed studies.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600",
            category: "Education",
            readTime: "15 min read",
            date: "Dec 25, 2024",
            link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3296184/"
        },
        {
            id: 3,
            title: "Healing with Shilajit: Ancient Wisdom Meets Modern Science",
            excerpt: "Journey through centuries of healing tradition from Aristotle to Avicenna. Discover why this 'rock-overpowering' substance was prized by ancient physicians, how it traveled the Silk Road, and what modern research reveals about this Ayurvedic adaptogen's therapeutic potential.",
            image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600",
            category: "Lifestyle",
            readTime: "10 min read",
            date: "Dec 20, 2024",
            link: "https://www.innertraditions.com/blog/healing-with-shilajit"
        }
    ];

    return (
        <section id="blog" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">Latest Articles</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                            Wellness Journal
                        </h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
                        View All Articles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-gold font-semibold hover:text-gold-dark transition-colors text-sm uppercase tracking-wide group/link"
                                >
                                    Read More
                                    <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-gold transition-colors">
                        View All Articles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;