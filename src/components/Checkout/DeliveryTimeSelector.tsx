import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, CheckCircle, AlertCircle, Truck, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface TimeSlot {
  id: string;
  date: string;
  timeRange: string;
  displayTime: string;
  isAvailable: boolean;
  isPopular?: boolean;
  deliveryFee?: number;
  estimatedTime?: string;
}

interface DeliveryTimeSelectorProps {
  onTimeSlotSelect: (slot: TimeSlot) => void;
  selectedSlotId?: string;
  className?: string;
}

const DeliveryTimeSelector: React.FC<DeliveryTimeSelectorProps> = ({
  onTimeSlotSelect,
  selectedSlotId,
  className = ''
}) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedSlotId, setFocusedSlotId] = useState<string | null>(null);

  // Generate time slots for the next 3 days
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const now = new Date();
    
    for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
      const date = new Date(now);
      date.setDate(date.getDate() + dayOffset);
      
      const isToday = dayOffset === 0;
      const currentHour = now.getHours();
      
      // Define time slots for each day
      const timeRanges = [
        { start: 9, end: 11, label: '9:00 AM - 11:00 AM', popular: true },
        { start: 11, end: 13, label: '11:00 AM - 1:00 PM', popular: false },
        { start: 13, end: 15, label: '1:00 PM - 3:00 PM', popular: true },
        { start: 15, end: 17, label: '3:00 PM - 5:00 PM', popular: false },
        { start: 17, end: 19, label: '5:00 PM - 7:00 PM', popular: true },
        { start: 19, end: 21, label: '7:00 PM - 9:00 PM', popular: true },
        { start: 21, end: 23, label: '9:00 PM - 11:00 PM', popular: false }
      ];

      timeRanges.forEach((timeRange, index) => {
        // For today, only show slots that are at least 2 hours from now
        const isAvailable = isToday 
          ? timeRange.start > currentHour + 2 
          : Math.random() > 0.2; // 80% availability for future days

        const dateStr = date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });

        slots.push({
          id: `${dayOffset}-${index}`,
          date: dateStr,
          timeRange: timeRange.label,
          displayTime: isToday ? 'Today' : dateStr,
          isAvailable,
          isPopular: timeRange.popular && isAvailable,
          deliveryFee: timeRange.start < 12 || timeRange.start > 20 ? 29 : 0,
          estimatedTime: isToday && timeRange.start <= currentHour + 3 ? '30-45 mins' : '45-60 mins'
        });
      });
    }

    return slots;
  };

  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());

  // Initialize selected slot from props
  useEffect(() => {
    if (selectedSlotId) {
      const slot = timeSlots.find(s => s.id === selectedSlotId);
      if (slot) {
        setSelectedSlot(slot);
      }
    }
  }, [selectedSlotId, timeSlots]);

  const handleSlotSelect = async (slot: TimeSlot) => {
    if (!slot.isAvailable) {
      toast.error('This time slot is not available');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for slot validation
      await new Promise(resolve => setTimeout(resolve, 500));

      setSelectedSlot(slot);
      onTimeSlotSelect(slot);
      
      toast.success(
        `Delivery scheduled for ${slot.displayTime} ${slot.timeRange}`,
        {
          duration: 3000,
          icon: '✅'
        }
      );
    } catch (error) {
      toast.error('Failed to select time slot. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, slot: TimeSlot) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSlotSelect(slot);
    }
  };

  const getSlotVariant = (slot: TimeSlot) => {
    if (!slot.isAvailable) return 'unavailable';
    if (selectedSlot?.id === slot.id) return 'selected';
    if (slot.isPopular) return 'popular';
    return 'default';
  };

  const getSlotStyles = (variant: string, isFocused: boolean) => {
    const baseStyles = "relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-offset-2";
    
    const variants = {
      default: `${baseStyles} border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 hover:shadow-md ${isFocused ? 'ring-primary-500' : ''}`,
      popular: `${baseStyles} border-secondary-200 bg-secondary-50 hover:border-secondary-400 hover:bg-secondary-100 hover:shadow-md ${isFocused ? 'ring-secondary-500' : ''}`,
      selected: `${baseStyles} border-primary-500 bg-primary-50 shadow-lg ring-4 ring-primary-500 ring-offset-2 ${isFocused ? 'ring-primary-600' : ''}`,
      unavailable: `${baseStyles} border-gray-200 bg-gray-50 cursor-not-allowed opacity-60 ${isFocused ? 'ring-gray-400' : ''}`
    };

    return variants[variant as keyof typeof variants] || variants.default;
  };

  // Group slots by date for better organization
  const slotsByDate = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.displayTime]) {
      acc[slot.displayTime] = [];
    }
    acc[slot.displayTime].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <Clock className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-warm-900">
            Select Delivery Time
          </h3>
          <p className="text-sm text-gray-600 font-body">
            Choose your preferred delivery window
          </p>
        </div>
      </div>

      {/* Selected Slot Summary */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <div className="flex-1">
                <h4 className="font-body font-semibold text-warm-900">
                  Delivery Scheduled
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedSlot.displayTime} • {selectedSlot.timeRange}
                </p>
                {selectedSlot.estimatedTime && (
                  <p className="text-xs text-gray-600 mt-1">
                    Estimated delivery: {selectedSlot.estimatedTime}
                  </p>
                )}
              </div>
              {selectedSlot.deliveryFee && selectedSlot.deliveryFee > 0 ? (
                <div className="text-right">
                  <span className="text-sm text-gray-600">Delivery fee</span>
                  <div className="font-semibold text-warm-900">₹{selectedSlot.deliveryFee}</div>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-sm text-secondary-600 font-medium">FREE</span>
                  <div className="text-xs text-gray-500">Delivery</div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Slots Grid */}
      <div className="space-y-6">
        {Object.entries(slotsByDate).map(([date, slots]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-500" />
              <h4 className="font-body font-semibold text-warm-900">{date}</h4>
              {date === 'Today' && (
                <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full font-medium">
                  Same Day
                </span>
              )}
            </div>

            {/* Time Slots for this date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {slots.map((slot) => {
                const variant = getSlotVariant(slot);
                const isFocused = focusedSlotId === slot.id;
                
                return (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={getSlotStyles(variant, isFocused)}
                    onClick={() => handleSlotSelect(slot)}
                    onKeyDown={(e) => handleKeyDown(e, slot)}
                    onFocus={() => setFocusedSlotId(slot.id)}
                    onBlur={() => setFocusedSlotId(null)}
                    tabIndex={slot.isAvailable ? 0 : -1}
                    role="button"
                    aria-pressed={selectedSlot?.id === slot.id}
                    aria-disabled={!slot.isAvailable}
                    aria-label={`Select delivery time ${slot.timeRange} on ${slot.displayTime}${!slot.isAvailable ? ' - unavailable' : ''}`}
                    whileHover={slot.isAvailable ? { scale: 1.02 } : {}}
                    whileTap={slot.isAvailable ? { scale: 0.98 } : {}}
                  >
                    {/* Popular Badge */}
                    {slot.isPopular && slot.isAvailable && (
                      <div className="absolute -top-2 -right-2">
                        <div className="flex items-center space-x-1 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="h-3 w-3 fill-current" />
                          <span>Popular</span>
                        </div>
                      </div>
                    )}

                    {/* Selected Indicator */}
                    {selectedSlot?.id === slot.id && (
                      <div className="absolute -top-2 -left-2">
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Slot Content */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className={`h-4 w-4 ${
                            !slot.isAvailable ? 'text-gray-400' : 
                            selectedSlot?.id === slot.id ? 'text-primary-600' : 
                            slot.isPopular ? 'text-secondary-600' : 'text-gray-600'
                          }`} />
                          <span className={`font-body font-semibold ${
                            !slot.isAvailable ? 'text-gray-400' : 
                            selectedSlot?.id === slot.id ? 'text-primary-700' : 'text-warm-900'
                          }`}>
                            {slot.timeRange}
                          </span>
                        </div>
                        
                        {slot.estimatedTime && slot.isAvailable && (
                          <p className={`text-xs ${
                            selectedSlot?.id === slot.id ? 'text-primary-600' : 'text-gray-500'
                          }`}>
                            Est. {slot.estimatedTime}
                          </p>
                        )}

                        {!slot.isAvailable && (
                          <div className="flex items-center space-x-1 mt-1">
                            <AlertCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">Unavailable</span>
                          </div>
                        )}
                      </div>

                      {/* Delivery Fee */}
                      {slot.isAvailable && (
                        <div className="text-right ml-3">
                          {slot.deliveryFee && slot.deliveryFee > 0 ? (
                            <div className={`text-sm font-medium ${
                              selectedSlot?.id === slot.id ? 'text-primary-700' : 'text-warm-900'
                            }`}>
                              +₹{slot.deliveryFee}
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <Truck className="h-3 w-3 text-secondary-600" />
                              <span className="text-xs text-secondary-600 font-medium">FREE</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Loading Overlay */}
                    <AnimatePresence>
                      {isLoading && selectedSlot?.id === slot.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center"
                        >
                          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700 font-body">
            <p className="font-medium mb-1">Delivery Information:</p>
            <ul className="space-y-1 text-xs">
              <li>• Free delivery during peak hours (1-3 PM, 5-9 PM)</li>
              <li>• Express delivery available for same-day orders</li>
              <li>• You can reschedule up to 2 hours before delivery</li>
              <li>• Contact support if you need a custom time slot</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTimeSelector;