import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from './contexts/CartContext'
import WhatsAppButton from './components/WhatsAppButton'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'HerbalSource - Premium Wellness Products',
  description: 'Premium quality herbal products sourced directly from nature. Experience the ancient wisdom of natural wellness.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}