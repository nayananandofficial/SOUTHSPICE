import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MenuItem } from '../../data/menuData';

interface MenuCardProps {
  item: MenuItem;
  viewMode: 'grid' | 'list';
}

const MenuCard: React.FC<MenuCardProps> = ({ item, viewMode }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateQuantity(item.id, 0);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const getSpiceIcons = (level: number) => {
    return '🌶️'.repeat(level) + '○'.repeat(3 - level);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-accent-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            
            {/* Tags */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-warm-900"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Veg/Non-veg Indicator */}
            <div className="absolute top-3 right-3">
              <div className={`w-5 h-5 border-2 ${item.isVeg ? 'border-secondary-500' : 'border-red-500'} flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-secondary-500' : 'bg-red-500'}`} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-heading font-semibold text-warm-900">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-1 ml-4">
                  {renderStars(item.rating)}
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {item.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({item.reviews})
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Spice Level */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Spice Level:</span>
                  <span className="text-sm">{getSpiceIcons(item.spiceLevel)}</span>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-heading font-bold text-primary-600">
                  ₹{item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{item.originalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart / Quantity Controls */}
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3 bg-primary-50 rounded-lg p-1">
                  <button
                    onClick={() => handleUpdateQuantity(quantity - 1)}
                    className="p-1 hover:bg-primary-100 rounded-md transition-colors"
                  >
                    <Minus className="h-4 w-4 text-primary-600" />
                  </button>
                  <span className="font-medium text-primary-600 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(quantity + 1)}
                    className="p-1 hover:bg-primary-100 rounded-md transition-colors"
                  >
                    <Plus className="h-4 w-4 text-primary-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-warm-900"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Veg/Non-veg Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-6 h-6 border-2 ${item.isVeg ? 'border-secondary-500' : 'border-red-500'} flex items-center justify-center bg-white`}>
            <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-secondary-500' : 'bg-red-500'}`} />
          </div>
        </div>

        {/* Quantity Controls Overlay */}
        {quantity > 0 && (
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Minus className="h-4 w-4 text-primary-600" />
            </button>
            <span className="font-medium text-primary-600 min-w-[1.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Plus className="h-4 w-4 text-primary-600" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-heading font-semibold text-warm-900 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center space-x-1">
            {renderStars(item.rating)}
            <span className="text-sm font-medium text-gray-700 ml-1">
              {item.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Spice Level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Spice Level:</span>
            <span className="text-sm">{getSpiceIcons(item.spiceLevel)}</span>
          </div>
          <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-primary-600">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="text-sm text-primary-600 font-medium">
              {quantity} in cart
            </div>
          )}
        </div>

        {item.originalPrice && (
          <div className="mt-2 text-right">
            <span className="text-sm text-secondary-600 font-medium bg-secondary-50 px-2 py-1 rounded">
              Save ₹{item.originalPrice - item.price}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MenuCard;