import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Clock, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Skeleton from '../components/Shared/Skeleton';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const LogoutModal = () => (
    <AnimatePresence>
      {showLogoutModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-warm-900">
                  Confirm Logout
                </h3>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <p className="text-gray-600 font-body mb-6">
                Are you sure you want to log out of your account?
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-body font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!user) {
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
            <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            
            <h2 className="text-2xl font-heading font-bold text-warm-900 mb-4">
              Join Spice Route
            </h2>
            <p className="text-gray-600 font-body mb-8">
              Sign in to access your profile, order history, and saved addresses.
            </p>
            
            <button
              onClick={handleAuthClick}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-body font-semibold hover:bg-primary-700 transition-colors"
            >
              Sign In / Sign Up
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header Skeleton */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Skeleton variant="circular" className="w-24 h-24" />
              <div className="text-center sm:text-left flex-1 space-y-3">
                <Skeleton className="h-8 w-48 mx-auto sm:mx-0" />
                <Skeleton className="h-4 w-64 mx-auto sm:mx-0" />
                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Skeleton variant="circular" className="w-5 h-5" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full mt-6" />
            </div>

            {/* Order Statistics Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Skeleton className="h-6 w-36 mb-6" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Skeleton className="h-8 w-12 mx-auto mb-1" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Skeleton */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
              <Skeleton className="h-6 w-32 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <div className="text-right space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full mt-6" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8 relative"
        >
          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="absolute top-6 right-6 flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="font-body font-medium hidden sm:inline">Logout</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pr-20">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 font-body mb-4">{user.email}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Clock className="h-4 w-4" />
                  <span>Member since 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-accent-600">
                  <span>⭐</span>
                  <span>Premium Customer</span>
                </div>
              </div>
            </div>
            
            <button className="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-body font-medium hover:bg-primary-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-heading font-bold text-warm-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-body font-medium text-warm-900">{user.email}</p>
                  <p className="text-sm text-gray-500">Email Address</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-body font-medium text-warm-900">+91 98765 43210</p>
                  <p className="text-sm text-gray-500">Phone Number</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-body font-medium text-warm-900">123 Main Street, Chennai</p>
                  <p className="text-sm text-gray-500">Default Address</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors">
              Update Information
            </button>
          </motion.div>

          {/* Order Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-heading font-bold text-warm-900 mb-6">
              Order Statistics
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-heading font-bold text-primary-600 mb-1">
                  24
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              
              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-heading font-bold text-secondary-600 mb-1">
                  ₹8,450
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              
              <div className="text-center p-4 bg-accent-50 rounded-lg">
                <div className="text-2xl font-heading font-bold text-accent-600 mb-1">
                  4.8
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-heading font-bold text-gray-600 mb-1">
                  ₹520
                </div>
                <div className="text-sm text-gray-600">Saved</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-body">Favorite Dish</span>
                <span className="font-medium">Chicken Biryani</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-body">Last Order</span>
                <span className="font-medium">2 days ago</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-heading font-bold text-warm-900 mb-6">
              Recent Orders
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  id: '#ORD-001',
                  date: '2 days ago',
                  items: 'Chicken Biryani, Masala Dosa',
                  total: '₹448',
                  status: 'Delivered'
                },
                {
                  id: '#ORD-002',
                  date: '1 week ago',
                  items: 'Fish Curry, Idli Sambar',
                  total: '₹368',
                  status: 'Delivered'
                },
                {
                  id: '#ORD-003',
                  date: '2 weeks ago',
                  items: 'Vegetable Biryani, Payasam',
                  total: '₹338',
                  status: 'Delivered'
                }
              ].map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-body font-semibold text-warm-900">{order.id}</span>
                      <span className="text-sm text-gray-500">{order.date}</span>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-body font-semibold text-warm-900 mb-1">{order.total}</div>
                    <button className="text-primary-600 text-sm hover:text-primary-700 transition-colors">
                      Reorder
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-body font-medium hover:bg-primary-50 transition-colors">
              View All Orders
            </button>
          </motion.div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal />
    </motion.div>
  );
};

export default Profile;