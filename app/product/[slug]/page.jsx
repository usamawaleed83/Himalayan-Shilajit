import productsData from '../../data/products.json';
import ProductPageClient from './ProductPageClient';

export async function generateMetadata({ params }) {
  const product = productsData.find((p) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found - HerbalSource',
      description: 'The product you are looking for could not be found.',
    };
  }

  return {
    title: `${product.name} - HerbalSource`,
    description: product.description,
    keywords: `${product.name}, herbal supplement, natural wellness, ${product.benefits?.join(', ')}`,
    openGraph: {
      title: `${product.name} - HerbalSource`,
      description: product.description,
      url: `https://herbalsource.com/product/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - HerbalSource`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }) {
  return <ProductPageClient slug={params.slug} />;
}