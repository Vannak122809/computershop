import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import KhqrModal from '@/components/KhqrModal';
import QuoteModal from '@/components/QuoteModal';
import SolutionModal from '@/components/SolutionModal';
import ProductQuickViewModal from '@/components/ProductQuickViewModal';

import { ThemeProvider } from '@/components/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0187ca',
};

export const metadata: Metadata = {
  title: 'NV Technology — Computer • Network • Security • IT Solutions Cambodia',
  description: 'NV Technology — ដំណោះស្រាយបច្ចេកវិទ្យាសម្រាប់អ្នក។ ផ្គត់ផ្គង់ Laptop, Desktop, Custom PC, MikroTik Router, Fortinet Firewall, Printer និងសេវាកម្ម IT នៅកម្ពុជា។',
  keywords: [
    'NV Technology',
    'ICE Electronics style',
    'Computer shop Cambodia',
    'ទិញ Laptop នៅភ្នំពេញ',
    'Custom PC Cambodia',
    'MikroTik Cambodia',
    'Fortinet Firewall Cambodia',
    'IT Solution Cambodia',
    'Printer Cambodia',
    'Network Installation Phnom Penh',
    'Bakong KHQR payment'
  ],
  authors: [{ name: 'NV Technology Co., Ltd.' }],
  openGraph: {
    title: 'NV Technology — ដំណោះស្រាយបច្ចេកវិទ្យាសម្រាប់អ្នក 🇰🇭',
    description: 'កុំព្យូទ័រ • បណ្តាញ • សុវត្ថិភាព • Custom PC • IT Solutions',
    url: 'https://nvtechnology.com.kh',
    siteName: 'NV Technology',
    locale: 'km_KH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 antialiased selection:bg-[#0187ca] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingContact />
            <KhqrModal />
            <QuoteModal />
            <SolutionModal />
            <ProductQuickViewModal />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
