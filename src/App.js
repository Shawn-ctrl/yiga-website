import React, { useState, useEffect } from 'react';
import { Menu, X, Users, BookOpen, Globe, Shield, Scale, Award, LogOut, CheckCircle, XCircle, Clock, Trash2, UserPlus, Mail, Calendar, ArrowRight, ChevronRight, Image as ImageIcon, Download } from 'lucide-react';

const API_BASE = 'https://yiga-backend-1.onrender.com/api';

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

const teamMembers = [
  { name: "Jeremy Oronje", role: "Executive Director", bio: "Leading YIGA's vision and strategic direction", photo: "/images/Jeremy Oronje -Executive Director.jpeg" },
  { name: "Galdicia Wambui Gacihi", role: "Deputy Executive Director", bio: "Supporting executive leadership", photo: "/images/Deputy Executive Director.jpeg" },
  { name: "Ashley Munyasia", role: "Director of Research", bio: "Leading research initiatives", photo: "/images/Ashley Munyasia-Director of Research.jpeg" },
  { name: "Neema Toto", role: "Director of Events", bio: "Managing YIGA events", photo: "/images/Neema Toto-Director of Events.jpeg" },
  { name: "Neema Wanjiku", role: "Assistant Director of Events", bio: "Supporting events coordination", photo: "/images/Neema Wanjiku-Assistant Director Of Events.jpeg" },
  { name: "Phoebe Monari", role: "Director of Programs and Partnership", bio: "Building strategic partnerships", photo: "/images/Phebe Monari-Director of Programs and Partnerships.jpeg" },
  { name: "Kemunto J.O", role: "Assistant Director of Programs and Partnership", bio: "Supporting program coordination", photo: "/images/Joylynne Kemunto -Assistant Director of Programs and Partnership.jpeg" },
  { name: "Hilda Koipano", role: "Director of Communications", bio: "Leading communication strategies", photo: "/images/Hilda-Director of Communication.jpeg" },
  { name: "Beldine Mukami", role: "Assistant Communications Director", bio: "Supporting communication initiatives", photo: "/images/Beldine Mukami -Assistant Communications Director.jpeg" },
  { name: "Abel Omenge", role: "Director of Finance", bio: "Managing financial operations", photo: "/images/Abel Omenge-Director of Finance.jpeg" },
  { name: "Catherine Mbilo", role: "Secretary General", bio: "Managing organizational operations", photo: "/images/Catherine Mbilo-Secretary General.jpeg" }
];

const featuredArticles = [
  {
    id: 1,
    title: "BRICS Summit 2025: A Turning Point for Global South Cooperation",
    excerpt: "The 17th BRICS Summit in Rio de Janeiro marked a significant milestone in South-South collaboration, as member states reinforced their commitment to a more inclusive, multipolar international order amid geopolitical tensions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    category: "International Relations",
    date: "January 26, 2026",
    author: "Ashley Munyasia",
    readTime: "8 min read",
    fullContent: `
      <h2>A Milestone in South-South Collaboration</h2>
      <p>A significant milestone on the changing governance landscape of the world and South-South collaboration was the 17th BRICS Summit held in Rio de Janeiro on 6-7 July 2025. Summit held together Brazil, Russia, India, China, South Africa and newly admitted member states amidst a setback of increasing geopolitical rivalry, economic disintegration and dissatisfaction with Western dominated multilateral corporations.</p>
      
      <p>The meeting under the chairmanship of Brazil re-asserted the collective vision of BRICS to move towards a more inclusive, multipolar international order which would better represent the political and economic mass of the Global South.</p>

      <h3>The Rio de Janeiro Declaration</h3>
      <p>The main result of the summit was the declaration of Rio de Janeiro that encompassed a wide range of commitments in the areas of governance, economic cooperation, technology, climate change, and social development. The statement addressed the significance of multilateralism and respect of international law, at the same time, demanding structural reforms of major world institutions, such as the United Nations, the International Monetary Fund, and the World Bank.</p>

      <p>According to BRICS leaders, such institutions still fail to fully reflect the developing countries and emerging economies to limit the participation of the developing countries in global decision-making. Against this backdrop, the declaration also condemned the use of unilateral and protectionist economic policies which have been destabilizing the world trade and development.</p>

      <h3>Economic and Financial Cooperation</h3>
      <p>There was a high level of economic and financial cooperation in the deliberations of the summits. Member states reaffirmed their desire to intensify intra-BRICS trade and investment, with the increased utilization of local currencies in cross-border deals being given special emphasis on the same.</p>

      <p>This was seen as a policy of decreasing exposure to external financial shocks and as much as possible reducing reliance on the international monetary system which is centred on the US dollar. The New Development Bank was reiterated as a major institutional tool of aiding development of infrastructure, climate-based initiatives and sustainable development in the BRICS nations and other developing states.</p>

      <h3>Artificial Intelligence and Digital Governance</h3>
      <p>The 2025 summit was also characterized by an extension of the BRICS agenda into new spheres of global governance, with artificial intelligence and digital technologies being the most prominent ones. It became the first time that the topic of AI governance was recognized as a central concern, and leaders demanded to build inclusive and multilateral systems that will make the utilization of artificial intelligence ethical, responsible, and developmental.</p>

      <h3>Climate Change and Sustainable Development</h3>
      <p>Green building was also concerned with climate change and sustainable development as a two-fold issue. The BRICS leaders made, among other things, the need to increase climate financing and invest more in renewable energy, and to safeguard vital ecosystems. These deliberations highlighted the stance of the bloc that climate action be geared towards development requirements especially to the emerging economies that remain vulnerable to climatic changes.</p>

      <h3>Challenges and Future Outlook</h3>
      <p>Although the results of the summit are ambitious in scope, ongoing internal issues can still be seen through the BRICS framework. Mismatched national interests, varied perceptions on speed of expansion and the deficiency in institutionalization are still making collective action a beggar.</p>

      <p>Overall, the BRICS Summit 2025 in Rio de Janeiro confirmed the increasing role of the bloc in global relations and its desire to also transform world governance according to the priorities of the Global South. Although it is still constrained by structural and political factors, the summit showed that emerging economies are more and more engaged in an effort to shape global norms, diversify economic cooperation, and problem existing power asymmetry in the international system.</p>
    `
  },
  {
    id: 2,
    title: "Political Participation Among University Students in Kenya",
    excerpt: "A comprehensive study examining the current status of political awareness and participation among Kenyan university students, identifying barriers to engagement and proposing pathways to meaningful democratic inclusion.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    category: "Youth & Governance",
    date: "October 2025",
    author: "IRSAK Research Team",
    readTime: "15 min read",
    fullContent: `
      <h2>Executive Summary</h2>
      <p>Youth participation in politics is a cornerstone of democratic development and effective governance. In Kenya, university students represent a vital segment of the youth population with the potential to influence political discourse, policy direction, and leadership renewal. However, evidence suggests a persistent pattern of political disengagement among this group.</p>

      <h3>Key Findings</h3>
      <ul>
        <li>A sizeable proportion of university students demonstrate moderate levels of political awareness, particularly regarding their elected leaders and the manifestos of major political parties.</li>
        <li>A majority of university students exhibit low levels of active political participation, especially in areas such as voting and political party membership.</li>
        <li>Despite limited participation and prevailing skepticism, most university students express a willingness to vote in future elections, even though they have low levels of trust in the Independent Electoral and Boundaries Commission (IEBC).</li>
        <li>The study reveals a widespread distrust of politicians and key political institutions, including the IEBC and political parties, among university students.</li>
        <li>Social media platforms play an increasingly significant role in shaping political awareness, disseminating information, and facilitating mobilization and civic education among university students.</li>
      </ul>

      <h3>Historical Context</h3>
      <p>Historically, university students have been powerful agents of change across governance and other spheres of society. One of the most active periods of university student involvement in politics was between the 1960s and the 1990s, when student movements across the world became powerful forces for reform and resistance.</p>

      <p>In Kenya, university students, alongside civil society groups, religious leaders, and opposition politicians, played a central role in pushing for political liberalization in the 1990s. The Students of Nairobi University (SONU) functioned as a radical political pressure group that consistently confronted state authoritarianism.</p>

      <h3>Current Status of Political Participation</h3>
      <p>When examining the level of political participation, the study reveals generally low engagement across all indicators:</p>
      <ul>
        <li>Only 21% of respondents reported being registered voters as of 2025</li>
        <li>Just 12% stated that they voted in the previous general election</li>
        <li>Only 5% were registered members of political parties</li>
        <li>However, 42.9% reported taking part in protest activities, particularly the anti-Finance Bill demonstrations</li>
      </ul>

      <h3>Barriers to Participation</h3>
      <h4>Lack of Trust in Politicians and Institutions</h4>
      <p>Nearly 70% of respondents identified distrust in political leaders as a major reason for their limited engagement. An alarming 80% indicated that politicians do not care about the youth. Students perceive political parties primarily as vehicles for individual politicians to ascend to power, rather than as ideologically grounded institutions.</p>

      <h4>Security Concerns</h4>
      <p>The extrajudicial killings and enforced disappearance cases were 159 in 2024 in Kenya. Of these, 65% were police related killings and 55% were enforced disappearances. Female students reported higher levels of physical violation and harassment especially in crowded political events.</p>

      <h4>Information Inaccessibility</h4>
      <p>Students reported uncertainty about where to get credible political information or how to join political parties or participate in public consultation forums. Although 83% rely on social media as their primary source of information, algorithmic structures restrict civic content exposure.</p>

      <h3>The Role of Social Media</h3>
      <p>Social media has emerged as a primary medium of communication. Among those who took part in the anti-Finance Bill protests, 69% indicated that they first received information about the demonstrations online. When asked about their preferred platform for civic education initiatives, 70% expressed social media as their preferred avenue.</p>

      <h3>Recommendations</h3>
      <ul>
        <li>Strengthen trust between young people and both political leaders and institutions through intergenerational dialogues</li>
        <li>IEBC should implement targeted trust-building and engagement initiatives, especially in the lead-up to elections</li>
        <li>Political parties should develop youth-friendly, digestible content that summarizes their manifestos and policies</li>
        <li>Integrate civic education and social media literacy into university curricula</li>
        <li>Deliberately involve young people in public participation processes at all levels of governance</li>
      </ul>

      <p><em>This study was conducted by the International Relations Students Association of Kenya (IRSAK) across 28 universities in Kenya.</em></p>
    `
  },
  {
    id: 3,
    title: "Cracks in the CRINK: Analyzing Contemporary International Dynamics",
    excerpt: "An in-depth analysis of emerging fractures and realignments in contemporary international relations, examining how shifting power dynamics are reshaping global governance structures.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop",
    category: "International Relations",
    date: "January 2026",
    readTime: "10 min read",
    fullContent: `
      <h2>Understanding the CRINK Framework</h2>
      <p>The contemporary international system is experiencing significant shifts in power dynamics and alliance structures. This analysis examines the emerging cracks in what has been termed the "CRINK" configuration - representing key actors and relationships in modern global governance.</p>

      <h3>Emerging Fault Lines</h3>
      <p>Recent developments in international relations have revealed deepening fractures within previously stable alliance systems. These cracks manifest in various dimensions:</p>

      <ul>
        <li>Economic competition and trade tensions between major powers</li>
        <li>Diverging approaches to global governance and multilateral institutions</li>
        <li>Competing visions for regional security architecture</li>
        <li>Disagreements over technological standards and digital governance</li>
      </ul>

      <h3>Implications for Global Governance</h3>
      <p>The fragmentation of international cooperation frameworks has significant implications for addressing transnational challenges such as climate change, pandemics, and economic stability. As traditional alliances face internal pressures, new configurations are emerging that may reshape the global order.</p>

      <h3>Regional Perspectives</h3>
      <p>From an African perspective, these global realignments present both opportunities and challenges. The continent's growing economic and demographic weight positions it as an increasingly important player in shaping future international dynamics. However, African states must navigate carefully between competing power blocs while advancing their own interests.</p>

      <h3>Looking Forward</h3>
      <p>The evolution of international relations in the coming years will likely be characterized by increased multipolarity, more complex alliance structures, and greater competition over the rules and norms governing global governance. Understanding these dynamics is crucial for policymakers, diplomats, and scholars seeking to navigate an increasingly complex international landscape.</p>

      <p>As these cracks in the international system continue to widen, the need for innovative diplomatic approaches and flexible institutional arrangements becomes ever more apparent. The future of global governance will depend on the ability of states and international organizations to adapt to these new realities while maintaining cooperation on critical global challenges.</p>
    `
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

            {/* Executive Leadership */}
            {/* Team Members Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition group">
                  <div className="text-center">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-red-600 shadow-lg group-hover:scale-110 transition duration-300" 
                    />
                    <h4 className="text-xl font-bold text-black mb-2">{member.name}</h4>
                    <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Call to Action */}
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
                {/* Terms & Conditions */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-3 h-5 w-5"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a
                        href="#terms"
                        onClick={(e) => {e.preventDefault(); alert('Terms:\n\nï Respect YIGA code of conduct\nï Active participation required\nï Annual fee: KSH 1,000\nï Professional conduct expected\nï Communications consent');}}
                        className="text-red-600 underline hover:text-red-700"
                      >
                        Terms & Conditions
                      </a>
                      {' '}including the annual membership fee of KSH 1,000
                    </span>
                  </label>
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














