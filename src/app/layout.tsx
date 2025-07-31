import { ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import ThemeProviderWrapper from '../components/ThemeProviderWrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add more if needed
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <body className={`min-h-screen bg-gray-50 vsc-initialized`} style={{"background": "#fafafa", margin: 0}}>
        <ThemeProviderWrapper>
          <Header />
          <br></br>
          <main className="flex-1 p-6">
            {children}
            <Footer />
          </main>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
  
}
