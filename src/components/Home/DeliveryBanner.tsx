import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, CheckCircle } from 'lucide-react';

const DeliveryBanner: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 bg-secondary-50 border-y border-secondary-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Live Delivery Status */}
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-secondary-500 rounded-full"
            />
            <div>
              <p className="text-secondary-700 font-body font-semibold">
                🚚 Live Tracking Available
              </p>
              <p className="text-gray-600 text-sm">
                Track your order in real-time
              </p>
            </div>
          </div>

          {/* Delivery Features */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-8">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-secondary-600" />
              <span className="font-body font-medium text-gray-700">
                Free delivery above ₹299
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-secondary-600" />
              <span className="font-body font-medium text-gray-700">
                30-40 mins delivery
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-secondary-600" />
              <span className="font-body font-medium text-gray-700">
                100% fresh & hygienic
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DeliveryBanner;