import React, { useState } from 'react';
import { User, MapPin, Layers, Maximize, Eye, EyeOff, UserPlus, LogIn, Phone, Shield, Award, Users, TrendingUp, Globe, Leaf, BarChart3, Cloud, Network, CheckCircle, Star, Zap, Target, Lightbulb, ChevronDown } from 'lucide-react';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    pincode: '',
    soilType: '',
    farmSize: '',
    farmUnit: 'acres'
  });

  const soilTypes = [
    'Alluvial Soil', 'Black Soil', 'Red Soil', 'Laterite Soil', 
    'Desert Soil', 'Mountain Soil', 'Saline Soil', 'Peaty Soil'
  ];

  const translations = {
    en: {
      title: "KrishiConnect",
      subtitle: "Smart Agriculture • Data-Driven Farming • Future Ready",
      tagline: "Transforming Indian Agriculture Through Technology",
      signIn: "Sign In",
      register: "Register",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      location: "Location",
      pinCode: "PIN Code",
      soilType: "Soil Type",
      farmSize: "Farm Size",
      signInBtn: "Access Platform",
      registerBtn: "Start Your Journey",
      noAccount: "New to KrishiConnect? ",
      hasAccount: "Already have an account? ",
      registerHere: "Create Account",
      signInHere: "Sign In",
      transforming: "Revolutionary AgriTech Platform",
      revolutionText: "Join thousands of progressive farmers who have increased their yields by 40% using our AI-powered agricultural solutions.",
      aiPowered: "AI-Powered Insights",
      aiDesc: "Machine learning algorithms analyze soil, weather, and crop data for optimal farming decisions",
      marketIntel: "Real-Time Market Data", 
      marketDesc: "Live commodity prices, demand forecasting, and direct market access",
      weatherInsights: "Precision Weather Analytics",
      weatherDesc: "Hyper-local weather predictions with farming-specific advisories",
      expertNetwork: "Expert Community",
      expertDesc: "Connect with agricultural scientists, successful farmers, and industry experts",
      selectSoil: "Select your soil type",
      locationPlaceholder: "Village/City, District, State",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "farmer@krishiconnect.in",
      phonePlaceholder: "+91 98765 43210",
      passwordPlaceholder: "Create secure password",
      confirmPasswordPlaceholder: "Confirm your password",
      trustedBy: "Trusted by 50,000+ farmers across India",
      avgIncrease: "Average 40% yield increase",
      awardWinning: "Award-winning platform",
      secureLogin: "Secure Login",
      whyChoose: "Why Choose KrishiConnect?",
      smartFarming: "Smart Farming Solutions",
      dataAnalytics: "Advanced Data Analytics",
      marketAccess: "Direct Market Access",
      expertSupport: "24/7 Expert Support",
      exploreMore: "Explore More Features",
      scrollForMore: "Scroll for more information"
    },
    hi: {
      title: "कृषिकनेक्ट",
      subtitle: "स्मार्ट कृषि • डेटा-संचालित खेती • भविष्य तैयार",
      tagline: "प्रौद्योगिकी के माध्यम से भारतीय कृषि का रूपांतरण",
      signIn: "साइन इन",
      register: "रजिस्टर",
      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      phoneNumber: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि",
      location: "स्थान",
      pinCode: "पिन कोड",
      soilType: "मिट्टी का प्रकार",
      farmSize: "खेत का आकार",
      signInBtn: "प्लेटफॉर्म एक्सेस करें",
      registerBtn: "अपनी यात्रा शुरू करें",
      noAccount: "कृषिकनेक्ट में नए हैं? ",
      hasAccount: "पहले से खाता है? ",
      registerHere: "खाता बनाएं",
      signInHere: "साइन इन करें",
      transforming: "क्रांतिकारी एग्रीटेक प्लेटफॉर्म",
      revolutionText: "हजारों प्रगतिशील किसानों के साथ जुड़ें जिन्होंने हमारे AI-संचालित कृषि समाधानों का उपयोग करके अपनी उपज में 40% की वृद्धि की है।",
      aiPowered: "AI-संचालित जानकारी",
      aiDesc: "मशीन लर्निंग एल्गोरिदम मिट्टी, मौसम और फसल डेटा का विश्लेषण करके अनुकूल खेती के फैसले लेने में मदद करते हैं",
      marketIntel: "रियल-टाइम मार्केट डेटा",
      marketDesc: "लाइव कमोडिटी प्राइसिंग, डिमांड फोरकास्टिंग और डायरेक्ट मार्केट एक्सेस",
      weatherInsights: "प्रिसिजन मौसम एनालिटिक्स",
      weatherDesc: "हाइपर-लोकल मौसम भविष्यवाणी के साथ खेती-विशिष्ट सलाह",
      expertNetwork: "विशेषज्ञ समुदाय",
      expertDesc: "कृषि वैज्ञानिकों, सफल किसानों और उद्योग विशेषज्ञों से जुड़ें",
      selectSoil: "अपनी मिट्टी का प्रकार चुनें",
      locationPlaceholder: "गांव/शहर, जिला, राज्य",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "किसान@कृषिकनेक्ट.in",
      phonePlaceholder: "+91 98765 43210",
      passwordPlaceholder: "सुरक्षित पासवर्ड बनाएं",
      confirmPasswordPlaceholder: "अपना पासवर्ड पुष्ट करें",
      trustedBy: "भारत भर के 50,000+ किसानों द्वारा विश्वसनीय",
      avgIncrease: "औसतन 40% उपज में वृद्धि",
      awardWinning: "पुरस्कार विजेता प्लेटफॉर्म",
      secureLogin: "सुरक्षित लॉगिन",
      whyChoose: "कृषिकनेक्ट क्यों चुनें?",
      smartFarming: "स्मार्ट फार्मिंग समाधान",
      dataAnalytics: "उन्नत डेटा एनालिटिक्स",
      marketAccess: "प्रत्यक्ष बाजार पहुंच",
      expertSupport: "24/7 विशेषज्ञ सहायता",
      exploreMore: "और सुविधाएं देखें",
      scrollForMore: "अधिक जानकारी के लिए स्क्रॉल करें"
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email });
      alert('Welcome back to KrishiConnect! Dashboard loading...');
    } else {
      console.log('Registration data:', formData);
      alert('Welcome to KrishiConnect! Please check your email to verify your account.');
      setIsLogin(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      location: '',
      pincode: '',
      soilType: '',
      farmSize: '',
      farmUnit: 'acres'
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const scrollToFeatures = () => {
    document.getElementById('features-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJuQDPa1GofJd-dDagUw67_xDSauK3jfnvuA&s)',
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      ></div>
      
      {/* Premium Gradient Overlays */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-emerald-900/80 via-slate-900/60 to-blue-900/80"></div>
      <div className="fixed inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
      
      {/* Floating Particles Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-pulse"></div>
      </div>

      {/* Enhanced Header */}
      <div className="sticky top-0 w-full bg-black/20 backdrop-blur-xl border-b border-white/10 z-50 shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pVwuZSs6a90KcMmmm8FIO3Vv_u_2SqLstA&s" 
                  alt="Smart India Hackathon" 
                  className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              <div className="text-white/90 hidden md:block">
                <span className="font-bold text-sm bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Smart India Hackathon 2025</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
              <Globe className="w-4 h-4 text-white/80" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-gray-800">EN</option>
                <option value="hi" className="bg-gray-800">हिं</option>
              </select>
            </div>
            
            <div className="hidden lg:flex items-center space-x-3 text-white/80">
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">50K+ Farmers</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-500/25 backdrop-blur-sm rounded-full px-3 py-2 border border-emerald-400/40">
                <Award className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-medium text-emerald-200">Award Winner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        
        {/* Hero Section - Optimized Height */}
        <div className="h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md lg:max-w-7xl">
            
            {/* Compact Title Section */}
            <div className="text-center mb-8 lg:mb-12">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-teal-400/20 rounded-xl blur-lg animate-pulse"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 rounded-xl shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                  <Leaf className="w-8 h-8 lg:w-10 lg:h-10 text-white animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-emerald-100/90 font-medium mb-3 tracking-wide">
                {t.subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                {t.tagline}
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
                <div className="group flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:scale-105">
                  <Star className="w-4 h-4 text-yellow-400 fill-current group-hover:animate-spin" />
                  <span className="text-white font-bold text-sm">{t.trustedBy}</span>
                </div>
                <div className="group flex items-center space-x-2 bg-emerald-500/25 backdrop-blur-md rounded-full px-4 py-2 border border-emerald-400/40 hover:bg-emerald-500/35 transition-all duration-300 shadow-lg hover:scale-105">
                  <TrendingUp className="w-4 h-4 text-emerald-300 group-hover:animate-bounce" />
                  <span className="text-emerald-100 font-bold text-sm">{t.avgIncrease}</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid - Optimized */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 overflow-hidden lg:grid lg:grid-cols-2 min-h-[65vh] hover:bg-white/15 transition-all duration-500">
              
              {/* Info Panel - Compact */}
              <div className="hidden lg:flex flex-col justify-center p-8 xl:p-12 bg-gradient-to-br from-emerald-600/95 via-teal-700/95 to-blue-700/95 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                
                <div className="relative z-10 text-white">
                  <div className="mb-8">
                    <h2 className="text-3xl xl:text-4xl font-black mb-4 leading-tight bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent">
                      {t.transforming}
                    </h2>
                    <p className="text-lg xl:text-xl opacity-90 leading-relaxed font-light">
                      {t.revolutionText}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="group flex items-start space-x-4 bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg">
                      <div className="w-12 h-12 bg-emerald-400/30 rounded-xl flex items-center justify-center border border-emerald-300/50 group-hover:animate-pulse flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-emerald-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-emerald-100">{t.aiPowered}</h3>
                        <p className="opacity-90 leading-relaxed text-sm">{t.aiDesc}</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-start space-x-4 bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg">
                      <div className="w-12 h-12 bg-teal-400/30 rounded-xl flex items-center justify-center border border-teal-300/50 group-hover:animate-pulse flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-teal-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-teal-100">{t.marketIntel}</h3>
                        <p className="opacity-90 leading-relaxed text-sm">{t.marketDesc}</p>
                      </div>
                    </div>
                    
                    <div className="group flex items-start space-x-4 bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg">
                      <div className="w-12 h-12 bg-blue-400/30 rounded-xl flex items-center justify-center border border-blue-300/50 group-hover:animate-pulse flex-shrink-0">
                        <Cloud className="w-6 h-6 text-blue-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-blue-100">{t.weatherInsights}</h3>
                        <p className="opacity-90 leading-relaxed text-sm">{t.weatherDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Section - Optimized */}
              <div className="p-6 lg:p-8 xl:p-10 bg-white/15 backdrop-blur-xl relative">
                <div className="relative z-10">
                  {/* Security Badge - Compact */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-2 bg-green-500/25 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/40 shadow-lg">
                      <Shield className="w-4 h-4 text-green-300 animate-pulse" />
                      <span className="text-green-100 font-bold text-sm">{t.secureLogin}</span>
                    </div>
                  </div>

                  {/* Enhanced Tab Navigation */}
                  <div className="flex bg-white/15 backdrop-blur-sm rounded-xl mb-6 p-1 shadow-lg border border-white/20">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-3 px-6 font-bold transition-all duration-300 rounded-lg text-base ${
                        isLogin 
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white shadow-xl transform scale-[1.02] border border-white/20' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <LogIn className="w-4 h-4 inline mr-2" />
                      {t.signIn}
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-3 px-6 font-bold transition-all duration-300 rounded-lg text-base ${
                        !isLogin 
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white shadow-xl transform scale-[1.02] border border-white/20' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <UserPlus className="w-4 h-4 inline mr-2" />
                      {t.register}
                    </button>
                  </div>

                  {/* Optimized Form Fields */}
                  <div className={`${!isLogin ? 'sm:grid sm:grid-cols-2 sm:gap-4 space-y-4 sm:space-y-0' : 'space-y-4'}`}>
                    {!isLogin && (
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-white/90 mb-2">
                          <User className="w-4 h-4 inline mr-2 text-emerald-400" />
                          {t.fullName}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required={!isLogin}
                          placeholder={t.namePlaceholder}
                          className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                        />
                      </div>
                    )}

                    <div className={!isLogin ? 'sm:col-span-1' : ''}>
                      <label className="block text-sm font-bold text-white/90 mb-2">
                        {t.emailAddress}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                      />
                    </div>

                    {!isLogin && (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-white/90 mb-2">
                            <Phone className="w-4 h-4 inline mr-2 text-emerald-400" />
                            {t.phoneNumber}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required={!isLogin}
                            placeholder={t.phonePlaceholder}
                            className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-white/90 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2 text-emerald-400" />
                            {t.location}
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required={!isLogin}
                            placeholder={t.locationPlaceholder}
                            className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-white/90 mb-2">
                            {t.pinCode}
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required={!isLogin}
                            placeholder="123456"
                            pattern="[0-9]{6}"
                            maxLength="6"
                            className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-white/90 mb-2">
                            <Layers className="w-4 h-4 inline mr-2 text-emerald-400" />
                            {t.soilType}
                          </label>
                          <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleInputChange}
                            required={!isLogin}
                            className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white font-medium text-sm shadow-lg hover:bg-white/20"
                          >
                            <option value="" className="bg-gray-800 text-gray-200">{t.selectSoil}</option>
                            {soilTypes.map((soil) => (
                              <option key={soil} value={soil} className="bg-gray-800 text-gray-200">{soil}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-white/90 mb-2">
                            <Maximize className="w-4 h-4 inline mr-2 text-emerald-400" />
                            {t.farmSize}
                          </label>
                          <div className="flex space-x-3">
                            <input
                              type="number"
                              name="farmSize"
                              value={formData.farmSize}
                              onChange={handleInputChange}
                              required={!isLogin}
                              placeholder="5"
                              min="0"
                              step="0.1"
                              className="flex-1 px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                            />
                            <select
                              name="farmUnit"
                              value={formData.farmUnit}
                              onChange={handleInputChange}
                              className="px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white font-medium text-sm min-w-[100px] shadow-lg hover:bg-white/20"
                            >
                              <option value="acres" className="bg-gray-800 text-gray-200">Acres</option>
                              <option value="hectares" className="bg-gray-800 text-gray-200">Hectares</option>
                              <option value="bigha" className="bg-gray-800 text-gray-200">Bigha</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className={!isLogin ? 'sm:col-span-1' : ''}>
                      <label className="block text-sm font-bold text-white/90 mb-2">
                        {t.password}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder={t.passwordPlaceholder}
                          className="w-full px-4 py-3 pr-12 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-emerald-400 transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-bold text-white/90 mb-2">
                          {t.confirmPassword}
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required={!isLogin}
                          placeholder={t.confirmPasswordPlaceholder}
                          className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/60 font-medium text-sm shadow-lg hover:bg-white/20"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => window.location.href = "https://dashboard-eight-red.vercel.app"}
                      className={`${!isLogin ? 'sm:col-span-2' : ''} w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-8 rounded-lg font-bold text-base transition-all transform hover:scale-105 hover:shadow-xl shadow-lg border border-white/20 backdrop-blur-sm mt-6 group`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 group-hover:animate-spin" />
                        <span>{isLogin ? t.signInBtn : t.registerBtn}</span>
                      </div>
                    </button>
                  </div>

                  {/* Enhanced Footer */}
                  <div className="mt-6 space-y-4">
                    <div className="text-center">
                      <span className="text-white/70 text-sm">{isLogin ? t.noAccount : t.hasAccount}</span>
                      <button
                        onClick={toggleMode}
                        className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors ml-2 text-sm hover:underline"
                      >
                        {isLogin ? t.registerHere : t.signInHere}
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/60">
                        <div className="flex items-center space-x-2 hover:text-white transition-colors">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium text-xs">Smart India Hackathon 2025</span>
                        </div>
                        <div className="flex items-center space-x-2 hover:text-white transition-colors">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span className="font-medium text-xs">256-bit SSL Encryption</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-8">
              <button 
                onClick={scrollToFeatures}
                className="group flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm font-medium">{t.exploreMore}</span>
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/25">
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Features Section - Scrollable */}
        <div id="features-section" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                  {t.whyChoose}
                </span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Discover the cutting-edge features that make KrishiConnect the preferred choice for modern farmers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-emerald-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/40 group-hover:animate-pulse">
                  <Zap className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.smartFarming}</h3>
                <p className="text-white/70 font-medium leading-relaxed text-sm">AI-powered recommendations for optimal crop management and resource utilization</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-teal-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-400/40 group-hover:animate-pulse">
                  <BarChart3 className="w-6 h-6 text-teal-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.dataAnalytics}</h3>
                <p className="text-white/70 font-medium leading-relaxed text-sm">Comprehensive data analysis for informed decision making and yield optimization</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-blue-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-400/40 group-hover:animate-pulse">
                  <Target className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.marketAccess}</h3>
                <p className="text-white/70 font-medium leading-relaxed text-sm">Connect directly with buyers and get the best prices for your agricultural products</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-violet-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-violet-400/40 group-hover:animate-pulse">
                  <Lightbulb className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t.expertSupport}</h3>
                <p className="text-white/70 font-medium leading-relaxed text-sm">Round-the-clock support from agricultural experts and technical specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white/15 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-emerald-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/40 group-hover:animate-bounce">
                  <Users className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">50,000+</h3>
                <p className="text-white/80 font-bold">Active Farmers</p>
                <p className="text-white/60 text-xs mt-1">Growing community nationwide</p>
              </div>
              
              <div className="group bg-white/15 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-teal-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-teal-400/40 group-hover:animate-bounce">
                  <TrendingUp className="w-6 h-6 text-teal-300" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-teal-300 to-teal-100 bg-clip-text text-transparent">40%</h3>
                <p className="text-white/80 font-bold">Yield Increase</p>
                <p className="text-white/60 text-xs mt-1">Average improvement rate</p>
              </div>
              
              <div className="group bg-white/15 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-blue-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-400/40 group-hover:animate-bounce">
                  <BarChart3 className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">₹2.5L</h3>
                <p className="text-white/80 font-bold">Average Income Boost</p>
                <p className="text-white/60 text-xs mt-1">Annual additional earnings</p>
              </div>
              
              <div className="group bg-white/15 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-violet-500/25 rounded-xl flex items-center justify-center mx-auto mb-4 border border-violet-400/40 group-hover:animate-bounce">
                  <Award className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-violet-300 to-violet-100 bg-clip-text text-transparent">15+</h3>
                <p className="text-white/80 font-bold">Awards Won</p>
                <p className="text-white/60 text-xs mt-1">Industry recognition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                Farming Future?
              </span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Join thousands of successful farmers who have revolutionized their agricultural practices with KrishiConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setIsLogin(false)}
                className="group bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-10 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-xl shadow-lg border border-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 group-hover:animate-spin" />
                  <span>Get Started Now</span>
                </div>
              </button>
              <button 
                onClick={() => setIsLogin(true)}
                className="group bg-white/15 hover:bg-white/25 text-white py-4 px-10 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg border border-white/30 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2">
                  <LogIn className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Sign In</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
