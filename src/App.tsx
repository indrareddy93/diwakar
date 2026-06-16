/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Menu,
  X,
  Search,
  Filter,
  Trash2,
  BarChart2,
  Users,
  Check,
  Lock,
  Unlock,
  FileText,
  LayoutDashboard,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
  Briefcase,
  Sun as SunIcon,
  Map,
  Truck,
  Video,
  Plane,
  Award,
  ShieldCheck,
  Droplet,
  ExternalLink
} from 'lucide-react';
import { SERVICES_DATA, GALLERY_DATA, TESTIMONIALS_DATA, FAQ_DATA, SUCCESS_STORIES, IMAGES } from './data';
import { ServiceCategory, Lead } from './types';

export default function App() {
  // Theme management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mdnaik_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Services navigation / filtering
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [serviceSearch, setServiceSearch] = useState('');

  // Gallery categorization & lightbox
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  // FAQ interactive state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Testimonials sliding index
  const [activeTestimonialNode, setActiveTestimonialNode] = useState(0);

  // Enquiry Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // Leads list & Live Admin controls
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminFilterCategory, setAdminFilterCategory] = useState<string>('All');
  const [adminFilterStatus, setAdminFilterStatus] = useState<string>('All');
  const [leadEditingNotes, setLeadEditingNotes] = useState<{ [key: string]: string }>({});

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-scrolling stats or slides
  useEffect(() => {
    localStorage.setItem('mdnaik_theme', theme);
  }, [theme]);

  // Seeding initial leads for simulation & Admin Panel preview
  useEffect(() => {
    const rawLeads = localStorage.getItem('mdnaik_leads');
    if (rawLeads) {
      try {
        setLeads(JSON.parse(rawLeads));
      } catch (err) {
        console.error("Error reading leads", err);
      }
    } else {
      const initialLeads: Lead[] = [
        {
          id: 'lead-1',
          name: 'Aravind Reddy',
          phone: '+91 94405 12349',
          email: 'aravind.reddy@gmail.com',
          service: 'it-coaching',
          message: 'Interested in Python Full Stack course with placement assistance. Please share next batch details.',
          status: 'New',
          date: '2026-06-14',
          notes: 'Called. Expressed interest in evening classes.',
          rating: 5
        },
        {
          id: 'lead-2',
          name: 'Anjali Sharma',
          phone: '+91 80081 23456',
          email: 'anjali.nursing99@gmail.com',
          service: 'nursing-placements',
          message: 'Passed B.Sc Nursing in 2025. Looking for private hospital placement listings near Kurnool/Anantapur.',
          status: 'In Progress',
          date: '2026-06-13',
          notes: 'Document verification pending.',
          rating: 4
        },
        {
          id: 'lead-3',
          name: 'S. Keshava Naidu',
          phone: '+91 73531 99911',
          email: 'keshav.naidu74@yahoo.com',
          service: 'solar-systems',
          message: 'Required quotation for 10HP Subsidized Solar Pump Set setup for 5 acre farm field.',
          status: 'Contacted',
          date: '2026-06-12',
          notes: 'Processed subsidy papers. Bank clearance awaited.',
          rating: 5
        }
      ];
      localStorage.setItem('mdnaik_leads', JSON.stringify(initialLeads));
      setLeads(initialLeads);
    }
  }, []);

  // Save leads helper
  const saveLeads = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('mdnaik_leads', JSON.stringify(updatedLeads));
  };

  // Switch testimonial support
  const nextTestimonial = () => {
    setActiveTestimonialNode((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonialNode((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Submit Enquiry Form Handler
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formService) {
      alert('Please fill out Name, Phone Number and select a Service.');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const newLead: Lead = {
        id: 'lead-' + Date.now(),
        name: formName,
        phone: formPhone,
        email: formEmail || 'N/A',
        service: formService,
        message: formMessage || 'Inquired about service details.',
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        rating: 5
      };

      const updated = [newLead, ...leads];
      saveLeads(updated);

      setSubmissionId(newLead.id);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset fields
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMessage('');
    }, 900);
  };

  // Admin login handling
  const handleAdminAuth = (e: FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'naik2026') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError('Invalid authorization key.');
    }
  };

  // Log Out Admin
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminPassword('');
  };

  // Delete lead handler
  const deleteLead = (id: string) => {
    if (confirm('Are you sure you want to remove this lead?')) {
      const filtered = leads.filter(l => l.id !== id);
      saveLeads(filtered);
    }
  };

  // Update lead status
  const updateLeadStatus = (id: string, newStatus: 'New' | 'In Progress' | 'Contacted' | 'Closed') => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Update lead rating prioritisation
  const updateLeadRating = (id: string, rating: number) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, rating: rating };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Save individual lead logs/notes
  const updateLeadNotes = (id: string, notes: string) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, notes: notes };
      }
      return l;
    });
    saveLeads(updated);
  };

  // Quick category icon mapper
  const getCategoryIconNode = (cat: string) => {
    switch (cat) {
      case 'Placements':
        return <Briefcase className="w-5 h-5" />;
      case 'Education':
        return <GraduationCap className="w-5 h-5" />;
      case 'Agriculture & Solar':
        return <SunIcon className="w-5 h-5" />;
      case 'Real Estate':
        return <Map className="w-5 h-5" />;
      case 'Vehicles':
        return <Truck className="w-5 h-5" />;
      case 'Publicity':
        return <Video className="w-5 h-5" />;
      case 'Travel':
        return <Plane className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  // Filtered lists
  const filteredServices = SERVICES_DATA.filter(serv => {
    const matchesCat = selectedCategory === 'All' || serv.category === selectedCategory;
    const matchesSearch = serv.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                          serv.description.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                          serv.features.some(f => f.toLowerCase().includes(serviceSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const uniqueGalleryCategories = ['All', ...Array.from(new Set(GALLERY_DATA.map(g => g.category)))];
  const filteredGallery = GALLERY_DATA.filter(item => {
    return selectedGalleryCategory === 'All' || item.category === selectedGalleryCategory;
  });

  // Safe service ID mapping to premium titles
  const getServiceLabel = (id: string) => {
    const match = SERVICES_DATA.find(s => s.id === id);
    return match ? `${match.title} (${match.category})` : id;
  };

  // Stat counters for admin dashboard
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const pendingLeadsCount = leads.filter(l => l.status === 'In Progress').length;
  const completedLeadsCount = leads.filter(l => l.status === 'Closed' || l.status === 'Contacted').length;

  return (
    <div id="md-naik-app" className={`${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 min-h-screen font-sans`}>
      
      {/* HEADER NAVBAR */}
      <header id="site-header" className="sticky top-0 z-40 backdrop-blur-md bg-opacity-90 transition-colors duration-300 bg-white/95 dark:bg-slate-900/95 border-b border-stone-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-amber-500 to-teal-700 p-2.5 rounded-xl shadow-md text-white flex items-center justify-center">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight bg-gradient-to-r from-teal-700 via-emerald-700 to-amber-600 dark:from-teal-400 dark:via-emerald-300 dark:to-amber-500 bg-clip-text text-transparent">
                M.D NAIK CONSULTANCY
              </span>
              <span className="block text-xxs sm:text-xs text-stone-500 dark:text-stone-400 font-bold tracking-wider">
                BY M. DIWAKAR NAIK, B.Tech
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7 text-sm font-semibold tracking-wide">
            <a href="#hero" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">About M. Diwakar</a>
            <a href="#services" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Services</a>
            <a href="#gallery" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#testimonials" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-amber-600 dark:text-amber-400 font-extrabold">Contact</a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-desktop"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-stone-800" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Admin Console Quick Trigger */}
            <button
              id="admin-btn-desktop"
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                if (isAdminOpen) {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setTimeout(() => {
                    document.getElementById('admin-gateway-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black border border-stone-300 dark:border-slate-700 bg-stone-100/50 dark:bg-slate-800 hover:bg-amber-500 hover:text-white transition cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'ADMIN LEADS' : 'ADMIN CONSOLE'}</span>
            </button>

            <a
              id="header-cta-whatsapp"
              href="https://wa.me/917353068201?text=Hello%20M.%20Diwakar%20Naik,%20I%20visited%20your%20consultancy%20website%20and%20want%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-md transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp +91 7353068201</span>
            </a>
          </div>

          {/* Mobile Navigation Trigger icons */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              id="theme-toggle-mobile"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5 text-stone-800" /> : <Sun className="w-4.5 h-4.5 text-amber-400" />}
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="lg:hidden bg-white dark:bg-slate-900 border-b border-light-200 dark:border-slate-800 py-4 px-4 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2 text-sm font-bold">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">About M. Diwakar</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">Services</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">Gallery</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">Testimonials</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 transition">FAQs</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded hover:bg-stone-100 dark:hover:bg-slate-800 text-amber-500 font-extrabold">Contact Directly</a>
            </div>
            
            <div className="pt-4 border-t border-stone-200 dark:border-slate-800 flex flex-col gap-3">
              <button
                id="admin-btn-mobile"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                  setTimeout(() => {
                    document.getElementById('admin-gateway-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-slate-800 font-extrabold text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isAdminAuthenticated ? 'Go to Admin Leads' : 'Admin Operations Control'}</span>
              </button>

              <div className="flex gap-2">
                <a
                  href="tel:+917013161673"
                  className="flex-1 bg-teal-600 text-white font-extrabold text-center py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Naik</span>
                </a>
                <a
                  href="https://wa.me/917353068201"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 text-white font-extrabold text-center py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32 bg-stone-100/40 dark:bg-slate-950">
        
        {/* Absolute Background Polygons & Ambient light circles */}
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-teal-600/5 dark:bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[24rem] h-[24rem] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-teal-100/80 dark:bg-teal-950/80 px-4 py-2 rounded-full border border-teal-200/50 dark:border-teal-900/50 backdrop-blur">
                <Sparkles className="w-4.5 h-4.5 text-teal-700 dark:text-teal-400" />
                <span className="text-xs font-black tracking-wide text-teal-850 dark:text-teal-300 uppercase">
                  Rayalaseema Youth Leader & Business Promoter
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  <span className="block text-stone-900 dark:text-white">M. DIWAKAR NAIK</span>
                  <span className="text-lg tracking-widest block font-extrabold text-amber-600 dark:text-amber-400 mt-1 uppercase">
                    B.Tech &bull; Youth Leader (Rayalaseema)
                  </span>
                  <span className="block text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-500 dark:from-teal-400 dark:via-emerald-300 dark:to-amber-500 bg-clip-text text-transparent mt-2">
                    Founder & MD &ndash; M.D Naik Consultancy
                  </span>
                </h1>
              </div>

              <p className="text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                Your Trusted Partner for <strong className="text-stone-900 dark:text-white">Software Placement, Global Higher Education, Advanced Agriculture Subsidy, Prime Real Estate Ventures, Custom Publicity Materials, and Quick Travel Bookings.</strong>
              </p>

              <div className="bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-stone-200/50 dark:border-slate-800/50 backdrop-blur shadow-sm space-y-1">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Core Mission</div>
                <div className="text-sm sm:text-base font-extrabold text-stone-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;Helping Students, Job Seekers, Progressive Farmers, Investors, and Families achieve scalable success through clear professional guidance.&rdquo;
                </div>
              </div>

              {/* Call to actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contact"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-7 py-4 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all flex items-center space-x-2"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/917353068201"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-7 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Group & Chat</span>
                </a>

                <a
                  href="#services"
                  className="bg-white hover:bg-stone-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-extrabold px-7 py-4 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm transition"
                >
                  Explore Services Matrix
                </a>
              </div>

              {/* Responsive Micro Trust Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200/60 dark:border-slate-900">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-stone-600 dark:text-slate-300">100% Legal Clearance</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-stone-600 dark:text-slate-300">Govt Subsidies Verified</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-stone-600 dark:text-slate-300">Top-Tier IT Referrals</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-stone-600 dark:text-slate-300">Direct Founder Access</span>
                </div>
              </div>

            </div>

            {/* Right Photo/Badge Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Decorative frames */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-teal-600 rounded-3xl opacity-20 blur-md pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-teal-600 rounded-br-xl pointer-events-none" />
                
                {/* Main Hero Card of Diwakar Naik */}
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-2xl overflow-hidden border border-amber-500/10 dark:border-teal-400/10 transition-transform duration-300 hover:scale-[1.01]">
                  <img
                    id="hero-developer-portrait"
                    src={IMAGES.diwakar_portrait} 
                    alt="M. Diwakar Naik Portfolio Brand"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600";
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-[28rem] object-cover rounded-2xl filter brightness-100 contrast-100 shadow-inner"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUCCESS METRICS RIBBON */}
      <section id="metrics-bar" className="bg-gradient-to-r from-teal-900 via-teal-950 to-emerald-950 text-white py-10 shadow-lg border-t border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">450+ Candidates</div>
              <div className="text-xs font-black tracking-wider text-slate-300 uppercase">IT & Corporate Placements</div>
            </div>

            <div className="space-y-1 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">120+ Visas</div>
              <div className="text-xs font-black tracking-wider text-slate-300 uppercase">Overseas Admissions</div>
            </div>

            <div className="space-y-1 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">180+ Acres</div>
              <div className="text-xs font-black tracking-wider text-slate-300 uppercase">Irrigation & Solar Setup</div>
            </div>

            <div className="space-y-1 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">300+ Estates</div>
              <div className="text-xs font-black tracking-wider text-slate-300 uppercase">Legally Transferred Plots</div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT THE FOUNDER SECTION */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Frame column */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-400/10 rounded-2xl blur-lg pointer-events-none" />
                <img
                  id="about-portrait-naik"
                  src={IMAGES.diwakar_portrait} 
                  alt="M. Diwakar Naik Profile"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600";
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-[28rem] object-cover rounded-2xl shadow-xl filter contrast-105 brightness-95"
                />
                
                {/* Small floating card */}
                <div className="absolute bottom-6 -right-6 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-4 rounded-xl shadow-lg max-w-xs hidden sm:block">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-sm font-black">ISO Compliant Support</span>
                      <span className="block text-xxs text-stone-400 font-bold">100% Transparency Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right description column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">About M. Diwakar Naik</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  A Visionary Leader & Youth Representative
                </h2>
                <div className="h-1.5 w-20 bg-amber-500 rounded-full" />
              </div>

              <div className="space-y-4 text-stone-600 dark:text-slate-300 leading-relaxed font-semibold text-sm sm:text-base">
                <p>
                  <strong className="text-stone-900 dark:text-white">M. Diwakar Naik, B.Tech</strong> is a dynamic entrepreneur, recognized youth leader, and dedicated business consultant who acts as the leading voice for economic development in the Rayalaseema region.
                </p>
                <p>
                  Through <strong className="text-stone-900 dark:text-white">M.D Naik Consultancy</strong>, he has successfully built an all-in-one corporate facilitator addressing crucial lifestyle and business demands: job placements, global admissions, agricultural modernization, real estate security, and travel automation.
                </p>
                <p>
                  As an education advisor and job consultant, he aligns software aspirants with standard development modules as well as placing candidates of any age/qualification across private operations. Under his watchful care, local farmers secure key drip and solar machinery, leveraging generous central government subsidy systems.
                </p>
              </div>

              {/* Personal values bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-1.5 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div>
                    <strong className="block text-stone-800 dark:text-white text-sm">Youth Empowerment Focus</strong>
                    <span className="text-xxs sm:text-xs text-stone-500 dark:text-stone-400">Mentoring engineers and placing fresh healthcare nursing batches.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-1.5 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div>
                    <strong className="block text-stone-800 dark:text-white text-sm">Zero Legal Disputes</strong>
                    <span className="text-xxs sm:text-xs text-stone-500 dark:text-stone-400">Perfect verifying of boundary documents, EC records, or layout claims.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-1.5 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div>
                    <strong className="block text-stone-800 dark:text-white text-sm">Direct Subsidy Clearance</strong>
                    <span className="text-xxs sm:text-xs text-stone-500 dark:text-stone-400">Complete documentation support including bank loan project files (DPR).</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-1.5 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>
                  <div>
                    <strong className="block text-stone-800 dark:text-white text-sm">Reasonable Service Pricing</strong>
                    <span className="text-xxs sm:text-xs text-stone-500 dark:text-stone-400">Affordable, transparent quote systems with no hidden charges.</span>
                  </div>
                </div>
              </div>

              {/* Founder quote box */}
              <div className="border-l-4 border-amber-500 pl-4 py-2 italic text-stone-500 dark:text-slate-400 text-xs sm:text-sm bg-stone-100/50 dark:bg-slate-900 rounded-r-xl">
                &ldquo;M.D Naik Consultancy stands for trust. My team works with dedication to guide student batches, secure farmer subsidies, and connect investors with legal properties. We treat every client like family.&rdquo;
                <span className="block mt-1.5 font-bold text-stone-800 dark:text-slate-300 not-italic text-xxs tracking-wider uppercase">
                  &mdash; M. Diwakar Naik, B.Tech
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SERVICE FILTER MATRIX */}
      <section id="services" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">MULTI-BUSINESS PORTFOLIO</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Professional Services Matrix</h2>
              <p className="text-sm font-semibold text-stone-500 dark:text-slate-400 max-w-xl">
                Quickly explore or filter our comprehensive solutions. Click any service card to pre-select it in the Consultation Inquiry form.
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                id="service-search-input"
                type="text"
                placeholder="Search services, skills, course names..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
              {serviceSearch && (
                <button
                  onClick={() => setServiceSearch('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Faceted Filter Menu */}
          <div className="flex flex-wrap gap-2.5 mb-10 border-b border-stone-200/60 dark:border-slate-800 pb-6">
            {(['All', 'Placements', 'Education', 'Agriculture & Solar', 'Real Estate', 'Vehicles', 'Publicity', 'Travel'] as const).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`service-cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-black tracking-wide transition flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-500/10'
                      : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-350 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700'
                  }`}
                >
                  {cat !== 'All' && getCategoryIconNode(cat)}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Category Badge overlay on image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    
                    {/* Dark gradient shadow inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur text-white text-xxs font-black tracking-wider uppercase px-3 py-1.5 rounded-lg border border-white/15 flex items-center space-x-1">
                      {getCategoryIconNode(service.category)}
                      <span>{service.category}</span>
                    </div>

                    {service.badge && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xxs font-black px-2.5 py-1.5 rounded-lg shadow">
                        {service.badge}
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {service.subtitle && (
                        <span className="text-xxs tracking-widest text-teal-700 dark:text-teal-400 font-extrabold uppercase block">
                          {service.subtitle}
                        </span>
                      )}
                      <h3 className="text-lg font-extrabold text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-300 leading-relaxed font-semibold">
                        {service.description}
                      </p>

                      <div className="pt-3 border-t border-stone-100 dark:border-slate-800 space-y-2">
                        <span className="block text-xxs uppercase tracking-wider text-stone-400 font-bold">Key Deliverables</span>
                        <ul className="space-y-1.5">
                          {service.features.map((feat, fi) => (
                            <li key={fi} className="flex items-start text-xs font-semibold text-stone-600 dark:text-slate-350">
                              <span className="text-emerald-500 font-black mr-2">&bull;</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setFormService(service.id);
                          setFormMessage(`I am extremely interested in the following service: ${service.title}.\n\nPlease provide full setup pricing or course availability timelines.`);
                          document.getElementById('enquiry-form-card')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 bg-stone-100 dark:bg-slate-800 group-hover:bg-teal-700 group-hover:text-white hover:opacity-90 dark:text-white text-stone-800 text-xs font-black py-3 px-4 rounded-xl text-center transition tracking-wider uppercase cursor-pointer"
                      >
                        Enquire This Solution
                      </button>
                      
                      <a
                        href={`https://wa.me/917353068201?text=Hello%20M.%20Diwakar%20Naik,%20I%20want%2520to%2520enquire%2520about%2520your%2520service:%2520${encodeURIComponent(service.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-sm transition"
                        title="Inquire on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-stone-100 dark:border-slate-800 p-8 space-y-4">
              <span className="block text-stone-400 text-lg">No services match your query or category filter.</span>
              <button
                onClick={() => {
                  setServiceSearch('');
                  setSelectedCategory('All');
                }}
                className="bg-teal-700 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl"
              >
                Reset Filter Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* WHY CHOOSE US & UNIQUE FEATURES */}
      <section id="why-choose-us" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">UNMATCHED REGIONAL ADVANTAGE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Partner with M.D Naik?</h2>
            <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
            <p className="text-sm font-semibold text-stone-500 dark:text-slate-400">
              Operating with top-tier compliance, affordable pricing, and unmatched corporate speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-stone-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition duration-300 space-y-4">
              <div className="bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 p-3 h-12 w-12 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">Trusted Consultancy</h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-350 leading-relaxed font-semibold">
                Highly verified credentials across student visas, commercial agreements, real estate boundary deeds, and poultry engineering contracts.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-stone-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition duration-300 space-y-4">
              <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-3 h-12 w-12 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">All Under One Roof</h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-350 leading-relaxed font-semibold">
                No need to shuttle between brokers. From solar panels and drip subsidy approvals to flight booking and IT placements, we process it all.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-stone-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition duration-300 space-y-4">
              <div className="bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 p-3 h-12 w-12 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">Fast Response Engine</h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-350 leading-relaxed font-semibold">
                Enjoy efficient 3-day turnarounds on complex Detailed Project Reports (DPR), urgent travel bookings, and priority local job queues.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-stone-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition duration-300 space-y-4">
              <div className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 p-3 h-12 w-12 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">Reasonable & Fair Priced</h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-350 leading-relaxed font-semibold">
                Committed to regional empowerment. Our counseling fees and processing margins are highly competitive and customized to students and farmers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE PHOTO GALLERY */}
      <section id="gallery" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">VISUAL CORNER</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Work & Services Gallery</h2>
              <div className="h-1.5 w-16 bg-amber-500 rounded-full" />
              <p className="text-sm font-semibold text-stone-500 dark:text-slate-400 max-w-xl">
                Real-time snapshots of our active operations across Rayalaseema. Click any thumbnail to expand.
              </p>
            </div>

            {/* Gallery filter tags */}
            <div className="flex flex-wrap gap-2">
              {uniqueGalleryCategories.map((gcat) => (
                <button
                  key={gcat}
                  onClick={() => setSelectedGalleryCategory(gcat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedGalleryCategory === gcat
                      ? 'bg-amber-500 text-stone-900 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-800'
                  }`}
                >
                  {gcat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setLightboxImage(item.image);
                  setLightboxTitle(item.title);
                }}
                className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-52 sm:h-64 border border-stone-200/50 dark:border-slate-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4.5 flex flex-col justify-end">
                  <span className="text-amber-400 text-xxs font-black tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                    {item.title}
                  </h4>
                  <div className="mt-2.5 flex items-center space-x-1 text-white text-xxs font-black tracking-wider uppercase">
                    <span>Enlarge Photo</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">RECOMMENDATIONS & REVIEWS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Voices of Satisfied Partners</h2>
            <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
            <p className="text-sm font-semibold text-stone-500 dark:text-slate-400">
              Trusted by tech job graduates, global study families, progressive livestock farmers, and top-tier estate investors alike.
            </p>
          </div>

          {/* Testimonial Panel Block */}
          <div className="relative max-w-4xl mx-auto bg-stone-100/60 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-12 border border-stone-200/50 dark:border-slate-850 shadow-sm relative">
            <div className="absolute top-6 left-6 text-6xl text-amber-500/10 font-serif leading-none">&ldquo;</div>
            <div className="absolute bottom-6 right-6 text-6xl text-amber-500/10 font-serif leading-none">&rdquo;</div>

            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center space-x-1 text-amber-500 justify-center">
                {Array.from({ length: TESTIMONIALS_DATA[activeTestimonialNode].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg font-bold text-center text-stone-700 dark:text-slate-200 leading-relaxed max-w-2xl mx-auto">
                &ldquo;{TESTIMONIALS_DATA[activeTestimonialNode].text}&rdquo;
              </blockquote>

              <div className="text-center">
                <span className="block text-base font-black tracking-tight text-stone-950 dark:text-white">
                  {TESTIMONIALS_DATA[activeTestimonialNode].name}
                </span>
                <span className="block text-xs font-extrabold text-teal-700 dark:text-teal-400 uppercase tracking-widest mt-0.5">
                  {TESTIMONIALS_DATA[activeTestimonialNode].role}
                </span>
                <span className="inline-block mt-2 px-3 py-1 bg-stone-200/50 dark:bg-slate-800 text-xxs text-stone-500 dark:text-stone-300 rounded-full font-bold">
                  Reference Sector: {TESTIMONIALS_DATA[activeTestimonialNode].category}
                </span>
              </div>

            </div>

            {/* Slider Switch buttons */}
            <div className="flex justify-center space-x-3 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 transition"
                aria-label="Previous Testimonial"
              >
                <ChevronUp className="w-5 h-5 -rotate-90" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 transition"
                aria-label="Next Testimonial"
              >
                <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDIONS */}
      <section id="faq" className="py-20 lg:py-28 bg-stone-100/40 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">HELP DESK</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Frequently Answered Queries</h2>
            <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
            <p className="text-sm font-semibold text-stone-500 dark:text-slate-400">
              Clear questions and swift answers about timelines, properties, structures, and course guidelines.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-slate-850 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-amber-500" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-stone-405" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed border-t border-stone-100 dark:border-slate-800 font-semibold bg-stone-50/40 dark:bg-slate-950/20">
                      <div className="pt-4 space-y-2">
                        <span className="inline-block text-xxs uppercase tracking-wider text-teal-700 dark:text-teal-400 font-extrabold bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded">
                          Category Tags: {faq.category}
                        </span>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* IN-APP ADMIN BLUEPRINT GATEWAY */}
      <section id="admin-gateway-section" className="py-12 bg-teal-950 border-t border-b border-teal-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-teal-900 border border-teal-800 px-3 py-1 rounded-full text-xxs uppercase font-black text-amber-400">
                <Lock className="w-3 h-3" />
                <span>Secure Lead Management Panel</span>
              </div>
              <h3 className="text-2xl font-black">M.D Naik Leads Authorization Portal</h3>
              <p className="text-xs sm:text-sm text-teal-200 font-semibold">
                An interactive in-app admin dashboard that allows M. Diwakar Naik to view, search, edit, star-rate, and change statuses of customer inquiries directly within this web portal. Seeded with sample entries for review.
              </p>
            </div>

            <div>
              {!isAdminAuthenticated ? (
                <form onSubmit={handleAdminAuth} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-300">
                      <Unlock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      placeholder="Enter Admin Access Code..."
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setAdminError('');
                      }}
                      className="pl-9 pr-4 py-3 bg-teal-900 border border-teal-805 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-xs w-full sm:w-56 text-white placeholder-teal-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs px-6 py-3 rounded-xl transition cursor-pointer"
                  >
                    Authorize Console
                  </button>
                </form>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setIsAdminOpen(!isAdminOpen)}
                    className="bg-white text-teal-905 font-extrabold text-xs px-5 py-3 rounded-xl transition flex items-center space-x-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{isAdminOpen ? 'Minimize Leads Console' : 'Expand Leads Console'}</span>
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="bg-amber-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-amber-700 transition"
                  >
                    Sign Out Securely
                  </button>
                </div>
              )}
              {adminError && <div className="text-red-300 text-xxs font-bold mt-1.5">{adminError}</div>}
              {!isAdminAuthenticated && (
                <div className="text-teal-300 text-xxs mt-1.5 font-semibold">
                  *Demonstration Passcode key is: <strong className="text-amber-300 bg-teal-900/80 px-2 py-0.5 rounded">naik2026</strong>
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE EXPANDED ADMIN LEADS CONSOLE */}
          {isAdminAuthenticated && isAdminOpen && (
            <div id="admin-analytics-leads-dashboard" className="mt-12 bg-white text-stone-800 rounded-3xl p-6 sm:p-10 border border-teal-800/20 shadow-2xl space-y-8 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                <div>
                  <h4 className="text-xl font-black text-teal-950">Active Leads & Operations Center</h4>
                  <p className="text-xxs sm:text-xs text-stone-500 font-bold uppercase tracking-wider">M.D Naik Consultancy Database Hub</p>
                </div>
                
                {/* Stats row inside admin */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-2 rounded-2xl border border-stone-200">
                  <div className="px-3 py-1.5 text-center">
                    <span className="block text-xl font-black text-teal-900">{totalLeadsCount}</span>
                    <span className="text-xxs text-stone-400 font-bold uppercase">Total Leads</span>
                  </div>
                  <div className="px-3 py-1.5 text-center border-l">
                    <span className="block text-xl font-black text-amber-500">{newLeadsCount}</span>
                    <span className="text-xxs text-stone-400 font-bold uppercase">New Queue</span>
                  </div>
                  <div className="px-3 py-1.5 text-center border-l">
                    <span className="block text-xl font-black text-blue-500">{pendingLeadsCount}</span>
                    <span className="text-xxs text-stone-400 font-bold uppercase font-sans">Active Call</span>
                  </div>
                  <div className="px-3 py-1.5 text-center border-l">
                    <span className="block text-xl font-black text-emerald-500">{completedLeadsCount}</span>
                    <span className="text-xxs text-stone-400 font-bold uppercase">Converted</span>
                  </div>
                </div>
              </div>

              {/* Filtering & Sorting Panel inside admin */}
              <div className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/55 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2 text-stone-500 text-xs font-black uppercase">
                  <Filter className="w-4.5 h-4.5" />
                  <span>Interactive Filters:</span>
                </div>

                <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full md:w-auto">
                  <select
                    value={adminFilterStatus}
                    onChange={(e) => setAdminFilterStatus(e.target.value)}
                    className="p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-teal-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">Status: New</option>
                    <option value="In Progress">Status: In Progress</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Closed">Status: Closed</option>
                  </select>

                  <select
                    value={adminFilterCategory}
                    onChange={(e) => setAdminFilterCategory(e.target.value)}
                    className="p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-teal-500"
                  >
                    <option value="All">All Inquired Services</option>
                    <option value="it-coaching">IT Coaching</option>
                    <option value="non-it-placements">Non-IT Placements</option>
                    <option value="nursing-placements">Nursing Placements</option>
                    <option value="india-overseas-education">Overseas Admissions</option>
                    <option value="drip-irrigation">Drip Irrigation</option>
                    <option value="solar-systems">Solar Systems</option>
                    <option value="poultry-automation">Poultry Automation</option>
                    <option value="furniture-woodworks">Furniture Works</option>
                    <option value="polythene-sheets">Polythene Covers</option>
                    <option value="real-estate-ventures">Real Estate Ventures</option>
                    <option value="vehicle-services">Vehicles / Self Drive</option>
                    <option value="publicity-video">Publicity Campaigns</option>
                    <option value="project-reports">Detail Project Reports</option>
                    <option value="travel-services">Travel Tickets / Flights</option>
                  </select>
                </div>

                <span className="text-xxs font-bold text-stone-400 ml-auto uppercase">
                  Leads persist inside local storage memory
                </span>
              </div>

              {/* LEADS LIST ACCORDION/GRID */}
              <div className="space-y-4">
                {leads.filter(l => {
                  const sMatch = adminFilterStatus === 'All' || l.status === adminFilterStatus;
                  const cMatch = adminFilterCategory === 'All' || l.service === adminFilterCategory;
                  return sMatch && cMatch;
                }).length > 0 ? (
                  leads.filter(l => {
                    const sMatch = adminFilterStatus === 'All' || l.status === adminFilterStatus;
                    const cMatch = adminFilterCategory === 'All' || l.service === adminFilterCategory;
                    return sMatch && cMatch;
                  }).map((lead) => (
                    <div
                      key={lead.id}
                      className="border border-stone-200 rounded-2xl p-5 hover:border-teal-300 transition duration-300 space-y-4 bg-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2.5">
                            <span className="text-sm font-black text-teal-950">{lead.name}</span>
                            <span className="text-xxs px-2.5 py-0.5 rounded-full font-bold bg-stone-100 uppercase tracking-widest text-stone-500">
                              {lead.date}
                            </span>
                          </div>
                          <span className="block text-xs font-semibold text-stone-500">
                            Preferred Service: <strong className="text-stone-800">{getServiceLabel(lead.service)}</strong>
                          </span>
                        </div>

                        {/* Status tag selector in admin */}
                        <div className="flex flex-wrap gap-2 items-center">
                          <label className="text-xxs text-stone-400 font-extrabold uppercase mr-1">Status:</label>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`p-1.5 rounded-lg text-xxs font-extrabold uppercase focus:outline-none ${
                              lead.status === 'New' ? 'bg-amber-100 text-amber-700' :
                              lead.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                              lead.status === 'Contacted' ? 'bg-teal-100 text-teal-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            <option value="New">NEW</option>
                            <option value="In Progress">CALL ONGOING</option>
                            <option value="Contacted">CONTACTED</option>
                            <option value="Closed">CLOSED/WON</option>
                          </select>

                          {/* Priority Star Rating */}
                          <div className="flex items-center space-x-1 ml-2">
                            {Array.from({ length: 5 }).map((_, rIdx) => {
                              const score = rIdx + 1;
                              const isFilled = (lead.rating || 5) >= score;
                              return (
                                <button
                                  key={score}
                                  onClick={() => updateLeadRating(lead.id, score)}
                                  className="text-amber-400 hover:scale-110 transition"
                                  title={`Rate Priority ${score}`}
                                >
                                  <Star className={`w-3.5 h-3.5 ${isFilled ? 'fill-current' : 'text-stone-300'}`} />
                                </button>
                              );
                            })}
                          </div>

                          {/* Delete Lead */}
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 px-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-55 text-xxs font-bold uppercase flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Lead Inquiry message */}
                      <div className="bg-stone-50 p-4 rounded-xl text-xs font-semibold text-stone-600 border border-stone-250/30">
                        <span className="block text-xxs font-black text-stone-400 uppercase tracking-widest mb-1">Customer Original Message</span>
                        {lead.message}
                      </div>

                      {/* Admin follow up note logs */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                        <div className="lg:col-span-3 text-xs font-extrabold text-stone-500">
                          <span className="block">Contact Information:</span>
                          <span className="block text-stone-800">Phone: <a href={`tel:${lead.phone}`} className="underline text-teal-600">{lead.phone}</a></span>
                          <span className="block text-stone-800">Email: {lead.email}</span>
                        </div>

                        {/* Textfield for inline follow up updates */}
                        <div className="lg:col-span-9 flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Add follow-up notes (e.g. Schedule call for Tuesday, client agreed to buy, etc...)"
                            value={leadEditingNotes[lead.id] !== undefined ? leadEditingNotes[lead.id] : (lead.notes || '')}
                            onChange={(e) => setLeadEditingNotes({ ...leadEditingNotes, [lead.id]: e.target.value })}
                            className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-teal-500 focus:outline-none font-semibold text-stone-800"
                          />
                          <button
                            onClick={() => {
                              const noteToSave = leadEditingNotes[lead.id] !== undefined ? leadEditingNotes[lead.id] : (lead.notes || '');
                              updateLeadNotes(lead.id, noteToSave);
                            }}
                            className="bg-teal-700 text-white rounded-xl text-xxs font-extrabold px-4.5 py-2.5 uppercase tracking-wider hover:bg-teal-800 transition"
                          >
                            Save Logs
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-stone-50 rounded-2xl p-6 text-stone-400 text-xs font-semibold">
                    No leads currently match the active filters.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* CONTACT & ENQUIRY SECTION */}
      <section id="contact" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black tracking-widest text-teal-700 dark:text-teal-400 uppercase block">GET IN TOUCH</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact M. Diwakar Naik</h2>
                <div className="h-1.5 w-16 bg-amber-500 rounded-full" />
                <p className="text-sm font-semibold text-stone-500 dark:text-slate-450 leading-relaxed">
                  We are available for physical consultations, phone call reviews, and prompt WhatsApp briefings. Let us grow your goals together.
                </p>
              </div>

              {/* Direct links container */}
              <div className="space-y-6">
                
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 p-3 rounded-xl mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-stone-400 uppercase">LOCATION OFFICE</span>
                    <strong className="block text-base text-stone-900 dark:text-white mt-0.5">
                      Sai Nagar, Anantapur, Andhra Pradesh, India
                    </strong>
                    <span className="text-xs font-semibold text-stone-500">Rayalaseema Region Hub</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 p-3 rounded-xl mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-stone-400 uppercase">DIRECT PHONE CALLS</span>
                    <strong className="block text-lg text-stone-900 dark:text-white mt-0.5 font-bold hover:text-teal-600 transition">
                      <a href="tel:+917013161673">+91 70131 61673</a>
                    </strong>
                    <span className="text-xs font-semibold text-stone-550">Speak live with Diwakar Naik</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl mt-1">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-stone-400 uppercase">WHATSAPP PLATFORM</span>
                    <strong className="block text-lg text-stone-900 dark:text-white mt-0.5 font-bold hover:text-emerald-600 transition animate-pulse">
                      <a href="https://wa.me/917353068201" target="_blank" rel="noreferrer">+91 7353068201</a>
                    </strong>
                    <span className="text-xs font-semibold text-stone-500">Instant chat, documents & quotations</span>
                  </div>
                </div>

              </div>

              {/* Real Embedded Location Map placeholder with beautiful UI framing */}
              <div className="bg-stone-100 dark:bg-slate-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-slate-800 p-1.5 shadow-sm">
                <div className="relative h-60 bg-stone-300 dark:bg-slate-800 text-center flex items-center justify-center text-xs font-extrabold uppercase rounded-2xl overflow-hidden">
                  <iframe
                    title="M.D Naik Consultancy Location"
                    className="w-full h-full border-0 filter brightness-95 dark:brightness-75 contrast-105"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3312061324706!2d77.59441117508933!3d14.678128485817296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14b09ecbaf3db%3A0xe7bc3df4b449de01!2sSai%20Nagar%2C%20Anantapur%2C%20Andhra%20Pradesh%20415001!5e0!3m2!1sen!2sin!4v1718420000000!5m2!1sen!2sin"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>

            {/* Right Form Card */}
            <div id="enquiry-form-card" className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-stone-150 dark:border-slate-800 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white">Request Digital Consultation</h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-300">
                  Fill out the secure fields. M. Diwakar Naik and M.D Naik Consultancy advisors will analyze your request and call back within 12 hours.
                </p>
              </div>

              {submitSuccess ? (
                <div id="form-success-card" className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 sm:p-8 rounded-2xl text-center space-y-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 h-16 w-16 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-300">Consultation Booked Successfully!</h4>
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 max-w-md mx-auto">
                      Thank you for submitting your inquiry. Your priority ticket has been logged inside our regional dashboard. Diwakar Naik and our partner managers have received your credentials.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 inline-block text-left text-xxs font-extrabold space-y-1 text-stone-500">
                    <span className="block text-stone-400 uppercase tracking-widest uppercase">Inquiry Tracking Node</span>
                    <span className="block">Lead ID: <strong className="text-teal-600">{submissionId}</strong></span>
                    <span className="block">Status: <strong className="text-amber-600">Pending Phone Review</strong></span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-stone-950 text-white dark:bg-slate-800 text-xs font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form id="consultation-enquiry-form" onSubmit={handleFormSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black text-stone-500 dark:text-slate-300 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full p-3.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black text-stone-500 dark:text-slate-300 uppercase tracking-wider">
                        Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="form-input-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98480 XXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full p-3.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black text-stone-500 dark:text-slate-300 uppercase tracking-wider">
                        Email Address (Optional)
                      </label>
                      <input
                        id="form-input-email"
                        type="email"
                        placeholder="e.g. rajesh@gmail.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full p-3.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black text-stone-500 dark:text-slate-300 uppercase tracking-wider">
                        Category Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="form-select-service"
                        required
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full p-3.5 bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-900 dark:text-white"
                      >
                        <option value="">-- Choose Solution Field --</option>
                        <optgroup label="Placements Path">
                          <option value="it-coaching">Python & Java IT Coaching</option>
                          <option value="non-it-placements">Standard Non-IT Placements</option>
                          <option value="nursing-placements">GNM / B.Sc Nursing Placements</option>
                        </optgroup>
                        <optgroup label="Higher Admissions">
                          <option value="india-overseas-education">India & Global Study Advising (USA/UK)</option>
                        </optgroup>
                        <optgroup label="Agricultural & Subsidized Solar">
                          <option value="drip-irrigation">Smart Drip Irrigation Installations</option>
                          <option value="solar-systems">Residential & Solar Pump Projects</option>
                          <option value="poultry-automation">Poultry Feeding Water Automation</option>
                          <option value="furniture-woodworks">Furniture & Office Woodworks</option>
                          <option value="polythene-sheets">Weather-Guard Polythene sheets (10-Yr Guarantee)</option>
                        </optgroup>
                        <optgroup label="Venture Holdings">
                          <option value="real-estate-ventures">Residential Plots & Farm Fields Sourcing</option>
                          <option value="real-estate-assistance">Legal Registrations & Verification</option>
                        </optgroup>
                        <optgroup label="Vehicling">
                          <option value="vehicle-services">Multi-wheel Broker / Rent Self Drive</option>
                        </optgroup>
                        <optgroup label="Academic Publicity & Projects">
                          <option value="publicity-video">Political Campaigns & Promotion Videos</option>
                          <option value="project-reports">Detail Project Reports (DPR) Prep</option>
                        </optgroup>
                        <optgroup label="Travel Desk">
                          <option value="travel-services">Railway Tatkal & Flight Ticketing Assist</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-stone-500 dark:text-slate-300 uppercase tracking-wider">
                      Message / Special Project Demands
                    </label>
                    <textarea
                      id="form-textarea-message"
                      rows={4}
                      placeholder="e.g. Please mention crop type for irrigation or study background for placements. Also include details on solar capacity requirements."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full p-3.5 bg-stone-50 dark:bg-slate-850 border border-stone-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-stone-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-teal-555 text-white font-black py-4 select-none rounded-xl text-sm transition tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Sending Secure Inquiries...</span>
                    ) : (
                      <>
                        <span>Request Free Consultancy Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-xxs text-stone-400 font-semibold">
                      Your records are safe and securely handled by M.D Naik Consultancy.
                    </span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FLOATING ACTION HELPERS (CALL & WHATSAPP) */}
      <div id="floating-action-bars" className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <a
          id="floating-call-widget"
          href="tel:+917013161673"
          className="bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all text-center flex items-center justify-center border-2 border-white/20"
          title="Direct Phone Call with Diwakar"
        >
          <Phone className="w-6 h-6 animate-pulse" />
        </a>

        <a
          id="floating-whatsapp-widget"
          href="https://wa.me/917353068201?text=Hello%20M.%20Diwakar%20Naik,%20I%20have%20an%20urgent%20enquiry%20regarding%20M.D%20Naik%20Consultancy%20services."
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all text-center flex items-center justify-center border-2 border-white/20"
          title="Instant Support via WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>

      {/* LIGHTBOX FOR IMAGES */}
      {lightboxImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-stone-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-2 space-y-3">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-stone-900/80 text-white hover:text-stone-300 p-2 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="p-2 text-center text-white text-sm font-bold">
              {lightboxTitle}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SECTION */}
      <footer id="site-footer" className="bg-stone-950 text-white border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Branding Block */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="bg-gradient-to-tr from-amber-500 to-teal-600 p-3 rounded-xl text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xl font-black tracking-widest text-amber-500">M.D NAIK CONSULTANCY</span>
                  <span className="block text-xxs font-bold text-slate-300">BY M. DIWAKAR NAIK, B.Tech</span>
                </div>
              </div>

              <p className="text-xs sm:text-xs text-stone-400 font-semibold leading-relaxed max-w-sm">
                Empowering Careers, Global Education, Business Growth, Subsidized Local Farming Projects & High Appreciation Investment Holdings. Secure, verified consultancy across Rayalaseema.
              </p>

              <div className="pt-2 text-xxs font-extrabold text-stone-500">
                <span className="block">Sai Nagar, Anantapur, Andhra Pradesh</span>
                <span className="block">Direct Support: +91 70131 61673 &bull; +91 7353068201</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Quick Verticals</h4>
              <ul className="space-y-2 text-xs font-semibold text-stone-400">
                <li><a href="#services" onClick={() => { setSelectedCategory('Placements'); }} className="hover:text-amber-500 transition">IT & Corporate Placements</a></li>
                <li><a href="#services" onClick={() => { setSelectedCategory('Education'); }} className="hover:text-amber-500 transition">Overseas Higher Education</a></li>
                <li><a href="#services" onClick={() => { setSelectedCategory('Agriculture & Solar'); }} className="hover:text-amber-500 transition">Drip Subsidy & Solar Pumps</a></li>
                <li><a href="#services" onClick={() => { setSelectedCategory('Real Estate'); }} className="hover:text-amber-500 transition">Sai Nagar Layout Plots</a></li>
                <li><a href="#services" onClick={() => { setSelectedCategory('Publicity'); }} className="hover:text-amber-500 transition">Campaign & Media DPR Preparation</a></li>
              </ul>
            </div>

            {/* Admin trigger & Credentials column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Founder Message Portal</h4>
              <p className="text-xxs sm:text-xs text-stone-400 font-semibold leading-relaxed">
                As a student leader and advocate for sustainable regional growth, M. Diwakar Naik coordinates closely with private networks and government clearance departments.
              </p>

              <div className="pt-4 border-t border-stone-850 flex items-center justify-between">
                <div>
                  <span className="block text-xxxs text-stone-500 uppercase font-black">Authorized Operations Console</span>
                  <button
                    onClick={() => {
                      setIsAdminOpen(true);
                      document.getElementById('admin-gateway-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3 h-3" />
                    <span>System Administration Authorization &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-900 text-center space-y-1.5 text-xxs font-extrabold text-stone-500 tracking-wider">
            <p>M. DIWAKAR NAIK, B.Tech &bull; Youth Leader (Rayalaseema) &bull; Founder of M.D Naik Consultancy</p>
            <p>&ldquo;Your Trusted Partner for Growth and Opportunities&rdquo;</p>
            <p className="text-stone-600 mt-2">Copyright &copy; 2026 M.D Naik Consultancy. All Rights Reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
