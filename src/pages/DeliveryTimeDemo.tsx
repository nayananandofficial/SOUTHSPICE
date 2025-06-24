import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeliveryTimeSelector from '../components/Checkout/DeliveryTimeSelector';

interface TimeSlot {
  id: string;
  date: string;
  timeRange: string;
  displayTime: string;
  isAvailable: boolean;
  isPopular?: boolean;
  deliveryFee?: number;
  estimatedTime?: string;
}

const DeliveryTimeDemo: React.FC = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900">
              Delivery Time Selection Demo
            </h1>
            <p className="text-gray-600 font-body">
              Interactive demonstration of the delivery time selection system
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <DeliveryTimeSelector
                onTimeSlotSelect={handleTimeSlotSelect}
                selectedSlotId={selectedTimeSlot?.id}
              />
            </motion.div>
          </div>

          {/* Sidebar - Selection Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="text-lg font-heading font-semibold text-warm-900 mb-6">
                Selection Summary
              </h3>

              {selectedTimeSlot ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                    <div>
                      <h4 className="font-body font-semibold text-warm-900">
                        Time Selected
                      </h4>
                      <p className="text-sm text-gray-700">
                        {selectedTimeSlot.displayTime} • {selectedTimeSlot.timeRange}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedTimeSlot.displayTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTimeSlot.timeRange}</span>
                    </div>
                    {selectedTimeSlot.estimatedTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated:</span>
                        <span className="font-medium">{selectedTimeSlot.estimatedTime}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className={`font-medium ${
                        selectedTimeSlot.deliveryFee && selectedTimeSlot.deliveryFee > 0 
                          ? 'text-warm-900' 
                          : 'text-secondary-600'
                      }`}>
                        {selectedTimeSlot.deliveryFee && selectedTimeSlot.deliveryFee > 0 
                          ? `₹${selectedTimeSlot.deliveryFee}` 
                          : 'FREE'
                        }
                      </span>
                    </div>
                    {selectedTimeSlot.isPopular && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-secondary-600 font-medium">Popular Time</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-6 py-3 bg-primary-600 text-white rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors">
                    Confirm Selection
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="font-heading font-semibold text-gray-700 mb-2">
                    No Time Selected
                  </h4>
                  <p className="text-gray-500 font-body text-sm">
                    Choose a delivery time slot to see the summary here
                  </p>
                </div>
              )}
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6"
            >
              <h4 className="font-heading font-semibold text-warm-900 mb-4">
                System Features
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Clear visual states for all slots</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Popular time highlighting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Delivery fee transparency</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Accessibility compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Toast notifications</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryTimeDemo;