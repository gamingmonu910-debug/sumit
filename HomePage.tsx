import React, { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { products, categories, testimonials } from '@/data/products';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const sliderRef = useRef<Slider>(null);

  const featuredProducts = products.filter((p) => p.featured);

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc2ODU4ODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Timeless Elegance
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Curated luxury fashion and accessories for the modern lifestyle
          </motion.p>
          <motion.button
            className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('shop')}
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">Featured Collection</h2>
            <p className="text-gray-600 text-lg">
              Handpicked pieces that define contemporary luxury
            </p>
          </motion.div>

          <div className="px-4">
            <Slider ref={sliderRef} {...productSliderSettings}>
              {featuredProducts.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard
                    product={product}
                    onViewDetails={() => onNavigate(`product-${product.id}`)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Explore our curated collections</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate('shop')}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} items</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="relative overflow-hidden rounded-lg p-12 bg-gradient-to-r from-rose-600 to-pink-600 text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-3xl mb-4">New Arrivals</h3>
              <p className="mb-6 text-white/90">
                Discover the latest trends in luxury fashion
              </p>
              <button
                className="bg-white text-rose-600 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => onNavigate('shop')}
              >
                Explore Now
              </button>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-lg p-12 bg-gradient-to-r from-gray-900 to-gray-700 text-white"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-3xl mb-4">Limited Time Offer</h3>
              <p className="mb-6 text-white/90">Up to 50% off on selected items</p>
              <button
                className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => onNavigate('shop')}
              >
                Shop Sale
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real experiences from real people</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Slider {...testimonialSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4">
                  <motion.div
                    className="bg-white rounded-lg p-8 md:p-12 shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h4 className="text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">Join Our VIP Club</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Get exclusive access to new collections, special offers, and styling tips
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                className="px-8 py-3 bg-white text-rose-600 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
