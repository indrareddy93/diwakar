import { ServiceItem, GalleryItem, Testimonial, FAQItem, SuccessStory } from './types';
import profileImage from './profile.jpeg';

// Premium high-fidelity stock assets
export const IMAGES = {
  diwakar_portrait: profileImage, // M. Diwakar Naik authentic profile picture
  diwakar_discussion: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800', // Corporate team meeting
  it_coaching: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800', // Coding workspace
  placements: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800', // Placements handshake
  nursing: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', // Healthcare workers
  education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800', // Graduation & Global Education
  irrigation: 'https://images.unsplash.com/photo-1563514223300-b3b0c2e5d625?auto=format&fit=crop&q=80&w=800', // Drip irrigation/advanced farm
  solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', // Sun over solar panels
  woodwork: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', // Modern furniture & office wood works
  polythene_sheets: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', // Storage farmhouse / warehouse
  poultry_feeders: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800', // Poultry automation/smart farming
  real_estate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', // High-end contemporary real estate building
  two_wheelers: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800', // Premium bike
  four_wheelers: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', // Executive vehicle
  publicity_videos: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', // Business promotion and video editing screen
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800', // Tourism and flight booking
};

export const SERVICES_DATA: ServiceItem[] = [
  // Placements category
  {
    id: 'it-coaching',
    category: 'Placements',
    title: 'IT Coaching with Placement Support',
    subtitle: 'Become Industry-Ready',
    description: 'Elevate your tech career with intensive, practical full-stack coaching program featuring comprehensive assignment feedback, real-world portfolio projects, and direct references to top tech firms.',
    image: IMAGES.it_coaching,
    features: [
      'Python Full Stack & Java Full Stack specialization',
      'Quality testing, automation, and Data Analytics modules',
      'Cloud Technologies (AWS/Azure) & DevOps essentials',
      'Intensive Mock Interviews and Resume optimization',
      'Assured Placement Support & direct referral networks'
    ],
    badge: 'Trending Careeer Path'
  },
  {
    id: 'non-it-placements',
    category: 'Placements',
    title: 'Corporate Non-IT Placements',
    subtitle: 'Pathways for All Talents',
    description: 'We connect job-seekers of all skill bands—from Intermediate graduates, ITI/Diploma holders, to experienced candidates—with reliable non-tech roles in banking, sales, administration, and operations.',
    image: IMAGES.placements,
    features: [
      'Opportunities for Freshers / Experienced candidates',
      'Roles in Administration, Sales Executive, Back-office, Banking',
      'Structured partnerships with pan-India private companies',
      'No background barrier—opportunities for Intermediate/Graduate/Diploma'
    ],
    badge: 'Mass Openings'
  },
  {
    id: 'nursing-placements',
    category: 'Placements',
    title: 'Nursing Jobs & Private Internships',
    subtitle: 'Healthcare Professional Empowerment',
    description: 'Dedicated career alignment for qualified nursing students and graduates (GNM & B.Sc Nursing) across major multispecialty hospitals, clinics, and emergency centers.',
    image: IMAGES.nursing,
    features: [
      'Top hospital linkages in Andhra Pradesh and nationwide',
      'Lucrative hands-on clinical internship opportunities',
      'End-to-end certification assistance & state registration guidance',
      'Professional nursing work environment listings'
    ]
  },

  // Education category
  {
    id: 'india-overseas-education',
    category: 'Education',
    title: 'Global & Domestic Admissions Advisory',
    subtitle: 'From Rayalaseema to the World',
    description: 'Expert planning, admission clearance, and immigration support for universities in India as well as premier international studies destinations.',
    image: IMAGES.education,
    features: [
      'Pre-university Intermediate, Bachelor levels, and Elite Master programs',
      'Premier locations: USA, United Kingdom, Canada, Australia, Germany, Ireland, New Zealand',
      'Individualized profile selection and SOP formatting services',
      'Comprehensive preparation for student visas, paperwork, and educational bank loans'
    ],
    badge: 'Overseas Specialization'
  },

  // Agriculture and Solar (Business Projects)
  {
    id: 'drip-irrigation',
    category: 'Agriculture & Solar',
    title: 'Smart Drip Irrigation Systems',
    subtitle: 'Empowering Agriculture with Subsidies',
    description: 'Premium drip and sprinkler systems installation to conserve water, boost crop production, and optimize fertilizer delivery, backed by professional subsidy clearance.',
    image: IMAGES.irrigation,
    features: [
      'Government subsidy request clearance and formal paperwork',
      'Tailored terrain layout mapping and precision engineering',
      'Unsurpassed material durability with high-quality warranties',
      'Agronomist advisory for enhanced local soil yields'
    ]
  },
  {
    id: 'solar-systems',
    category: 'Agriculture & Solar',
    title: 'Advanced Solar Panel Installations',
    subtitle: 'Clean Power, Continuous Savings',
    description: 'Turnkey solar panel installation for single families, agricultural pump grids, and multi-tenant commercial warehouses to mitigate utility expenses.',
    image: IMAGES.solar,
    features: [
      'Residential rooftop systems, high-voltage agricultural pumps, commercial arrays',
      'Substantial government clean energy subsidies processing',
      'End-to-end solar feasibility report and site structural analysis',
      'Highest quality inverters and smart remote analytics apps'
    ],
    badge: 'A+ Subsidy Project'
  },
  {
    id: 'poultry-automation',
    category: 'Agriculture & Solar',
    title: 'Poultry Smart Automation',
    subtitle: 'Automated Feeders & Nipple Drinkers',
    description: 'Retrofitting standard animal pens and large-scale poultry sheds with robotic feeding tracks and clean automatic drinking nozzles to slash labor costs by 70%.',
    image: IMAGES.poultry_feeders,
    features: [
      'Fully mechanical gravity and screw conveyor feeding structures',
      'Anti-clog double-sealing water nipple drinkers',
      'Significant drop in feed wastage and sanitary hazard risk',
      'Highly custom installations for multi-shed properties'
    ]
  },
  {
    id: 'furniture-woodworks',
    category: 'Agriculture & Solar',
    title: 'Bespoke Furniture & Industrial Woodworks',
    subtitle: 'Master Craftsmanship',
    description: 'High-quality woodwork, sophisticated room partition designs, and specialized premium corporate layouts customized exactly to blueprint requirements.',
    image: IMAGES.woodwork,
    features: [
      'Solid-wood and modern modular home furniture catalogs',
      'Chic executive seating and minimalist modular desks for corporate spaces',
      'Meticulous premium detailing with elite finishes',
      'Timely material supply and skilled carpentry team deployment'
    ]
  },
  {
    id: 'polythene-sheets',
    category: 'Agriculture & Solar',
    title: 'Heavy-Duty Polythene Solutions',
    subtitle: '10-Year Weather-Guard Guarantee',
    description: 'Supreme-tier waterproof and weather-hardened polythene materials for open warehouses, grain covers, farm silos, and industrial storage yards.',
    image: IMAGES.polythene_sheets,
    features: [
      'Sturdy high-density multi-layered UV protection barriers',
      'Standard 10-year official brand warranty coverage',
      'Shields open goods from intense monsoons and direct hot sun',
      'Custom width sizes and direct on-site transport logistics'
    ]
  },

  // Real Estate Services
  {
    id: 'real-estate-ventures',
    category: 'Real Estate',
    title: 'Ventures, Plots & Farmland Sourcing',
    subtitle: 'Transparent Investment Sourcing',
    description: 'Strategic residential layovers, prime farming acres, and urban industrial plots throughout Rayalaseema styled for rapid capital growth.',
    image: IMAGES.real_estate,
    features: [
      'High-growth residential sectors and highway-connected commercial plots',
      'Scenic fertile farmlands and sand-soil plant investment packages',
      'Strict legal clearance, layout authorization (DHUD/APCRDA approval verification)',
      'High appreciation forecasts with structural development indicators'
    ],
    badge: 'Secure Investment'
  },
  {
    id: 'real-estate-assistance',
    category: 'Real Estate',
    title: 'Legal Registration & Verification Support',
    subtitle: 'Hassle-Free Title Clearances',
    description: 'Complete documentation and procedural support to ensure your land purchase or real estate asset is legally spotless, safe from disputes, and register-ready.',
    image: IMAGES.real_estate,
    features: [
      'Expert title searches, encumbrance certificate (EC) lookups',
      'Stamp paper legal drafts and registrar representation scheduling',
      'Clear, objective guidance on boundary disputes and tax records'
    ]
  },

  // Vehicle Services
  {
    id: 'vehicle-services',
    category: 'Vehicles',
    title: 'Multipurpose Two & Four-Wheeler Solutions',
    subtitle: 'From Daily Rides to Fleet Vehicles',
    description: 'We host sales brokerage networks, high-quality second-hand multi-point inspections, and luxury self-drive rentals for regional travel.',
    image: IMAGES.four_wheelers,
    features: [
      'Showroom booking advice for brand new luxury motorcycles and family SUVs',
      'Impeccable pre-owned models certified with complete papers',
      'Affordable hourly and daily self-drive configurations for business travels',
      'Taxies, commercial loaders, and agricultural mini-tractors'
    ]
  },

  // Publicity Services
  {
    id: 'publicity-video',
    category: 'Publicity',
    title: 'Campaign Media & Promotion Video Production',
    subtitle: 'Drive Impactful Engagement',
    description: 'Cinematic business commercials, dynamic local political summaries, event announcements, and dynamic social media reels optimized for instant reach.',
    image: IMAGES.publicity_videos,
    features: [
      'Stunning high-definition video recording, editing, and audio design',
      'Modern political canvassing layouts styled for Rayalaseema youth leaders',
      'Engaging direct text scripts suited for YouTube/Facebook ads distribution',
      'Affordable, super-fast rendering and production delivery'
    ],
    badge: 'Highest Engagement'
  },
  {
    id: 'project-reports',
    category: 'Publicity',
    title: 'Detailed Project Reports (DPR) & Loan Docs',
    subtitle: 'Turn Business Ideas Into Bankable Realities',
    description: 'Comprehensive financial, operations, and market projections formulated perfectly to comply with bank standards and government subsidy plans.',
    image: IMAGES.publicity_videos,
    features: [
      'Perfect formulas showing ROI, break-even nodes, and cash flow',
      'Tailored to central/state industry subsidies (PMEGP, MSME, Agriculture schemas)',
      'Highly professional, comprehensive technical analysis documentation guidelines',
      'Ultra-competitive rate plans with rapid 3-day turnaround cycles'
    ]
  },

  // Travel Services
  {
    id: 'travel-services',
    category: 'Travel',
    title: 'Domestic & International Ticketing Assist',
    subtitle: 'Stress-free Bookings',
    description: 'Affordable domestic and global flight routes, along with prompt railway Tatkal bookings and custom tour planning.',
    image: IMAGES.travel,
    features: [
      'Rapid railway ticket booking with a dedicated focus on Tatkal reservations',
      'Competitively priced direct flight tickets with prominent airline operators',
      'Comprehensive regional family car rental schedules and hotel package reserves'
    ]
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  { id: 'gal-1', title: 'Top-tier IT Placement Handover', category: 'Placements', image: IMAGES.it_coaching },
  { id: 'gal-2', title: 'Consultation with Global Education Candidates', category: 'Overseas Education', image: IMAGES.education },
  { id: 'gal-3', title: 'Subsidized Solar Farm Setup in Anantapur', category: 'Solar Projects', image: IMAGES.solar },
  { id: 'gal-4', title: 'Success-Tested Drip Irrigation Installation', category: 'Agriculture Projects', image: IMAGES.irrigation },
  { id: 'gal-5', title: 'Premium Commercial Villa Site Clearing', category: 'Real Estate', image: IMAGES.real_estate },
  { id: 'gal-6', title: 'Tour & Executive Travel Vehicles', category: 'Vehicles', image: IMAGES.four_wheelers },
  { id: 'gal-7', title: 'Political Ad Production & Reels Launch', category: 'Publicity Work', image: IMAGES.publicity_videos },
  { id: 'gal-8', title: 'Group Travel Logistics & Tickets Issued', category: 'Travel Services', image: IMAGES.travel }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'S. Rajesh Kumar',
    role: 'Senior Python Developer, Cognizant',
    text: 'Enrolling in India & IT Placements changed everything. Diwakar Naiks personal career mentoring was the fuel I needed. The Python stack curriculum was highly practical, and the direct mock interviews landed me my first high-paying tech opportunity!',
    category: 'Placements',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'M. Kavitha Reddy',
    role: 'Parent of MCA Student Studying in USA',
    text: 'Diwakar and M.D Naik Consultancy handled my daughters complete overseas application for university and visa documents. Their knowledge of scholarship quotas, university selections, and bank loans was flawless. Highly recommend them!',
    category: 'Education',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Chinnapa Naidu',
    role: 'Progressive Farmer, Gooty Region',
    text: 'Installing the Drip Irrigation and automatic poultry feeders gave our agricultural lands an amazing productivity boost. Under M.D Naik Consultancys persistent guidance, we secured a 70% state subsidy with zero hassles!',
    category: 'Agriculture & Solar',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'K. Prasad Yadav',
    role: 'Real Estate Investor, Sai Nagar',
    text: 'Their ventures in Sai Nagar, Anantapur are completely legal and DHUD approved. Buying layout plots through M. Diwakar was extremely transparent, with complete registration and legal documents handed over in record time.',
    category: 'Real Estate',
    rating: 5
  },
  {
    id: 'test-5',
    name: 'G. Harish Kumar',
    role: 'Managing Partner, GK Transport Services',
    text: 'I sought after pre-owned commercial vehicles and corporate travel tickets. Diwakar Naik resolved everything under one roof, proposing amazing self-drive vehicles, cheap flight plans, and precise business promotional video campaigns.',
    category: 'Vehicles',
    rating: 5
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Placements',
    question: 'How does the IT Coaching placement assistance model work?',
    answer: 'We provide specialized coaching in Python, Java, Testing, and Data Analytics. Upon completing the course, students are given mock interview reviews, optimized resumes, and direct placement opportunities with top tech firms in Bangalore, Hyderabad, and Chennai.'
  },
  {
    id: 'faq-2',
    category: 'Business Subsidies',
    question: 'Can you help us secure government subsidies for agricultural or clean energy projects?',
    answer: 'Absolutely. We specialize in processing central and state government solar and agricultural drip-irrigation subsidies. From technical evaluation (DPR preparation) to formal sanctioning, our team manages the entire process.'
  },
  {
    id: 'faq-3',
    category: 'Real Estate',
    question: 'Are the real estate plots and farm fields legally safe with proper credentials?',
    answer: 'Yes. Every plot, agricultural acreage, or flat we represent goes through strict legal verification, complete title clearance verification, encumbrance certificate (EC) audits, and meets authorized local development board guidelines.'
  },
  {
    id: 'faq-4',
    category: 'Education',
    question: 'Where can you help students apply for global study visas and college loans?',
    answer: 'We provide comprehensive overseas counseling for the USA, Canada, United Kingdom, Australia, Germany, Ireland, and New Zealand. Our support covers university applications, formatting Statements of Purpose (SOP), visa preparation, and processing education bank loans.'
  },
  {
    id: 'faq-5',
    category: 'Publicity',
    question: 'How fast can you deliver Detailed Project Reports (DPR) and business videos?',
    answer: 'Typically, business publicity video campaigns and complex academic or bank-level Detailed Project Reports (DPRs) are drafted, prepared, and finalized within 3 to 5 business days at highly reasonable rates.'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'Successful Career Landings',
    metric: '450+ Candidates',
    description: 'Placed globally across premium software engineering, business development, and multispecialty nursing sectors.',
    category: 'Placements',
    icon: 'Briefcase'
  },
  {
    id: 'story-2',
    title: 'Overseas Student Placement Completed',
    metric: '120+ Visas Approved',
    description: 'Helping young scholars study abroad with complete banking assistance and visa compliance clearance.',
    category: 'Education',
    icon: 'GraduationCap'
  },
  {
    id: 'story-3',
    title: 'Subsidy Solar & Drip Farms Authorized',
    metric: '180+ Acres Installed',
    description: 'Transitioning farmers and local businesses to advanced agricultural drip configurations and solar grids.',
    category: 'Agriculture',
    icon: 'Sun'
  },
  {
    id: 'story-4',
    title: 'Legal Plots Transferred Securely',
    metric: '300+ Happy Families',
    description: 'Acquiring premier home plots with legally pristine titles, registered smoothly at local sub-registrar offices.',
    category: 'Real Estate',
    icon: 'MapPin'
  }
];
