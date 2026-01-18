import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  const footerLinks = {
    'Shop': ['All Products', 'New Arrivals', 'Best Sellers', 'Sale'],
    'Customer Service': ['Contact Us', 'Shipping Info', 'Returns', 'FAQ'],
    'Company': ['About Us', 'Careers', 'Sustainability', 'Press'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
  };

  const socialLinks = [
    { Icon: Facebook, label: 'Facebook', color: '#1877F2' },
    { Icon: Instagram, label: 'Instagram', color: '#E4405F' },
    { Icon: Twitter, label: 'Twitter', color: '#1DA1F2' },
    { Icon: Youtube, label: 'Youtube', color: '#FF0000' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Mail className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl text-white mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/90 mb-6">
                Get exclusive offers, updates on new arrivals, and style inspiration
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  type="submit"
                  className="px-8 py-3 bg-white text-rose-600 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif text-white mb-4">LUXORA</h2>
            <p className="text-sm mb-6">
              Your destination for luxury fashion and timeless elegance. Curating the finest products since 2020.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, color }) => (
                <motion.a
                  key={label}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, backgroundColor: color }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-sm hover:text-white transition-colors inline-block"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2026 LUXORA. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm">We accept:</span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-gray-800 rounded text-xs font-semibold"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
