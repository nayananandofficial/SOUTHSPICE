import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check, X, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  minOrder?: number;
}

interface PromoCodeInputProps {
  onPromoApplied: (discount: number, code: string) => void;
  onPromoRemoved: () => void;
  currentTotal: number;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onPromoApplied,
  onPromoRemoved,
  currentTotal
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock promo codes - in real app, these would come from backend
  const availablePromoCodes: PromoCode[] = [
    {
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      description: '10% off on your first order',
      minOrder: 200
    },
    {
      code: 'SAVE50',
      discount: 50,
      type: 'fixed',
      description: '₹50 off on orders above ₹300',
      minOrder: 300
    },
    {
      code: 'BIRYANI20',
      discount: 20,
      type: 'percentage',
      description: '20% off on Biryani orders',
      minOrder: 250
    },
    {
      code: 'FREESHIP',
      discount: 49,
      type: 'fixed',
      description: 'Free delivery on any order',
      minOrder: 100
    }
  ];

  // Load applied promo from localStorage
  useEffect(() => {
    const savedPromo = localStorage.getItem('spice-route-applied-promo');
    if (savedPromo) {
      try {
        const parsedPromo = JSON.parse(savedPromo);
        setAppliedPromo(parsedPromo);
        const discount = calculateDiscount(parsedPromo, currentTotal);
        onPromoApplied(discount, parsedPromo.code);
      } catch (error) {
        console.error('Error loading promo from localStorage:', error);
      }
    }
  }, []);

  const calculateDiscount = (promo: PromoCode, total: number): number => {
    if (promo.minOrder && total < promo.minOrder) {
      return 0;
    }
    
    if (promo.type === 'percentage') {
      return Math.round((total * promo.discount) / 100);
    } else {
      return promo.discount;
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundPromo = availablePromoCodes.find(
      p => p.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (!foundPromo) {
      toast.error('Invalid promo code');
      setIsLoading(false);
      return;
    }

    if (foundPromo.minOrder && currentTotal < foundPromo.minOrder) {
      toast.error(`Minimum order of ₹${foundPromo.minOrder} required for this promo`);
      setIsLoading(false);
      return;
    }

    const discount = calculateDiscount(foundPromo, currentTotal);
    setAppliedPromo(foundPromo);
    localStorage.setItem('spice-route-applied-promo', JSON.stringify(foundPromo));
    onPromoApplied(discount, foundPromo.code);
    setPromoCode('');
    setShowSuggestions(false);
    toast.success(`Promo code applied! You saved ₹${discount}`);
    setIsLoading(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    localStorage.removeItem('spice-route-applied-promo');
    onPromoRemoved();
    toast.success('Promo code removed');
  };

  const handleSelectSuggestion = (promo: PromoCode) => {
    setPromoCode(promo.code);
    setShowSuggestions(false);
  };

  const validPromosForCurrentOrder = availablePromoCodes.filter(
    promo => !promo.minOrder || currentTotal >= promo.minOrder
  );

  return (
    <div className="bg-gradient-to-br from-accent-50 to-secondary-50 rounded-xl p-6 border border-accent-200">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-5 w-5 text-accent-600" />
        <h3 className="font-heading font-semibold text-warm-900">
          Promo Code
        </h3>
      </div>

      {appliedPromo ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 border-2 border-secondary-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <h4 className="font-body font-semibold text-warm-900">
                  {appliedPromo.code}
                </h4>
                <p className="text-sm text-gray-600">{appliedPromo.description}</p>
                <p className="text-sm text-secondary-600 font-medium">
                  You saved ₹{calculateDiscount(appliedPromo, currentTotal)}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter promo code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition-all font-body"
              />
              
              {/* Promo Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && validPromosForCurrentOrder.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-10 max-h-48 overflow-y-auto"
                  >
                    <div className="p-2">
                      <p className="text-xs text-gray-500 font-body mb-2 px-2">
                        Available for your order:
                      </p>
                      {validPromosForCurrentOrder.map((promo) => (
                        <button
                          key={promo.code}
                          onClick={() => handleSelectSuggestion(promo)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-body font-semibold text-warm-900">
                                {promo.code}
                              </span>
                              <p className="text-xs text-gray-600">{promo.description}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-accent-600">
                              <Percent className="h-3 w-3" />
                              <span className="text-sm font-medium">
                                {promo.type === 'percentage' ? `${promo.discount}%` : `₹${promo.discount}`}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isLoading}
              className="px-6 py-3 bg-accent-600 text-white rounded-lg font-body font-medium hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Apply</span>
              )}
            </button>
          </div>

          {/* Quick Promo Buttons */}
          {validPromosForCurrentOrder.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 font-body mb-2">Quick apply:</p>
              <div className="flex flex-wrap gap-2">
                {validPromosForCurrentOrder.slice(0, 2).map((promo) => (
                  <button
                    key={promo.code}
                    onClick={() => handleSelectSuggestion(promo)}
                    className="px-3 py-1 bg-white border border-accent-300 text-accent-700 rounded-full text-sm font-body hover:bg-accent-50 transition-colors"
                  >
                    {promo.code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default PromoCodeInput;