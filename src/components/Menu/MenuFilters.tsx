import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Filters {
  isVeg: boolean;
  spiceLevel: string;
  priceRange: string;
}

interface MenuFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
  selectedFilters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
  selectedFilters,
  onFiltersChange,
}) => {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...selectedFilters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onCategoryChange('all');
    onFiltersChange({
      isVeg: false,
      spiceLevel: 'all',
      priceRange: 'all',
    });
  };

  const hasActiveFilters = selectedCategory !== 'all' || 
                          selectedFilters.isVeg || 
                          selectedFilters.spiceLevel !== 'all' || 
                          selectedFilters.priceRange !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-heading font-semibold text-warm-900">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="font-heading font-semibold text-warm-900 mb-4">
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-body font-medium">{category.name}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="font-heading font-semibold text-warm-900 mb-4">
          Dietary Preferences
        </h4>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFilters.isVeg}
            onChange={(e) => handleFilterChange('isVeg', e.target.checked)}
            className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500 focus:ring-2"
          />
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-secondary-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-secondary-500" />
            </div>
            <span className="font-body font-medium text-gray-700">Vegetarian Only</span>
          </div>
        </label>
      </div>

      {/* Spice Level */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="font-heading font-semibold text-warm-900 mb-4">
          Spice Level
        </h4>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Levels', icon: '🌶️' },
            { value: '1', label: 'Mild', icon: '🌶️○○' },
            { value: '2', label: 'Medium', icon: '🌶️🌶️○' },
            { value: '3', label: 'Hot', icon: '🌶️🌶️🌶️' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange('spiceLevel', option.value)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                selectedFilters.spiceLevel === option.value
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-body font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="font-heading font-semibold text-warm-900 mb-4">
          Price Range
        </h4>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Prices' },
            { value: 'budget', label: 'Under ₹150' },
            { value: 'mid', label: '₹150 - ₹300' },
            { value: 'premium', label: 'Above ₹300' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange('priceRange', option.value)}
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                selectedFilters.priceRange === option.value
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-body font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <h4 className="font-heading font-semibold text-warm-900 mb-3">
          Today's Special
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Free delivery</span>
            <span className="text-secondary-600 font-medium">Above ₹299</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Average delivery</span>
            <span className="text-primary-600 font-medium">30-40 mins</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Customer rating</span>
            <span className="text-accent-600 font-medium">4.8/5 ⭐</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuFilters;