import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onLoginClick }) => {
  const { getCartCount, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Shop', page: 'shop' },
    { name: 'Categories', page: 'shop' },
    { name: 'About', page: 'home' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar */}
      <div className="bg-rose-600 text-white py-2 px-4 text-center text-sm">
        Free shipping on orders over $100 | Use code: LUXURY15 for 15% off
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl md:text-3xl font-serif text-rose-600">LUXORA</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-gray-700 hover:text-rose-600 transition-colors relative ${
                  currentPage === link.page ? 'text-rose-600' : ''
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
                {currentPage === link.page && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-600"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
              />
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          onNavigate(`product-${product.id}`);
                          setSearchQuery('');
                        }}
                        whileHover={{ x: 4 }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <p className="text-sm font-semibold text-rose-600">${product.price}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No products found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLoginClick}
            >
              <User className="w-6 h-6 text-gray-700" />
            </motion.button>

            <motion.button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-6 h-6 text-gray-700" />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {getCartCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    currentPage === link.page
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
