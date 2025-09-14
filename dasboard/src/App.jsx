import './App.css';
import React, { useState, useEffect } from 'react';
import { Search, User, Award, Target, BarChart3, Activity, XCircle, Mail, Phone, MapPin, AlertCircle, Download, Filter, TrendingUp, Calendar, Users, BookOpen, Trophy, Star, Eye, ChevronRight, Home, Settings, Bell, LogOut, Clock, CheckCircle, Play, Zap, Globe, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const AdvancedEcoLearnDashboard = () => {
  // State Management
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [animationKey, setAnimationKey] = useState(0);

  // Generate Default Avatar SVG based on gender
  const generateAvatar = (seed, gender) => {
    // URL for the provided male avatar
    const maleAvatarUrl = "https://placehold.co/150x150/b6e3f4/282a36?text=🧑‍🦱";
    
    // Use the provided image for male students
    if (gender === 'male') {
      return maleAvatarUrl;
    }
    
    // For female students, use the existing DiceBear API to maintain variety
    const femaleAvatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=c0aede,b6e3f4,ffd5dc,d1d4f9,ffdfbf&features=glasses,bandana,beanie&size=150&mouth=smile,laugh&hair=straight,long&face=eyes`;
    return femaleAvatarUrl;
  };

  // List of Indian Student Names
  const maleNames = ["Arjun Sharma", "Rohan Kumar", "Vikash Yadav", "Aditya Singh", "Rahul Verma", "Ankit Gupta", "Deepak Mishra", "Harsh Agarwal", "Karan Joshi", "Nitin Pandey", "Saurabh Tiwari", "Vaibhav Shukla", "Manish Dubey", "Ravi Chandra", "Sumit Kashyap", "Tushar Bhatt", "Vivek Srivastava", "Yash Tripathi", "Dev Patel", "Gaurav Saxena", "Hardik Shah", "Inder Malhotra", "Jay Kapoor", "Kiran Thakur", "Laksh Singh", "Meet Sharma", "Naveen Kumar", "Om Gupta", "Parth Verma", "Qadir Khan", "Rocky Yadav"];
  const femaleNames = ["Priya Patel", "Sneha Singh", "Ananya Sharma", "Kavya Verma", "Riya Gupta", "Pooja Mishra", "Shruti Agarwal", "Neha Joshi", "Anjali Pandey", "Simran Tiwari", "Ishika Shukla", "Divya Dubey", "Kritika Chandra", "Shweta Kashyap", "Tanvi Bhatt", "Meera Srivastava", "Nidhi Tripathi", "Aarti Patel", "Bhavna Saxena", "Chhavi Shah", "Deepika Malhotra", "Ekta Kapoor", "Fatima Khan", "Garima Thakur", "Hina Verma", "Ira Gupta", "Jiya Singh", "Kareena Sharma", "Lavanya Kumar", "Maya Patel", "Naina Joshi"];

  // Generate Complete Students Database
  const generateStudentsDatabase = () => {
    const students = [];
    let studentId = 1;
    for (let grade = 5; grade <= 12; grade++) {
      ['A', 'B'].forEach((section) => {
        const className = `Class ${grade}-${section}`;
        // Create 12 students for each class-section (6 male, 6 female)
        for (let i = 0; i < 12; i++) {
          const isMale = i < 6;
          const nameArray = isMale ? maleNames : femaleNames;
          const nameIndex = (studentId + i) % nameArray.length;
          const name = nameArray[nameIndex];
          const gender = isMale ? 'male' : 'female';
          const avatar = generateAvatar(name.toLowerCase().replace(' ', '-'), gender);

          const basePoints = 150 + Math.floor(Math.random() * 350);
          const gradeBonus = (grade - 4) * 15;

          // Added new fields for student contact and joined information
          const joinedDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
          const randomJoinedDate = new Date(joinedDate.getTime() + Math.random() * (new Date().getTime() - joinedDate.getTime()));
          const student = {
            id: studentId++,
            name: name,
            class: className,
            grade: grade,
            section: section,
            gender: gender,
            totalEcoPoints: basePoints + gradeBonus + Math.floor(Math.random() * 80),
            profilePicture: avatar,
            achievements: generateAchievements(),
            weeklyProgress: generateWeeklyProgress(),
            subjects: generateSubjectPerformance(),
            recentActivity: generateRecentActivity(),
            weeklyGrowth: Math.floor(Math.random() * 50) + 10,
            quizPerformance: generateQuizPerformance(),
            gamePerformance: generateGamePerformance(),
            // New student contact and joined data
            email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@greenfieldschool.org`,
            phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            address: ["123, Gandhi Road, New Delhi", "456, Nehru Nagar, Mumbai", "789, Patel Street, Bangalore", "101, Subhash Marg, Chennai", "202, Shastri Lane, Kolkata"][Math.floor(Math.random() * 5)],
            joinedDate: randomJoinedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          };
          students.push(student);
        }
      });
    }
    return students.sort((a, b) => b.totalEcoPoints - a.totalEcoPoints);
  };

  // Generate Achievements
  const generateAchievements = () => {
    const allAchievements = ["🌱 Eco Warrior", "🧠 Quiz Master", "🌳 Tree Guardian", "💧 Water Saver", "⚡ Energy Efficient", "🚫 Pollution Fighter", "💡 Green Innovator", "🌍 Climate Champion", "♻️ Recycle Expert", "☀️ Solar Pioneer", "🌊 Ocean Protector", "🌲 Forest Defender", "🏆 Carbon Neutral"];
    const numAchievements = Math.floor(Math.random() * 5) + 2;
    return allAchievements.sort(() => 0.5 - Math.random()).slice(0, numAchievements);
  };

  // Generate Weekly Progress Data
  const generateWeeklyProgress = () => {
    const weeks = [];
    for (let i = 1; i <= 8; i++) {
      weeks.push({
        week: `Week ${i}`,
        points: Math.floor(Math.random() * 80) + 20,
        quizzes: Math.floor(Math.random() * 4) + 1,
        games: Math.floor(Math.random() * 3) + 1,
        tasks: Math.floor(Math.random() * 2) + 1,
        efficiency: Math.floor(Math.random() * 30) + 70
      });
    }
    return weeks;
  };

  // Generate Quiz Performance Data
  const generateQuizPerformance = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month: month,
      averageScore: Math.floor(Math.random() * 25) + 75,
      quizzesTaken: Math.floor(Math.random() * 5) + 3,
    }));
  };

  // Generate Game Performance Data
  const generateGamePerformance = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month: month,
      averagePoints: Math.floor(Math.random() * 2000) + 5000,
      gamesPlayed: Math.floor(Math.random() * 5) + 2,
    }));
  };


  // Generate Subject Performance Data
  const generateSubjectPerformance = () => {
    const subjects = ["🔬 Science", "🌱 Environment", "🗺️ Geography", "🧬 Biology", "⚗️ Chemistry"];
    return subjects.map(subject => ({
      subject,
      score: Math.floor(Math.random() * 30) + 70,
      progress: Math.floor(Math.random() * 40) + 60
    }));
  };

  // Generate Recent Activity Data
  const generateRecentActivity = () => {
    const activities = [];
    const quizzes = ["Climate Change Quiz", "Water Conservation Test", "Renewable Energy Quiz", "Biodiversity Challenge", "Pollution Control Quiz"];
    const games = ["Ocean Cleanup", "Solar Panel Builder", "Forest Defender", "Waste Sorter Pro", "Green City Builder"];
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        activities.push({ type: "quiz", icon: "🧠", title: quizzes[Math.floor(Math.random() * quizzes.length)], score: Math.floor(Math.random() * 30) + 70, points: Math.floor(Math.random() * 25) + 15, date: `2024-03-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}` });
      } else {
        activities.push({ type: "game", icon: "🎮", title: games[Math.floor(Math.random() * games.length)], score: Math.floor(Math.random() * 5000) + 2000, points: Math.floor(Math.random() * 30) + 10, date: `2024-03-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}` });
      }
    }
    return activities;
  };

  const [studentsDatabase] = useState(() => generateStudentsDatabase());

  // Monthly Performance Data for charts
  const monthlyPerformanceData = [
    { month: 'Jan', quizzes: 342, games: 256, tasks: 89, carbonSaved: 1.2 },
    { month: 'Feb', quizzes: 445, games: 334, tasks: 127, carbonSaved: 2.1 },
    { month: 'Mar', quizzes: 578, games: 423, tasks: 168, carbonSaved: 3.4 },
    { month: 'Apr', quizzes: 692, games: 534, tasks: 203, carbonSaved: 4.7 },
    { month: 'May', quizzes: 834, games: 645, tasks: 267, carbonSaved: 6.2 },
    { month: 'Jun', quizzes: 967, games: 756, tasks: 312, carbonSaved: 8.1 }
  ];

  // Filter students based on search and filters
  const getFilteredStudents = () => {
    return studentsDatabase.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
      const matchesSection = selectedSection === 'all' || student.class.includes(`-${selectedSection}`);
      return matchesSearch && matchesClass && matchesSection;
    });
  };

  // Get top performers
  const getTopPerformers = () => {
    const filtered = studentsDatabase.filter(student => {
      const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
      const matchesSection = selectedSection === 'all' || student.class.includes(`-${selectedSection}`);
      return matchesClass && matchesSection;
    });
    return filtered.slice(0, 10);
  };

  // For animation effect
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedClass, selectedSection, leaderboardFilter]);

  // Dashboard Header Component
  const DashboardHeader = () => (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden mb-8">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-3 animate-bounce">🌱 EcoLearn Dashboard</h1>
            <p className="text-green-100 text-xl mb-4">Greenfield Public School - Environmental Education Platform</p>
            <div className="flex items-center space-x-8 mt-6">
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-xl hover:bg-opacity-30 transition-all">
                <Users className="h-6 w-6 animate-pulse" />
                <div><div className="font-bold text-lg">{studentsDatabase.length}</div><div className="text-xs">Students</div></div>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-xl hover:bg-opacity-30 transition-all">
                <BookOpen className="h-6 w-6 animate-pulse" />
                <div><div className="font-bold text-lg">16</div><div className="text-xs">Classes</div></div>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-xl hover:bg-opacity-30 transition-all">
                <Trophy className="h-6 w-6 animate-pulse" />
                <div><div className="font-bold text-lg">{studentsDatabase.reduce((sum, s) => sum + s.totalEcoPoints, 0).toLocaleString()}</div><div className="text-xs">Total Points</div></div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{new Date().toLocaleDateString('en-US')}</div>
            <div className="text-green-200 text-lg">Real-time Analysis</div>
            <div className="mt-4 flex space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white bg-opacity-5 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
    </div>
  );

  // Advanced Search Component
  const AdvancedSearch = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Search className="h-6 w-6 mr-3 text-blue-600 animate-pulse" />
        Advanced Student Search & Filter
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search for student name, class, or section..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="all">All Classes</option>
          {Array.from({ length: 8 }, (_, i) => (<option key={i} value={`Class ${i + 5}`}>Class {i + 5}</option>))}
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="all">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>
      {searchTerm && (
        <div className="mt-6 max-h-96 overflow-y-auto animate-fadeIn">
          <div className="text-sm text-gray-600 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium animate-pulse">
              {getFilteredStudents().length} Students Found
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredStudents().slice(0, 6).map(student => (
              <div key={student.id} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md animate-slideUp" onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
                <img src={student.profilePicture} alt={student.name} className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-green-400 transition-colors" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{student.name}</h3>
                  <p className="text-gray-600 text-sm">{student.class}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-600 font-semibold text-sm">{student.totalEcoPoints} Points</span>
                    <span className="text-xs text-gray-500">• {student.gender === 'male' ? '👦' : '👧'}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
          {getFilteredStudents().length > 6 && (<div className="text-center mt-4 text-gray-500 text-sm bg-gray-50 rounded-lg p-3">And {getFilteredStudents().length - 6} more students... click on a search result to view profile</div>)}
        </div>
      )}
    </div>
  );

  // Enhanced Leaderboard Component
  const EnhancedLeaderboard = () => {
    const topPerformers = getTopPerformers();
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 mb-8" key={animationKey}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-yellow-500 animate-bounce" />
            Top Performers Leaderboard
          </h3>
          <div className="flex space-x-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md transition-all" value={leaderboardFilter} onChange={(e) => setLeaderboardFilter(e.target.value)}>
              <option value="week">This Week</option><option value="month">This Month</option><option value="year">This Year</option><option value="all">All Time</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 rounded-xl">
          {topPerformers.slice(0, 3).map((student, index) => (
            <div key={student.id} className={`text-center cursor-pointer hover:scale-105 transition-transform ${index === 0 ? 'order-2 transform scale-110' : index === 1 ? 'order-1' : 'order-3'}`} onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
              <div className="relative">
                <img src={student.profilePicture} alt={student.name} className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400 shadow-lg hover:scale-105 transition-transform" />
                <div className={`absolute -top-3 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${index === 0 ? 'bg-yellow-500 animate-pulse' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'}`}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-lg text-gray-800">{student.name}</h4>
                <p className="text-sm text-gray-500">{student.class}</p>
                <div className="flex items-center justify-center mt-2 text-green-600 font-semibold text-lg">
                  <Star className="h-5 w-5 mr-1 text-yellow-400" />
                  {student.totalEcoPoints}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 animate-fadeIn">
          {topPerformers.slice(3, 10).map((student, index) => (
            <div key={student.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:shadow-md" onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
              <div className="text-lg font-bold text-gray-700 w-12 text-center">{index + 4}.</div>
              <img src={student.profilePicture} alt={student.name} className="w-12 h-12 rounded-full border-2 border-gray-200" />
              <div className="flex-1 mx-4">
                <h4 className="font-medium text-gray-800">{student.name}</h4>
                <p className="text-sm text-gray-500">{student.class}</p>
              </div>
              <div className="flex items-center text-green-600 font-semibold text-lg">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                {student.totalEcoPoints}
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Monthly Performance Charts
  const MonthlyPerformanceCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Activity Distribution Pie Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><Activity className="h-6 w-6 mr-2 text-orange-600" /> Activity Distribution</h3>
        <p className="text-sm text-gray-500 mb-4">Percentage breakdown of quizzes, games, and real-world tasks over the last month.</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={monthlyPerformanceData.map(d => ({ name: 'Quizzes', value: d.quizzes })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#10b981" />
            <Pie data={monthlyPerformanceData.map(d => ({ name: 'Games', value: d.games })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#3b82f6" label />
            <Pie data={monthlyPerformanceData.map(d => ({ name: 'Tasks', value: d.tasks })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={120} fill="#f59e0b" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Carbon Footprint Reduction */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><Leaf className="h-6 w-6 mr-2 text-green-600" /> Carbon Footprint Reduction</h3>
        <p className="text-sm text-gray-500 mb-4">Amount of CO₂ saved by students each month (in kg).</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbonSaved" fill="#4ade80" name="CO₂ Saved" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // New component for Quiz and Game performance
  const QuizAndGamePerformance = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] mb-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><Trophy className="h-6 w-6 mr-2 text-purple-600" /> Quiz & Game Performance</h3>
      <p className="text-sm text-gray-500 mb-4">Monthly average scores and points from quizzes and games.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz Performance */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-lg mb-4 flex items-center"><Zap className="h-5 w-5 mr-2 text-blue-500" /> Quiz Scores</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={selectedStudent ? selectedStudent.quizPerformance : generateQuizPerformance()}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="averageScore" stroke="#3b82f6" fill="#3b82f6" name="Average Score (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Game Performance */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-lg mb-4 flex items-center"><Play className="h-5 w-5 mr-2 text-yellow-500" /> Game Points</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={selectedStudent ? selectedStudent.gamePerformance : generateGamePerformance()}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="averagePoints" fill="#f59e0b" name="Average Points" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Student Profile Component
  const StudentProfile = () => {
    if (!selectedStudent) return null;
    const handleBack = () => { setShowProfile(false); setSelectedStudent(null); };
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 animate-slideUp relative">
        <button onClick={handleBack} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
          <XCircle className="h-8 w-8" />
        </button>
        <div className="text-center mb-8">
          <img src={selectedStudent.profilePicture} alt={selectedStudent.name} className="w-32 h-32 rounded-full mx-auto border-4 border-green-500 shadow-xl mb-4 transform hover:scale-110 transition-transform" />
          <h2 className="text-4xl font-bold text-gray-800">{selectedStudent.name}</h2>
          <p className="text-lg text-gray-600">{selectedStudent.class}</p>
          <div className="flex items-center justify-center mt-3 text-2xl font-bold text-green-600">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />{selectedStudent.totalEcoPoints} Eco Points
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><User className="mr-2" /> Student Info</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center"><Mail className="mr-3 h-5 w-5 text-blue-500" /> {selectedStudent.email}</li>
              <li className="flex items-center"><Phone className="mr-3 h-5 w-5 text-green-500" /> {selectedStudent.phone}</li>
              <li className="flex items-center"><MapPin className="mr-3 h-5 w-5 text-red-500" /> {selectedStudent.address}</li>
              <li className="flex items-center"><Clock className="mr-3 h-5 w-5 text-purple-500" /> Joined on {selectedStudent.joinedDate}</li>
              <li className="flex items-center"><Leaf className="mr-3 h-5 w-5 text-yellow-500" /> Weekly Growth: +{selectedStudent.weeklyGrowth}%</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Award className="mr-2" /> Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {selectedStudent.achievements.map((achievement, index) => (
                <span key={index} className="bg-green-200 text-green-800 text-sm font-medium px-4 py-2 rounded-full transition-all hover:bg-green-300 hover:scale-105">{achievement}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><TrendingUp className="mr-2" /> Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={selectedStudent.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="points" stroke="#10b981" name="Eco Points" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="quizzes" stroke="#3b82f6" name="Quizzes" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="games" stroke="#f59e0b" name="Games" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700"><Activity className="mr-2" /> Recent Activity</h3>
          <ul className="space-y-4">
            {selectedStudent.recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xl mr-4">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.type === 'quiz' ? `Score: ${activity.score}%` : `Score: ${activity.score} pts`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">+{activity.points} pts</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Main Dashboard Layout
  const DashboardLayout = () => (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="flex-1 p-6 lg:p-12">
        <DashboardHeader />
        {showProfile ? (
          <StudentProfile />
        ) : (
          <>
            <AdvancedSearch />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <MonthlyPerformanceCharts />
                <QuizAndGamePerformance />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"><Zap className="text-blue-600 h-8 w-8" /></div>
                    <div className="font-bold text-4xl text-blue-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].quizzes}</div>
                    <div className="text-sm text-gray-500">Quizzes Completed (Last Month)</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"><Play className="text-yellow-600 h-8 w-8" /></div>
                    <div className="font-bold text-4xl text-yellow-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].games}</div>
                    <div className="text-sm text-gray-500">Games Played (Last Month)</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-green-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"><CheckCircle className="text-green-600 h-8 w-8" /></div>
                    <div className="font-bold text-4xl text-green-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].tasks}</div>
                    <div className="text-sm text-gray-500">Real-World Tasks (Last Month)</div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-1">
                <EnhancedLeaderboard />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  return <DashboardLayout />;
};

export default AdvancedEcoLearnDashboard;
