import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import MobileNav from './MobileNav';
import MobileDrawer from './MobileDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-50">
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {children}
      </motion.main>

      <MobileNav />
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
};

export default Layout;