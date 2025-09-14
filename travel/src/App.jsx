import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  MapPin, Clock, Navigation, Wifi, WifiOff, RefreshCw, Bus, Users, Route, Menu, X, Search, Star,
  AlertCircle, CheckCircle, Bell, BellRing, User, ThumbsUp, MessageCircle, StarHalf
} from 'lucide-react';
import './App.css'; // extra styles for seat grid and modal

const BusTrackingApp = () => {
  const [buses, setBuses] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favoriteRoutes, setFavoriteRoutes] = useState(['12A', '8C']);
  const [notifications, setNotifications] = useState([]);
  
  // New state for enhanced features
  const [showNotifications, setShowNotifications] = useState(false);
  const [busRatings, setBusRatings] = useState({});
  const [userAlerts, setUserAlerts] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [ratingData, setRatingData] = useState({ driver: 5, cleanliness: 5, punctuality: 5, comment: '' });
  const [reminders, setReminders] = useState({}); // busId -> timeoutId
  const notifPermissionAsked = useRef(false);

  // Generate seat layout function
  function generateSeatLayout(totalSeats, occupancyPercent) {
    const seats = [];
    const occupiedSeats = Math.floor((totalSeats * occupancyPercent) / 100);
    const reservedSeats = Math.floor(totalSeats * 0.1); // 10% reserved
    
    for (let i = 0; i < totalSeats; i++) {
      if (i < occupiedSeats) {
        seats.push('occupied');
      } else if (i < occupiedSeats + reservedSeats) {
        seats.push('reserved');
      } else {
        seats.push('empty');
      }
    }
    
    // Shuffle to make it more realistic
    return seats.sort(() => Math.random() - 0.5);
  }

  // Enhanced mock data with seat layouts and ratings
  const mockBusData = [
    {
      id: 'B001',
      routeNumber: '12A',
      routeName: 'City Center ↔ Railway Station',
      currentLocation: 'Main Market Square',
      nextStops: ['Central Plaza (2 min)', 'Railway Station (8 min)'],
      estimatedArrival: 8,
      occupancy: 'Medium',
      occupancyPercent: 65,
      lat: 26.8467,
      lng: 80.9462,
      status: 'On Time',
      busNumber: 'UP-32-AB-1234',
      driver: 'Ramesh Kumar',
      fare: '₹15',
      rating: 4.2,
      totalRatings: 156,
      seatLayout: generateSeatLayout(40, 65), // 40 seats, 65% occupied
      amenities: ['AC', 'WiFi', 'USB Charging']
    },
    {
      id: 'B002',
      routeNumber: '15B',
      routeName: 'Hospital ↔ University',
      currentLocation: 'Medical College Gate',
      nextStops: ['City Hospital (5 min)', 'University Gate (12 min)'],
      estimatedArrival: 12,
      occupancy: 'High',
      occupancyPercent: 85,
      lat: 26.8567,
      lng: 80.9562,
      status: 'Delayed',
      busNumber: 'UP-32-CD-5678',
      driver: 'Suresh Yadav',
      fare: '₹20',
      rating: 3.8,
      totalRatings: 203,
      seatLayout: generateSeatLayout(45, 85), // 45 seats, 85% occupied
      amenities: ['AC', 'CCTV']
    },
    {
      id: 'B003',
      routeNumber: '8C',
      routeName: 'Bus Stand ↔ Shopping Mall',
      currentLocation: 'Police Station Chowk',
      nextStops: ['Town Hall (3 min)', 'Shopping Mall (5 min)'],
      estimatedArrival: 5,
      occupancy: 'Low',
      occupancyPercent: 35,
      lat: 26.8367,
      lng: 80.9362,
      status: 'On Time',
      busNumber: 'UP-32-EF-9012',
      driver: 'Vijay Singh',
      fare: '₹12',
      rating: 4.5,
      totalRatings: 89,
      seatLayout: generateSeatLayout(35, 35), // 35 seats, 35% occupied
      amenities: ['WiFi', 'USB Charging', 'Music System']
    },
    {
      id: 'B004',
      routeNumber: '22D',
      routeName: 'Airport ↔ Downtown',
      currentLocation: 'Airport Road Junction',
      nextStops: ['Business District (10 min)', 'Downtown (15 min)'],
      estimatedArrival: 15,
      occupancy: 'Medium',
      occupancyPercent: 50,
      lat: 26.8667,
      lng: 80.9662,
      status: 'On Time',
      busNumber: 'UP-32-GH-3456',
      driver: 'Amit Sharma',
      fare: '₹25',
      rating: 4.0,
      totalRatings: 127,
      seatLayout: generateSeatLayout(50, 50), // 50 seats, 50% occupied
      amenities: ['AC', 'WiFi', 'CCTV', 'GPS']
    }
  ];

  const routes = [
    { id: 'all', name: 'All Routes', count: mockBusData.length },
    { id: '12A', name: 'City Center ↔ Railway', count: 1 },
    { id: '15B', name: 'Hospital ↔ University', count: 1 },
    { id: '8C', name: 'Bus Stand ↔ Mall', count: 1 },
    { id: '22D', name: 'Airport ↔ Downtown', count: 1 }
  ];

  // Smart alerts system
  useEffect(() => {
    const checkAlerts = () => {
      const newNotifications = [];
      
      buses.forEach(bus => {
        // Arrival alerts
        if (bus.estimatedArrival <= 5 && bus.estimatedArrival > 3) {
          newNotifications.push({
            id: `arrival-${bus.id}`,
            type: 'arrival',
            title: 'Bus Arriving Soon!',
            message: `Bus ${bus.routeNumber} arriving in ${bus.estimatedArrival} minutes`,
            busId: bus.id,
            timestamp: new Date()
          });
        }

        // Delay alerts
        if (bus.status === 'Delayed') {
          newNotifications.push({
            id: `delay-${bus.id}`,
            type: 'delay',
            title: 'Bus Delayed',
            message: `Bus ${bus.routeNumber} is running late`,
            busId: bus.id,
            timestamp: new Date()
          });
        }

        // Overcrowded alerts
        if (bus.occupancyPercent > 80) {
          newNotifications.push({
            id: `crowd-${bus.id}`,
            type: 'crowd',
            title: 'High Occupancy Alert',
            message: `Bus ${bus.routeNumber} is ${bus.occupancyPercent}% full`,
            busId: bus.id,
            timestamp: new Date()
          });
        }
      });

      if (newNotifications.length > 0) {
        setNotifications(prev => {
          const existingIds = prev.map(n => n.id);
          const uniqueNew = newNotifications.filter(n => !existingIds.includes(n.id));
          return [...prev, ...uniqueNew].slice(-10); // Keep only last 10
        });
      }
    };

    const interval = setInterval(checkAlerts, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [buses]);

  // Request notification permission once when user tries to set a reminder
  const requestNotificationPermission = async () => {
    if (notifPermissionAsked.current) return;
    notifPermissionAsked.current = true;
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (e) {
        // ignore
      }
    }
  };

  // Simple function to show a browser notification (if allowed) and in-app notification
  const showBrowserNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    // also push to in-app notifications list
    setNotifications(prev => [...prev, {
      id: `local-${Date.now()}`,
      type: 'info',
      title,
      message: body,
      timestamp: new Date()
    }].slice(-10));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        setBuses(prevBuses => 
          mockBusData.map(bus => ({
            ...bus,
            estimatedArrival: Math.max(1, bus.estimatedArrival + Math.floor(Math.random() * 3) - 1),
            lat: bus.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.lng + (Math.random() - 0.5) * 0.001,
            occupancyPercent: Math.min(95, Math.max(20, bus.occupancyPercent + Math.floor(Math.random() * 10) - 5)),
            seatLayout: generateSeatLayout(bus.seatLayout.length, Math.min(95, Math.max(20, bus.occupancyPercent + Math.floor(Math.random() * 10) - 5)))
          }))
        );
        setLastUpdate(new Date());
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOnline]);

  useEffect(() => {
    setBuses(mockBusData);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      setBuses(mockBusData);
      setLastUpdate(new Date());
      setLoading(false);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        title: 'Data Updated',
        message: 'Bus locations updated successfully',
        timestamp: new Date()
      }]);
    }, 1500);
  }, []);

  const toggleFavorite = (routeNumber) => {
    setFavoriteRoutes(prev => 
      prev.includes(routeNumber) 
        ? prev.filter(r => r !== routeNumber)
        : [...prev, routeNumber]
    );
  };

  const submitRating = (busId) => {
    setBusRatings(prev => ({
      ...prev,
      [busId]: {
        ...ratingData,
        timestamp: new Date()
      }
    }));
    
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Rating Submitted',
      message: 'Thank you for your feedback!',
      timestamp: new Date()
    }]);
    
    setShowRatingModal(null);
    setRatingData({ driver: 5, cleanliness: 5, punctuality: 5, comment: '' });
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getOccupancyDetails = (occupancy, percent) => {
    if (percent < 40) return { color: 'bg-green-400', text: 'Comfortable', textColor: 'text-green-700' };
    if (percent < 70) return { color: 'bg-amber-400', text: 'Moderate', textColor: 'text-amber-700' };
    return { color: 'bg-red-400', text: 'Crowded', textColor: 'text-red-700' };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Time': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Delayed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeatColor = (seatStatus) => {
    switch (seatStatus) {
      case 'empty': return 'seat-empty';
      case 'reserved': return 'seat-reserved';
      case 'occupied': return 'seat-occupied';
      default: return 'seat-empty';
    }
  };

  const renderStarRating = (rating, size = 'h-4 w-4') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={`${size} text-amber-400 fill-current`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className={`${size} text-amber-400 fill-current`} />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${size} text-gray-300`} />);
    }
    
    return stars;
  };

  const filteredBuses = buses.filter(bus => {
    const matchesRoute = selectedRoute === 'all' || bus.routeNumber === selectedRoute;
    const matchesSearch = searchQuery === '' || 
      bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoute && matchesSearch;
  });

  // Reminder system: schedule a reminder for a bus arrival
  const scheduleReminder = async (bus, minutesBefore = 1) => {
    await requestNotificationPermission();

    // clear existing reminder for bus if any
    if (reminders[bus.id]) {
      clearTimeout(reminders[bus.id]);
      setReminders(prev => {
        const copy = { ...prev };
        delete copy[bus.id];
        return copy;
      });
    }

    // time until arrival in ms
    const arrivalMs = Math.max(0, (bus.estimatedArrival - minutesBefore) * 60 * 1000);

    // if arrival time already passed or immediate, show notification now
    if (arrivalMs <= 0) {
      showBrowserNotification(`Bus ${bus.routeNumber} arriving soon`, `${bus.routeName} is arriving in ${bus.estimatedArrival} minutes`);
      return;
    }

    const timeoutId = setTimeout(() => {
      showBrowserNotification(`Reminder: Bus ${bus.routeNumber}`, `${bus.routeName} arriving in ${minutesBefore} minute(s)`);
      setReminders(prev => {
        const copy = { ...prev };
        delete copy[bus.id];
        return copy;
      });
    }, arrivalMs);

    setReminders(prev => ({ ...prev, [bus.id]: timeoutId }));

    setNotifications(prev => [...prev, {
      id: `reminder-set-${bus.id}-${Date.now()}`,
      type: 'success',
      title: 'Reminder Set',
      message: `You will be notified ${minutesBefore} minute(s) before Bus ${bus.routeNumber} arrives.`,
      timestamp: new Date()
    }].slice(-10));
  };

  const cancelReminder = (busId) => {
    if (reminders[busId]) {
      clearTimeout(reminders[busId]);
      setReminders(prev => {
        const copy = { ...prev };
        delete copy[busId];
        return copy;
      });
      setNotifications(prev => [...prev, {
        id: `reminder-canceled-${busId}-${Date.now()}`,
        type: 'info',
        title: 'Reminder Cancelled',
        message: `Reminder for bus ${busId} cancelled.`,
        timestamp: new Date()
      }].slice(-10));
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Bus className="h-6 w-6" />
            <h1 className="text-xl font-bold">SmartBus</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-blue-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Connection Status */}
        <div className={`p-3 flex-shrink-0 ${isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <div className="flex items-center space-x-2">
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <span className="text-sm font-medium">
              {isOnline ? 'Connected' : 'Offline Mode'}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search routes or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        {/* Route Filter */}
        <div className="px-4 pb-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Routes</h3>
          <div className="space-y-1">
            {routes.map(route => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedRoute === route.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{route.name}</span>
                  {favoriteRoutes.includes(route.id) && route.id !== 'all' && (
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                  )}
                </div>
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                  {route.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-gray-700">Live Bus Tracking</h2>
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>

              <div className="lg:hidden">
                <div className="flex items-center space-x-2">
                  <Bus className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-gray-700">SmartBus</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {isOnline ? 'Live' : 'Offline'}
              </div>
              
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative"
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {notifications.length}
                    </div>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    notification.type === 'arrival' ? 'bg-blue-500' :
                                    notification.type === 'delay' ? 'bg-red-500' :
                                    notification.type === 'crowd' ? 'bg-amber-500' :
                                    'bg-green-500'
                                  }`} />
                                  <span className="font-medium text-sm">{notification.title}</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                              <button
                                onClick={() => clearNotification(notification.id)}
                                className="text-gray-400 hover:text-gray-600 ml-2"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={refreshData}
                disabled={loading}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Bus List - Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-none">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Buses</p>
                    <p className="text-2xl font-bold text-gray-700">{filteredBuses.length}</p>
                  </div>
                  <Bus className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">On Time</p>
                    <p className="text-2xl font-bold text-green-600">
                      {filteredBuses.filter(b => b.status === 'On Time').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Delayed</p>
                    <p className="text-2xl font-bold text-red-600">
                      {filteredBuses.filter(b => b.status === 'Delayed').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg Wait</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(filteredBuses.reduce((sum, bus) => sum + bus.estimatedArrival, 0) / filteredBuses.length || 0)}m
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Bus Cards */}
            <div className="space-y-4 pb-6">
              {filteredBuses.map(bus => {
                const occupancyDetails = getOccupancyDetails(bus.occupancy, bus.occupancyPercent);
                
                return (
                  <div key={bus.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-blue-500 text-white px-3 py-1 rounded-md font-bold text-lg">
                              {bus.routeNumber}
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(bus.status)}
                              <span className={`font-medium ${
                                bus.status === 'On Time' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {bus.status}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleFavorite(bus.routeNumber)}
                              className="p-1 hover:bg-white rounded-full transition-colors"
                            >
                              <Star className={`h-4 w-4 ${
                                favoriteRoutes.includes(bus.routeNumber)
                                  ? 'text-amber-400 fill-current'
                                  : 'text-gray-300'
                              }`} />
                            </button>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-1">{bus.routeName}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">Bus: {bus.busNumber} • Driver: {bus.driver}</p>
                            
                            {/* Bus Rating */}
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {renderStarRating(bus.rating)}
                                <span className="text-sm font-medium text-gray-600">
                                  {bus.rating} ({bus.totalRatings})
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="bg-white rounded-md px-4 py-2 shadow-sm border border-gray-100">
                            <div className="text-3xl font-bold text-blue-500">{bus.estimatedArrival}</div>
                            <div className="text-sm text-gray-400">minutes</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Current Location */}
                        <div className="bg-gray-50 rounded-md p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-500">Current Location</span>
                          </div>
                          <p className="font-semibold text-gray-700">{bus.currentLocation}</p>
                        </div>

                        {/* Occupancy */}
                        <div className="bg-gray-50 rounded-md p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-500">Occupancy</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${occupancyDetails.color}`}
                                style={{ width: `${bus.occupancyPercent}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${occupancyDetails.textColor}`}>
                              {occupancyDetails.text} ({bus.occupancyPercent}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Seat layout + amenities + actions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Seat Layout Grid */}
                        <div className="bg-white rounded-md p-3 border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-500">Seat Map</span>
                            </div>
                            <div className="text-xs text-gray-400">Total: {bus.seatLayout.length}</div>
                          </div>

                          <div className="seat-grid" aria-hidden>
                            {bus.seatLayout.map((s, idx) => (
                              <div
                                key={idx}
                                className={`seat-cell ${getSeatColor(s)}`}
                                title={`Seat ${idx + 1} — ${s}`}
                              />
                            ))}
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                              <div className="legend-box seat-empty" /> <span>Empty</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="legend-box seat-reserved" /> <span>Reserved</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="legend-box seat-occupied" /> <span>Occupied</span>
                            </div>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-md p-3 border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Route className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-500">Amenities</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bus.amenities.map((a, i) => (
                              <div key={i} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">{a}</div>
                            ))}
                          </div>

                          <div className="mt-3 text-sm text-gray-500">
                            Fare: <span className="font-semibold text-gray-700">{bus.fare}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-md p-3 border flex flex-col justify-between">
                          <div>
                            <button
                              onClick={() => setShowRatingModal(bus.id)}
                              className="w-full mb-2 px-3 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white font-medium"
                            >
                              Rate this trip
                            </button>

                            {reminders[bus.id] ? (
                              <button
                                onClick={() => cancelReminder(bus.id)}
                                className="w-full mb-2 px-3 py-2 rounded-md border border-gray-200 text-gray-700"
                              >
                                Cancel Reminder
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => scheduleReminder(bus, 1)}
                                  className="flex-1 mb-2 px-3 py-2 rounded-md border border-gray-200 text-gray-700"
                                >
                                  Remind 1m before
                                </button>
                                <button
                                  onClick={() => scheduleReminder(bus, 5)}
                                  className="flex-1 mb-2 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                  Remind 5m before
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => {
                                // quick feedback thumb
                                setNotifications(prev => [...prev, {
                                  id: `thumb-${Date.now()}`,
                                  type: 'info',
                                  title: 'Thanks!',
                                  message: `Thanks for your feedback on bus ${bus.routeNumber}`,
                                  timestamp: new Date()
                                }].slice(-10));
                              }}
                              className="w-full px-3 py-2 rounded-md border border-gray-200 text-gray-700"
                            >
                              <ThumbsUp className="inline-block mr-2" /> Quick Feedback
                            </button>
                          </div>

                          <div className="mt-3 text-xs text-gray-400">
                            Last updated: {lastUpdate.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="modal-backdrop">
          <div className="rating-modal">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Rate your trip - {showRatingModal}</h3>
                <button onClick={() => setShowRatingModal(null)} className="text-gray-400 hover:text-gray-600">
                  <X />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Driver (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={ratingData.driver}
                  onChange={(e) => setRatingData(prev => ({ ...prev, driver: Number(e.target.value) }))}
                />
                <div className="text-sm text-gray-700">Value: {ratingData.driver}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Cleanliness (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={ratingData.cleanliness}
                  onChange={(e) => setRatingData(prev => ({ ...prev, cleanliness: Number(e.target.value) }))}
                />
                <div className="text-sm text-gray-700">Value: {ratingData.cleanliness}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Punctuality (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={ratingData.punctuality}
                  onChange={(e) => setRatingData(prev => ({ ...prev, punctuality: Number(e.target.value) }))}
                />
                <div className="text-sm text-gray-700">Value: {ratingData.punctuality}</div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Comment</label>
                <textarea
                  rows="3"
                  className="w-full border rounded p-2"
                  value={ratingData.comment}
                  onChange={(e) => setRatingData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Anything to add?"
                />
              </div>
            </div>

            <div className="p-4 border-t flex justify-end space-x-2">
              <button onClick={() => setShowRatingModal(null)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={() => submitRating(showRatingModal)} className="px-4 py-2 rounded bg-blue-600 text-white">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusTrackingApp;
