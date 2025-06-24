import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartItemsCount },
    { path: '/profile', icon: User, label: 'Profile', onClick: handleUserClick },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.onClick) {
            return (
              <button
                key={item.path}
                onClick={item.onClick}
                className="relative flex flex-col items-center justify-center p-3 min-w-0 flex-1"
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 transition-colors ${
                      isActive ? 'text-primary-600' : 'text-gray-500'
                    }`}
                  />
                  {/* Only show badge if it exists AND is greater than 0 */}
                  {item.badge && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium min-w-[1rem]"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.span>
                  )}
                </div>
                <span
                  className={`text-xs font-body mt-1 ${
                    isActive ? 'text-primary-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                    layoutId="mobileActiveTab"
                  />
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center p-3 min-w-0 flex-1"
            >
              <div className="relative">
                <Icon
                  className={`h-6 w-6 transition-colors ${
                    isActive ? 'text-primary-600' : 'text-gray-500'
                  }`}
                />
                {/* Only show badge if it exists AND is greater than 0 */}
                {item.badge && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium min-w-[1rem]"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-xs font-body mt-1 ${
                  isActive ? 'text-primary-600 font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"
                  layoutId="mobileActiveTab"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;