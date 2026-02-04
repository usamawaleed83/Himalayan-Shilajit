import LoginPageClient from './LoginPageClient';

export const metadata = {
  title: 'Login - HerbalSource',
  description: 'Sign in to your HerbalSource account to access your orders and account information.',
  robots: {
    index: false, // Login pages typically shouldn't be indexed
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}