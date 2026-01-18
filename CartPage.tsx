import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    onNavigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <motion.button
              onClick={() => onNavigate('shop')}
              className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cart.length} items in your cart</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-rose-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.product.brand}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-28">
              <h3 className="text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 100 && (
                <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg mb-6">
                  Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                </div>
              )}

              <motion.button
                onClick={handleCheckout}
                className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition-colors mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">We accept:</p>
                <div className="flex gap-2">
                  {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((method) => (
                    <div
                      key={method}
                      className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
