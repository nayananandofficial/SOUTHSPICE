export type OrderStatus = 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked-up' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  customizations?: string[];
}

export interface DeliveryAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
  instructions?: string;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  timestamp: string;
  message: string;
  location?: string;
}

export interface PaymentInfo {
  method: string;
  transactionId: string;
  amount: number;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  profilePhoto: string;
  rating: number;
  totalDeliveries: number;
  vehicleType: 'bike' | 'scooter' | 'bicycle' | 'car';
  vehicleNumber: string;
  phone: string;
  currentStatus: 'picking-up' | 'en-route' | 'nearby' | 'delivered';
  estimatedArrival: string;
  isOnline: boolean;
  joinedDate: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  deliveryAddress: DeliveryAddress;
  paymentInfo: PaymentInfo;
  statusUpdates: OrderStatusUpdate[];
  restaurantName: string;
  restaurantAddress: string;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  deliveryPerson?: DeliveryPerson;
  isActive: boolean;
  rating?: number;
  review?: string;
  specialInstructions?: string;
  orderType: 'delivery' | 'pickup';
  preparationTime?: number;
}

// Mock coordinates for map tracking
export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface TrackingInfo {
  orderId: string;
  restaurantLocation: MapCoordinates;
  deliveryLocation: MapCoordinates;
  currentDriverLocation: MapCoordinates;
  estimatedArrival: string;
  distanceRemaining: string;
  lastUpdate: string;
  routePoints?: MapCoordinates[];
}

// Sample order data
export const mockOrders: Order[] = [
  // Active Order (most recent)
  {
    id: 'ord-001',
    orderNumber: 'SR240001',
    date: '2024-01-15T14:30:00Z',
    items: [
      {
        id: 'item-1',
        name: 'Chicken Biryani',
        quantity: 2,
        price: 299,
        image: 'https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=400',
        customizations: ['Extra spicy', 'Extra raita']
      },
      {
        id: 'item-2',
        name: 'Masala Dosa',
        quantity: 1,
        price: 149,
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 747,
    deliveryFee: 0,
    taxes: 37,
    discount: 50,
    total: 734,
    status: 'out-for-delivery',
    estimatedDeliveryTime: '2024-01-15T15:15:00Z',
    deliveryAddress: {
      name: 'Home',
      street: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001',
      landmark: 'Near City Mall',
      instructions: 'Ring the bell twice. Please call when you arrive at the gate.'
    },
    paymentInfo: {
      method: 'Google Pay',
      transactionId: 'TXN123456789',
      amount: 734
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-15T14:30:00Z',
        message: 'Order confirmed and sent to restaurant'
      },
      {
        status: 'preparing',
        timestamp: '2024-01-15T14:35:00Z',
        message: 'Restaurant is preparing your order',
        location: 'Spice Route Kitchen'
      },
      {
        status: 'ready',
        timestamp: '2024-01-15T14:55:00Z',
        message: 'Order is ready for pickup',
        location: 'Spice Route Kitchen'
      },
      {
        status: 'picked-up',
        timestamp: '2024-01-15T15:00:00Z',
        message: 'Order picked up by delivery partner',
        location: 'Spice Route Kitchen'
      },
      {
        status: 'out-for-delivery',
        timestamp: '2024-01-15T15:02:00Z',
        message: 'On the way to your location',
        location: 'En route'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    deliveryPersonName: 'Rajesh Kumar',
    deliveryPersonPhone: '+91 98765 43210',
    deliveryPerson: {
      id: 'dp-001',
      name: 'Rajesh Kumar',
      profilePhoto: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      totalDeliveries: 1247,
      vehicleType: 'bike',
      vehicleNumber: 'TN 09 AB 1234',
      phone: '+91 98765 43210',
      currentStatus: 'en-route',
      estimatedArrival: '12 minutes',
      isOnline: true,
      joinedDate: '2022-03-15'
    },
    isActive: true,
    specialInstructions: 'Please handle with care - contains hot items',
    orderType: 'delivery',
    preparationTime: 25
  },
  
  // Past Orders
  {
    id: 'ord-002',
    orderNumber: 'SR239998',
    date: '2024-01-13T19:45:00Z',
    items: [
      {
        id: 'item-3',
        name: 'Fish Curry',
        quantity: 1,
        price: 279,
        image: 'https://images.pexels.com/photos/4113464/pexels-photo-4113464.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'item-4',
        name: 'Idli Sambar',
        quantity: 2,
        price: 89,
        image: 'https://images.pexels.com/photos/5560758/pexels-photo-5560758.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 457,
    deliveryFee: 49,
    taxes: 23,
    discount: 0,
    total: 529,
    status: 'delivered',
    estimatedDeliveryTime: '2024-01-13T20:30:00Z',
    actualDeliveryTime: '2024-01-13T20:25:00Z',
    deliveryAddress: {
      name: 'Home',
      street: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001'
    },
    paymentInfo: {
      method: 'Credit Card',
      transactionId: 'TXN123456788',
      amount: 529
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-13T19:45:00Z',
        message: 'Order confirmed'
      },
      {
        status: 'delivered',
        timestamp: '2024-01-13T20:25:00Z',
        message: 'Order delivered successfully'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    deliveryPersonName: 'Priya Sharma',
    deliveryPersonPhone: '+91 98765 43211',
    deliveryPerson: {
      id: 'dp-002',
      name: 'Priya Sharma',
      profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      totalDeliveries: 892,
      vehicleType: 'scooter',
      vehicleNumber: 'TN 09 CD 5678',
      phone: '+91 98765 43211',
      currentStatus: 'delivered',
      estimatedArrival: 'Delivered',
      isOnline: false,
      joinedDate: '2023-01-20'
    },
    isActive: false,
    rating: 5,
    review: 'Excellent food quality and fast delivery!',
    orderType: 'delivery',
    preparationTime: 20
  },
  
  {
    id: 'ord-003',
    orderNumber: 'SR239995',
    date: '2024-01-10T12:15:00Z',
    items: [
      {
        id: 'item-5',
        name: 'Vegetable Biryani',
        quantity: 1,
        price: 249,
        image: 'https://images.pexels.com/photos/8629023/pexels-photo-8629023.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'item-6',
        name: 'Payasam',
        quantity: 2,
        price: 89,
        image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 427,
    deliveryFee: 0,
    taxes: 21,
    discount: 75,
    total: 373,
    status: 'delivered',
    estimatedDeliveryTime: '2024-01-10T13:00:00Z',
    actualDeliveryTime: '2024-01-10T12:58:00Z',
    deliveryAddress: {
      name: 'Office',
      street: '789 Business Park, Floor 3',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600002'
    },
    paymentInfo: {
      method: 'UPI',
      transactionId: 'TXN123456787',
      amount: 373
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-10T12:15:00Z',
        message: 'Order confirmed'
      },
      {
        status: 'delivered',
        timestamp: '2024-01-10T12:58:00Z',
        message: 'Order delivered successfully'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    deliveryPersonName: 'Arjun Nair',
    deliveryPersonPhone: '+91 98765 43212',
    deliveryPerson: {
      id: 'dp-003',
      name: 'Arjun Nair',
      profilePhoto: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7,
      totalDeliveries: 654,
      vehicleType: 'bicycle',
      vehicleNumber: 'ECO-001',
      phone: '+91 98765 43212',
      currentStatus: 'delivered',
      estimatedArrival: 'Delivered',
      isOnline: true,
      joinedDate: '2023-06-10'
    },
    isActive: false,
    rating: 4,
    review: 'Good food, slightly delayed but worth the wait.',
    orderType: 'delivery',
    preparationTime: 18
  },
  
  {
    id: 'ord-004',
    orderNumber: 'SR239990',
    date: '2024-01-08T18:20:00Z',
    items: [
      {
        id: 'item-7',
        name: 'Ghee Roast Chicken',
        quantity: 1,
        price: 329,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 329,
    deliveryFee: 49,
    taxes: 16,
    discount: 0,
    total: 394,
    status: 'delivered',
    estimatedDeliveryTime: '2024-01-08T19:05:00Z',
    actualDeliveryTime: '2024-01-08T19:10:00Z',
    deliveryAddress: {
      name: 'Home',
      street: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001'
    },
    paymentInfo: {
      method: 'PhonePe',
      transactionId: 'TXN123456786',
      amount: 394
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-08T18:20:00Z',
        message: 'Order confirmed'
      },
      {
        status: 'delivered',
        timestamp: '2024-01-08T19:10:00Z',
        message: 'Order delivered successfully'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    deliveryPersonName: 'Meera Patel',
    deliveryPersonPhone: '+91 98765 43213',
    deliveryPerson: {
      id: 'dp-004',
      name: 'Meera Patel',
      profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.6,
      totalDeliveries: 423,
      vehicleType: 'scooter',
      vehicleNumber: 'TN 09 EF 9012',
      phone: '+91 98765 43213',
      currentStatus: 'delivered',
      estimatedArrival: 'Delivered',
      isOnline: true,
      joinedDate: '2023-09-05'
    },
    isActive: false,
    rating: 5,
    review: 'Amazing taste! Will order again.',
    orderType: 'delivery',
    preparationTime: 22
  },
  
  {
    id: 'ord-005',
    orderNumber: 'SR239985',
    date: '2024-01-05T20:30:00Z',
    items: [
      {
        id: 'item-8',
        name: 'Sambar',
        quantity: 2,
        price: 89,
        image: 'https://images.pexels.com/photos/5779043/pexels-photo-5779043.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'item-9',
        name: 'Masala Vadai',
        quantity: 4,
        price: 59,
        image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 414,
    deliveryFee: 0,
    taxes: 21,
    discount: 40,
    total: 395,
    status: 'delivered',
    estimatedDeliveryTime: '2024-01-05T21:15:00Z',
    actualDeliveryTime: '2024-01-05T21:12:00Z',
    deliveryAddress: {
      name: 'Home',
      street: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001'
    },
    paymentInfo: {
      method: 'Amazon Pay',
      transactionId: 'TXN123456785',
      amount: 395
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-05T20:30:00Z',
        message: 'Order confirmed'
      },
      {
        status: 'delivered',
        timestamp: '2024-01-05T21:12:00Z',
        message: 'Order delivered successfully'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    deliveryPersonName: 'Karthik Reddy',
    deliveryPersonPhone: '+91 98765 43214',
    deliveryPerson: {
      id: 'dp-005',
      name: 'Karthik Reddy',
      profilePhoto: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.5,
      totalDeliveries: 789,
      vehicleType: 'bike',
      vehicleNumber: 'TN 09 GH 3456',
      phone: '+91 98765 43214',
      currentStatus: 'delivered',
      estimatedArrival: 'Delivered',
      isOnline: false,
      joinedDate: '2022-11-12'
    },
    isActive: false,
    rating: 4,
    review: 'Fresh and hot food. Great service!',
    orderType: 'delivery',
    preparationTime: 15
  },
  
  {
    id: 'ord-006',
    orderNumber: 'SR239980',
    date: '2024-01-03T16:45:00Z',
    items: [
      {
        id: 'item-10',
        name: 'Mutton Biryani',
        quantity: 1,
        price: 399,
        image: 'https://images.pexels.com/photos/11069151/pexels-photo-11069151.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    subtotal: 399,
    deliveryFee: 0,
    taxes: 20,
    discount: 0,
    total: 419,
    status: 'cancelled',
    estimatedDeliveryTime: '2024-01-03T17:30:00Z',
    deliveryAddress: {
      name: 'Home',
      street: '123 Main Street, Apartment 4B',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600001'
    },
    paymentInfo: {
      method: 'Credit Card',
      transactionId: 'TXN123456784',
      amount: 419
    },
    statusUpdates: [
      {
        status: 'confirmed',
        timestamp: '2024-01-03T16:45:00Z',
        message: 'Order confirmed'
      },
      {
        status: 'cancelled',
        timestamp: '2024-01-03T17:00:00Z',
        message: 'Order cancelled due to restaurant unavailability'
      }
    ],
    restaurantName: 'Spice Route Kitchen',
    restaurantAddress: '456 Food Street, Chennai, Tamil Nadu 600002',
    isActive: false,
    orderType: 'delivery'
  }
];

// Mock tracking data for the active order
export const mockTrackingInfo: TrackingInfo = {
  orderId: 'ord-001',
  restaurantLocation: {
    lat: 13.0827,
    lng: 80.2707
  },
  deliveryLocation: {
    lat: 13.0878,
    lng: 80.2785
  },
  currentDriverLocation: {
    lat: 13.0850,
    lng: 80.2750
  },
  estimatedArrival: '12 minutes',
  distanceRemaining: '2.3 km',
  lastUpdate: '2 minutes ago',
  routePoints: [
    { lat: 13.0827, lng: 80.2707 }, // Restaurant
    { lat: 13.0835, lng: 80.2720 },
    { lat: 13.0845, lng: 80.2735 },
    { lat: 13.0850, lng: 80.2750 }, // Current driver location
    { lat: 13.0860, lng: 80.2765 },
    { lat: 13.0870, lng: 80.2775 },
    { lat: 13.0878, lng: 80.2785 }  // Delivery location
  ]
};

// Helper functions
export const getActiveOrder = (): Order | null => {
  return mockOrders.find(order => order.isActive) || null;
};

export const getOrderHistory = (): Order[] => {
  return mockOrders.filter(order => !order.isActive);
};

export const getOrderById = (id: string): Order | null => {
  return mockOrders.find(order => order.id === id) || null;
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'text-blue-600 bg-blue-50';
    case 'preparing':
      return 'text-orange-600 bg-orange-50';
    case 'ready':
      return 'text-purple-600 bg-purple-50';
    case 'picked-up':
      return 'text-indigo-600 bg-indigo-50';
    case 'out-for-delivery':
      return 'text-yellow-600 bg-yellow-50';
    case 'delivered':
      return 'text-green-600 bg-green-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const formatOrderStatus = (status: OrderStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'Confirmed';
    case 'preparing':
      return 'Preparing';
    case 'ready':
      return 'Ready';
    case 'picked-up':
      return 'Picked Up';
    case 'out-for-delivery':
      return 'Out for Delivery';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const getOrderProgress = (status: OrderStatus): number => {
  switch (status) {
    case 'confirmed':
      return 20;
    case 'preparing':
      return 40;
    case 'ready':
      return 60;
    case 'picked-up':
      return 70;
    case 'out-for-delivery':
      return 90;
    case 'delivered':
      return 100;
    case 'cancelled':
      return 0;
    default:
      return 0;
  }
};

export const getVehicleIcon = (vehicleType: string): string => {
  switch (vehicleType) {
    case 'bike':
      return '🏍️';
    case 'scooter':
      return '🛵';
    case 'bicycle':
      return '🚲';
    case 'car':
      return '🚗';
    default:
      return '🚚';
  }
};

export const formatDeliveryPersonRating = (rating: number): string => {
  return `${rating.toFixed(1)} ⭐`;
};

export const getDeliveryStatusMessage = (status: string): string => {
  switch (status) {
    case 'picking-up':
      return 'Picking up your order';
    case 'en-route':
      return 'On the way to you';
    case 'nearby':
      return 'Almost there!';
    case 'delivered':
      return 'Order delivered';
    default:
      return 'In transit';
  }
};