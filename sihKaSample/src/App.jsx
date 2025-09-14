import React, { useState, useEffect, useCallback } from 'react';
import "./app.css"; 
import { MapPin, Clock, Navigation, Wifi, WifiOff, RefreshCw, Bus, Users, Route, Menu, X, Search, Star, AlertCircle, CheckCircle } from 'lucide-react';

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

  // Enhanced mock data with more realistic information
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
      fare: '₹15'
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
      fare: '₹20'
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
      fare: '₹12'
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
      fare: '₹25'
    }
  ];

  const routes = [
    { id: 'all', name: 'All Routes', count: mockBusData.length },
    { id: '12A', name: 'City Center ↔ Railway', count: 1 },
    { id: '15B', name: 'Hospital ↔ University', count: 1 },
    { id: '8C', name: 'Bus Stand ↔ Mall', count: 1 },
    { id: '22D', name: 'Airport ↔ Downtown', count: 1 }
  ];

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
            occupancyPercent: Math.min(95, Math.max(20, bus.occupancyPercent + Math.floor(Math.random() * 10) - 5))
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
        message: 'Bus locations updated',
        type: 'success'
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

  const filteredBuses = buses.filter(bus => {
    const matchesRoute = selectedRoute === 'all' || bus.routeNumber === selectedRoute;
    const matchesSearch = searchQuery === '' || 
      bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoute && matchesSearch;
  });

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
                          <p className="text-gray-500 text-sm">Bus: {bus.busNumber} • Driver: {bus.driver}</p>
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

                      {/* Next Stops */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Route className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-gray-600">Next Stops</span>
                        </div>
                        <div className="space-y-2">
                          {bus.nextStops.map((stop, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-md">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="text-gray-600 font-medium">{stop}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-medium">
                          Track on Map
                        </button>
                        <button className="flex-1 border border-blue-500 text-blue-500 py-3 rounded-md hover:bg-blue-50 transition-colors font-medium">
                          Set Alert
                        </button>
                        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md font-bold text-center border border-green-200">
                          {bus.fare}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredBuses.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                  <Bus className="h-16 w-16 mx-auto mb-4 text-gray-200" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No buses found</h3>
                  <p className="text-gray-400">
                    {searchQuery 
                      ? `No buses match "${searchQuery}"`
                      : `No buses available for ${routes.find(r => r.id === selectedRoute)?.name}`
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-3 text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTrackingApp;