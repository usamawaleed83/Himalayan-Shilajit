import CartPageClient from './CartPageClient';

export const metadata = {
  title: 'Shopping Cart - HerbalSource',
  description: 'Review your selected natural wellness products and proceed to checkout. Free shipping on orders over PKR 50.',
  robots: {
    index: false, // Cart pages typically shouldn't be indexed
    follow: true,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}