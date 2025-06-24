import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import InvoiceReviewStep from '../components/Checkout/InvoiceReviewStep';
import DeliveryInformationStep from '../components/Checkout/DeliveryInformationStep';
import PaymentStep from '../components/Checkout/PaymentStep';
import PromoCodeInput from '../components/Checkout/PromoCodeInput';
import toast from 'react-hot-toast';

type CheckoutStep = 'invoice-review' | 'delivery-info' | 'payment';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('invoice-review');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('asap');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to continue with checkout');
      navigate('/auth');
    }
  }, [user, navigate]);

  const steps = [
    { id: 'invoice-review', label: 'Review Order', number: 1 },
    { id: 'delivery-info', label: 'Delivery Info', number: 2 },
    { id: 'payment', label: 'Payment', number: 3 }
  ];

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 299 ? 0 : 49;
  const taxAmount = Math.round(subtotal * 0.05);
  const totalBeforePromo = subtotal + deliveryFee + taxAmount;
  const finalTotal = totalBeforePromo - promoDiscount;

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'invoice-review':
        return true;
      case 'delivery-info':
        return selectedAddress !== null && selectedDeliveryTime !== '';
      case 'payment':
        return selectedPaymentMethod !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceedToNext()) {
      toast.error('Please complete all required fields');
      return;
    }

    const stepOrder: CheckoutStep[] = ['invoice-review', 'delivery-info', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: CheckoutStep[] = ['invoice-review', 'delivery-info', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = async () => {
    if (!canProceedToNext()) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and show success
      clearCart();
      localStorage.removeItem('spice-route-applied-promo');
      setShowOrderConfirmation(true);
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromoApplied = (discount: number, code: string) => {
    setPromoDiscount(discount);
    setPromoCode(code);
  };

  const handlePromoRemoved = () => {
    setPromoDiscount(0);
    setPromoCode('');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'invoice-review':
        return (
          <InvoiceReviewStep
            promoDiscount={promoDiscount}
            promoCode={promoCode}
            selectedDeliveryTime={selectedDeliveryTime}
          />
        );
      case 'delivery-info':
        return (
          <DeliveryInformationStep
            onAddressSelect={setSelectedAddress}
            onDeliveryTimeSelect={setSelectedDeliveryTime}
            selectedAddress={selectedAddress}
            selectedDeliveryTime={selectedDeliveryTime}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            orderTotal={finalTotal}
            onPaymentMethodSelect={setSelectedPaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        );
      default:
        return null;
    }
  };

  // Order Confirmation Modal
  const OrderConfirmationModal = () => (
    <AnimatePresence>
      {showOrderConfirmation && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-secondary-600" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-warm-900 mb-4">
                Order Confirmed!
              </h3>
              
              <p className="text-gray-600 font-body mb-6">
                Your order has been placed successfully. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 font-body mb-2">Order Total</p>
                <p className="text-2xl font-heading font-bold text-primary-600">
                  ₹{finalTotal}
                </p>
                <p className="text-sm text-gray-600 font-body mt-2">
                  Estimated delivery: 30-40 minutes
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors"
                >
                  Track Order
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-body font-semibold hover:bg-gray-50 transition-colors"
                >
                  Browse More Food
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (cart.length === 0 || !user) {
    return null;
  }

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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/cart')}
              className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-warm-900">
                Checkout
              </h1>
              <p className="text-gray-600 font-body">
                Complete your order in {steps.length} simple steps
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-primary-600">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-heading font-semibold text-lg">
              ₹{finalTotal}
            </span>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold transition-all ${
                      currentStep === step.id
                        ? 'bg-primary-600 text-white'
                        : steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-secondary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`font-body font-semibold ${
                        currentStep === step.id
                          ? 'text-primary-600'
                          : steps.findIndex(s => s.id === currentStep) > index
                          ? 'text-secondary-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {step.label}
                    </h3>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 rounded-full transition-all ${
                      steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-secondary-600'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200"
            >
              <button
                onClick={handlePrevious}
                disabled={currentStep === 'invoice-review'}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {currentStep === 'payment' ? (
                <button
                  onClick={handlePlaceOrder}
                  disabled={!canProceedToNext() || isLoading}
                  className="flex items-center space-x-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span>₹{finalTotal}</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-body font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 sticky top-24"
            >
              {/* Promo Code */}
              <PromoCodeInput
                onPromoApplied={handlePromoApplied}
                onPromoRemoved={handlePromoRemoved}
                currentTotal={totalBeforePromo}
              />

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-heading font-semibold text-warm-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Delivery Fee</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-secondary-600' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Taxes & Fees</span>
                    <span className="font-medium">₹{taxAmount}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-secondary-600">
                      <span className="font-body">Promo Discount</span>
                      <span className="font-medium">-₹{promoDiscount}</span>
                    </div>
                  )}

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-heading font-bold text-warm-900">
                      Total
                    </span>
                    <span className="text-xl font-heading font-bold text-primary-600">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">🔒</span>
                  <span className="font-body font-semibold text-warm-900">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-body">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal />
    </motion.div>
  );
};

export default Checkout;