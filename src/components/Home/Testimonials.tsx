import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    review: 'The masala dosa here is absolutely divine! Reminds me of my grandmother\'s cooking. The delivery was super quick and the food arrived hot.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '2 days ago'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Bangalore',
    rating: 5,
    review: 'Best biryani in town! The spices are perfectly balanced and the chicken is so tender. Will definitely order again.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '5 days ago'
  },
  {
    id: '3',
    name: 'Meera Patel',
    location: 'Hyderabad',
    rating: 5,
    review: 'Authentic South Indian flavors! The sambar and chutneys are made to perfection. Great value for money too.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '1 week ago'
  },
  {
    id: '4',
    name: 'Arjun Nair',
    location: 'Kochi',
    rating: 5,
    review: 'The fish curry reminded me of home! Excellent quality and the packaging was eco-friendly. Highly recommended.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    date: '1 week ago'
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-accent-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-warm-50 to-primary-50">
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
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
            who keep coming back for more authentic flavors
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-xl relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="h-16 w-16 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Review */}
                <p className="text-gray-700 text-lg font-body leading-relaxed mb-6 relative z-10">
                  "{testimonials[currentIndex].review}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-semibold text-warm-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Stats and Smaller Testimonials */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-heading font-bold text-primary-600 mb-1">
                    4.8
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                  <div className="flex justify-center mt-1">
                    {renderStars(5)}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-primary-600 mb-1">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-primary-600 mb-1">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600">Orders Delivered</div>
                </div>
              </div>
            </motion.div>

            {/* Mini Testimonials */}
            <div className="space-y-4">
              {testimonials.slice(1, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        "{testimonial.review.length > 100 
                          ? testimonial.review.substring(0, 100) + '...' 
                          : testimonial.review}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-warm-900 text-sm">
                          {testimonial.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;