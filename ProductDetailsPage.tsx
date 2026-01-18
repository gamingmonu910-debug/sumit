import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Share2 } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface ProductDetailsPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productId,
  onNavigate,
}) => {
  const product = products.find((p) => p.id === productId);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.variants?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.variants?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="text-rose-600 hover:underline"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onNavigate('cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-rose-600">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-rose-600">
            Shop
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <motion.div
              className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
              whileHover={{ scale: isZoomed ? 1.5 : 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.new && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.originalPrice && (
                <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs px-3 py-1 rounded-full">
                  SALE
                </span>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-rose-600' : 'border-transparent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants?.colors && (
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Color: <span>{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.variants.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg ${
                        selectedColor === color
                          ? 'border-rose-600 bg-rose-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.sizes && (
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Size: <span>{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg ${
                        selectedSize === size
                          ? 'border-rose-600 bg-rose-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                {product.stockCount && (
                  <span className="text-sm text-gray-600">
                    {product.stockCount} items available
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                onClick={handleAddToWishlist}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-rose-600 bg-rose-50 text-rose-600'
                    : 'border-gray-300 hover:border-rose-600 hover:text-rose-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                />
              </motion.button>

              <motion.button
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.button
              onClick={handleBuyNow}
              className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition-colors mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now
            </motion.button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg">{product.description}</p>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-8">
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={`https://i.pravatar.cc/150?img=${review}`}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="text-gray-900">Customer Name</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Excellent product! Highly recommend. The quality is outstanding and
                      exceeded my expectations.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
