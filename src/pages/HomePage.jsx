import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductHighlights from '../components/ProductHighlights';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import FAQAccordion from '../components/FAQAccordion';
import SpecialOffer from '../components/SpecialOffer';
import AIRecommendations from '../components/AIRecommendations';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import AIChatbot from '../components/AIChatbot';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main>
        <HeroSection />
        <ProductHighlights />
        <BenefitsSection />
        <AboutSection />
        <SpecialOffer />
        <TestimonialsSlider />
        <BlogSection />
        <FAQAccordion />
        {/* <AIRecommendations /> - Hidden for now until AI connection is fixed */}
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default HomePage;




