import React, { useState, useEffect } from 'react';
import { Menu, X, Users, BookOpen, Globe, Shield, Scale, Award, LogOut, CheckCircle, XCircle, Clock, Trash2, UserPlus, TrendingUp, Leaf, Building, Calendar, ArrowRight, ChevronRight } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'https://yiga-backend-production-24a1.up.railway.app/api';

// Featured Articles Data
const featuredArticles = [
  {
    id: 1,
    title: "Africa's Role in Global Climate Diplomacy",
    excerpt: "As African nations lead the charge on climate action, YIGA explores the continent's growing influence in international environmental negotiations.",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=800&h=500&fit=crop",
    category: "Climate Change",
    date: "November 25, 2025",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Youth Leadership in Peace and Security",
    excerpt: "Young African leaders are reshaping peace negotiations across the continent, bringing fresh perspectives to conflict resolution.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
    category: "Peace & Security",
    date: "November 20, 2025",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Strengthening Good Governance Through Youth Engagement",
    excerpt: "How youth-led initiatives are transforming governance structures and promoting accountability across African institutions.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    category: "Good Governance",
    date: "November 15, 2025",
    readTime: "6 min read"
  }
];

// Recent Insights
const recentInsights = [
  {
    title: "African Union's 2025 Agenda: What Young Professionals Need to Know",
    date: "November 28, 2025",
    category: "Foreign Policy"
  },
  {
    title: "Cultural Diplomacy: Africa's Soft Power Strategy",
    date: "November 22, 2025",
    category: "Culture & Heritage"
  },
  {
    title: "Trade Relations and Economic Integration in East Africa",
    date: "November 18, 2025",
    category: "Foreign Policy"
  },
  {
    title: "Youth Participation in Electoral Processes Across Africa",
    date: "November 10, 2025",
    category: "Good Governance"
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [applications, setApplications] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    motivation: ''
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [newAdmin, setNewAdmin] = useState({
    username: '',
    password: '',
    role: 'admin'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    const savedRole = localStorage.getItem('role');
    if (token && savedUsername && savedRole) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      setUserRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentPage === 'admin') {
      fetchApplications();
      if (userRole === 'superadmin') {
        fetchAdmins();
      }
    }
  }, [isLoggedIn, currentPage, userRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        setIsLoggedIn(true);
        setUsername(data.username);
        setUserRole(data.role);
        setLoginData({ username: '', password: '' });
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
    setCurrentPage('home');
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setApplications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/auth/admins`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setAdmins(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          country: '',
          program: '',
          motivation: ''
        });
        setTimeout(() => setSubmitStatus(''), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/auth/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        setAdminSuccess('Admin created successfully!');
        setNewAdmin({ username: '', password: '', role: 'admin' });
        fetchAdmins();
        setTimeout(() => setAdminSuccess(''), 3000);
      } else {
        setAdminError(data.message || 'Failed to create admin');
      }
    } catch (error) {
      setAdminError('Connection error. Please try again.');
    }
  };

  const updateAdminRole = async (id, role) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/auth/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      if (response.ok) {
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error updating admin role:', error);
    }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/auth/admins/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
        🌍 Join Africa's Leading Youth in International Affairs • Applications Open
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-3">
              <Globe className="h-12 w-12 text-red-600" />
              <div>
                <span className="text-2xl font-bold text-black block">YIGA</span>
                <span className="text-xs text-gray-600">Youth in Governance & International Affairs</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'team', 'insights', 'programs', 'join', 'admin'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === page
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {page === 'home' ? 'Home' :
                   page === 'about' ? 'About' :
                   page === 'team' ? 'Team' :
                   page === 'insights' ? 'Insights' :
                   page === 'programs' ? 'Programs' :
                   page === 'join' ? 'Join Us' : 'Admin'}
                </button>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-red-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'team', 'insights', 'programs', 'join', 'admin'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg font-semibold ${
                    currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div>
        {/* Home Page */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section with Image */}
            <div className="relative h-[600px] bg-gradient-to-r from-black via-gray-900 to-red-900 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=900&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Shaping Africa's Future in <span className="text-red-500">Global Affairs</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Empowering young professionals to drive meaningful change in international relations, governance, and policy across the African continent.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentPage('join')}
                      className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition shadow-xl flex items-center space-x-2"
                    >
                      <span>Join YIGA</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage('about')}
                      className="bg-white text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-xl"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
                  <div className="text-gray-300">Active Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">15+</div>
                  <div className="text-gray-300">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">200+</div>
                  <div className="text-gray-300">Events Hosted</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
                  <div className="text-gray-300">Partner Organizations</div>
                </div>
              </div>
            </div>

            {/* Featured Articles */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-black mb-4">Latest Insights</h2>
                <p className="text-lg text-gray-600">Exploring critical issues in African international relations and governance</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {featuredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.date}
                        </span>
                        <span>• {article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <button className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all">
                        <span>Read More</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Insights Sidebar */}
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-3xl font-bold text-black mb-8">Our Focus Areas</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { icon: Globe, title: "Foreign Policy & Diplomacy", desc: "Analyzing Africa's role in global affairs" },
                        { icon: Scale, title: "Good Governance", desc: "Promoting accountability and transparency" },
                        { icon: Leaf, title: "Climate Change", desc: "Addressing environmental challenges" },
                        { icon: Shield, title: "Peace & Security", desc: "Conflict prevention and resolution" }
                      ].map((area, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                          <area.icon className="w-12 h-12 text-red-600 mb-4" />
                          <h4 className="text-xl font-bold text-black mb-2">{area.title}</h4>
                          <p className="text-gray-600">{area.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">Recent Updates</h3>
                    <div className="space-y-4">
                      {recentInsights.map((insight, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                          <div className="text-xs text-red-600 font-semibold mb-2">{insight.category}</div>
                          <h4 className="font-bold text-black mb-2 hover:text-red-600 transition">{insight.title}</h4>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {insight.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
                <p className="text-xl mb-8 text-gray-200">
                  Join a network of passionate young professionals shaping Africa's future in international affairs
                </p>
                <button
                  onClick={() => setCurrentPage('join')}
                  className="bg-white text-red-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-2xl"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* About Page */}
        {currentPage === 'about' && (
          <div>
            <div className="relative h-96 bg-gradient-to-r from-black to-red-900">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">About YIGA</h1>
                  <p className="text-xl text-gray-200">Empowering Africa's next generation of global leaders</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-red-600">
                  <h3 className="text-3xl font-bold mb-4 text-black">Our Vision</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To be a leading platform for youth leadership and engagement in shaping global discourse and development.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-black">
                  <h3 className="text-3xl font-bold mb-4 text-black">Our Mission</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To empower young people through research, dialogue, and strategic engagement in key global issues, fostering informed, innovative, and impactful youth participation in international affairs.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-12 rounded-lg mb-16">
                <h3 className="text-3xl font-bold text-black mb-8 text-center">Core Objectives</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Encourage and support the production of high-quality, youth-driven research on critical global challenges",
                    "Organize trainings, workshops, and conferences to equip young people with knowledge and skills",
                    "Advance meaningful youth involvement in foreign policy processes and international relations",
                    "Create inclusive spaces for thoughtful discourse, idea-sharing, and collaboration",
                    "Foster Pan-African collaboration among young professionals",
                    "Support research and policy analysis on critical African issues"
                  ].map((objective, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-lg">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold text-black mb-4">Our Impact</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  YIGA is building a movement of young professionals across Africa, creating platforms for research, dialogue, and engagement that shape the continent's future in global affairs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Team Page */}
        {currentPage === 'team' && (
          <div>
            <div className="relative h-96 bg-gradient-to-r from-black to-red-900">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">Our Team</h1>
                  <p className="text-xl text-gray-200">Meet the leaders driving YIGA's mission across Africa</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
              {/* Organizational Structure Overview */}
              <div className="bg-gradient-to-r from-red-50 to-gray-50 p-8 rounded-lg mb-16">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">Organizational Structure</h2>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Users className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-black mb-2">Executive Council</h3>
                    <p className="text-sm text-gray-600">Strategic Leadership & Oversight</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Award className="w-12 h-12 text-black mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-black mb-2">Advisory Council</h3>
                    <p className="text-sm text-gray-600">Expert Guidance & Support</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Building className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-black mb-2">Directorate</h3>
                    <p className="text-sm text-gray-600">Operations & Programs</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <BookOpen className="w-12 h-12 text-black mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-black mb-2">Student Wing</h3>
                    <p className="text-sm text-gray-600">IRSAK - Grassroots Engagement</p>
                  </div>
                </div>
              </div>

              {/* Executive Council */}
              <div className="mb-16">
                <div className="bg-red-600 text-white p-6 rounded-t-lg">
                  <h2 className="text-3xl font-bold flex items-center">
                    <Users className="w-8 h-8 mr-3" />
                    Executive Council
                  </h2>
                  <p className="text-red-100 mt-2">The highest decision-making body, responsible for strategic leadership, policy direction, and institutional oversight.</p>
                </div>
                <div className="bg-white p-8 rounded-b-lg shadow-xl">
                  <div className="text-center text-gray-600 py-8">
                    <p className="text-lg">Executive Council members to be announced</p>
                    <p className="text-sm mt-2">Positions include strategic leaders from across Africa</p>
                  </div>
                </div>
              </div>

              {/* Advisory Council */}
              <div className="mb-16">
                <div className="bg-black text-white p-6 rounded-t-lg">
                  <h2 className="text-3xl font-bold flex items-center">
                    <Award className="w-8 h-8 mr-3" />
                    Advisory Council
                  </h2>
                  <p className="text-gray-300 mt-2">Experienced professionals and subject-matter experts offering strategic guidance and technical support.</p>
                </div>
                <div className="bg-white p-8 rounded-b-lg shadow-xl">
                  <div className="text-center text-gray-600 py-8">
                    <p className="text-lg">Advisory Council members to be announced</p>
                    <p className="text-sm mt-2">Distinguished experts in foreign policy, governance, and international relations</p>
                  </div>
                </div>
              </div>

              {/* Directorate */}
              <div className="mb-16">
                <div className="bg-red-600 text-white p-6 rounded-t-lg">
                  <h2 className="text-3xl font-bold flex items-center">
                    <Building className="w-8 h-8 mr-3" />
                    Directorate
                  </h2>
                  <p className="text-red-100 mt-2">Handles day-to-day operations and execution of programs.</p>
                </div>
                <div className="bg-white p-8 rounded-b-lg shadow-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Executive Director", desc: "Overall leadership and organizational management" },
                      { title: "Deputy Executive Director", desc: "Supports the Executive Director in all functions" },
                      { title: "Director of Research", desc: "Oversees research initiatives and publications" },
                      { title: "Director of Communications", desc: "Manages public relations and media strategy" },
                      { title: "Director of Events", desc: "Plans and executes conferences and workshops" },
                      { title: "Director of Programs and Partnerships", desc: "Develops programs and strategic partnerships" },
                      { title: "Director of Finance", desc: "Financial management and resource allocation" }
                    ].map((position, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 hover:shadow-lg transition">
                        <h3 className="font-bold text-xl text-black mb-2">{position.title}</h3>
                        <p className="text-gray-600">{position.desc}</p>
                        <p className="text-sm text-gray-500 mt-3 italic">Position open for applications</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Wing - IRSAK */}
              <div className="mb-16">
                <div className="bg-black text-white p-6 rounded-t-lg">
                  <h2 className="text-3xl font-bold flex items-center">
                    <BookOpen className="w-8 h-8 mr-3" />
                    Student Wing - IRSAK
                  </h2>
                  <p className="text-gray-300 mt-2">International Relations Students Association of Kenya serves as the student mobilization and grassroots engagement wing of YIGA.</p>
                </div>
                <div className="bg-white p-8 rounded-b-lg shadow-xl">
                  <div className="bg-gradient-to-r from-red-50 to-gray-50 p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-black mb-4">IRSAK Leadership</h3>
                    <p className="text-gray-700 mb-6">Focusing on student involvement in global affairs discourse and activities across Kenya</p>
                    <div className="text-center text-gray-600 py-4">
                      <p className="text-lg">Student leadership team to be announced</p>
                      <p className="text-sm mt-2">Actively recruiting student leaders from Kenyan universities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Join the Team CTA */}
              <div className="bg-gradient-to-r from-red-600 to-black text-white p-12 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-xl text-gray-200 mb-6">
                  We're building Africa's premier youth-led organization for international affairs. Be part of our founding team.
                </p>
                <button
                  onClick={() => setCurrentPage('join')}
                  className="bg-white text-red-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-2xl"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insights Page */}
        {currentPage === 'insights' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-black mb-4">Insights & Analysis</h1>
              <p className="text-xl text-gray-600">In-depth perspectives on Africa's role in global affairs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition group">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {article.date}
                      </span>
                      <span>• {article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <button className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {[4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition group">
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img 
                      src={`https://images.unsplash.com/photo-${1517245386807 + i}?w=800&h=500&fit=crop`}
                      alt="Article"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Analysis
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        November 2025
                      </span>
                      <span>• 5 min read</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition">
                      Understanding Regional Integration Efforts in Africa
                    </h3>
                    <p className="text-gray-600 mb-4">Examining the progress and challenges of economic cooperation across African regions.</p>
                    <button className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Programs Page */}
        {currentPage === 'programs' && (
          <div>
            <div className="relative h-96 bg-gradient-to-r from-black to-red-900">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">Our Programs</h1>
                  <p className="text-xl text-gray-200">Building capacity across five critical areas of international affairs</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Foreign Policy & Diplomacy",
                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
                    description: "Training young professionals in diplomatic protocols, international negotiations, and policy analysis to represent African interests on the global stage."
                  },
                  {
                    icon: Scale,
                    title: "Good Governance",
                    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
                    description: "Promoting transparency, accountability, and effective public administration through youth-led initiatives and advocacy programs."
                  },
                  {
                    icon: Leaf,
                    title: "Climate Change & Environment",
                    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=800&h=500&fit=crop",
                    description: "Mobilizing young leaders to address environmental challenges and advance Africa's climate agenda in international forums."
                  },
                  {
                    icon: Shield,
                    title: "Peace & Security",
                    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
                    description: "Equipping youth with conflict resolution skills and peacebuilding strategies to foster stability across the continent."
                  },
                  {
                    icon: BookOpen,
                    title: "Culture & Heritage",
                    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
                    description: "Leveraging Africa's rich cultural diversity as a tool for soft power and international cultural diplomacy."
                  }
                ].map((program, idx) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition group">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <program.icon className="w-10 h-10 mb-3" />
                        <h3 className="text-2xl font-bold">{program.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed mb-4">{program.description}</p>
                      <button className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all">
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Join Us Page */}
        {currentPage === 'join' && (
          <div>
            <div className="relative h-96 bg-gradient-to-r from-red-600 to-black">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-3xl">
                  <h1 className="text-5xl font-bold mb-4">Join YIGA</h1>
                  <p className="text-xl text-gray-200">Be part of Africa's leading network of young professionals in international affairs</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-black mb-6">Application Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  />
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    required
                  >
                    <option value="">Select Focus Area</option>
                    <option value="Foreign Policy">Foreign Policy & Diplomacy</option>
                    <option value="Good Governance">Good Governance</option>
                    <option value="Climate Change">Climate Change & Environment</option>
                    <option value="Peace and Security">Peace & Security</option>
                    <option value="Culture and Heritage">Culture & Heritage</option>
                  </select>
                  <textarea
                    placeholder="Why do you want to join YIGA? Share your motivation and interest in international affairs."
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 h-32"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 disabled:bg-gray-400 transition shadow-lg"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                  {submitStatus === 'success' && (
                    <div className="bg-green-100 border-2 border-green-600 text-green-800 p-4 rounded-lg text-center font-bold">
                      ✅ Application submitted successfully!
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-100 border-2 border-red-600 text-red-800 p-4 rounded-lg text-center font-bold">
                      ❌ Submission failed. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Admin Page */}
        {currentPage === 'admin' && !isLoggedIn && (
          <div className="max-w-md mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-6 text-center">
              <span className="text-black">Admin </span>
              <span className="text-red-600">Login</span>
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-red-600">
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg"
                >
                  Login
                </button>
                {loginError && (
                  <div className="bg-red-100 border-2 border-red-600 text-red-800 p-3 rounded-lg text-center">
                    {loginError}
                  </div>
                )}
              </form>
              <div className="mt-6 text-sm text-gray-600 text-center bg-gray-50 p-4 rounded">
                <p className="font-bold mb-2">Default credentials:</p>
                <p>Username: superadmin / Password: superadmin123</p>
                <p>Username: admin / Password: admin123</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'admin' && isLoggedIn && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold">
                <span className="text-black">Admin </span>
                <span className="text-red-600">Dashboard</span>
              </h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-bold text-black">{username} <span className="text-red-600">({userRole})</span></p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl mb-8 border-t-4 border-red-600">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-black">Applications</h3>
                <button
                  onClick={fetchApplications}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold transition shadow"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <p className="text-center py-8 text-gray-600">Loading...</p>
              ) : applications.length === 0 ? (
                <p className="text-center py-8 text-gray-600">No applications yet</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-black">{app.full_name}</h4>
                          <p className="text-sm text-gray-600">{app.email} • {app.phone}</p>
                          <p className="text-sm text-gray-600">{app.country} • {app.program}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {app.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                          {app.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {app.status === 'rejected' && <XCircle className="w-5 h-5 text-red-600" />}
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{app.motivation}</p>
                      <div className="flex space-x-2">
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'approved')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-1 font-bold transition"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-1 font-bold transition"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center space-x-1 font-bold transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {userRole === 'superadmin' && (
              <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-black">
                <h3 className="text-2xl font-bold mb-6 text-black">Admin Management</h3>

                <div className="mb-8 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center text-black">
                    <UserPlus className="w-5 h-5 mr-2 text-red-600" />
                    Create New Admin
                  </h4>
                  <form onSubmit={createAdmin} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Username"
                      value={newAdmin.username}
                      onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password (min 6 characters)"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      required
                      minLength={6}
                    />
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">SuperAdmin</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold transition shadow"
                    >
                      Create Admin
                    </button>
                    {adminError && (
                      <div className="bg-red-100 border-2 border-red-600 text-red-800 p-3 rounded-lg">{adminError}</div>
                    )}
                    {adminSuccess && (
                      <div className="bg-green-100 border-2 border-green-600 text-green-800 p-3 rounded-lg">{adminSuccess}</div>
                    )}
                  </form>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-black">Existing Admins</h4>
                  {admins.length === 0 ? (
                    <p className="text-center py-8 text-gray-600">No admins found</p>
                  ) : (
                    <div className="space-y-3">
                      {admins.map((admin) => (
                        <div key={admin.id} className="border-2 border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition">
                          <div>
                            <p className="font-bold text-black">{admin.username}</p>
<p className="text-sm text-gray-600">
Role: <span className="text-red-600">{admin.role}</span> • Created: {new Date(admin.created_at).toLocaleDateString()}
</p>
</div>
<div className="flex space-x-2">
{admin.username !== 'superadmin' && (
<>
<select
value={admin.role}
onChange={(e) => updateAdminRole(admin.id, e.target.value)}
className="px-3 py-1 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600"
>
<option value="admin">Admin</option>
<option value="superadmin">SuperAdmin</option>
</select>
<button
onClick={() => deleteAdmin(admin.id)}
className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 flex items-center space-x-1 font-bold transition"
>
<Trash2 className="w-4 h-4" />
<span>Delete</span>
</button>
</>
)}
</div>
</div>
))}
</div>
)}
</div>
</div>
)}
</div>
)}
</div>
</div>
);
}
export default App;             