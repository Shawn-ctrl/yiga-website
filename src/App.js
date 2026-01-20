import React, { useState, useEffect } from 'react';
import { Menu, X, Users, BookOpen, Globe, Shield, Scale, Award, LogOut, CheckCircle, XCircle, Clock, Trash2, UserPlus, Mail, Calendar, ArrowRight, ChevronRight, Image as ImageIcon, Download } from 'lucide-react';

const API_BASE = 'https://yiga-backend.onrender.com/api';

const teamPhotos = {
  heroImage: '/images/hero.jpg',
  aboutImage: '/images/about.jpg',
  meetingImage: '/images/meeting.jpg',
  eventImage: '/images/event.jpg',
  workshopImage: '/images/workshop.jpg',
  galleryImages: [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.jpg'
  ]
};

const teamMembers = {
  executiveLeadership: {
    head: {
      name: "Jeremy Oronje",
      role: "Executive Director",
      bio: "Leading YIGA's vision and strategic direction",
      photo: "/images/team/jeremy-oronje.jpg"
    },
    deputy: {
      name: "Galdicia Wambui Gacihi",
      role: "Deputy Executive Director",
      bio: "Supporting executive leadership",
      photo: "/images/team/galdicia-gacihi.jpg"
    }
  },
  departments: [
    { head: { name: "Ashley Munyasia", role: "Director of Research", bio: "Leading research initiatives", photo: "/images/team/ashley-munyasia.jpg" }, deputy: null },
    { head: { name: "Neema", role: "Director of Events", bio: "Managing YIGA events", photo: "/images/team/neema.jpg" }, deputy: null },
    { head: { name: "Phoebe Monari", role: "Director of Programs", bio: "Building partnerships", photo: "/images/team/phoebe-monari.jpg" }, deputy: { name: "Kemunto J.O", role: "Assistant Director", bio: "Supporting programs", photo: "/images/team/assistant-director-programs.jpg" } },
    { head: { name: "Hilda Koipano", role: "Director of Communications", bio: "Leading communications", photo: "/images/team/hilda-koipano.jpg" }, deputy: { name: "Beldine Mukami", role: "Assistant Director", bio: "Supporting communications", photo: "/images/team/beldine-mukami.jpg" } },
    { head: { name: "Abel Omenge", role: "Director of Finance", bio: "Managing finances", photo: "/images/team/abel-omenge.jpg" }, deputy: null },
    { head: { name: "Catherine Mbilo", role: "Secretary General", bio: "Managing operations", photo: "/images/team/catherine-mbilo.jpg" }, deputy: null }
  ],
  executive: [
    { 
      name: "Jeremy Oronje", 
      role: "Executive Director", 
      bio: "Leading YIGA's vision and strategic direction in youth empowerment and international affairs",
      photo: "/images/team/jeremy-oronje.jpg"
    },
    { 
      name: "Abel Omenge", 
      role: "Director of Finance", 
      bio: "Managing financial operations and ensuring fiscal responsibility across all programs",
      photo: "/images/team/abel-omenge.jpg"
    },
    { 
      name: "Hilda Koipano", 
      role: "Director of Communications", 
      bio: "Leading communication strategies and managing public relations for YIGA",
      photo: "/images/team/hilda-koipano.jpg"
    },
    { 
      name: "Phoebe Monari", 
      role: "Director of Programs and Partnership", 
      bio: "Building strategic partnerships and coordinating program implementation",
      photo: "/images/team/phoebe-monari.jpg"
    },
    { 
      name: "Beldine Mukami Maina", 
      role: "Assistant Communications Director", 
      bio: "Supporting communication initiatives and managing media engagement",
      photo: "/images/team/beldine-mukami.jpg"
    },
    { 
      name: "Catherine Mbilo", 
      role: "Secretary General", 
      bio: "Managing organizational operations and coordinating executive functions",
      photo: "/images/team/catherine-mbilo.jpg"
    },
    { 
      name: "Kemunto J.O", 
      role: "Assistant Director of Programs and Partnership", 
      bio: "Supporting program coordination and partnership management",
      photo: "/images/team/assistant-director-programs.jpg"
    }
  ],
  advisory: [
    { name: "Advisory Council", role: "Strategic Guidance", bio: "Experienced professionals providing technical support" }
  ]
};

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

const newsletterArchives = [
  {
    id: 1,
    title: "November 2025 - Youth Voices in Climate Action",
    date: "November 30, 2025",
    excerpt: "This month's highlights on youth-led climate initiatives across Africa"
  },
  {
    id: 2,
    title: "October 2025 - Peace and Security Roundup",
    date: "October 31, 2025",
    excerpt: "Key developments in African peace processes and youth involvement"
  },
  {
    id: 3,
    title: "September 2025 - Governance Reforms Update",
    date: "September 30, 2025",
    excerpt: "Latest insights on democratic reforms and youth participation"
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle URL parameters for direct page access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
      setCurrentPage(page);
    }
  }, []);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [applications, setApplications] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterPreferences, setNewsletterPreferences] = useState({
    email: '',
    frequency: 'monthly',
    topics: []
  });

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    institution: '',
    program: 'General Membership',
    motivation: '',
    experience: ''
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
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Set auth state FIRST
        setAuthToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setUsername(data.user.username);
        localStorage.setItem('username', data.user.username);
        setUserRole(data.user.role);
        localStorage.setItem('userRole', data.user.role);
        setLoginData({ username: '', password: '' });
        
        // CRITICAL FIX: Fetch data AFTER setting state
        // Pass the token directly since state hasn't updated yet
        await fetchApplications(data.token);
        if (data.user.role === 'superadmin') {
          await fetchAdmins(data.token);
        }
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Connection error: ' + error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
    setCurrentPage('home');
  };

  const fetchApplications = async (token = authToken) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/applications`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setApplications(Array.isArray(data.applications) ? data.applications : []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async (token = authToken) => {
    try {
      const response = await fetch(`${API_BASE}/admins`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
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
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          institution: '',
          program: 'General Membership',
          motivation: '',
          experience: ''
        });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    try {
      const response = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus(''), 5000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus(''), 5000);
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 5000);
    }
  };

  const handleNewsletterPreferencesSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    try {
      const response = await fetch(`${API_BASE}/newsletter/preferences`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newsletterPreferences)
      });
      
      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterPreferences({ email: '', frequency: 'monthly', topics: [] });
        setTimeout(() => setNewsletterStatus(''), 5000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus(''), 5000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 5000);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
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
      const response = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
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
      const response = await fetch(`${API_BASE}/auth/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
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
      const response = await fetch(`${API_BASE}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
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
      const response = await fetch(`${API_BASE}/admins/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const toggleNewsletterTopic = (topic) => {
    setNewsletterPreferences(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
        üåç Join Africa's Leading Youth in International Affairs ‚Ä¢ Applications Open
      </div>

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

            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'team', 'insights', 'newsletter', 'programs', 'join'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === page
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
              {isLoggedIn && (
                <>
                  <button
                    onClick={() => setCurrentPage('admin')}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === 'admin'
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'team', 'insights', 'newsletter', 'programs', 'join'].map((page) => (
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
                <>
                  <button
                    onClick={() => {
                      setCurrentPage('admin');
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg font-semibold ${
                      currentPage === 'admin'
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div>
        {currentPage === 'home' && (
          <div>
            <div className="relative h-[600px] bg-gradient-to-r from-black via-gray-900 to-red-900 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url(${teamPhotos.heroImage})`,
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
                        <span>‚Ä¢ {article.readTime}</span>
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

            <div className="bg-gradient-to-r from-red-600 to-black text-white py-16">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <Mail className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-xl mb-8 text-gray-200">
                  Stay updated with the latest insights, events, and opportunities in African international affairs
                </p>
                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-4 rounded-lg text-black focus:ring-2 focus:ring-white"
                      required
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === 'submitting'}
                      className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-2xl disabled:bg-gray-300"
                    >
                      {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  {newsletterStatus === 'success' && (
                    <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg font-bold">
                      ‚úÖ Successfully subscribed!
                    </div>
                  )}
                  {newsletterStatus === 'error' && (
                    <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-lg font-bold">
                      ‚ùå Subscription failed. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>

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

        {currentPage === 'about' && (
          <div>
            <div className="relative h-96 bg-gradient-to-r from-black to-red-900">
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url(${teamPhotos.aboutImage})`,
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
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-black mb-6 text-center">Who We Are</h3>
                <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
                  Youth in Global Affairs (YIGA) is a youth-led civil society organization that champions meaningful youth engagement with the world's most critical global challenges. We empower young people to think, act, and lead through evidence-based research, capacity-building trainings, dynamic workshops, intellectual dialogues, and conferences.
                </p>
              </div>

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
                    "Create inclusive spaces for thoughtful discourse, idea-sharing, and collaboration"
                  ].map((objective, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-lg">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-12 rounded-lg shadow-xl">
                <h3 className="text-3xl font-bold text-black mb-8 text-center">Focus Areas</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Foreign Policy", icon: Globe },
                    { name: "Good Governance", icon: Scale },
                    { name: "Climate Change", icon: Award },
                    { name: "Peace & Security", icon: Shield },
                    { name: "Culture & Heritage", icon: BookOpen }
                  ].map((area, idx) => (
                    <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
                      <area.icon className="w-12 h-12 mx-auto text-red-600 mb-3" />
                      <h4 className="font-bold text-lg text-black">{area.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'team' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-black mb-12 text-center">Our Team</h2>
            
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-black mb-8 text-center">Directorate</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.executive.map((member, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-t-4 border-red-600">
                    <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-red-600 shadow-lg" />
                    <h4 className="text-xl font-bold text-black text-center mb-2">{member.name}</h4>
                    <p className="text-red-600 font-semibold text-center mb-2">{member.role}</p>
                    <p className="text-gray-600 text-center text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-black text-white py-16 rounded-lg">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-6">Join Our Team</h3>
                <p className="text-xl mb-8">Passionate about youth empowerment and international affairs?</p>
                <button onClick={() => setCurrentPage('join')} className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">Apply Now</button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'newsletter' && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-black mb-12 text-center">Newsletter</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-xl mb-12">
              <h3 className="text-2xl font-bold text-black mb-6">Subscribe with Preferences</h3>
              <form onSubmit={handleNewsletterPreferencesSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newsletterPreferences.email}
                    onChange={(e) => setNewsletterPreferences({...newsletterPreferences, email: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Frequency</label>
                  <select
                    value={newsletterPreferences.frequency}
                    onChange={(e) => setNewsletterPreferences({...newsletterPreferences, frequency: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">Topics of Interest</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['Foreign Policy', 'Climate Change', 'Peace & Security', 'Good Governance', 'Youth Leadership', 'Economic Development'].map((topic) => (
                      <label key={topic} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newsletterPreferences.topics.includes(topic)}
                          onChange={() => toggleNewsletterTopic(topic)}
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={newsletterStatus === 'submitting'}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe Now'}
                </button>

                {newsletterStatus === 'success' && (
                  <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg font-bold">
                    ‚úÖ Successfully subscribed with your preferences!
                  </div>
                )}
                {newsletterStatus === 'error' && (
                  <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-lg font-bold">
                    ‚ùå Subscription failed. Please try again.
                  </div>
                )}
              </form>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-6">Newsletter Archives</h3>
              <div className="space-y-4">
                {newsletterArchives.map((archive) => (
                  <div key={archive.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-black">{archive.title}</h4>
                      <button className="text-red-600 hover:text-red-800">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">{archive.excerpt}</p>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {archive.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'insights' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-black mb-12 text-center">Latest Insights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                  <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <span className="text-red-600 font-semibold text-sm">{article.category}</span>
                    <h3 className="text-2xl font-bold text-black mt-2 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date} ‚Ä¢ {article.readTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'programs' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-black mb-12 text-center">Our Programs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Research Fellowship", desc: "Conduct research on critical African issues", icon: BookOpen },
                { title: "Policy Analysis", desc: "Analyze and contribute to policy development", icon: Scale },
                { title: "Youth Leadership", desc: "Develop leadership skills for global engagement", icon: Award },
                { title: "Networking Events", desc: "Connect with professionals across Africa", icon: Users }
              ].map((program, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
                  <program.icon className="w-16 h-16 text-red-600 mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-lg">{program.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === 'programs' && (
          <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
                <p className="text-xl max-w-3xl">Empowering African youth through research, policy analysis, leadership development, and international engagement</p>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="max-w-6xl mx-auto px-4 py-16">
              
              {/* Research Fellowship */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <BookOpen className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">Research Fellowship Program</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Our flagship program enables young researchers to conduct in-depth studies on critical issues affecting African governance, policy development, and international relations. Fellows work alongside experienced mentors to produce impactful research that informs policy decisions.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï Research funding and resources</li>
                          <li>ï One-on-one mentorship from experts</li>
                          <li>ï Publication opportunities</li>
                          <li>ï Access to research networks</li>
                          <li>ï Presentation at conferences</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Duration</p>
                        <p className="text-black">6-12 months</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">University students & recent graduates</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Commitment</p>
                        <p className="text-black">10-15 hours/week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Analysis */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <Scale className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">Policy Analysis & Advocacy</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Develop critical policy analysis skills while contributing to real-world policy development processes. This program trains participants in research methodologies, policy writing, stakeholder engagement, and advocacy strategies that drive meaningful change.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï Policy analysis training</li>
                          <li>ï Advocacy campaign experience</li>
                          <li>ï Stakeholder engagement skills</li>
                          <li>ï Policy brief writing</li>
                          <li>ï Networking with policymakers</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Duration</p>
                        <p className="text-black">3-6 months</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">Students in political science, law, public policy</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Commitment</p>
                        <p className="text-black">8-12 hours/week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Youth Leadership */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <Award className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">Youth Leadership Development</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Build essential leadership competencies through workshops, seminars, and practical experiences. Our comprehensive leadership program prepares young Africans to lead with integrity, vision, and impact in their communities and on the global stage.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï Leadership certification</li>
                          <li>ï Public speaking skills</li>
                          <li>ï Team management training</li>
                          <li>ï International exposure</li>
                          <li>ï Mentorship from leaders</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Duration</p>
                        <p className="text-black">Ongoing workshops</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">Youth aged 18-35</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Commitment</p>
                        <p className="text-black">Flexible attendance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* International Relations */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <Globe className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">International Relations Track</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Engage with global affairs through diplomacy, international cooperation, and cross-cultural dialogue. This track provides hands-on experience in international organizations, diplomatic processes, and global governance mechanisms.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï International partnerships</li>
                          <li>ï Diplomatic protocol training</li>
                          <li>ï Conference participation</li>
                          <li>ï Global networking</li>
                          <li>ï Cultural exchange opportunities</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Duration</p>
                        <p className="text-black">4-8 months</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">Students & young professionals in IR</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Commitment</p>
                        <p className="text-black">10-15 hours/week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-12 text-center mt-12">
                <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of young Africans making an impact through YIGA programs</p>
                <button 
                  onClick={() => setCurrentPage('join')}
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-flex items-center gap-2"
                >
                  Apply Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}


        {currentPage === 'join' && (
          <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-black mb-8 text-center">Join YIGA</h2>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  ‚úÖ Application submitted successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  ‚ùå Submission failed. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="Research Fellowship">Research Fellowship</option>
                    <option value="Policy Analysis">Policy Analysis</option>
                    <option value="Youth Leadership">Youth Leadership</option>
                    <option value="General Membership">General Membership</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Motivation</label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        )}

        {currentPage === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            {!isLoggedIn ? (
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-black mb-8 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl">
                  {loginError && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {loginError}
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-400"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h2>
                  <p className="text-gray-600">Welcome, {username} ({userRole})</p>
                </div>

                {userRole === 'superadmin' && (
                  <div className="mb-12 bg-white p-8 rounded-lg shadow-xl">
                    <h3 className="text-2xl font-bold text-black mb-6">Create New Admin</h3>
                    {adminError && (
                      <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {adminError}
                      </div>
                    )}
                    {adminSuccess && (
                      <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {adminSuccess}
                      </div>
                    )}
                    <form onSubmit={createAdmin} className="grid md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Username"
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <select
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
                      >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create
                      </button>
                    </form>

                    <div className="mt-8">
                      <h4 className="text-xl font-bold text-black mb-4">Manage Admins</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left">Username</th>
                              <th className="px-4 py-3 text-left">Role</th>
                              <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {admins.map((admin) => (
                              <tr key={admin.id} className="border-b">
                                <td className="px-4 py-3">{admin.username}</td>
                                <td className="px-4 py-3">
                                  <select
                                    value={admin.role}
                                    onChange={(e) => updateAdminRole(admin.id, e.target.value)}
                                    className="px-3 py-1 border rounded"
                                    disabled={admin.username === username}
                                  >
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Superadmin</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3">
                                  {admin.username !== username && (
                                    <button
                                      onClick={() => deleteAdmin(admin.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white p-8 rounded-lg shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-black">Applications</h3>
                    <button
                      onClick={fetchApplications}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                      Refresh
                    </button>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 mx-auto text-gray-400 animate-spin" />
                      <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                  ) : applications.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No applications yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Country</th>
                            <th className="px-4 py-3 text-left">Program</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((app) => (
                            <tr key={app.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3">{app.full_name}</td>
                              <td className="px-4 py-3">{app.email}</td>
                              <td className="px-4 py-3">{app.country}</td>
                              <td className="px-4 py-3">{app.program}</td>
                              <td className="px-4 py-3">
                                <select
                                  value={app.status}
                                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => deleteApplication(app.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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








