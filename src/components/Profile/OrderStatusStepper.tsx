import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Clock, 
  UtensilsCrossed, 
  Truck, 
  Package, 
  ChefHat, 
  ClipboardCheck,
  X
} from 'lucide-react';
import { Order, OrderStatus, formatOrderStatus } from '../../data/mockOrders';

interface OrderStatusStepperProps {
  order: Order;
  className?: string;
}

interface StepConfig {
  status: OrderStatus;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ order, className = '' }) => {
  const steps: StepConfig[] = [
    {
      status: 'confirmed',
      label: 'Order Placed',
      icon: ClipboardCheck,
      description: 'Order confirmed and sent to restaurant'
    },
    {
      status: 'preparing',
      label: 'Preparing',
      icon: ChefHat,
      description: 'Restaurant is preparing your order'
    },
    {
      status: 'ready',
      label: 'Ready',
      icon: Package,
      description: 'Order is ready for pickup'
    },
    {
      status: 'picked-up',
      label: 'Picked Up',
      icon: UtensilsCrossed,
      description: 'Order picked up by delivery partner'
    },
    {
      status: 'out-for-delivery',
      label: 'Out for Delivery',
      icon: Truck,
      description: 'On the way to your location'
    },
    {
      status: 'delivered',
      label: 'Delivered',
      icon: Check,
      description: 'Order delivered successfully'
    }
  ];

  // Handle cancelled orders
  if (order.status === 'cancelled') {
    const cancelledSteps: StepConfig[] = [
      {
        status: 'confirmed',
        label: 'Order Placed',
        icon: ClipboardCheck,
        description: 'Order was confirmed'
      },
      {
        status: 'cancelled',
        label: 'Cancelled',
        icon: X,
        description: 'Order was cancelled'
      }
    ];

    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between relative">
          {cancelledSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index === 0; // Only first step is completed for cancelled orders
            const isCancelled = step.status === 'cancelled';
            const statusUpdate = order.statusUpdates.find(update => update.status === step.status);

            return (
              <div key={step.status} className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCancelled
                      ? 'bg-red-500 border-red-500 text-white'
                      : isCompleted
                      ? 'bg-secondary-500 border-secondary-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium ${
                    isCancelled ? 'text-red-600' : isCompleted ? 'text-warm-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  {statusUpdate && (
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(statusUpdate.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>

                {/* Connection Line */}
                {index < cancelledSteps.length - 1 && (
                  <div className="absolute top-6 left-12 w-full h-0.5 bg-red-200 -z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Get the current step index based on order status
  const getCurrentStepIndex = () => {
    const statusIndex = steps.findIndex(step => step.status === order.status);
    return statusIndex >= 0 ? statusIndex : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`${className}`}>
      {/* Mobile View - Vertical Layout */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const statusUpdate = order.statusUpdates.find(update => update.status === step.status);

            return (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                {/* Step Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                  isCompleted
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    isCurrent && order.status !== 'delivered' ? (
                      <Clock className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    isCompleted ? 'text-warm-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isCompleted ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                  {statusUpdate && (
                    <div className="text-xs text-primary-600 mt-1 font-medium">
                      {formatTimestamp(statusUpdate.timestamp)}
                    </div>
                  )}
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 mt-10 w-0.5 h-8 bg-gray-200 -z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop View - Horizontal Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const statusUpdate = order.statusUpdates.find(update => update.status === step.status);

            return (
              <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    isCurrent && order.status !== 'delivered' ? (
                      <Clock className="h-5 w-5 animate-pulse" />
                    ) : (
                      <Check className="h-5 w-5" />
                    )
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="mt-3 text-center max-w-24">
                  <div className={`text-sm font-medium ${
                    isCompleted ? 'text-warm-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  {statusUpdate && (
                    <div className="text-xs text-primary-600 mt-1 font-medium">
                      {formatTimestamp(statusUpdate.timestamp)}
                    </div>
                  )}
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute top-6 left-1/2 w-full h-0.5 transition-all -z-10 ${
                      index < currentStepIndex ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                    style={{ 
                      left: '50%',
                      right: '-50%',
                      width: 'calc(100% - 24px)',
                      marginLeft: '12px'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Status Description */}
        {order.status !== 'delivered' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 rounded-lg">
              <Clock className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-primary-700 font-medium">
                {steps[currentStepIndex]?.description}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusStepper;