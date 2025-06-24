import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit3, ShoppingCart, Clock, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface InvoiceReviewStepProps {
  promoDiscount: number;
  promoCode: string;
  selectedDeliveryTime: string;
}

const InvoiceReviewStep: React.FC<InvoiceReviewStepProps> = ({ 
  promoDiscount, 
  promoCode, 
  selectedDeliveryTime 
}) => {
  const { cart, getTotalPrice, getTotalItems } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 299 ? 0 : 49;
  const taxAmount = Math.round(subtotal * 0.05);
  const totalBeforePromo = subtotal + deliveryFee + taxAmount;
  const finalTotal = totalBeforePromo - promoDiscount;

  const formatDeliveryTime = (time: string) => {
    if (time === 'asap') {
      return '30-40 minutes';
    }
    
    try {
      const date = new Date(time);
      const hour = date.getHours();
      return `${hour}:00 - ${hour + 1}:00`;
    } catch {
      return '30-40 minutes';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-warm-900">
            Review Your Order
          </h2>
          <p className="text-gray-600 font-body">
            Please review your order details before proceeding
          </p>
        </div>
        <Link
          to="/cart"
          className="flex items-center space-x-2 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-body font-medium hover:bg-primary-50 transition-colors"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit Cart</span>
        </Link>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <ShoppingCart className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-heading font-semibold text-warm-900">
            Order Items ({getTotalItems()} items)
          </h3>
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-body font-semibold text-warm-900">
                  {item.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  Quantity: {item.quantity}
                </p>
                <p className="text-primary-600 font-medium">
                  ₹{item.price} each
                </p>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-warm-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-heading font-semibold text-warm-900 mb-6">
          Price Breakdown
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-body">Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-body">Delivery Fee</span>
            <span className={`font-medium ${deliveryFee === 0 ? 'text-secondary-600' : ''}`}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-body">Taxes & Fees</span>
            <span className="font-medium">₹{taxAmount}</span>
          </div>

          {promoDiscount > 0 && (
            <div className="flex justify-between items-center text-secondary-600">
              <span className="font-body">Promo Discount ({promoCode})</span>
              <span className="font-medium">-₹{promoDiscount}</span>
            </div>
          )}

          <hr className="border-gray-200" />

          <div className="flex justify-between items-center">
            <span className="text-xl font-heading font-bold text-warm-900">
              Total Amount
            </span>
            <span className="text-2xl font-heading font-bold text-primary-600">
              ₹{finalTotal}
            </span>
          </div>

          {promoDiscount > 0 && (
            <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-200">
              <p className="text-sm text-secondary-700 font-body text-center">
                🎉 You saved ₹{promoDiscount} with promo code {promoCode}!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6">
        <h3 className="text-lg font-heading font-semibold text-warm-900 mb-4">
          Delivery Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-warm-900">
                Estimated Delivery
              </h4>
              <p className="text-gray-600 text-sm">{formatDeliveryTime(selectedDeliveryTime)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-warm-900">
                Delivery Type
              </h4>
              <p className="text-gray-600 text-sm">
                {deliveryFee === 0 ? 'Free Delivery' : 'Standard Delivery'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceReviewStep;