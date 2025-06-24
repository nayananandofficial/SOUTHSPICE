import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import MenuCard from '../components/Menu/MenuCard';
import MenuFilters from '../components/Menu/MenuFilters';
import Skeleton from '../components/Shared/Skeleton';
import { menuItems } from '../data/menuData';

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    isVeg: false,
    spiceLevel: 'all',
    priceRange: 'all',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const matchesVeg = !selectedFilters.isVeg || item.isVeg;
      
      const matchesSpice = selectedFilters.spiceLevel === 'all' || 
                          item.spiceLevel.toString() === selectedFilters.spiceLevel;
      
      const matchesPrice = selectedFilters.priceRange === 'all' || 
                          (selectedFilters.priceRange === 'budget' && item.price <= 150) ||
                          (selectedFilters.priceRange === 'mid' && item.price > 150 && item.price <= 300) ||
                          (selectedFilters.priceRange === 'premium' && item.price > 300);
      
      return matchesSearch && matchesCategory && matchesVeg && matchesSpice && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedFilters]);

  const categories = [
    { id: 'all', name: 'All Items', count: menuItems.length },
    { id: 'breakfast', name: 'Breakfast', count: menuItems.filter(item => item.category === 'breakfast').length },
    { id: 'main-course', name: 'Main Course', count: menuItems.filter(item => item.category === 'main-course').length },
    { id: 'rice', name: 'Rice & Biryani', count: menuItems.filter(item => item.category === 'rice').length },
    { id: 'curries', name: 'Curries', count: menuItems.filter(item => item.category === 'curries').length },
    { id: 'snacks', name: 'Snacks', count: menuItems.filter(item => item.category === 'snacks').length },
    { id: 'desserts', name: 'Desserts', count: menuItems.filter(item => item.category === 'desserts').length },
  ];

  const MenuSkeleton = () => {
    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <Skeleton className="sm:w-48 h-48 sm:h-auto" />
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton variant="text" count={3} className="w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Skeleton className="w-full h-56" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton variant="text" count={2} className="w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 pb-20 lg:pb-8 min-h-screen bg-warm-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Explore our authentic South Indian cuisine crafted with traditional recipes
            and the finest ingredients
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-body"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <MenuFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
            />
          </motion.div>

          {/* Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              {isLoading ? (
                <Skeleton className="h-5 w-48" />
              ) : (
                <p className="text-gray-600 font-body">
                  Showing {filteredItems.length} of {menuItems.length} dishes
                </p>
              )}
            </div>

            {/* Menu Grid/List */}
            {isLoading ? (
              <MenuSkeleton />
            ) : filteredItems.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MenuCard item={item} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">
                  No dishes found
                </h3>
                <p className="text-gray-500 font-body">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;