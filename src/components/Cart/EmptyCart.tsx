import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50 flex items-center justify-center"
    >
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          {/* Empty Cart Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
          </motion.div>

          {/* Content */}
          <h2 className="text-2xl font-heading font-bold text-warm-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 font-body mb-8 leading-relaxed">
            Looks like you haven't added any delicious South Indian dishes to your cart yet.
            Explore our menu and discover amazing flavors!
          </p>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-body font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 duration-200 group"
            >
              Browse Menu
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/"
              className="block w-full px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-xl font-body font-semibold hover:bg-primary-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {/* Featured Items Suggestion */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
            <h3 className="font-heading font-semibold text-warm-900 mb-2">
              Popular Choices
            </h3>
            <div className="flex justify-center space-x-2 text-sm text-gray-600">
              <span>🥘 Masala Dosa</span>
              <span>•</span>
              <span>🍛 Chicken Biryani</span>
              <span>•</span>
              <span>🌶️ Fish Curry</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;