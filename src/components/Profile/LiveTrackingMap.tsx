import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Truck, Home, UtensilsCrossed, Navigation, Clock, Phone, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { TrackingInfo, mockTrackingInfo, MapCoordinates } from '../../data/mockOrders';
import toast from 'react-hot-toast';

interface LiveTrackingMapProps {
  orderId: string;
  className?: string;
}

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface RoutePoint extends MapCoordinates {
  timestamp?: string;
  speed?: number;
}

// Error Boundary Component
class MapErrorBoundary extends React.Component<
  { children: React.ReactNode; onRetry: () => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-gray-700 mb-2">
              Map Temporarily Unavailable
            </h3>
            <p className="text-gray-500 font-body mb-4">
              We're having trouble loading the map. Please try again.
            </p>
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                this.props.onRetry();
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-body font-medium hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Memoized Driver Marker Component
const DriverMarker = React.memo<{
  position: MapCoordinates;
  style: React.CSSProperties;
  isMoving: boolean;
  vehicleType?: string;
}>(({ position, style, isMoving, vehicleType = 'bike' }) => {
  const getVehicleIcon = () => {
    switch (vehicleType) {
      case 'bike': return '🏍️';
      case 'scooter': return '🛵';
      case 'bicycle': return '🚲';
      case 'car': return '🚗';
      default: return '🚚';
    }
  };

  return (
    <motion.div
      animate={style}
      transition={{ duration: 2, ease: 'easeInOut' }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      role="img"
      aria-label={`Delivery driver location - ${vehicleType}`}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: isMoving ? 360 : 0 }}
          transition={{ duration: isMoving ? 2 : 0, repeat: isMoving ? Infinity : 0, ease: 'linear' }}
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        >
          <span className="text-lg">{getVehicleIcon()}</span>
        </motion.div>
        
        {/* Pulse Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.7, 0, 0.7] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-blue-500 rounded-full"
        />
        
        {/* Movement Indicator */}
        {isMoving && (
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          />
        )}
        
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Delivery Partner
        </div>
      </div>
    </motion.div>
  );
});

DriverMarker.displayName = 'DriverMarker';

const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ orderId, className = '' }) => {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo>(mockTrackingInfo);
  const [driverPosition, setDriverPosition] = useState(mockTrackingInfo.currentDriverLocation);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [isDriverMoving, setIsDriverMoving] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 3;
  const updateInterval = 3000; // 3 seconds

  // Enhanced coordinate mapping with dynamic bounds
  const getMapBounds = useCallback((locations: MapCoordinates[]): MapBounds => {
    const lats = locations.map(loc => loc.lat);
    const lngs = locations.map(loc => loc.lng);
    
    const padding = 0.005; // Add padding around bounds
    
    return {
      north: Math.max(...lats) + padding,
      south: Math.min(...lats) - padding,
      east: Math.max(...lngs) + padding,
      west: Math.min(...lngs) - padding
    };
  }, []);

  const getPositionStyle = useCallback((lat: number, lng: number, bounds: MapBounds): React.CSSProperties => {
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    };
  }, []);

  // Dynamic route generation using route points
  const generateRoutePath = useCallback((points: RoutePoint[], bounds: MapBounds): string => {
    if (points.length < 2) return '';
    
    const pathPoints = points.map(point => {
      const style = getPositionStyle(point.lat, point.lng, bounds);
      return {
        x: parseFloat(style.left as string),
        y: parseFloat(style.top as string)
      };
    });
    
    // Create smooth path through all points
    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      const next = pathPoints[i + 1];
      
      if (next) {
        // Smooth curve to current point
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) * 0.5;
        const cp2y = curr.y;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        path += ` L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  }, [getPositionStyle]);

  // Memoized position calculations
  const memoizedPositions = useMemo(() => {
    const allLocations = [
      trackingInfo.restaurantLocation,
      trackingInfo.deliveryLocation,
      driverPosition
    ];
    
    const bounds = getMapBounds(allLocations);
    
    return {
      restaurant: getPositionStyle(trackingInfo.restaurantLocation.lat, trackingInfo.restaurantLocation.lng, bounds),
      delivery: getPositionStyle(trackingInfo.deliveryLocation.lat, trackingInfo.deliveryLocation.lng, bounds),
      driver: getPositionStyle(driverPosition.lat, driverPosition.lng, bounds),
      bounds,
      routePath: generateRoutePath(routePoints, bounds)
    };
  }, [trackingInfo, driverPosition, routePoints, getMapBounds, getPositionStyle, generateRoutePath]);

  // Enhanced real-time updates with error handling
  const updateDriverLocation = useCallback(async () => {
    if (!isOnline) {
      console.log('Offline - skipping location update');
      return;
    }

    try {
      // Simulate API call with error handling
      const response = await fetch(`/api/tracking/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Update driver position and route
      const previousPosition = driverPosition;
      setDriverPosition(data.currentLocation);
      setRoutePoints(data.routePoints || []);
      setLastUpdate(new Date());
      setRetryCount(0); // Reset on success
      
      // Check if driver is moving
      const hasMovedSignificantly = 
        Math.abs(data.currentLocation.lat - previousPosition.lat) > 0.0001 ||
        Math.abs(data.currentLocation.lng - previousPosition.lng) > 0.0001;
      
      setIsDriverMoving(hasMovedSignificantly);
      
    } catch (error) {
      console.error('Location update failed:', error);
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= maxRetries) {
        // Fallback to simulated movement
        console.log('Max retries reached, using simulated movement');
        setDriverPosition(prev => {
          const deliveryLat = trackingInfo.deliveryLocation.lat;
          const deliveryLng = trackingInfo.deliveryLocation.lng;
          
          const latDiff = (deliveryLat - prev.lat) * 0.02;
          const lngDiff = (deliveryLng - prev.lng) * 0.02;
          
          const newPosition = {
            lat: prev.lat + latDiff,
            lng: prev.lng + lngDiff
          };
          
          // Update route points for simulated movement
          setRoutePoints(prevPoints => [
            ...prevPoints.slice(-5), // Keep last 5 points
            { ...newPosition, timestamp: new Date().toISOString() }
          ]);
          
          setIsDriverMoving(true);
          return newPosition;
        });
        
        setLastUpdate(new Date());
        toast.error('Using simulated tracking due to connection issues', {
          duration: 3000,
          icon: '📡'
        });
      } else {
        toast.error(`Location update failed (${retryCount + 1}/${maxRetries})`, {
          duration: 2000
        });
      }
    }
  }, [orderId, isOnline, retryCount, driverPosition, trackingInfo.deliveryLocation]);

  // Start location updates
  const startLocationUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(updateDriverLocation, updateInterval);
    updateDriverLocation(); // Initial update
  }, [updateDriverLocation]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setRetryCount(0);
      toast.success('Connection restored - resuming live tracking', {
        duration: 2000,
        icon: '📡'
      });
      if (isVisible) {
        startLocationUpdates();
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      toast.error('Connection lost - tracking may be delayed', {
        duration: 3000,
        icon: '📡'
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isVisible, startLocationUpdates]);

  // Handle visibility changes for performance optimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isCurrentlyVisible = !document.hidden;
      setIsVisible(isCurrentlyVisible);
      
      if (isCurrentlyVisible && isOnline) {
        console.log('Tab visible - resuming location updates');
        startLocationUpdates();
      } else {
        console.log('Tab hidden - pausing location updates');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOnline, startLocationUpdates]);

  // Initialize tracking
  useEffect(() => {
    setIsLoading(true);
    
    // Initialize route points
    if (trackingInfo.routePoints) {
      setRoutePoints(trackingInfo.routePoints);
    }
    
    // Start updates if online and visible
    if (isOnline && isVisible) {
      startLocationUpdates();
    }
    
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [orderId, trackingInfo, isOnline, isVisible, startLocationUpdates]);

  const formatDeliveryTime = (time: string) => {
    if (time === 'asap') {
      return '30-40 minutes';
    }
    
    try {
      const date = new Date(time);
      const hour = date.getHours();
      return `${hour}:00 - ${hour + 1}:00`;
    } catch {
      return '30-40 minutes';
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (isOnline && isVisible) {
        startLocationUpdates();
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden h-80 border-2 border-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-body">Loading live tracking...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MapErrorBoundary onRetry={handleRetry}>
      <div className={`${className}`}>
        {/* Connection Status */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
            >
              <WifiOff className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700 font-body">
                Offline - Tracking updates paused
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Container */}
        <div 
          className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden h-80 border-2 border-gray-200"
          role="img"
          aria-label={`Live tracking map showing delivery from restaurant to delivery location`}
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300" aria-hidden="true">
              {/* Mock street lines */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="300" stroke="#94a3b8" strokeWidth="2" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#94a3b8" strokeWidth="2" />
              <line x1="300" y1="0" x2="300" y2="300" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Mock buildings */}
              <rect x="50" y="50" width="40" height="40" fill="#e2e8f0" />
              <rect x="150" y="120" width="30" height="30" fill="#e2e8f0" />
              <rect x="250" y="80" width="35" height="35" fill="#e2e8f0" />
              <rect x="320" y="150" width="25" height="25" fill="#e2e8f0" />
            </svg>
          </div>

          {/* Enhanced Route Line */}
          {routePoints.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
                <filter id="routeGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d={memoizedPositions.routePath}
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeDasharray="8,4"
                fill="none"
                filter="url(#routeGlow)"
                className="animate-pulse"
              />
            </svg>
          )}

          {/* Restaurant Marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15"
            style={memoizedPositions.restaurant}
            role="img"
            aria-label="Restaurant location"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <UtensilsCrossed className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Restaurant
              </div>
            </div>
          </motion.div>

          {/* Delivery Location Marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15"
            style={memoizedPositions.delivery}
            role="img"
            aria-label="Delivery location"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Your Location
              </div>
            </div>
          </motion.div>

          {/* Enhanced Driver Marker */}
          <DriverMarker
            position={driverPosition}
            style={memoizedPositions.driver}
            isMoving={isDriverMoving}
            vehicleType="bike"
          />

          {/* Live Update Indicator */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
            {isOnline ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <Wifi className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-gray-700">Live</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <WifiOff className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-gray-700">Offline</span>
              </>
            )}
          </div>

          {/* Retry Count Indicator (for debugging) */}
          {retryCount > 0 && (
            <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Retry {retryCount}/{maxRetries}
            </div>
          )}
        </div>

        {/* Enhanced Tracking Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Estimated Arrival */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Estimated Arrival</div>
                <div className="text-lg font-semibold text-warm-900">
                  {trackingInfo.estimatedArrival}
                </div>
                {isDriverMoving && (
                  <div className="text-xs text-green-600 font-medium">Driver moving</div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Distance Remaining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Distance</div>
                <div className="text-lg font-semibold text-warm-900">
                  {trackingInfo.distanceRemaining}
                </div>
                <div className="text-xs text-gray-500">
                  {routePoints.length} route points
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Driver */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
          >
            <button 
              className="w-full flex items-center space-x-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => toast.success('Calling driver...')}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-600">Contact</div>
                <div className="text-lg font-semibold text-warm-900">
                  Driver
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Last Update with Connection Status */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
            <span>Last updated: {lastUpdate.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}</span>
            {!isOnline && (
              <>
                <span>•</span>
                <span className="text-red-500">Offline mode</span>
              </>
            )}
            {retryCount > 0 && (
              <>
                <span>•</span>
                <span className="text-yellow-600">Retrying connection</span>
              </>
            )}
          </p>
        </div>
      </div>
    </MapErrorBoundary>
  );
};

export default LiveTrackingMap;