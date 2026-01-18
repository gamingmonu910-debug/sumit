import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    // Payment
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 1000);
  };

  if (cart.length === 0 && !orderPlaced) {
    onNavigate('shop');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Check className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-4xl mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg mb-2">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p className="text-gray-500 mb-8">
              Order #LUX-{Math.floor(Math.random() * 1000000)}
            </p>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email with your order details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => onNavigate('shop')}
                className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
              <motion.button
                onClick={() => onNavigate('home')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, name: 'Shipping' },
    { num: 2, name: 'Payment' },
    { num: 3, name: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mb-8">Checkout</h1>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.num
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.num ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-colors ${
                      currentStep > step.num ? 'bg-rose-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  className="bg-white rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  className="bg-white rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Review Order */}
              {currentStep === 3 && (
                <motion.div
                  className="bg-white rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl mb-6">Review Your Order</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-sm text-gray-600 mb-2">Shipping Address</h3>
                      <p className="text-gray-900">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zip}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-600 mb-2">Contact</h3>
                      <p className="text-gray-900">
                        {formData.email}
                        <br />
                        {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lock className="w-5 h-5" />
                      Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-28">
              <h3 className="text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
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
                <div className="flex justify-between text-xl pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
