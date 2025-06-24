import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Skeleton from '../Shared/Skeleton';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isVeg: boolean;
  spiceLevel: number;
  tags: string[];
}

const featuredDishes: Dish[] = [
  {
    id: '1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato curry, served with coconut chutney and sambar',
    price: 149,
    originalPrice: 179,
    image: '/masala_dosa.webp',
    rating: 4.8,
    reviews: 2341,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Popular', 'Traditional']
  },
  {
    id: '2',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and authentic spices',
    price: 299,
    originalPrice: 349,
    image: '/chicken_biriyani.webp',
    rating: 4.9,
    reviews: 1856,
    isVeg: false,
    spiceLevel: 3,
    tags: ['Bestseller', 'Spicy']
  },
  {
    id: '3',
    name: 'Sambar Vada',
    description: 'Deep-fried lentil donuts soaked in tangy sambar with coconut chutney',
    price: 99,
    image: '/sambar_vada.webp',
    rating: 4.7,
    reviews: 983,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Comfort Food']
  },
  {
    id: '4',
    name: 'Fish Curry',
    description: 'Kerala-style fish curry cooked in coconut milk with aromatic spices',
    price: 249,
    image: '/fish_curry.webp',
    rating: 4.6,
    reviews: 742,
    isVeg: false,
    spiceLevel: 3,
    tags: ['Coastal', 'Authentic']
  },
  {
    id: '5',
    name: 'Idli Sambar',
    description: 'Soft steamed rice cakes served with lentil soup and chutneys',
    price: 89,
    image: '/idli_sambar.webp',
    rating: 4.5,
    reviews: 1456,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Healthy', 'Light']
  }
];

const FeaturedDishes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= featuredDishes.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, featuredDishes.length - itemsPerView) : prev - 1
    );
  };

  const handleAddToCart = (dish: Dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1
    });
  };

  const getSpiceIcons = (level: number) => {
    return '🌶️'.repeat(level) + '🌶️'.repeat(3 - level).replace(/🌶️/g, '○');
  };

  const DishSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
  );

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
            Featured Dishes
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto leading-relaxed">
            Discover our most loved South Indian delicacies, carefully prepared with
            traditional recipes and fresh ingredients
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {!isLoading && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                disabled={currentIndex + itemsPerView >= featuredDishes.length}
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: itemsPerView }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DishSkeleton />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {featuredDishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    className={`flex-shrink-0 px-3 ${
                      itemsPerView === 1 ? 'w-full' : 
                      itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                    }`}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {dish.tags.map((tag) => (
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
                          <div className={`w-6 h-6 border-2 ${dish.isVeg ? 'border-secondary-500' : 'border-red-500'} flex items-center justify-center`}>
                            <div className={`w-3 h-3 rounded-full ${dish.isVeg ? 'bg-secondary-500' : 'bg-red-500'}`} />
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="absolute bottom-4 right-4 p-2 bg-primary-600 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-700 hover:scale-110"
                          aria-label={`Add ${dish.name} to cart`}
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-heading font-semibold text-warm-900 group-hover:text-primary-600 transition-colors">
                            {dish.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-accent-500 fill-current" />
                            <span className="text-sm font-medium text-gray-700">
                              {dish.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({dish.reviews})
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                          {dish.description}
                        </p>

                        {/* Spice Level */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Spice Level:</span>
                            <span className="text-sm">{getSpiceIcons(dish.spiceLevel)}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-heading font-bold text-primary-600">
                              ₹{dish.price}
                            </span>
                            {dish.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">
                                ₹{dish.originalPrice}
                              </span>
                            )}
                          </div>
                          {dish.originalPrice && (
                            <span className="text-sm text-secondary-600 font-medium bg-secondary-50 px-2 py-1 rounded">
                              Save ₹{dish.originalPrice - dish.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Pagination Dots */}
        {!isLoading && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(featuredDishes.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDishes;