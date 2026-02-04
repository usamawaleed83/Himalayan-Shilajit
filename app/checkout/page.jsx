import CheckoutPageClient from './CheckoutPageClient';

export const metadata = {
  title: 'Checkout - HerbalSource',
  description: 'Complete your order securely with multiple payment options. Free shipping on orders over PKR 50.',
  robots: {
    index: false, // Checkout pages typically shouldn't be indexed
    follow: true,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}