import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  UtensilsCrossed, 
  DollarSign, 
  ClipboardList, 
  Clock, 
  User,
  ChevronDown,
  ChevronUp,
  Star,
  AlertTriangle,
  Share2,
  Heart,
  MapPin,
  Shield,
  Truck,
  Navigation
} from 'lucide-react';
import { Order, getActiveOrder, formatOrderStatus, getOrderStatusColor, getVehicleIcon } from '../../data/mockOrders';
import OrderStatusStepper from './OrderStatusStepper';
import LiveTrackingMap from './LiveTrackingMap';
import toast from 'react-hot-toast';

interface ActiveOrderCardProps {
  className?: string;
}

const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({ className = '' }) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    const order = getActiveOrder();
    setActiveOrder(order);
    
    if (order) {
      // Calculate estimated delivery time
      const estimatedDelivery = new Date(order.estimatedDeliveryTime);
      const now = new Date();
      const diffInMinutes = Math.max(0, Math.floor((estimatedDelivery.getTime() - now.getTime()) / (1000 * 60)));
      
      if (diffInMinutes > 0) {
        setEstimatedTime(`${diffInMinutes} minutes`);
      } else {
        setEstimatedTime('Arriving soon');
      }
    }
  }, []);

  // Update estimated time every minute
  useEffect(() => {
    if (!activeOrder) return;

    const interval = setInterval(() => {
      const estimatedDelivery = new Date(activeOrder.estimatedDeliveryTime);
      const now = new Date();
      const diffInMinutes = Math.max(0, Math.floor((estimatedDelivery.getTime() - now.getTime()) / (1000 * 60)));
      
      if (diffInMinutes > 0) {
        setEstimatedTime(`${diffInMinutes} minutes`);
      } else {
        setEstimatedTime('Arriving soon');
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [activeOrder]);

  const handleCallDriver = () => {
    if (activeOrder?.deliveryPerson?.phone) {
      window.location.href = `tel:${activeOrder.deliveryPerson.phone}`;
    } else {
      toast.error('Driver contact not available');
    }
  };

  const handleChatDriver = () => {
    toast.success('Chat feature coming soon!');
  };

  const handleSOS = () => {
    toast.error('SOS/Emergency support activated!');
  };

  const handleShareTracking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Track my order',
        text: `Track my order #${activeOrder?.orderNumber}`,
        url: window.location.href
      }).then(() => {
        toast.success('Tracking link shared!');
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Tracking link copied to clipboard!');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Tracking link copied to clipboard!');
    }
  };

  const handleTipDriver = () => {
    toast.success('Tip driver feature coming soon!');
  };

  if (!activeOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`bg-white rounded-2xl shadow-lg p-8 text-center ${className}`}
      >
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <UtensilsCrossed className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-gray-700 mb-2">
          No Active Orders
        </h3>
        <p className="text-gray-500 font-body mb-6">
          You don't have any orders in progress right now.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-body font-medium hover:bg-primary-700 transition-colors"
        >
          <UtensilsCrossed className="h-4 w-4" />
          <span>Order Now</span>
        </Link>
      </motion.div>
    );
  }

  const getItemsSummary = () => {
    if (activeOrder.items.length === 1) {
      return activeOrder.items[0].name;
    }
    return `${activeOrder.items[0].name} + ${activeOrder.items.length - 1} more`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-warm-900">
              Active Order
            </h2>
            <p className="text-gray-600 font-body">
              Order #{activeOrder.orderNumber}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(activeOrder.status)}`}>
              {formatOrderStatus(activeOrder.status)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(activeOrder.date).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Restaurant</div>
              <div className="font-medium text-warm-900">{activeOrder.restaurantName}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Estimated Delivery</div>
              <div className="font-medium text-warm-900">{estimatedTime}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-accent-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Amount</div>
              <div className="font-medium text-warm-900">₹{activeOrder.total}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Agent Profile Section */}
      {activeOrder.deliveryPerson && (activeOrder.status === 'out-for-delivery' || activeOrder.status === 'picked-up') && (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-heading font-semibold text-warm-900 mb-4 flex items-center space-x-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span>Your Delivery Partner</span>
          </h3>
          
          <div className="flex items-center space-x-4 mb-4">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={activeOrder.deliveryPerson.profilePhoto}
                alt={activeOrder.deliveryPerson.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
              />
              {activeOrder.deliveryPerson.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Agent Details */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-heading font-semibold text-warm-900 text-lg">
                  {activeOrder.deliveryPerson.name}
                </h4>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {activeOrder.deliveryPerson.rating}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span className="text-lg">{getVehicleIcon(activeOrder.deliveryPerson.vehicleType)}</span>
                  <span className="capitalize">{activeOrder.deliveryPerson.vehicleType}</span>
                  <span>•</span>
                  <span className="font-mono">{activeOrder.deliveryPerson.vehicleNumber}</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-1">
                {activeOrder.deliveryPerson.totalDeliveries.toLocaleString()} deliveries completed
              </div>
            </div>

            {/* Status Badge */}
            <div className="text-center">
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-1">
                {activeOrder.deliveryPerson.currentStatus === 'en-route' ? 'On the way' : 'Picking up'}
              </div>
              <div className="text-xs text-gray-500">
                ETA: {activeOrder.deliveryPerson.estimatedArrival}
              </div>
            </div>
          </div>

          {/* Communication Options */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleCallDriver}
              className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Call</span>
            </button>
            
            <button
              onClick={handleChatDriver}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </button>
            
            <button
              onClick={handleSOS}
              className="flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">SOS</span>
            </button>
          </div>
        </div>
      )}

      {/* Delivery Instructions Section */}
      {activeOrder.specialInstructions && (
        <div className="p-6 border-b border-gray-200 bg-yellow-50">
          <h3 className="text-lg font-heading font-semibold text-warm-900 mb-3 flex items-center space-x-2">
            <ClipboardList className="h-5 w-5 text-yellow-600" />
            <span>Delivery Instructions</span>
          </h3>
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <p className="text-gray-700 font-body leading-relaxed">
              {activeOrder.specialInstructions}
            </p>
          </div>
          {activeOrder.deliveryAddress.instructions && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">Address Instructions:</p>
                  <p className="text-sm text-blue-700">{activeOrder.deliveryAddress.instructions}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order Status Stepper */}
      <div className="p-6 border-b border-gray-200">
        <OrderStatusStepper order={activeOrder} />
      </div>

      {/* Live Tracking Map */}
      {(activeOrder.status === 'out-for-delivery' || activeOrder.status === 'picked-up') && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-warm-900 mb-4 flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary-600" />
            <span>Live Tracking</span>
          </h3>
          <LiveTrackingMap orderId={activeOrder.id} />
        </div>
      )}

      {/* Additional Actions Section */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-heading font-semibold text-warm-900 mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Share Tracking Link */}
          <button
            onClick={handleShareTracking}
            className="flex items-center justify-center space-x-2 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <Share2 className="h-5 w-5 text-gray-600 group-hover:text-primary-600" />
            <div className="text-left">
              <div className="font-medium text-warm-900 group-hover:text-primary-700">Share Tracking</div>
              <div className="text-sm text-gray-600">Send link to others</div>
            </div>
          </button>

          {/* Tip Driver */}
          <button
            onClick={handleTipDriver}
            className="flex items-center justify-center space-x-2 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-all group"
          >
            <Heart className="h-5 w-5 text-gray-600 group-hover:text-secondary-600" />
            <div className="text-left">
              <div className="font-medium text-warm-900 group-hover:text-secondary-700">Tip Driver</div>
              <div className="text-sm text-gray-600">Show appreciation</div>
            </div>
          </button>
        </div>
      </div>

      {/* Order Details Toggle */}
      <div className="p-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ClipboardList className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-warm-900">Order Details</span>
          </div>
          {showDetails ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Expandable Order Details */}
        <motion.div
          initial={false}
          animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-6 space-y-6">
            {/* Items List */}
            <div>
              <h4 className="font-heading font-semibold text-warm-900 mb-3">Items Ordered</h4>
              <div className="space-y-3">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-warm-900">{item.name}</h5>
                      {item.customizations && item.customizations.length > 0 && (
                        <p className="text-sm text-gray-600">
                          {item.customizations.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-warm-900">
                        {item.quantity} × ₹{item.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{item.quantity * item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h4 className="font-heading font-semibold text-warm-900 mb-3">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{activeOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{activeOrder.deliveryFee === 0 ? 'FREE' : `₹${activeOrder.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>₹{activeOrder.taxes}</span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-secondary-600">
                    <span>Discount</span>
                    <span>-₹{activeOrder.discount}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between font-semibold text-warm-900">
                  <span>Total</span>
                  <span>₹{activeOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h4 className="font-heading font-semibold text-warm-900 mb-3">Delivery Address</h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-warm-900">{activeOrder.deliveryAddress.name}</div>
                    <div className="text-gray-600 text-sm">
                      {activeOrder.deliveryAddress.street}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {activeOrder.deliveryAddress.city}, {activeOrder.deliveryAddress.state} - {activeOrder.deliveryAddress.postalCode}
                    </div>
                    {activeOrder.deliveryAddress.landmark && (
                      <div className="text-gray-600 text-sm mt-1">
                        <strong>Landmark:</strong> {activeOrder.deliveryAddress.landmark}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Actions */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Restaurant */}
          <button className="flex items-center justify-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-warm-900">Contact Restaurant</div>
              <div className="text-sm text-gray-600">{activeOrder.restaurantName}</div>
            </div>
          </button>

          {/* Emergency Support */}
          <button 
            onClick={handleSOS}
            className="flex items-center justify-center space-x-3 p-4 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-warm-900 group-hover:text-red-700">Emergency Support</div>
              <div className="text-sm text-gray-600">24/7 assistance</div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveOrderCard;