import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/Home/HeroSection';
import FeaturedDishes from '../components/Home/FeaturedDishes';
import DeliveryBanner from '../components/Home/DeliveryBanner';
import Testimonials from '../components/Home/Testimonials';
import CTASection from '../components/Home/CTASection';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-20"
    >
      <HeroSection />
      <DeliveryBanner />
      <FeaturedDishes />
      <Testimonials />
      <CTASection />
    </motion.div>
  );
};

export default Home;