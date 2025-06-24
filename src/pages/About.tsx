import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, Users, Clock, Star, ChefHat } from 'lucide-react';

const About: React.FC = () => {
  const specialDishes = [
    {
      id: 1,
      name: 'Malabar Fish Curry',
      description: 'Our signature dish featuring fresh catch from the Arabian Sea, slow-cooked in coconut milk with traditional spices.',
      history: 'A recipe passed down through generations of Kozhikode fishermen, perfected over 150 years.',
      image: '/fish_curry.webp'
    },
    {
      id: 2,
      name: 'Kozhikode Biryani',
      description: 'Fragrant basmati rice layered with tender mutton, cooked in the traditional Kozhikode style with saffron and ghee.',
      history: 'Introduced by Arab traders in the 14th century, this biryani has become synonymous with Kozhikode cuisine.',
      image: '/chicken_biriyani.webp'
    },
    {
      id: 3,
      name: 'Pathiri with Chicken Curry',
      description: 'Soft rice pancakes served with spicy chicken curry, a beloved combination in Malabar households.',
      history: 'Dating back to the Mughal era, this dish represents the perfect fusion of local and Persian influences.',
      image: '/pathiri.webp'
    },
    {
      id: 4,
      name: 'Banana Halwa',
      description: 'A traditional dessert made from ripe bananas, ghee, and jaggery, slow-cooked to perfection.',
      history: 'Created in the royal kitchens of the Zamorin rulers, this dessert has been a celebration staple for centuries.',
      image: '/banana_halwa.webp'
    },
    {
      id: 5,
      name: 'Malabar Parotta',
      description: 'Flaky, layered flatbread that pairs perfectly with any curry, made using traditional hand-stretching techniques.',
      history: 'Brought by Tamil migrants and perfected by local chefs, it has become an integral part of Malabar cuisine.',
      image: '/porata.webp'
    }
  ];

  const chefQuotes = [
    {
      name: 'Chef Pillai',
      position: 'Head Chef & Co-founder',
      quote: 'Every dish we serve carries the soul of Malabar. We don\'t just cook food; we preserve memories and traditions.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Chef Venkatesh',
      position: 'Master of Traditional Recipes',
      quote: 'The secret to authentic Kerala cuisine lies in understanding the harmony between spices, time, and patience.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const locations = [
    { city: 'Kozhikode', state: 'Kerala', year: '1995', flagship: true },
    { city: 'Kochi', state: 'Kerala', year: '2005', flagship: false },
    { city: 'Bangalore', state: 'Karnataka', year: '2010', flagship: false },
    { city: 'Chennai', state: 'Tamil Nadu', year: '2015', flagship: false },
    { city: 'Mumbai', state: 'Maharashtra', year: '2018', flagship: false },
    { city: 'Delhi', state: 'Delhi', year: '2020', flagship: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20 min-h-screen bg-warm-50"
    >
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
              From the spice-scented streets of Kozhikode to kitchens across India,
              discover the journey of authentic Malabar cuisine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-6">
                Born in the Heart of Malabar
              </h2>
              <div className="space-y-6 text-gray-700 font-body leading-relaxed">
                <p>
                  In 1995, in the bustling spice markets of Kozhikode, Kerala, our founder Chef Rasheed Ahmed 
                  had a simple dream: to share the authentic flavors of Malabar cuisine with the world. What 
                  started as a small family restaurant serving traditional recipes passed down through generations 
                  has grown into a beloved culinary destination.
                </p>
                <p>
                  Our journey began with just eight tables and a wood-fired stove, where every dish was prepared 
                  with the same care and attention as a home-cooked meal. The aroma of freshly ground spices, 
                  the sizzle of fish curry in coconut oil, and the warmth of Kerala hospitality quickly made 
                  us a favorite among locals and travelers alike.
                </p>
                <p>
                  Today, we proudly serve authentic Kerala cuisine across six major cities in India, but our 
                  heart remains in Kozhikode. Every recipe, every spice blend, and every cooking technique 
                  stays true to our Malabar roots, ensuring that each bite transports you to the coastal 
                  kitchens of Kerala.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hotel_1.webp"
                  alt="Our flagship restaurant in Kozhikode"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-warm-900">Est. 1995</h4>
                    <p className="text-gray-600 text-sm">Kozhikode, Kerala</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Map Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
              Our Journey Across India
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              From our humble beginnings in Kozhikode to major cities across India, 
              we've brought authentic Malabar flavors to food lovers everywhere
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/our_branches.webp"
                alt="Map of India showing our restaurant locations"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">6 Cities, 1 Authentic Taste</h3>
                <p className="text-white/90">Serving traditional Kerala cuisine nationwide</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    location.flagship 
                      ? 'bg-primary-50 border-primary-200' 
                      : 'bg-white border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        location.flagship ? 'bg-primary-600' : 'bg-secondary-500'
                      }`}></div>
                      <div>
                        <h4 className="font-heading font-semibold text-warm-900">
                          {location.city}, {location.state}
                        </h4>
                        {location.flagship && (
                          <span className="text-xs text-primary-600 font-medium">Flagship Store</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 font-body">Since {location.year}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culinary Heritage Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
              Our Culinary Heritage
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Five signature dishes that define our legacy, each with a story rooted in 
              the rich culinary traditions of Malabar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {specialDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-warm-900 mb-3">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                    <p className="text-xs text-gray-700 italic">
                      <strong>Heritage:</strong> {dish.history}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chef Quotes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <ChefHat className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-warm-900 mb-2">
                Words from Our Master Chefs
              </h3>
              <p className="text-gray-600 font-body">
                The philosophy behind our authentic Malabar cuisine
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {chefQuotes.map((chef, index) => (
                <motion.div
                  key={chef.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <blockquote className="text-gray-700 font-body italic mb-4 leading-relaxed">
                        "{chef.quote}"
                      </blockquote>
                      <div>
                        <h4 className="font-heading font-semibold text-warm-900">
                          {chef.name}
                        </h4>
                        <p className="text-sm text-gray-500">{chef.position}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Values Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-900 mb-4">
              Our Values & Recognition
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              What drives us every day and the recognition we've received for our 
              commitment to authentic Kerala cuisine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-warm-900 mb-4">
                Authentic Traditions
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                We preserve the authentic flavors of Kerala by using traditional cooking methods, 
                time-honored recipes, and the finest spices sourced directly from Malabar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-warm-900 mb-4">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Every guest is treated like family. Our commitment to exceptional service and 
                quality has earned us loyal customers who return generation after generation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-warm-900 mb-4">
                Quality Ingredients
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                We source the freshest seafood, organic vegetables, and authentic spices to ensure 
                every dish meets our high standards of quality and taste.
              </p>
            </motion.div>
          </div>

          {/* Awards and Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold text-warm-900 mb-6">
                  Awards & Recognition
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-accent-500" />
                    <div>
                      <h4 className="font-heading font-semibold text-warm-900">
                        Best Kerala Restaurant 2023
                      </h4>
                      <p className="text-sm text-gray-600">Times Food Awards</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-6 w-6 text-accent-500" />
                    <div>
                      <h4 className="font-heading font-semibold text-warm-900">
                        4.8/5 Customer Rating
                      </h4>
                      <p className="text-sm text-gray-600">Based on 10,000+ reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-accent-500" />
                    <div>
                      <h4 className="font-heading font-semibold text-warm-900">
                        Featured in National Geographic
                      </h4>
                      <p className="text-sm text-gray-600">"Authentic Flavors of India" 2022</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-accent-500" />
                    <div>
                      <h4 className="font-heading font-semibold text-warm-900">
                        25+ Years of Excellence
                      </h4>
                      <p className="text-sm text-gray-600">Serving authentic Kerala cuisine since 1995</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Awards and media coverage"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;