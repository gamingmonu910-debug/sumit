import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={() => onViewDetails(product.id)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <motion.span
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              NEW
            </motion.span>
          )}
          {discountPercentage > 0 && (
            <motion.span
              className="bg-rose-600 text-white text-xs px-3 py-1 rounded-full"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              -{discountPercentage}%
            </motion.span>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleAddToWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isInWishlist(product.id)
                ? 'bg-rose-600 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-rose-600 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product.id);
            }}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Add to Cart Button - Shows on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 hover:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.inStock ? (
            <span className="text-xs text-green-600">In Stock</span>
          ) : (
            <span className="text-xs text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
