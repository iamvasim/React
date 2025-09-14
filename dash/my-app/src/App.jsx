import React, { useState, useEffect } from 'react';
import {
  Search, User, Award, Activity, XCircle, Mail, Phone, MapPin, TrendingUp,
  Users, BookOpen, Trophy, Star, ChevronRight, Clock, CheckCircle, Play, Zap, Leaf,
  Home, Settings, BarChart3, HelpCircle, Trees
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, BarChart, Bar, AreaChart, Area
} from 'recharts';

const App = () => {
  const generateAvatar = (seed, gender) => {
    const maleAvatarUrl = 'https://placehold.co/150x150/b6e3f4/282a36?text=🧑‍🦱';
    if (gender === 'male') return maleAvatarUrl;
    const femaleAvatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=c0aede,b6e3f4,ffd5dc,d1d4f9,ffdfbf&features=glasses,bandana,beanie&size=150&mouth=smile,laugh&hair=straight,long&face=eyes`;
    return femaleAvatarUrl;
  };

  function generateAchievements() {
    const all = ['🌱 Eco Warrior', '🧠 Quiz Master', '🌳 Tree Guardian', '💧 Water Saver', '⚡ Energy Efficient', '🚫 Pollution Fighter', '💡 Green Innovator', '🌍 Climate Champion', '♻ Recycle Expert', '☀ Solar Pioneer', '🌊 Ocean Protector', '🌲 Forest Defender', '🏆 Carbon Neutral'];
    const n = Math.floor(Math.random() * 5) + 2;
    return all.sort(() => 0.5 - Math.random()).slice(0, n);
  }
  function generateWeeklyProgress() {
    const weeks = [];
    for (let i = 1; i <= 8; i++) {
      weeks.push({
        week: `Week ${i}`,
        points: Math.floor(Math.random() * 80) + 20,
        quizzes: Math.floor(Math.random() * 4) + 1,
        games: Math.floor(Math.random() * 3) + 1,
        tasks: Math.floor(Math.random() * 2) + 1,
        efficiency: Math.floor(Math.random() * 30) + 70,
      });
    }
    return weeks;
  }
  function generateQuizPerformance() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month) => ({
      month,
      averageScore: Math.floor(Math.random() * 25) + 75,
      quizzesTaken: Math.floor(Math.random() * 5) + 3,
    }));
  }
  function generateGamePerformance() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month) => ({
      month,
      averagePoints: Math.floor(Math.random() * 2000) + 5000,
      gamesPlayed: Math.floor(Math.random() * 5) + 2,
    }));
  }
  function generateSubjectPerformance() {
    const subjects = ['🔬 Science', '🌱 Environment', '🗺 Geography', '🧬 Biology', '⚗ Chemistry'];
    return subjects.map((subject) => ({
      subject,
      score: Math.floor(Math.random() * 30) + 70,
      progress: Math.floor(Math.random() * 40) + 60,
    }));
  }
  function generateRecentActivity() {
    const activities = [];
    const quizzes = ['Climate Change Quiz', 'Water Conservation Test', 'Renewable Energy Quiz', 'Biodiversity Challenge', 'Pollution Control Quiz'];
    const games = ['Ocean Cleanup', 'Solar Panel Builder', 'Forest Defender', 'Waste Sorter Pro', 'Green City Builder'];
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        activities.push({
          type: 'quiz',
          icon: '🧠',
          title: quizzes[Math.floor(Math.random() * quizzes.length)],
          score: Math.floor(Math.random() * 30) + 70,
          points: Math.floor(Math.random() * 25) + 15,
          date: `2024-03-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}`,
        });
      } else {
        activities.push({
          type: 'game',
          icon: '🎮',
          title: games[Math.floor(Math.random() * games.length)],
          score: Math.floor(Math.random() * 5000) + 2000,
          points: Math.floor(Math.random() * 30) + 10,
          date: `2024-03-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}`,
        });
      }
    }
    return activities;
  }

  const maleNames = ['Arjun Sharma', 'Rohan Kumar', 'Vikash Yadav', 'Aditya Singh', 'Rahul Verma', 'Ankit Gupta', 'Deepak Mishra', 'Harsh Agarwal', 'Karan Joshi', 'Nitin Pandey', 'Saurabh Tiwari', 'Vaibhav Shukla', 'Manish Dubey', 'Ravi Chandra', 'Sumit Kashyap', 'Tushar Bhatt', 'Vivek Srivastava', 'Yash Tripathi', 'Dev Patel', 'Gaurav Saxena', 'Hardik Shah', 'Inder Malhotra', 'Jay Kapoor', 'Kiran Thakur', 'Laksh Singh', 'Meet Sharma', 'Naveen Kumar', 'Om Gupta', 'Parth Verma', 'Qadir Khan', 'Rocky Yadav'];
  const femaleNames = ['Priya Patel', 'Sneha Singh', 'Ananya Sharma', 'Kavya Verma', 'Riya Gupta', 'Pooja Mishra', 'Shruti Agarwal', 'Neha Joshi', 'Anjali Pandey', 'Simran Tiwari', 'Ishika Shukla', 'Divya Dubey', 'Kritika Chandra', 'Shweta Kashyap', 'Tanvi Bhatt', 'Meera Srivastava', 'Nidhi Tripathi', 'Aarti Patel', 'Bhavna Saxena', 'Chhavi Shah', 'Deepika Malhotra', 'Ekta Kapoor', 'Fatima Khan', 'Garima Thakur', 'Hina Verma', 'Ira Gupta', 'Jiya Singh', 'Kareena Sharma', 'Lavanya Kumar', 'Maya Patel', 'Naina Joshi'];

  function generateStudentsDatabase() {
    const students = [];
    let studentId = 1;
    for (let grade = 5; grade <= 12; grade++) {
      ['A', 'B'].forEach((section) => {
        const className = `Class ${grade}-${section}`;
        for (let i = 0; i < 12; i++) {
          const isMale = i < 6;
          const nameArray = isMale ? maleNames : femaleNames;
          const nameIndex = (studentId + i) % nameArray.length;
          const name = nameArray[nameIndex];
          const gender = isMale ? 'male' : 'female';
          const avatar = generateAvatar(name.toLowerCase().replace(' ', '-'), gender);
          const basePoints = 150 + Math.floor(Math.random() * 350);
          const gradeBonus = (grade - 4) * 15;
          const joinedDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
          const randomJoinedDate = new Date(joinedDate.getTime() + Math.random() * (new Date().getTime() - joinedDate.getTime()));
          const student = {
            id: studentId++,
            name,
            class: className,
            grade,
            section,
            gender,
            totalEcoPoints: basePoints + gradeBonus + Math.floor(Math.random() * 80),
            profilePicture: avatar,
            achievements: generateAchievements(),
            weeklyProgress: generateWeeklyProgress(),
            subjects: generateSubjectPerformance(),
            recentActivity: generateRecentActivity(),
            weeklyGrowth: Math.floor(Math.random() * 50) + 10,
            quizPerformance: generateQuizPerformance(),
            gamePerformance: generateGamePerformance(),
            email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@greenfieldschool.org`,
            phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            address: ['123, Gandhi Road, New Delhi', '456, Nehru Nagar, Mumbai', '789, Patel Street, Bangalore', '101, Subhash Marg, Chennai', '202, Shastri Lane, Kolkata'][Math.floor(Math.random() * 5)],
            joinedDate: randomJoinedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          };
          students.push(student);
        }
      });
    }
    return students.sort((a, b) => b.totalEcoPoints - a.totalEcoPoints);
  }

  const [studentsDatabase] = useState(() => generateStudentsDatabase());

  const monthlyPerformanceData = [
    { month: 'Jan', quizzes: 342, games: 256, tasks: 89, carbonSaved: 1.2 },
    { month: 'Feb', quizzes: 445, games: 334, tasks: 127, carbonSaved: 2.1 },
    { month: 'Mar', quizzes: 578, games: 423, tasks: 168, carbonSaved: 3.4 },
    { month: 'Apr', quizzes: 692, games: 534, tasks: 203, carbonSaved: 4.7 },
    { month: 'May', quizzes: 834, games: 645, tasks: 267, carbonSaved: 6.2 },
    { month: 'Jun', quizzes: 967, games: 756, tasks: 312, carbonSaved: 8.1 },
  ];

  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const getFilteredStudents = () => {
    return studentsDatabase.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
      const matchesSection = selectedSection === 'all' || student.class.includes(`-${selectedSection}`);
      return matchesSearch && matchesClass && matchesSection;
    });
  };

  const getTopPerformers = () => {
    const filtered = studentsDatabase.filter((student) => {
      const matchesClass = selectedClass === 'all' || student.class.includes(selectedClass);
      const matchesSection = selectedSection === 'all' || student.class.includes(`-${selectedSection}`);
      return matchesClass && matchesSection;
    });
    return filtered.slice(0, 10);
  };

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [selectedClass, selectedSection, leaderboardFilter]);

  const DashboardHeader = () => (
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl shadow-2xl p-6 md:p-8 text-white relative overflow-hidden mb-8">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* centered tree logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 shadow-lg">
          <Trees className="w-14 h-14 md:w-20 md:h-20 text-white/90" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">🌱 EcoLearn Dashboard</h1>
            <p className="text-green-50 text-sm sm:text-lg md:text-xl mb-4">Greenfield Public School - Environmental Education Platform</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center space-x-3 bg-white/30 px-4 py-2 rounded-xl hover:bg-white/40 transition-all backdrop-blur">
                <Users className="h-5 w-5 md:h-6 md:w-6" />
                <div><div className="font-bold text-base md:text-lg">{studentsDatabase.length}</div><div className="text-xs">Students</div></div>
              </div>
              <div className="flex items-center space-x-3 bg-white/30 px-4 py-2 rounded-xl hover:bg-white/40 transition-all backdrop-blur">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                <div><div className="font-bold text-base md:text-lg">16</div><div className="text-xs">Classes</div></div>
              </div>
              <div className="flex items-center space-x-3 bg-white/30 px-4 py-2 rounded-xl hover:bg-white/40 transition-all backdrop-blur">
                <Trophy className="h-5 w-5 md:h-6 md:w-6" />
                <div><div className="font-bold text-base md:text-lg">{studentsDatabase.reduce((sum, s) => sum + s.totalEcoPoints, 0).toLocaleString()}</div><div className="text-xs">Total Points</div></div>
              </div>
            </div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <div className="text-2xl md:text-4xl font-bold mb-2">{new Date().toLocaleDateString('en-US')}</div>
            <div className="text-green-100 text-sm md:text-lg">Real-time Analysis</div>
            <div className="mt-4 flex justify-end space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="mt-6">
          <ul className="flex flex-wrap items-center gap-2 md:gap-3">
            <li><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white text-emerald-800 font-medium hover:bg-green-50 transition shadow-sm">
              <Home className="h-4 w-4" /><span>Home</span>
            </button></li>
            <li><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/90 text-emerald-900 font-medium hover:bg-white transition shadow-sm">
              <Trophy className="h-4 w-4" /><span>Leaderboard</span>
            </button></li>
            <li><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/90 text-emerald-900 font-medium hover:bg-white transition shadow-sm">
              <BarChart3 className="h-4 w-4" /><span>Analytics</span>
            </button></li>
            <li><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/90 text-emerald-900 font-medium hover:bg-white transition shadow-sm">
              <Users className="h-4 w-4" /><span>Students</span>
            </button></li>
            <li><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/90 text-emerald-900 font-medium hover:bg-white transition shadow-sm">
              <Settings className="h-4 w-4" /><span>Settings</span>
            </button></li>
            <li className="ml-auto"><button className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-emerald-50 text-emerald-900 font-semibold hover:bg-white transition shadow-sm">
              <HelpCircle className="h-4 w-4" /><span>Help</span>
            </button></li>
          </ul>
        </nav>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
    </div>
  );

  const AdvancedSearch = () => (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        <Search className="h-5 w-5 md:h-6 md:w-6 mr-3 text-blue-600" />
        Advanced Student Search & Filter
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input type="text" placeholder="Search for student name, class, or section..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="all">All Classes</option>
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i} value={`Class ${i + 5}`}>{`Class ${i + 5}`}</option>
          ))}
        </select>
        <select className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="all">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>
      {searchTerm && (
        <div className="mt-6 max-h-96 overflow-y-auto">
          <div className="text-sm text-gray-600 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              {getFilteredStudents().length} Students Found
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredStudents().slice(0, 6).map((student) => (
              <div key={student.id} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md" onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
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
          {getFilteredStudents().length > 6 && <div className="text-center mt-4 text-gray-500 text-sm bg-gray-50 rounded-lg p-3">And {getFilteredStudents().length - 6} more students... click on a search result to view profile</div>}
        </div>
      )}
    </div>
  );

  const EnhancedLeaderboard = () => {
    const topPerformers = getTopPerformers();
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 mb-8" key={animationKey}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-3xl font-bold flex items-center">
            <Trophy className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 text-yellow-500" />
            Top Performers Leaderboard
          </h3>
          <div className="flex space-x-3">
            <select className="border border-gray-300 rounded-lg px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md transition-all" value={leaderboardFilter} onChange={(e) => setLeaderboardFilter(e.target.value)}>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-6 mb-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 rounded-xl">
          {topPerformers.slice(0, 3).map((student, index) => (
            <div key={student.id} className={`w-full sm:w-1/3 text-center cursor-pointer hover:scale-105 transition-transform ${index === 0 ? 'order-2 sm:scale-110 z-10' : index === 1 ? 'order-1' : 'order-3'}`} onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
              <div className="relative">
                <img src={student.profilePicture} alt={student.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto border-4 border-yellow-400 shadow-lg hover:scale-105 transition-transform" />
                <div className={`absolute -top-3 -right-2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'}`}>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-base md:text-lg text-gray-800">{student.name}</h4>
                <p className="text-xs md:text-sm text-gray-500">{student.class}</p>
                <div className="flex items-center justify-center mt-2 text-base md:text-lg text-green-600 font-semibold">
                  <Star className="h-4 w-4 md:h-5 md:w-5 mr-1 text-yellow-400" />
                  {student.totalEcoPoints}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {topPerformers.slice(3, 10).map((student, index) => (
            <div key={student.id} className="flex items-center p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:shadow-md" onClick={() => { setSelectedStudent(student); setShowProfile(true); }}>
              <div className="text-base md:text-lg font-bold text-gray-700 w-8 md:w-12 text-center">{index + 4}.</div>
              <img src={student.profilePicture} alt={student.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-200" />
              <div className="flex-1 mx-3 md:mx-4">
                <h4 className="font-medium text-sm md:text-base text-gray-800">{student.name}</h4>
                <p className="text-xs md:text-sm text-gray-500">{student.class}</p>
              </div>
              <div className="flex items-center text-sm md:text-lg text-green-600 font-semibold">
                <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 text-yellow-400" />
                {student.totalEcoPoints}
              </div>
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-400 ml-3 md:ml-4" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MonthlyPerformanceCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-gray-800">
          <Activity className="h-5 w-5 md:h-6 md:w-6 mr-2 text-orange-600" /> Activity Distribution
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mb-4">Percentage breakdown of quizzes, games, and real-world tasks over the last month.</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={monthlyPerformanceData.map((d) => ({ name: 'Quizzes', value: d.quizzes })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#10b981" />
            <Pie data={monthlyPerformanceData.map((d) => ({ name: 'Games', value: d.games })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#3b82f6" label />
            <Pie data={monthlyPerformanceData.map((d) => ({ name: 'Tasks', value: d.tasks })).slice(-1)} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={100} outerRadius={120} fill="#f59e0b" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-gray-800">
          <Leaf className="h-5 w-5 md:h-6 md:w-6 mr-2 text-green-600" /> Carbon Footprint Reduction
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mb-4">Amount of CO₂ saved by students each month (in kg).</p>
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

  const QuizAndGamePerformance = () => (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] mb-8">
      <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-gray-800">
        <Trophy className="h-5 w-5 md:h-6 md:w-6 mr-2 text-purple-600" /> Quiz & Game Performance
      </h3>
      <p className="text-xs md:text-sm text-gray-500 mb-4">Monthly average scores and points from quizzes and games.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-blue-500" /> Quiz Scores
          </h4>
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
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Play className="h-5 w-5 mr-2 text-yellow-500" /> Game Points
          </h4>
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

  const StudentProfile = () => {
    if (!selectedStudent) return null;
    const handleBack = () => { setShowProfile(false); setSelectedStudent(null); };
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 transform transition-all duration-500 relative">
        <button onClick={handleBack} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
          <XCircle className="h-8 w-8" />
        </button>
        <div className="text-center mb-8">
          <img src={selectedStudent.profilePicture} alt={selectedStudent.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto border-4 border-green-500 shadow-xl mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{selectedStudent.name}</h2>
          <p className="text-base md:text-lg text-gray-600">{selectedStudent.class}</p>
          <div className="flex items-center justify-center mt-3 text-xl md:text-2xl font-bold text-green-600">
            <Star className="h-5 w-5 md:h-6 md:w-6 mr-2 text-yellow-400" />
            {selectedStudent.totalEcoPoints} Eco Points
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8">
          <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center text-gray-700">
              <User className="mr-2" /> Student Info
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-gray-600">
              <li className="flex items-center"><Mail className="mr-3 h-5 w-5 text-blue-500" /> {selectedStudent.email}</li>
              <li className="flex items-center"><Phone className="mr-3 h-5 w-5 text-green-500" /> {selectedStudent.phone}</li>
              <li className="flex items-center"><MapPin className="mr-3 h-5 w-5 text-red-500" /> {selectedStudent.address}</li>
              <li className="flex items-center"><Clock className="mr-3 h-5 w-5 text-purple-500" /> Joined on {selectedStudent.joinedDate}</li>
              <li className="flex items-center"><Leaf className="mr-3 h-5 w-5 text-yellow-500" /> Weekly Growth: +{selectedStudent.weeklyGrowth}%</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center text-gray-700">
              <Award className="mr-2" /> Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedStudent.achievements.map((achievement, index) => (
                <span key={index} className="bg-green-200 text-green-800 text-xs md:text-sm font-medium px-3 py-1 md:px-4 md:py-2 rounded-full">{achievement}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center text-gray-700">
            <TrendingUp className="mr-2" /> Weekly Progress
          </h3>
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
        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
          <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center text-gray-700">
            <Activity className="mr-2" /> Recent Activity
          </h3>
          <ul className="space-y-4">
            {selectedStudent.recentActivity.map((activity, index) => (
              <li key={index} className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg mr-4">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base text-gray-800">{activity.title}</p>
                  <p className="text-xs md:text-sm text-gray-500">{activity.type === 'quiz' ? `Score: ${activity.score}%` : `Score: ${activity.score} pts`}</p>
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

  const DashboardLayout = () => (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="flex-1 p-4 md:p-6 lg:p-12">
        <DashboardHeader />
        {showProfile ? (
          <StudentProfile />
        ) : (
          <>
            <AdvancedSearch />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="md:col-span-2 xl:col-span-2">
                <MonthlyPerformanceCharts />
                <QuizAndGamePerformance />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
                  <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto flex items-center justify-center mb-4"><Zap className="text-blue-600 h-6 w-6 md:h-8 md:w-8" /></div>
                    <div className="font-bold text-2xl md:text-4xl text-blue-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].quizzes}</div>
                    <div className="text-xs md:text-sm text-gray-500">Quizzes Completed (Last Month)</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-yellow-100 w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto flex items-center justify-center mb-4"><Play className="text-yellow-600 h-6 w-6 md:h-8 md:w-8" /></div>
                    <div className="font-bold text-2xl md:text-4xl text-yellow-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].games}</div>
                    <div className="text-xs md:text-sm text-gray-500">Games Played (Last Month)</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto flex items-center justify-center mb-4"><CheckCircle className="text-green-600 h-6 w-6 md:h-8 md:w-8" /></div>
                    <div className="font-bold text-2xl md:text-4xl text-green-600">{monthlyPerformanceData[monthlyPerformanceData.length - 1].tasks}</div>
                    <div className="text-xs md:text-sm text-gray-500">Real-World Tasks Completed (Last Month)</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 xl:col-span-1">
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

export default App;