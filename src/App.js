import React, { useState, useEffect } from 'react';
import { Menu, X, Users, BookOpen, Globe, Shield, Scale, Award, LogOut, CheckCircle, XCircle, Clock, Trash2, UserPlus, Mail, Calendar, ArrowRight, ChevronRight, Image as ImageIcon, Download , Facebook, Twitter, Instagram, Linkedin} from 'lucide-react';

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

const articles = [
  {
    id: 1,
    title: "BRICS Summit 2025: A Turning Point for Global South Cooperation",
    excerpt: "The 17th BRICS Summit in Rio de Janeiro marked a significant milestone in South-South collaboration, as member states reinforced their commitment to a more inclusive, multipolar international order amid geopolitical tensions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    category: "International Relations",
    date: "January 26, 2026",
    author: "Ashley Munyasia",
    readTime: "8 min read",
    tags: ["BRICS", "Global South", "Multilateralism"],
    fullContent: `A significant milestone on the changing governance landscape of the world and South-South collaboration was the 17th BRICS Summit held in Rio de Janeiro on 6-7 July 2025. Summit held together Brazil, Russia, India, China, South Africa and newly admitted member states amidst a setback of increasing geopolitical rivalry, economic disintegration and dissatisfaction with Western dominated multilateral corporations. The meeting under the chairmanship of Brazil re-asserted the collective vision of BRICS to move towards a more inclusive, multipolar international order which would better represent the political and economic mass of the Global South.

The main result of the summit was the declaration of Rio de Janeiro that encompassed a wide range of commitments in the areas of governance, economic cooperation, technology, climate change, and social development. The statement addressed the significance of multilateralism and respect of international law, at the same time, demanding structural reforms of major world institutions, such as the United Nations, the International Monetary Fund, and the World Bank. According to BRICS leaders, such institutions still fail to fully reflect the developing countries and emerging economies to limit the participation of the developing countries in global decision-making. Against this backdrop, the declaration also condemned the use of unilateral and protectionist economic policies which have been destabilizing the world trade and development.

There was a high level of economic and financial cooperation in the deliberations of the summits. Member states reaffirmed their desire to intensify intra-BRICS trade and investment, with the increased utilization of local currencies in cross-border deals being given special emphasis on the same. This was seen as a policy of decreasing exposure to external financial shocks and as much as possible reducing reliance on the international monetary system which is centred on the US dollar. The New Development Bank was reiterated as a major institutional tool of aiding development of infrastructure, climate-based initiatives and sustainable development in the BRICS nations and other developing states.

The 2025 summit was also characterized by an extension of the BRICS agenda into new spheres of global governance, with artificial intelligence and digital technologies being the most prominent ones. It became the first time that the topic of AI governance was recognized as a central concern, and leaders demanded to build inclusive and multilateral systems that will make the utilization of artificial intelligence ethical, responsible, and developmental. This emphasis was a manifestation of the larger issues that current technological standards in the world have the potential to push developing nations aside and increase the digital divide.

Green building was also concerned with climate change and sustainable development as a two-fold issue. The BRICS leaders made, among other things, the need to increase climate financing and invest more in renewable energy, and to safeguard vital ecosystems. These deliberations highlighted the stance of the bloc that climate action be geared towards development requirements especially to the emerging economies that remain vulnerable to climatic changes. Simultaneously, the social development projects, particularly the ones focused on health disparities and socially predetermined diseases, were an indicator of an initiative to expand cooperation to the traditional economical and strategic spheres.

Although the results of the summit are ambitious in the scope, ongoing internal issues can still be seen through the BRICS framework. Mismatched national interests, varied perceptions on speed of expansion and the deficiency in institutionalization are still making collective action a beggar. Such lack of certain prominent leaders also cast doubts on cohesion and coordination in the bloc. In addition, the disjunction between the declarative and practical policy achievements is an issue that is still repeated among commentators.

The overall geopolitical implications of the summit were pointed out by international responses. The encounter was done in a climate of increased tensions between it and the Western powers, especially the United States, which were consolidating the views of BRICS as a future counter-power to the Western power in world governance. Meanwhile, there are still discussions as to whether BRICS is turning into a sensible alternative politics bloc or is still a consultative club with little enforcement ability.

Overall, the BRICS Summit 2025 in Rio de Janeiro confirmed the increasing role of the bloc in global relations and its desire to also transform world governance according to the priorities of the Global South. Although it is still constrained by structural and political factors, the summit showed that emerging economies are more and more engaged in an effort to shape global norms, diversify economic cooperation, and problem existing power asymmetry in the international system.`
  },
  {
    id: 2,
    title: "Political Participation Among University Students in Kenya",
    excerpt: "A comprehensive study examining the current status of political awareness and participation among Kenyan university students, identifying barriers to engagement and proposing pathways to meaningful democratic inclusion.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
    category: "Youth & Governance",
    date: "October 2025",
    author: "IRSAK Research Team",
    readTime: "15 min read",
    tags: ["Youth Engagement", "Governance", "Political Participation"],
    fullContent: `This comprehensive study examined political participation among university students across 28 Kenyan universities. The research reveals critical insights into youth political engagement patterns and barriers.

KEY FINDINGS: University students demonstrate moderate political awareness - governors are most recognized while MCAs are least known. Only 56% know about the National Youth Council. While 58% are aware of party manifestos, their understanding is superficial, limited to slogans like "bottom-up" without grasping actual policies.

PARTICIPATION LEVELS: Active political participation remains alarmingly low. Only 21% are registered voters, just 12% voted in the last election, and merely 5% are political party members. However, 42.9% participated in protests, particularly the anti-Finance Bill demonstrations, showing selective engagement.

MAJOR BARRIERS: Nearly 70% cite distrust of politicians as the primary barrier, with 80% believing politicians don't care about youth. This stems from perceptions of corruption, broken promises, and exclusion from decision-making. Students also distrust the IEBC, citing controversies like Chris Msando's 2017 death and the 2022 commissioner resignations. Political parties are viewed as vehicles for individual advancement rather than ideological institutions.

Security concerns significantly deter participation. In 2024, Kenya witnessed 159 cases of extrajudicial killings and enforced disappearances - 65% police-related, with a 450% increase in disappearances from 2023. Female students fear sexual harassment during protests; male students fear abductions and police brutality. These create self-censorship, producing politically aware but risk-averse "keyboard warriors."

Information inaccessibility compounds the problem. Students don't know where to find credible political information or how to join parties. While 83% rely on social media, algorithmic echo chambers expose them to entertainment over substantive civic content, making them susceptible to misinformation.

SOCIAL MEDIA'S ROLE: 83% use social media as their primary information source, 69% learned about anti-Finance Bill protests online, and 70% prefer it for civic education. Kenya averages 3 hours 43 minutes daily on social media - 1 hour 13 minutes above the global average.

HISTORICAL CONTEXT: This contrasts sharply with the 1960s-1990s when students drove transformative change - from Columbia's 1968 protests against Vietnam War, to Tiananmen Square's 1989 democracy demands, to Kenya's 1990s pro-democracy movements that achieved multipartism. Today, engagement has narrowed from national governance to campus welfare issues.

RECOMMENDATIONS: Building trust through NCIC-facilitated intergenerational dialogues and IEBC transparency initiatives. Integrating civic education and social media literacy into university curricula. Government must systematically include youth in public participation per Article 55 of the Constitution. Students must shift from passive social media consumption to critical engagement with credible sources.

CONCLUSION: Political apathy isn't mere disinterest but a response to systemic exclusion, fear, and disillusionment. Students recognize dysfunction but perceive it as unchangeable. However, this demographic has tremendous transformative potential. By investing in informed, secure, trust-based participation structures, Kenya can shift young citizens from political margins to governance centers, ensuring democratic vitality.`
  },
    {
    id: 3,
    title: "Cracks in the CRINK: Illusions of an Autocratic Alliance",
    excerpt: "An in-depth analysis of the fragile coalition between China, Russia, Iran, and North Korea, examining how divergent agendas and internal contradictions undermine the notion of a unified autocratic axis.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop",
    category: "International Relations",
    date: "January 2026",
    author: "Caroline Nyagaki",
    readTime: "10 min read",
    tags: ["CRINK", "Geopolitics", "International Relations"],
    fullContent: `In recent years, geopolitical analysts have increasingly referred to the emerging alignment between China, Russia, Iran, and North Korea as an "autocratic axis"óa loose coalition bound by opposition to Western-led global governance. Popularly labeled as the CRINK bloc, this group is often portrayed as a rising challenge to the liberal international order, capable of undermining U.S. and European strategic influence. However, a closer examination reveals that the bloc is far from cohesive. Instead, it is characterized by fragility, transactional interests, and internal contradictions.

Despite appearances, CRINK is not a unified alliance. It lacks the institutional infrastructure, mutual defense agreements, or shared strategic vision found in established alliances like NATO. What binds these states is not long-term loyalty or ideological harmony, but a shared opposition to Western dominance, a desire for regime survival, and selective cooperation based on short-term advantage.

A BLOC OF DIVERGENT AGENDAS

Though often grouped together as "anti-Western" actors, the CRINK countries differ significantly in both their regional ambitions and global outlooks.

China envisions a restructured international order that reflects its growing global power but remains economically interdependent with the West. Stability, not chaos, is in Beijing's best interest.

Russia, increasingly isolated after its 2022 invasion of Ukraine, now leans heavily on China for trade and political cover. Yet it continues to act aggressively and unpredictably, seeking to reclaim lost geopolitical influence.

Iran walks a fine line between revolutionary ideology and pragmatic diplomacy. While it actively supports armed proxies and regional militancy, it also seeks economic relief and engagement with Europe and emerging powers.

North Korea, perhaps the most unpredictable member, continues to pursue nuclear brinkmanship. Its leadership appears more focused on regime survival and domestic control than any form of coherent external alliance.

This lack of strategic unity undermines any serious attempt to view CRINK as a consolidated power bloc.

CHINA: CAUTIOUS LEADER, NOT COMMANDER

China's role within CRINK is particularly revealing. It is the most powerful playeróeconomically, diplomatically, and increasingly militarily. Yet Beijing has consistently avoided taking on a leadership role within the group.

For instance, although China has provided economic support to Russia amid Western sanctions, it has avoided direct military assistance to avoid triggering secondary sanctions. Similarly, while it maintains close energy and infrastructure ties with Iran, it has not defended Iran's nuclear ambitions on the world stage. As for North Korea, China regards it more as a strategic liability than an asset, frequently urging restraint after provocative missile tests.

Rather than building an alliance based on loyalty, China appears to be managing a series of fragile dependencies, careful not to overcommit to any partner.

NO REAL ALLIANCE, JUST SHARED CONVENIENCE

Unlike structured alliances that commit to mutual defense and long-term strategy, CRINK operates more like a network of convenience. There is no CRINK summit, no joint military command, no institutional mechanism for resolving disputes or planning long-term collaboration.

Their cooperation is issue-specific and driven by necessity:
- Russia turns to Iran for drones
- North Korea supplies artillery shells to Russian forces in Ukraine
- China trades with Russia and Iran to secure cheap energy
- Iran offers military and intelligence support to other authoritarian regimes

But this does not equate to trust. In fact, mutual suspicion and asymmetry define these relationships. Russia's growing dependence on Chinese technology and trade has led to fears of strategic subordination. Iran, meanwhile, is wary of China's increasing influence over its economy. North Korea continues to act independently, often ignoring Beijing's calls for restraint.

IMPLICATIONS FOR GLOBAL STABILITY

The illusion of unity within CRINK has two important implications for international affairs.

First, it shows that Western fears of a coordinated "axis of autocracy" may be overstated. The bloc's internal divisions and lack of strategic coherence limit its ability to act as a united front. This presents an opportunity for diplomatic engagement and wedge strategies that target these divisions.

Second, CRINK's informal cooperation, while fragmented, still poses a challenge. Through asymmetric tacticsósuch as cyberattacks, sanctions evasion, arms transfers, and disinformation campaignsóthese states can still undermine global norms and distract Western powers by igniting crises on multiple fronts simultaneously.

The West, and indeed the Global South, must be alert not just to the actions of CRINK states, but to the conditions that enable them to act: instability, broken diplomacy, and economic fragmentation.

CONCLUSION: FRAGILE ALLIANCES, NOT FATAL THREATS

The CRINK bloc is more a geopolitical mirage than a durable axis. What unites China, Russia, Iran, and North Korea is not a grand design, but shared grievance and opportunism. As such, it should not be dismissedóbut neither should it be overestimated.

For international relations scholars and emerging policy thinkers, including members of IRSAK, this case highlights the importance of examining alliances beyond surface-level narratives. Real power blocs are built on trust, coordination, and shared valuesónot just mutual enemies.`
  }
];


// Past Activities Data - REPLACE WITH REAL DATA TOMORROW
const pastActivities = [
  {
    id: 1,
    title: "Youth Leadership Summit 2024",
    date: "December 15, 2024",
    location: "Nairobi, Kenya",
    description: "A three-day summit bringing together 200+ young leaders from across Africa to discuss governance, policy, and international relations.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    category: "Summit",
    attendees: "200+ participants",
    outcomes: [
      "Policy recommendations on youth inclusion",
      "Network of 50+ youth organizations established",
      "3 research partnerships initiated"
    ]
  },
  {
    id: 2,
    title: "Policy Dialogue: Climate Action in East Africa",
    date: "November 8, 2024",
    location: "Virtual",
    description: "Interactive roundtable featuring youth activists, government officials, and climate experts discussing climate policy implementation.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop",
    category: "Roundtable",
    attendees: "80+ participants",
    outcomes: [
      "Youth climate action framework developed",
      "Collaboration with 5 government agencies",
      "Policy brief on renewable energy published"
    ]
  },
  {
    id: 3,
    title: "Research Workshop: Data-Driven Advocacy",
    date: "October 20, 2024",
    location: "Kampala, Uganda",
    description: "Intensive workshop training young researchers in quantitative and qualitative research methods for policy advocacy.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop",
    category: "Workshop",
    attendees: "45 researchers",
    outcomes: [
      "15 research projects initiated",
      "Data analysis toolkit distributed",
      "Mentorship program launched"
    ]
  },
  {
    id: 4,
    title: "International Relations Conference",
    date: "September 5, 2024",
    location: "Addis Ababa, Ethiopia",
    description: "Annual conference examining Africa's role in global governance and multilateral institutions.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
    category: "Conference",
    attendees: "150+ participants",
    outcomes: [
      "Position paper on AU reforms",
      "Youth delegation to UN formed",
      "Regional cooperation framework"
    ]
  }
];

// Real YIGA Articles with full content
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
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
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
              {['home', 'about', 'team', 'articles', 'activities', 'programs', 'join'].map((page) => (
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
              {['home', 'about', 'team', 'articles', 'activities', 'programs', 'join'].map((page) => (
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
                {articles && articles.map((article) => (
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
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>{expandedArticle === article.id && (<div className="mt-4 text-gray-700 leading-relaxed border-t pt-4">{article.fullContent}</div>)}
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <button onClick={() => setSelectedArticle(article)} className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all cursor-pointer">
                        <span>Read More</span>
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

        {/* PDF-like Article Viewer */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto">
            <div className="min-h-screen bg-white">
              {/* Close button */}
              <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold transition"
                  >
                    <X className="w-5 h-5" />
                    Close
                  </button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* PDF-like Document */}
              <div className="max-w-4xl mx-auto px-8 py-12 bg-white shadow-2xl my-8">
                {/* Header */}
                <div className="border-b-4 border-red-600 pb-8 mb-8">
                  <div className="mb-4">
                    <span className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold uppercase tracking-wide">
                      {selectedArticle.category}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Author</p>
                        <p className="font-semibold text-black">{selectedArticle.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Published</p>
                        <p className="font-semibold text-black">{selectedArticle.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {selectedArticle.image && (
                  <div className="mb-10">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* Abstract/Excerpt */}
                <div className="bg-gray-50 border-l-4 border-red-600 p-6 mb-10">
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Abstract</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedArticle.excerpt}</p>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed text-justify space-y-6">
                    {selectedArticle.fullContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t-2 border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-black mb-2">About the Author</h3>
                    <p className="text-gray-600">{selectedArticle.author}</p>
                  </div>
                </div>

                {/* Close button at bottom */}
                <div className="mt-12 text-center">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold shadow-lg"
                  >
                    Back to Insights
                  </button>
                </div>
              </div>
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
              {/* Safe Space Program */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <Mail className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">Safe Space Program</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Safe Space is a virtual, dialogue-driven initiative by Youth in Global Affairs (YIGA) that provides young people with an inclusive and respectful platform to engage on key governance issues at both domestic and international levels. Designed primarily as a safe and moderated environment for open conversation, the program enables participants to critically engage on questions of leadership, public policy, accountability, democratic participation, peace, and global affairs.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï Safe and moderated environment for open dialogue</li>
                          <li>ï Critical engagement on leadership and public policy</li>
                          <li>ï Platform to discuss accountability and democracy</li>
                          <li>ï Understanding of peace and global affairs</li>
                          <li>ï Respectful peer-to-peer learning experience</li>
                          <li>ï Virtual accessibility from anywhere</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Format</p>
                        <p className="text-black">Virtual discussions</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">All young people interested in governance</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Frequency</p>
                        <p className="text-black">Monthly sessions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roundtable Discussions */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition">
                <div className="flex items-start gap-6">
                  <Users className="w-16 h-16 text-red-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-black mb-4">Roundtable Discussions</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">Overview</h3>
                        <p className="text-gray-700">
                          Roundtable Discussions are a core convening platform under Youth in Global Affairs (YIGA), bringing together youth leaders, scholars, practitioners, policymakers, and civil society actors for focused, solution-oriented dialogue. These discussions are designed to be interactive and participatory, creating space for in-depth engagement, exchange of perspectives, and collaborative problem-solving. YIGA's roundtables are anchored in the organization's key focus areas, including foreign policy, governance, peace and security, climate change, culture, and sustainable development.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-2">What You'll Gain</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>ï Direct engagement with policymakers and experts</li>
                          <li>ï Solution-oriented collaborative problem-solving</li>
                          <li>ï Contribute to policy briefs and advocacy initiatives</li>
                          <li>ï Participate in knowledge production and research</li>
                          <li>ï Network with scholars and practitioners</li>
                          <li>ï Influence practical ideas with policy-relevant impact</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Format</p>
                        <p className="text-black">Interactive roundtables</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Eligibility</p>
                        <p className="text-black">Youth leaders, scholars, practitioners</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-600">Outcome</p>
                        <p className="text-black">Policy briefs & research outputs</p>
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

        {/* Past Activities Page */}
        {currentPage === 'activities' && (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6">Past Activities</h1>
                <p className="text-xl max-w-3xl">Highlights from our events, workshops, conferences, and initiatives driving youth engagement in governance and international affairs</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="grid gap-8">
                {pastActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
                    <div className="grid md:grid-cols-3 gap-6">
                      <img src={activity.image} alt={activity.title} className="w-full h-64 md:h-full object-cover" />
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {activity.category}
                          </span>
                          <span className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {activity.date}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-3">{activity.title}</h2>
                        <p className="text-gray-700 mb-4">{activity.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Globe className="w-5 h-5 text-red-600" />
                            <span className="font-semibold">Location:</span> {activity.location}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-5 h-5 text-red-600" />
                            <span className="font-semibold">Participants:</span> {activity.attendees}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Key Outcomes
                          </h3>
                          <ul className="space-y-2">
                            {activity.outcomes.map((outcome, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Articles Page */}
        {currentPage === 'articles' && (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6">Articles</h1>
                <p className="text-xl max-w-3xl">Research publications, policy briefs, and analytical pieces from our team of experts and fellows</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles && articles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Users className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Youth in Global Affairs</h3>
              <p className="text-gray-400">Empowering young voices in international relations and governance.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition">About Us</button></li>
                <li><button onClick={() => setCurrentPage('programs')} className="hover:text-white transition">Programs</button></li>
                <li><button onClick={() => setCurrentPage('articles')} className="hover:text-white transition">Articles</button></li>
                <li><button onClick={() => setCurrentPage('join')} className="hover:text-white transition">Join Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 flex-wrap">
                <a href="https://www.facebook.com/share/1AaGHcz5AJ/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/irsa_ke" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="Twitter/X">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://www.tiktok.com/@irsa_ke" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="TikTok">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/irsakofficial" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/company/international-relations-students-association-kenya/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <p className="text-gray-400 mt-4 text-sm">
                Email: info@yiga.org<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Youth in Global Affairs. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>          
  );
}

export default App;




































