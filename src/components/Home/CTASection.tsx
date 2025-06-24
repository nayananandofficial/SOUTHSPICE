import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Smartphone } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Experience
              <br />
              <span className="text-accent-400">Authentic Flavors?</span>
            </h2>
            <p className="text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed mb-8">
              Join thousands of satisfied customers who trust us for their
              South Indian cravings. Order now and taste the difference!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-xl font-body font-semibold text-lg hover:bg-warm-50 transition-all duration-300 transform hover:scale-105 shadow-lg group"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-body font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300">
                <Download className="mr-2 h-5 w-5" />
                Get Mobile App
              </button>
            </div>
          </motion.div>

          {/* App Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              {/* Left Content */}
              <div className="text-left lg:flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Smartphone className="h-6 w-6 text-accent-400" />
                  <span className="text-white font-body font-medium">
                    Download Our Mobile App
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  Order on the go!
                </h3>
                <p className="text-white/80 font-body">
                  Get exclusive app-only offers, faster checkout, and real-time order tracking.
                </p>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  <div className="text-2xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  <div className="text-2xl">🤖</div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-body font-medium mb-1">Lightning Fast</h4>
                <p className="text-white/70 text-sm">Quick ordering process</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <h4 className="text-white font-body font-medium mb-1">Exclusive Offers</h4>
                <p className="text-white/70 text-sm">App-only discounts</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <h4 className="text-white font-body font-medium mb-1">Live Tracking</h4>
                <p className="text-white/70 text-sm">Real-time order updates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 opacity-20"
      >
        <div className="text-6xl">🌶️</div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-10 opacity-20"
      >
        <div className="text-4xl">🥥</div>
      </motion.div>
    </section>
  );
};

export default CTASection;