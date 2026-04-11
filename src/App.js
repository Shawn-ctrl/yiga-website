import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';
import { Menu, X, Users, BookOpen, Globe, Shield, Scale, Award, LogOut, CheckCircle, XCircle, Clock, Trash2, UserPlus, Mail, Calendar, ArrowRight, ChevronRight, Image as ImageIcon, Download , Facebook, Instagram, Linkedin } from 'lucide-react';

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

  { name: "Kemunto Joylynn", role: "Director for Programs and Partnerships", bio: "Leading program coordination", photo: "/images/Joylynne Kemunto -Assistant Director of Programs and Partnership.jpeg" },
  { name: "Hilda Koipano", role: "Director of Communications", bio: "Leading communication strategies", photo: "/images/Hilda-Director of Communication.jpeg" },
  { name: "Beldine Mukami", role: "Assistant Director of Communications", bio: "Supporting communication initiatives", photo: "/images/Beldine Mukami -Assistant Communications Director.jpeg" },
  { name: "Abel Omenge", role: "Director of Finance", bio: "Managing financial operations", photo: "/images/Abel Omenge-Director of Finance.jpeg" },

];

const articles = [
  {
    id: 1,
    title: "BRICS versus the West: Weighing the Economic and Political Dividends for Kenya",
    excerpt: "Kenya faces a critical foreign policy choice between its traditional Western allies and the rising BRICS alliance. This analysis weighs the economic and political dividends of each option for Kenya's national interests.",
    image: "/images/brics-west-article.png",
    category: "International Relations",
    date: "April 2026",
    author: "Jeremy Oronje",
    readTime: "10 min read",
    tags: ["BRICS", "Kenya", "Foreign Policy", "Geopolitics"],
    fullContent: "Following independence in 1963, Kenya adopted a foreign policy that, particularly in matters of security and economic cooperation, leaned towards the West. This orientation was shaped by its colonial ties to Britain, the pursuit of a capitalist economic model, and the strategic imperatives of the Cold War. During the post-independence period, Kenya was keen to establish diplomatic relations with several countries in a bid to assert its recently gained sovereignty. Under President Moi's leadership (1978-2000), Kenya retained the strong economic linkages with the West, particularly evidenced through aid and concessional loans from the Bretton Woods institutions.\n\nAfter the end of the Cold War, Western partners increasingly conditioned their support on governance reforms, democratization, and anti-corruption measures, a trigger that prompted the need to diversify partnerships. The Kibaki administration (2002-2012) adopted a foreign policy that sought to cultivate stronger economic ties with emerging powers such as China, Japan, and other Asian states in search of alternative financing. In 2013, President Uhuru Kenyatta maintained the same orientation towards the East, most notably securing financing for major infrastructure projects from China, while simultaneously balancing Kenya's security and trade partnerships with the West.\n\nUpon his assumption to office in 2022, President Ruto articulated Kenya's foreign policy stance by stating \"We are neither facing East nor West, we are facing forward\". During a visit by Chinese official Li Xi to Kenya in November 2024, President William Ruto formally expressed Kenya's interest in joining the Brazil-Russia-India-China-South Africa (BRICS) grouping. As of August 2025, no progress has been made towards the same and Kenya appears to have moderated its posture towards the alliance. This paper weighs the economic and political dividends between the West and the rising BRICS alliance.\n\nWhat does BRICS+ have to offer for Kenya? Originally BRIC, the term was coined by Jim O'Neill, an economist from Goldman Sachs in a 2001 research paper. The alliance was institutionalized in 2009, positioning itself as a platform advocating reforms in global governance and multilateral institutions. Given Kenya's current pressing national priorities, particularly the urgent need to address its debt burden, BRICS may not present substantial immediate benefits. Kenya's public debt currently stands at approximately USD 81.14 billion (KES 11.36 trillion), with nearly 67 per cent of the country's ordinary revenue directed towards debt servicing.\n\nThe New Development Bank (NDB), perceived as BRICS' strategic counterweight to the Bretton-Woods institutions, could be of advantage to Kenya for specific development projects. However, the NDB is 14 times smaller than the World Bank and 1.5 times smaller than the IMF in terms of asset value, underscoring its insufficient capacity to fund large scale projects. Politically, aligning with BRICS proves to be more costly for Kenya than advantageous. The Trump administration has signaled a warning to BRICS member states, threatening to impose 100 per cent tariffs should they proceed with de-dollarization plans, which would negatively impact key sectors such as horticulture, tea and apparel.\n\nWhat does the West have to offer? Over the years, Kenya has derived significant benefits from its cooperation with the West. In the last three years, Kenya has received a cumulative loan amount of USD 1.59 billion for its economic stabilization and development programs, as part of a broader commitment of USD 3.62 billion from the IMF. From 2022 to 2024, Kenya received USD 5.38 billion from the World Bank. From a security perspective, Kenya is currently in several partnerships in counterterrorism, maritime security, military training, and intelligence sharing with the US, UK and European Union. BRICS does not have any structured security framework, thus offering no security incentive for Kenya's membership.\n\nWhich Foreign Policy would be Ideal for Kenya? The foreign policy adopted by any country should be driven by its national interests. A policy that appeases Western allies while making new ones would be ideal. Kenya could leverage rising powers such as Qatar, Turkey, Indonesia, and UAE, all of which have shown an interest in expanding their influence in the continent. Kenya's external engagements could, in the short term, be premised on securing concessional financing but with the long term goal of securing agreements that will stimulate job creation and enhance industrial growth.\n\nAs it stands, the West is still a preferred ally over BRICS. Alliances are however very unpredictable regardless of how cohesive they may appear, hence the need to have an open foreign policy that avoids overdependence on a single bloc or ally.",
    authorBio: "Jeremy Oronje is a researcher, with over three years of experience in the field of international relations and policy research. His work focuses on armed conflict, geopolitics, and governance in the Horn of Africa and the Great Lakes region."
  },
  {
    id: 2,
    title: "Political Participation Among University Students in Kenya",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
    category: "Youth & Governance",
    date: "October 2025",
    author: "IRSAK Research Team",
    readTime: "15 min read",
    tags: ["Youth Engagement", "Governance", "Political Participation"],
    fullContent: "This study examined political participation among university students across 28 Kenyan universities. Key findings reveal that while students demonstrate moderate political awareness of elected leaders and party manifestos, active participation remains low. Only 21% are registered voters, 12% voted in the last election, and just 5% are political party members. However, 42.9% participated in protests, particularly the anti-Finance Bill demonstrations. Major barriers include distrust of politicians (70% cite this), security concerns from police brutality and violence, and information inaccessibility. Nearly 80% believe politicians don't care about youth. Social media emerged as the primary information source (83%) and preferred platform for civic education (70%). The study recommends strengthening trust through intergenerational dialogues, IEBC engagement initiatives, integration of civic education into curricula, and deliberate youth inclusion in public participation processes.",
    pdfUrl: "/documents/Political_Participation_Study_IRSAK_2025.pdf"
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

A Bloc of Divergent Agendas

Though often grouped together as "anti-Western" actors, the CRINK countries differ significantly in both their regional ambitions and global outlooks. China envisions a restructured international order that reflects its growing global power but remains economically interdependent with the West. Stability, not chaos, is in Beijing's best interest. Russia, increasingly isolated after its 2022 invasion of Ukraine, now leans heavily on China for trade and political cover. Yet it continues to act aggressively and unpredictably, seeking to reclaim lost geopolitical influence. Iran walks a fine line between revolutionary ideology and pragmatic diplomacy. While it actively supports armed proxies and regional militancy, it also seeks economic relief and engagement with Europe and emerging powers. North Korea, perhaps the most unpredictable member, continues to pursue nuclear brinkmanship. Its leadership appears more focused on regime survival and domestic control than any form of coherent external alliance.

This lack of strategic unity undermines any serious attempt to view CRINK as a consolidated power bloc.

China: Cautious Leader, Not Commander

China's role within CRINK is particularly revealing. It is the most powerful playeróeconomically, diplomatically, and increasingly militarily. Yet Beijing has consistently avoided taking on a leadership role within the group. For instance, although China has provided economic support to Russia amid Western sanctions, it has avoided direct military assistance to avoid triggering secondary sanctions. Similarly, while it maintains close energy and infrastructure ties with Iran, it has not defended Iran's nuclear ambitions on the world stage. As for North Korea, China regards it more as a strategic liability than an asset, frequently urging restraint after provocative missile tests.

Rather than building an alliance based on loyalty, China appears to be managing a series of fragile dependencies, careful not to overcommit to any partner.

No Real Alliance, Just Shared Convenience

Unlike structured alliances that commit to mutual defense and long-term strategy, CRINK operates more like a network of convenience. There is no CRINK summit, no joint military command, no institutional mechanism for resolving disputes or planning long-term collaboration. Their cooperation is issue-specific and driven by necessity: Russia turns to Iran for drones, North Korea supplies artillery shells to Russian forces in Ukraine, China trades with Russia and Iran to secure cheap energy, and Iran offers military and intelligence support to other authoritarian regimes.

But this does not equate to trust. In fact, mutual suspicion and asymmetry define these relationships. Russia's growing dependence on Chinese technology and trade has led to fears of strategic subordination. Iran, meanwhile, is wary of China's increasing influence over its economy. North Korea continues to act independently, often ignoring Beijing's calls for restraint.

Implications for Global Stability

The illusion of unity within CRINK has two important implications for international affairs. First, it shows that Western fears of a coordinated "axis of autocracy" may be overstated. The bloc's internal divisions and lack of strategic coherence limit its ability to act as a united front. This presents an opportunity for diplomatic engagement and wedge strategies that target these divisions.

Second, CRINK's informal cooperation, while fragmented, still poses a challenge. Through asymmetric tacticsósuch as cyberattacks, sanctions evasion, arms transfers, and disinformation campaignsóthese states can still undermine global norms and distract Western powers by igniting crises on multiple fronts simultaneously. The West, and indeed the Global South, must be alert not just to the actions of CRINK states, but to the conditions that enable them to act: instability, broken diplomacy, and economic fragmentation.

Conclusion: Fragile Alliances, Not Fatal Threats

The CRINK bloc is more a geopolitical mirage than a durable axis. What unites China, Russia, Iran, and North Korea is not a grand design, but shared grievance and opportunism. As such, it should not be dismissedóbut neither should it be overestimated. For international relations scholars and emerging policy thinkers, including members of IRSAK, this case highlights the importance of examining alliances beyond surface-level narratives. Real power blocs are built on trust, coordination, and shared valuesónot just mutual enemies.`
  }
];


// Past Activities Data - REPLACE WITH REAL DATA TOMORROW
const pastActivities = [
  {
    id: 1,
    title: "Roundtable on Strengthening Youth Participation in Politics and Governance",
    date: "February 2026",
    location: "Nairobi, Kenya",
    description: "YIGA hosted a roundtable that brought together representatives from civil society, political party youth leagues, government institutions, students, and researchers to discuss strategies for strengthening youth participation in politics and governance.",
    image: "/images/activities/Rountdtable on Strengthening Youth Participation in Politics And Governance.jpeg",
    category: "Roundtable",
    outcomes: ["Policy brief with actionable recommendations", "Strengthened multi-stakeholder collaboration on youth participation in governance"]
  },
  {
    id: 2,
    title: "Research Study Launch: Political Participation Among University Students in Kenya",
    date: "October 2025",
    location: "Nairobi, Kenya",
    description: "YIGA organized a launch event to officially unveil its study titled Political Participation Among University Students in Kenya. The launch marked the culmination of a six-month research project.",
    image: "/images/activities/Research Study Launch.jpeg",
    category: "Research Launch",
    outcomes: ["Publication of the research study report", "Dissemination of findings to policymakers, civil society, and youth stakeholders"]
  },
  {
    id: 3,
    title: "Official Visit to the United Nations Development Programme (UNDP)",
    date: "September 2025",
    location: "Kigali, Rwanda",
    description: "YIGA, in collaboration with the United Nations Development Programme Rwanda Country Office, held an engagement session exploring the role of youth during and after the Rwandan Genocide.",
    image: "/images/activities/Official Visit to UNDP.jpeg",
    category: "International Engagement",
    outcomes: ["Enhanced understanding of youth-led peacebuilding initiatives", "Lessons on post-conflict reconciliation and community rebuilding"]
  },
  {
    id: 4,
    title: "Official Visit to Rwanda Cooperation",
    date: "September 2025",
    location: "Kigali, Rwanda",
    description: "YIGA met with senior officials from Rwanda Cooperation to discuss governance practices and institutional development.",
    image: "/images/activities/4.jpeg",
    category: "Institutional Visit",
    outcomes: ["Knowledge exchange on governance and institutional reforms", "Strengthened networks for future collaboration"]
  },
  {
    id: 5,
    title: "Roundtable on the Role of Youth in Peacebuilding",
    date: "September 2025",
    location: "Kigali, Rwanda",
    description: "YIGA visited Never Again Rwanda, a youth-led grassroots organization, for a dialogue on the role of young people in promoting peace, reconciliation, and social cohesion in post-conflict societies.",
    image: "/images/activities/Roundtable on the Youth in Peace building.jpeg",
    category: "Peacebuilding",
    outcomes: ["Insights into grassroots peacebuilding initiatives", "Strengthened partnerships with youth-led peacebuilding organizations"]
  },
  {
    id: 6,
    title: "United Nations Day for South-South Cooperation",
    date: "September 2025",
    location: "Kigali, Rwanda",
    description: "YIGA representatives participated in activities commemorating the United Nations Day for South-South Cooperation.",
    image: "/images/activities/UN day for South-South Cooperation.jpeg",
    category: "UN Event",
    outcomes: ["Engagement with diplomatic and policy stakeholders", "Increased awareness of South-South cooperation in development and governance"]
  },
  {
    id: 7,
    title: "Career and Mentorship Forum",
    date: "March 2025",
    location: "Nairobi, Kenya",
    description: "Through its student partner International Relations Students Association of Kenya (IRSAK), YIGA partnered with Konrad Adenauer Stiftung and the Catholic University of Eastern Africa to organize a career and mentorship forum for students of international relations.",
    image: "/images/activities/Career_and_mentorship_program.jpeg",
    category: "Mentorship",
    outcomes: ["Career mentorship and professional exposure for students", "Strengthened networks between students and practitioners in international affairs"]
  },
  {
    id: 8,
    title: "Institutional Visit to Regional Organizations",
    date: "October 2023",
    location: "Arusha, Tanzania",
    description: "YIGA, through its student partner International Relations Students Association of Kenya and the Catholic University of Eastern Africa, organized an educational visit to the East African Community and the African Court on Human and Peoples' Rights.",
    image: "/images/activities/East African Community visit.jpeg",
    category: "Educational Visit",
    outcomes: ["Enhanced student understanding of regional governance institutions", "Practical exposure to regional diplomacy and legal processes"]
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
  const [expandedSection, setExpandedSection] = useState('');
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
    setLoading(true);
    setLoginError('');
    
    try {
      // TEMPORARY: Hardcoded admin access
      if (loginData.username === 'Shawn' && loginData.password === 'Yiga2023') {
        setIsLoggedIn(true);
        setUsername('Shawn');
        setUserRole('superadmin');
        localStorage.setItem('username', 'Shawn');
        localStorage.setItem('userRole', 'superadmin');
        setLoginData({ username: '', password: '' });
        await fetchApplications();
        if (userRole === 'superadmin' || true) await fetchAdmins();
        setLoading(false);
        return;
      }






      const { data: admins, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', loginData.username)
        .single();

      if (error || !admins) {
        setLoginError('Invalid username or password');
        setLoading(false);
        return;
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(loginData.password, admins.password);
      
      if (passwordMatch) {
        setIsLoggedIn(true);
        setUsername(admins.username);
        setUserRole(admins.role);
        localStorage.setItem('username', admins.username);
        localStorage.setItem('userRole', admins.role);
        setLoginData({ username: '', password: '' });
        await fetchApplications();
        if (admins.role === 'superadmin') await fetchAdmins();
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('Login error: ' + error.message);
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

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };



















  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase.from('admins').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };
















  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            country: formData.institution || formData.country,
            motivation: formData.motivation,
            status: 'pending'
          }
        ]);



      if (error) throw error;

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
      const { error } = await supabase.from('applications').update({ status }).eq('id', id);
      if (error) throw error;
      await fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update status');
    }
  };


















  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (error) throw error;
      await fetchApplications();
      alert('Application deleted successfully!');
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
    }
  };

















  const createAdmin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');
    try {
      const hashedPassword = await bcrypt.hash(newAdmin.password, 10);
      const { error } = await supabase.from('admins').insert([{
        username: newAdmin.username,
        password: hashedPassword,
        role: newAdmin.role || 'admin'
      }]);
      if (error) throw error;
      setAdminSuccess('Admin created successfully!');
      setNewAdmin({ username: '', password: '', role: 'admin' });
      await fetchAdmins();
      setTimeout(() => setAdminSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating admin:', error);
      setAdminError('Failed to create admin: ' + error.message);
    }
  };



























  const updateAdminRole = async (id, role) => {
    try {
      const { error } = await supabase.from('admins').update({ role }).eq('id', id);
      if (error) throw error;
      await fetchAdmins();
    } catch (error) {
      console.error('Error updating admin role:', error);
      alert('Failed to update role');
    }
  };


















  const deleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      const { error } = await supabase.from('admins').delete().eq('id', id);
      if (error) throw error;
      await fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Failed to delete admin');
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
        üåç Join Africa's Leading Youth in International Affairs 
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-3">
              <img src="/images/logo.jpeg" alt="YIGA Logo" className="h-16 w-auto object-contain" />




            </div>

            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'team', 'research', 'activities', 'programs', 'partners', 'join'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === page
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {page === 'partners' ? 'Student Partners' : page.charAt(0).toUpperCase() + page.slice(1)}
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
              {['home', 'about', 'team', 'research', 'activities', 'programs', 'partners', 'join'].map((page) => (
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
                  {page === 'partners' ? 'Student Partners' : page.charAt(0).toUpperCase() + page.slice(1)}
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

                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Empowering young professionals to drive meaningful change in international relations, governance, and policy across the Eastern African continent and beyond
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
                  <div className="text-4xl font-bold text-red-500 mb-2">1000+</div>
                  <div className="text-gray-300">Active Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">10</div>
                  <div className="text-gray-300">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">15</div>
                  <div className="text-gray-300">Events Hosted</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-500 mb-2">10+</div>
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
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <button onClick={() => setSelectedArticle(article)} className="text-red-600 font-semibold flex items-center space-x-1 hover:space-x-2 transition-all cursor-pointer">
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
                  Youth in Governance and Global Affairs (YIGA) is a youth-led civil society organization that champions meaningful youth engagement with the world's most critical global challenges. We empower young people to think, act, and lead through evidence-based research, capacity-building trainings, dynamic workshops, intellectual dialogues, and conferences.
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
                    "Promote and support the production of high-quality, youth-led research on pressing governance and global challenges",
                    "Deliver trainings, workshops, and conferences that equip young people with the knowledge and skills to engage effectively in governance and global affairs",
                    "Advance meaningful youth participation in foreign policy discourse and international relations processes",
                    "Foster inclusive spaces for dialogue, knowledge exchange, and collaboration among youth and policy stakeholders"
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
                    { name: "Governance & Democratic Participation", icon: Scale },
                    { name: "Climate Change & Environmental Sustainability", icon: Award },
                    { name: "Peace & Security", icon: Shield }

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
          <div className="min-h-screen bg-gray-50">

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-black to-red-900 text-white py-20">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">Meet Our Team</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">The passionate individuals driving YIGA's mission of youth empowerment in global governance and international affairs</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">

              {/* Directorate Accordion */}
              <div className="mb-6 rounded-xl overflow-hidden shadow-xl">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'directorate' ? '' : 'directorate')}
                  className="w-full flex items-center justify-between bg-red-600 text-white px-8 py-6 font-bold text-2xl hover:bg-red-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-7 h-7" />
                    <span>Directorate</span>
                    <span className="text-sm font-normal bg-red-700 px-3 py-1 rounded-full">{teamMembers.length} members</span>
                  </div>
                  <span className="text-3xl">{expandedSection === 'directorate' ? '-' : '+'}</span>
                </button>
                {expandedSection === 'directorate' && (
                  <div className="bg-white p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="group text-center bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="relative inline-block mb-4">
                            <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full object-cover border-4 border-red-600 shadow-lg group-hover:border-black transition duration-300" />
                            <div className="absolute inset-0 rounded-full bg-red-600 opacity-0 group-hover:opacity-10 transition duration-300"></div>
                          </div>
                          <h4 className="text-lg font-bold text-black mb-1">{member.name}</h4>
                          <p className="text-red-600 font-semibold text-sm mb-3">{member.role}</p>
                          <div className="w-8 h-0.5 bg-red-600 mx-auto mb-3"></div>
                          <p className="text-gray-500 text-sm">{member.bio}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Advisors Accordion */}
              <div className="mb-6 rounded-xl overflow-hidden shadow-xl">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'advisors' ? '' : 'advisors')}
                  className="w-full flex items-center justify-between bg-black text-white px-8 py-6 font-bold text-2xl hover:bg-gray-900 transition"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-7 h-7" />
                    <span>Advisors</span>
                  </div>
                  <span className="text-3xl">{expandedSection === 'advisors' ? '-' : '+'}</span>
                </button>
                {expandedSection === 'advisors' && (
                  <div className="bg-white p-12 text-center">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Advisor Profiles Coming Soon</h3>
                    <p className="text-gray-400">We are assembling an exceptional advisory board. Check back soon.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Join CTA */}
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-16">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-4">Want to Join Our Team?</h3>
                <p className="text-xl mb-8 text-gray-200">Passionate about youth empowerment and global affairs?</p>
                <button onClick={() => setCurrentPage('join')} className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-xl">Apply Now</button>
              </div>
            </div>

          </div>
        )}




































































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

                {/* PDF Download Button */}
                {selectedArticle.pdfUrl && (
                  <div className="mt-8">
                    <a 
                      href={selectedArticle.pdfUrl} 
                      download 
                      className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Full Study (PDF)
                    </a>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-16 pt-8 border-t-2 border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-black mb-2">About the Author</h3>
                     <p className="text-gray-600">{selectedArticle.authorBio || selectedArticle.author}</p>
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
                { title: "Safe Space Program", desc: "Virtual dialogue platform for inclusive engagement on governance issues", icon: Mail },
                { title: "Roundtable Discussions", desc: "Solution-oriented dialogue with policymakers and experts", icon: Users }


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
                          Safe Space is a virtual, dialogue-driven initiative by Youth in Governance and Global Affairs (YIGA) that provides young people with an inclusive and respectful platform to engage on key governance issues at both domestic and international levels. Designed primarily as a safe and moderated environment for open conversation, the program enables participants to critically engage on questions of leadership, public policy, accountability, democratic participation, peace, and global affairs.
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
                          Roundtable Discussions are a core convening platform under Youth in Governance and Global Affairs (YIGA), bringing together youth leaders, scholars, practitioners, policymakers, and civil society actors for focused, solution-oriented dialogue. These discussions are designed to be interactive and participatory, creating space for in-depth engagement, exchange of perspectives, and collaborative problem-solving. YIGA's roundtables are anchored in the organization's key focus areas, including foreign policy, governance, peace and security, climate change, culture, and sustainable development.
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
        {currentPage === 'research' && (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6">Research Publications</h1>
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

        {/* Student Partners Page */}
        {currentPage === 'partners' && (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
              <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-5xl font-bold mb-6">Student Partners</h1>
                <p className="text-xl">A national platform dedicated to uniting and empowering young international relations students and professionals through our student partner organizations</p>
              </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 text-black">International Relations Students Association of Kenya (IRSAK)</h3>
                  <p className="text-gray-600">The International Relations Students Association of Kenya (IRSAK) is a national platform dedicated to uniting and empowering young international relations students and professionals. It serves as a hub for intellectual discourse, mentorship, research, and professional development, bridging the gap between academic knowledge and real-world application.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 text-black">Partner University 2</h3>
                  <p className="text-gray-600">Details coming soon</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-4 text-black">Partner University 3</h3>
                  <p className="text-gray-600">Details coming soon</p>
                </div>
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


        {/* Social Media Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">YIGA</h3>
                <p className="text-gray-400">Youth in Governance and Global Affairs</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <div className="text-gray-400 space-y-2">
                  <p>Email: info@yiga.org</p>
                  <p>Phone: +254 794 538 341 / +254 740 278 055</p>
                  <p>Location: Nairobi, Kenya</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/share/1AaGHcz5AJ/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://x.com/irsakofficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/irsakofficial/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/company/international-relations-students-association-kenya/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 YIGA. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>          
  );
}

export default App;
































