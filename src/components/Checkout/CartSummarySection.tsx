import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSummarySection: React.FC = () => {
  const { cart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const deliveryFee = getTotalPrice() >= 299 ? 0 : 49;
  const taxAmount = Math.round(getTotalPrice() * 0.05);
  const finalTotal = getTotalPrice() + deliveryFee + taxAmount;

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <ShoppingBag className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-heading font-bold text-warm-900">
          Order Summary
        </h3>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-warm-900 truncate">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600">
                {item.quantity} × ₹{item.price}
              </p>
            </div>
            <span className="font-body font-semibold text-warm-900">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-body">Subtotal ({getTotalItems()} items)</span>
          <span className="font-medium">₹{getTotalPrice()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 font-body">Delivery Fee</span>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-secondary-600' : ''}`}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-body">Taxes & Fees</span>
          <span className="font-medium">₹{taxAmount}</span>
        </div>

        {getTotalPrice() < 299 && (
          <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
            <p className="text-sm text-secondary-700 font-body">
              Add ₹{299 - getTotalPrice()} more for free delivery!
            </p>
          </div>
        )}

        <hr className="border-gray-200" />

        <div className="flex justify-between items-center">
          <span className="text-lg font-heading font-bold text-warm-900">
            Total
          </span>
          <span className="text-xl font-heading font-bold text-primary-600">
            ₹{finalTotal}
          </span>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <motion.button
        onClick={handleProceedToCheckout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary-600 text-white py-4 rounded-xl font-body font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl group flex items-center justify-center space-x-2"
      >
        <span>Proceed to Checkout</span>
      </motion.button>

      {/* Delivery Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
          <span className="font-body font-medium text-gray-700">
            Estimated Delivery
          </span>
        </div>
        <p className="text-gray-600 text-sm font-body ml-4">
          30-40 minutes
        </p>
      </div>
    </div>
  );
};

export default CartSummarySection;