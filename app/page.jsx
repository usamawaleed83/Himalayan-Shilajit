import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductHighlights from './components/ProductHighlights';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSlider from './components/TestimonialsSlider';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import FAQAccordion from './components/FAQAccordion';
import SpecialOffer from './components/SpecialOffer';
import AIRecommendations from './components/AIRecommendations';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIChatbot from './components/AIChatbot';

export const metadata = {
  title: 'HerbalSource - Premium Natural Wellness Products',
  description: 'Discover premium natural wellness products at HerbalSource. Shop authentic herbal supplements, natural remedies, and wellness solutions with free shipping on orders over PKR 50.',
  keywords: 'herbal supplements, natural wellness, organic products, herbal remedies, natural health, wellness products, Pakistan',
  authors: [{ name: 'HerbalSource' }],
  creator: 'HerbalSource',
  publisher: 'HerbalSource',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://herbalsource.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HerbalSource - Premium Natural Wellness Products',
    description: 'Discover premium natural wellness products at HerbalSource. Shop authentic herbal supplements and natural remedies.',
    url: 'https://herbalsource.com',
    siteName: 'HerbalSource',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbalSource - Premium Natural Wellness Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HerbalSource - Premium Natural Wellness Products',
    description: 'Discover premium natural wellness products at HerbalSource. Shop authentic herbal supplements and natural remedies.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />

      <main>
        <HeroSection />
        <ProductHighlights />
        <div id="benefits">
          <BenefitsSection />
        </div>
        <SpecialOffer />
        <TestimonialsSlider />
        <div id="blog">
          <BlogSection />
        </div>
        <div id="faq">
          <FAQAccordion />
        </div>
        {/* <AIRecommendations /> - Hidden for now until AI connection is fixed */}
      </main>

      <div id="contact">
        <Footer />
      </div>
      <AIChatbot />
    </div>
  );
}