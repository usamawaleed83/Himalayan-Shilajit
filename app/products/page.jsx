import ProductsPageClient from './ProductsPageClient';

export const metadata = {
  title: 'All Products - HerbalSource',
  description: 'Explore our complete collection of premium natural wellness products. Shop authentic herbal supplements, natural remedies, and wellness solutions.',
  keywords: 'herbal products, natural supplements, wellness products, herbal remedies, organic products, Pakistan',
  openGraph: {
    title: 'All Products - HerbalSource',
    description: 'Explore our complete collection of premium natural wellness products.',
    url: 'https://herbalsource.com/products',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbalSource Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - HerbalSource',
    description: 'Explore our complete collection of premium natural wellness products.',
    images: ['/og-products.jpg'],
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}