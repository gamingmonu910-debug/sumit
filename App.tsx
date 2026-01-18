import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { LoginModal } from '@/app/components/LoginModal';
import { HomePage } from '@/app/pages/HomePage';
import { ProductListingPage } from '@/app/pages/ProductListingPage';
import { ProductDetailsPage } from '@/app/pages/ProductDetailsPage';
import { CartPage } from '@/app/pages/CartPage';
import { CheckoutPage } from '@/app/pages/CheckoutPage';
import { Toaster } from '@/app/components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage.startsWith('product-')) {
      const productId = currentPage.replace('product-', '');
      return <ProductDetailsPage productId={productId} onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ProductListingPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onLoginClick={() => setLoginModalOpen(true)}
        />

        {renderPage()}

        <Footer />

        <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

        <Toaster position="top-right" richColors />
      </div>
    </CartProvider>
  );
}
