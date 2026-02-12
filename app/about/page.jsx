import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import AboutSection from '../components/AboutSection';

export const metadata = {
  title: 'About Us - HerbalSource | Pure Himalayan Shilajit',
  description: 'Learn about HerbalSource\'s commitment to providing 100% pure, sunlight-cured Himalayan Shilajit from Skardu and Hunza. Discover our traditional methods and export-quality standards.',
  keywords: 'about herbalsource, himalayan shilajit, skardu, hunza, sunlight cured, export quality, natural supplements',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />

      <main>
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
