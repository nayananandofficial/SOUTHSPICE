import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, UtensilsCrossed, Info, HelpCircle, MapPin, Clock, Phone } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
    { path: '/about', icon: Info, label: 'About Us' },
    { path: '/help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {/* Custom SVG Icon - mobile version */}
                  <div className="relative">
                    <svg 
                      width="36" 
                      height="36" 
                      viewBox="0 0 100 100" 
                      className="text-primary-600"
                    >
                      {/* Cooking pot shadow */}
                      <ellipse cx="52" cy="77" rx="26" ry="8" fill="currentColor" opacity="0.15"/>
                      
                      {/* Main pot body with gradient effect */}
                      <defs>
                        <linearGradient id="potGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#D97706" />
                        </linearGradient>
                        <linearGradient id="rimGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FCD34D" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                      
                      <path 
                        d="M25 45 Q25 35 35 35 L65 35 Q75 35 75 45 L75 70 Q75 80 65 80 L35 80 Q25 80 25 70 Z" 
                        fill="url(#potGradientMobile)" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                      />
                      
                      {/* Pot rim */}
                      <ellipse cx="50" cy="35" rx="25" ry="4" fill="url(#rimGradientMobile)" stroke="currentColor" strokeWidth="1"/>
                      
                      {/* Steam/spices */}
                      <circle cx="45" cy="50" r="2.5" fill="#DC2626" opacity="0.9"/>
                      <circle cx="55" cy="55" r="2" fill="#DC2626" opacity="0.7"/>
                      <circle cx="50" cy="48" r="1.5" fill="#F59E0B" opacity="0.8"/>
                      
                      {/* Pot handles */}
                      <path d="M20 50 Q15 50 15 45 Q15 40 20 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M80 50 Q85 50 85 45 Q85 40 80 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      
                      {/* Spice elements */}
                      <ellipse cx="42" cy="25" rx="2.5" ry="7" fill="#DC2626" transform="rotate(-15 42 25)"/>
                      <ellipse cx="58" cy="25" rx="2.5" ry="7" fill="#DC2626" transform="rotate(15 58 25)"/>
                      <circle cx="42" cy="19" r="1.5" fill="#8B4513"/>
                      <circle cx="58" cy="19" r="1.5" fill="#8B4513"/>
                      
                      {/* Decorative spice dots */}
                      <circle cx="35" cy="60" r="1" fill="#F59E0B" opacity="0.8"/>
                      <circle cx="65" cy="65" r="1" fill="#F59E0B" opacity="0.8"/>
                      <circle cx="50" cy="62" r="0.8" fill="#DC2626" opacity="0.6"/>
                    </svg>
                  </div>
                  
                  {/* Mobile Logo Typography */}
                  <div className="flex flex-col leading-none">
                    <span className="font-logo text-lg font-bold text-primary-600 tracking-wide">
                      SOUTHSPICE
                    </span>
                    <span className="font-tagline text-xs text-secondary-600 font-medium tracking-widest uppercase opacity-80 -mt-0.5">
                      Authentic Flavors
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-6">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-body font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Info */}
              <div className="p-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>123 Spice Street, Chennai</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Open: 10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;