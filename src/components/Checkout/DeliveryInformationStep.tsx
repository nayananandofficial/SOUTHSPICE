import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Clock, Home, Building, User } from 'lucide-react';

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

interface DeliveryInformationStepProps {
  onAddressSelect: (address: Address) => void;
  onDeliveryTimeSelect: (time: string) => void;
  selectedAddress: Address | null;
  selectedDeliveryTime: string;
}

const DeliveryInformationStep: React.FC<DeliveryInformationStepProps> = ({
  onAddressSelect,
  onDeliveryTimeSelect,
  selectedAddress,
  selectedDeliveryTime
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock saved addresses
  useEffect(() => {
    const mockAddresses: Address[] = [
      {
        id: '1',
        type: 'home',
        name: 'Home',
        street: '123 Main Street, Apartment 4B',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postalCode: '600001',
        isDefault: true
      },
      {
        id: '2',
        type: 'work',
        name: 'Office',
        street: '456 Business Park, Floor 3',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postalCode: '600002',
        isDefault: false
      }
    ];
    setAddresses(mockAddresses);
    
    // Auto-select default address if none selected
    if (!selectedAddress) {
      const defaultAddress = mockAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        onAddressSelect(defaultAddress);
      }
    }
  }, [selectedAddress, onAddressSelect]);

  // Generate delivery time slots
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // ASAP option
    slots.push({
      value: 'asap',
      label: 'ASAP (30-40 mins)',
      isWithin6Hours: true
    });

    // Generate slots for next 12 hours
    for (let i = 1; i <= 12; i++) {
      const slotTime = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const hour = slotTime.getHours();
      const isWithin6Hours = i <= 6;
      
      slots.push({
        value: slotTime.toISOString(),
        label: `${hour}:00 - ${hour + 1}:00`,
        isWithin6Hours
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newAddress.name.trim()) {
      newErrors.name = 'Address name is required';
    }
    if (!newAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!newAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!newAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!newAddress.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{6}$/.test(newAddress.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 6-digit postal code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = () => {
    if (!validateForm()) return;

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };

    setAddresses(prev => [...prev, address]);
    onAddressSelect(address);
    setShowAddForm(false);
    setNewAddress({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      postalCode: ''
    });
    setErrors({});
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return Home;
      case 'work':
        return Building;
      default:
        return MapPin;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-warm-900 mb-2">
          Delivery Information
        </h2>
        <p className="text-gray-600 font-body">
          Choose your delivery address and preferred time
        </p>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-heading font-semibold text-warm-900">
              Delivery Address
            </h3>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-body font-medium hover:bg-primary-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="space-y-3 mb-6">
          {addresses.map((address) => {
            const IconComponent = getAddressIcon(address.type);
            return (
              <motion.div
                key={address.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => onAddressSelect(address)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedAddress?.id === address.id
                      ? 'bg-primary-100'
                      : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-4 w-4 ${
                      selectedAddress?.id === address.id
                        ? 'text-primary-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-body font-semibold text-warm-900">
                        {address.name}
                      </h4>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {address.street}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} - {address.postalCode}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add New Address Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-6"
          >
            <h4 className="font-heading font-semibold text-warm-900 mb-4">
              Add New Address
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="flex space-x-3">
                  {[
                    { value: 'home', label: 'Home', icon: Home },
                    { value: 'work', label: 'Work', icon: Building },
                    { value: 'other', label: 'Other', icon: MapPin }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setNewAddress(prev => ({ ...prev, type: value as any }))}
                      className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                        newAddress.type === value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-body">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Address Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Name
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Home, Office"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="House/Flat no., Street name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.street ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-red-600">{errors.street}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="State"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                  placeholder="6-digit postal code"
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-body ${
                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddAddress}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-body font-medium hover:bg-primary-700 transition-colors"
              >
                Save Address
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setErrors({});
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delivery Time */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-heading font-semibold text-warm-900">
            Preferred Delivery Time
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <motion.button
              key={slot.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDeliveryTimeSelect(slot.value)}
              className={`p-4 border-2 rounded-xl text-left transition-all focus:outline-none ${
                selectedDeliveryTime === slot.value
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                  : 'border-gray-200 hover:border-primary-300 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-body font-medium text-warm-900">
                  {slot.label}
                </span>
                {slot.isWithin6Hours && (
                  <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                    Express
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-body">
            💡 <strong>Express delivery</strong> is available for orders within the next 6 hours for an additional ₹20.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryInformationStep;