export interface CourseItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  transmission: 'Manual' | 'Automatic' | 'Both Available';
  image: string;
  description: string;
  suitableFor: string;
  outcomes: string[];
  popular?: boolean;
}

export interface PackageItem {
  id: string;
  number: string;
  name: string;
  duration: string;
  priceNote: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  suitableFor: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  instructorMentioned?: string;
  rating: number;
  timeAgo: string;
  badge?: string;
  text: string;
  verified: boolean;
}

export interface InstructorItem {
  id: string;
  name: string;
  role: string;
  experienceBadge: string;
  image: string;
  feedbackHighlight: string;
  specialty: string[];
  bio: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Training Cars' | 'Driving Practice' | 'Instructor Sessions' | 'Road Training' | 'Learning Moments';
  image: string;
  caption: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    hindiName: string;
    tagline: string;
    concept: string;
    subtitle: string;
    establishedInfo: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    whatsappNumber: string;
    whatsappUrl: string;
    whatsappDefaultMessage: string;
    email: string;
  };
  location: {
    addressLine1: string;
    addressLine2: string;
    fullAddress: string;
    googlePlusCode: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  metrics: {
    googleRating: number;
    ratingMax: number;
    reviewCount: number;
    reviewCountDisplay: string;
    satisfactionRate: string;
    locationLabel: string;
  };
  colors: {
    day: {
      bg: string;
      surface: string;
      accent: string;
      soft: string;
      text: string;
    };
    night: {
      bg: string;
      surface: string;
      accent: string;
      graphite: string;
      text: string;
    };
  };
  navigation: { label: string; href: string }[];
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    altAnimated: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  whyChooseUs: {
    num: string;
    title: string;
    short: string;
    description: string;
    icon: string;
  }[];
  courses: CourseItem[];
  packages: PackageItem[];
  howItWorks: {
    step: string;
    title: string;
    action: string;
    description: string;
    icon: string;
    highlight: string;
  }[];
  reviews: ReviewItem[];
  instructors: InstructorItem[];
  gallery: GalleryItem[];
}

export const SITE_CONFIG: SiteConfig = {
  brand: {
    name: 'A ONE MOTORS',
    hindiName: 'A ONE MOTORS',
    tagline: 'THE ULTIMATE DRIVING EXPERIENCE',
    concept: 'YOUR JOURNEY. YOUR CONTROL. YOUR FREEDOM.',
    subtitle: "KANNUR'S PREMIER DRIVING TRAINING SCHOOL",
    establishedInfo: 'Professional Driver Education in Mayyil, Kannur, Kerala',
  },
  contact: {
    phone: '+91 81292 59790',
    phoneRaw: '+918129259790',
    whatsappNumber: '918129259790',
    whatsappUrl: 'https://wa.me/918129259790',
    whatsappDefaultMessage: 'Hello A ONE Motors, I am interested in learning car driving. Please share your available courses, fees, and training timings.',
    email: 'info@aonemotors.in',
  },
  location: {
    addressLine1: 'Raghava Complex, Near MMC Hospital',
    addressLine2: 'Chirakkal-Mayyil-Kolam Road, Mayyil, Kannur, Kerala 670602',
    fullAddress: 'Raghava Complex, Near MMC Hospital, Chirakkal-Mayyil-Kolam Road, Mayyil, Kannur, Kerala 670602',
    googlePlusCode: 'Mayyil, Kannur, Kerala 670602',
    googleMapsEmbedUrl: 'https://www.google.com/maps?q=Mayyil,+Kannur,+Kerala+670602&output=embed',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=A+One+Motors+Raghava+Complex+Near+MMC+Hospital+Chirakkal-Mayyil-Kolam+Road+Mayyil+Kannur+Kerala+670602',
  },
  metrics: {
    googleRating: 4.7,
    ratingMax: 5.0,
    reviewCount: 6049,
    reviewCountDisplay: '6,049+',
    satisfactionRate: '98%',
    locationLabel: 'Mayyil, Kannur',
  },
  colors: {
    day: {
      bg: '#F8F8F5',
      surface: '#FFFFFF',
      accent: '#FFD400',
      soft: '#E8E8E5',
      text: '#171717',
    },
    night: {
      bg: '#080808',
      surface: '#121212',
      accent: '#FFD400',
      graphite: '#151515',
      text: '#F5F5F5',
    },
  },
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Packages', href: '#packages' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Instructors', href: '#instructors' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    badge: "KANNUR'S DRIVING TRAINING EXPERIENCE",
    headlineLine1: 'LEARN TO DRIVE.',
    headlineLine2: 'OWN THE ROAD.',
    altAnimated: 'Your First Drive Starts Here.',
    description: 'Build confidence behind the wheel with professional driving instructors, practical dual-control vehicle training, and a personalized curriculum engineered for safe, real-world mastery.',
    primaryCta: 'START YOUR JOURNEY',
    secondaryCta: 'EXPLORE COURSES',
  },
  whyChooseUs: [
    {
      num: '01',
      title: 'Experienced Guidance',
      short: 'Instructor Excellence',
      description: 'Learn step-by-step with certified instructors who guide you through the complete driving process with calmness and patience.',
      icon: 'UserCheck',
    },
    {
      num: '02',
      title: 'Practical Learning',
      short: 'Real Road Focus',
      description: 'Hands-on steering time on real Mayyil and Kannur roads, roundabouts, junctions, and highway stretches for genuine practical reflexes.',
      icon: 'Gauge',
    },
    {
      num: '03',
      title: 'Confidence Building',
      short: 'Comfortable Pace',
      description: 'Learn at your individual comfort zone, systematically eliminating nervousness and hesitation behind the steering wheel.',
      icon: 'ShieldCheck',
    },
    {
      num: '04',
      title: 'Flexible Training',
      short: 'Tailored Slots',
      description: 'Morning and evening training slots designed to fit seamlessly around your professional, college, or personal schedule.',
      icon: 'Clock',
    },
    {
      num: '05',
      title: 'Beginner Friendly',
      short: 'First-Time Drivers',
      description: 'A welcoming, supportive environment specially crafted for first-time drivers with dual-control safety-equipped training cars.',
      icon: 'Compass',
    },
    {
      num: '06',
      title: 'Road Awareness',
      short: 'Safety & Regulations',
      description: 'Master crucial traffic signs, right-of-way rules, parallel parking, tight reversing, and defensive driving safety practices.',
      icon: 'Award',
    },
  ],
  courses: [
    {
      id: 'beginner-course',
      title: 'Beginner Driving Course',
      category: 'Foundation',
      duration: 'Comprehensive',
      transmission: 'Both Available',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      description: 'Designed specifically for people who are stepping into the driver seat for the very first time. Step-by-step cockpit orientation to confident road control.',
      suitableFor: 'Complete beginners with zero prior driving experience',
      outcomes: [
        'Dashboard & cockpit control orientation',
        'Smooth clutch-gear coordination & brake modulation',
        'Basic vehicle maneuvering & steering technique',
        'Safe starting, stopping, and turning maneuvers',
      ],
      popular: true,
    },
    {
      id: 'basic-skills',
      title: 'Basic Driving Skills',
      category: 'Vehicle Handling',
      duration: 'Skill Focus',
      transmission: 'Manual',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      description: 'Master essential vehicle dynamics: precise steering control, braking distance awareness, acceleration response, gear control, and vehicle balance.',
      suitableFor: 'Learners seeking solid mechanical understanding & control',
      outcomes: [
        'Steering hand-over-hand and push-pull mastery',
        'Engine gear shift timing & rev management',
        'Smooth deceleration and emergency stopping drills',
        'Uphill start control without rolling back',
      ],
    },
    {
      id: 'city-driving',
      title: 'City Driving Practice',
      category: 'Traffic Mastery',
      duration: 'Traffic Intensive',
      transmission: 'Both Available',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
      description: 'Improve your reflexes while navigating everyday urban and highway traffic, busy junctions, and intersection situations.',
      suitableFor: 'Drivers needing real-world confidence in dense city traffic',
      outcomes: [
        'Merging and lane changing with mirror-indicator-shoulder checks',
        'Navigating busy intersections & town roads in Mayyil & Kannur',
        'Bumper-to-bumper peak hour traffic management',
        'Pedestrian, cyclist, and two-wheeler hazard anticipation',
      ],
      popular: true,
    },
    {
      id: 'parking-reverse',
      title: 'Parking & Reverse Training',
      category: 'Precision',
      duration: 'Specialized',
      transmission: 'Both Available',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
      description: 'Develop sharp practical skills for reverse driving, parallel parking between vehicles, tight 90-degree parking bays, and garage alignment.',
      suitableFor: 'Anyone struggling with parking anxiety or tight spot maneuvering',
      outcomes: [
        'Parallel parking with reference points & mirror calibration',
        'Straight-line reverse & 90-degree reverse bay parking',
        'Angular parking and tight basement ramp navigation',
        'Blind spot mitigation & spatial curb clearance awareness',
      ],
    },
    {
      id: 'refresher-course',
      title: 'Refresher Driving Course',
      category: 'Skill Revival',
      duration: 'Quick Tune-Up',
      transmission: 'Both Available',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      description: 'Designed for license holders who have not driven in a long time or feel nervous driving independently. Rapidly rebuild muscle memory and confidence.',
      suitableFor: 'Existing license holders needing to shake off driving hesitation',
      outcomes: [
        'Rapid confidence revival in real road conditions',
        'Overcoming highway fear and speed anxiety',
        'Updating knowledge of modern traffic signals & Kerala motor vehicle rules',
        'Personal car familiarity adjustment training',
      ],
    },
    {
      id: 'advanced-practice',
      title: 'Advanced Driving Practice',
      category: 'Mastery',
      duration: 'Pro Level',
      transmission: 'Both Available',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
      description: 'Elevate your driving awareness, highway judgement, night driving capability, adverse weather control, and defensive collision-avoidance techniques.',
      suitableFor: 'Experienced learners aiming for superior driver foresight',
      outcomes: [
        'Expressway and flyover high-speed lane discipline',
        'Defensive driving & proactive collision avoidance strategies',
        'Night-time glare management and low-light road tracking',
        'Rainy weather braking and aquaplaning prevention',
      ],
    },
  ],
  packages: [
    {
      id: 'quick-start',
      number: 'PACKAGE 01',
      name: 'QUICK START',
      duration: '7 Days',
      priceNote: 'Contact for Pricing',
      tagline: 'Ideal introduction to fundamental driving controls',
      description: 'For learners who want to grasp basic vehicle controls, steering coordination, and introductory road handling quickly.',
      suitableFor: 'Quick refresher or introductory control familiarity',
      features: [
        'Daily dedicated practical driving session',
        'Cockpit orientation & vehicle control fundamentals',
        'Steering control, clutch balance & braking practice',
        'Instructor guidance with dual-control safety car',
        'WhatsApp trainer coordination & schedule choice',
      ],
    },
    {
      id: 'confidence-builder',
      number: 'PACKAGE 02',
      name: 'CONFIDENCE BUILDER',
      duration: '15 Days',
      priceNote: 'Contact for Pricing',
      tagline: 'Our most popular practical driving curriculum',
      badge: 'MOST POPULAR',
      isPopular: true,
      description: 'A structured, progressive practical course designed to turn nervous beginners into self-assured, road-ready drivers.',
      suitableFor: 'Beginners seeking systematic progress & solid confidence',
      features: [
        '15 dedicated practical on-road training sessions',
        'Extensive city traffic & market road navigation',
        'Roundabout navigation & lane discipline mastery',
        'Reverse driving & basic angle parking practice',
        'Systematic hesitation-removal techniques',
        'Priority morning & evening slot selection',
      ],
    },
    {
      id: 'complete-driver',
      number: 'PACKAGE 03',
      name: 'COMPLETE DRIVER',
      duration: '31 Days',
      priceNote: 'Contact for Pricing',
      tagline: 'The comprehensive all-round driving mastery journey',
      badge: 'COMPREHENSIVE',
      description: 'For learners who desire a thorough, multi-scenario driving experience covering all road types, weather, and parking conditions.',
      suitableFor: 'Aspiring independent drivers wanting zero blind spots',
      features: [
        '31 in-depth practical driving training sessions',
        'Complex traffic, Kerala highways & bypass drives',
        'Exhaustive parallel, angular, and reverse parking mastery',
        'Night driving & headlight glare mitigation training',
        'Defensive driving techniques & emergency hazard reflexes',
        'Comprehensive vehicle maintenance & dashboard checks',
      ],
    },
    {
      id: 'custom-training',
      number: 'PACKAGE 04',
      name: 'CUSTOM TRAINING',
      duration: 'Flexible Schedule',
      priceNote: 'Based on Requirements',
      tagline: 'Tailored specifically around your timetable & needs',
      badge: 'FLEXIBLE',
      description: 'For professionals, students, or busy individuals who require a customized lesson timetable or focus on specific driving challenges.',
      suitableFor: 'Custom hours, weekend-only, or targeted skill enhancement',
      features: [
        'Customized number of training sessions & duration',
        'Weekend-only or tailored time-window availability',
        'Specific focus area (e.g., parking only, highway only)',
        'Option for training in personal car after basic check',
        'Direct instructor consultation to design curriculum',
      ],
    },
  ],
  howItWorks: [
    {
      step: '01',
      title: 'GET IN TOUCH',
      action: 'Connect with A ONE Motors',
      description: 'Call or WhatsApp us on +91 81292 59790. Tell us your experience level, whether you prefer manual or automatic, and your preferred learning hours in Mayyil, Kannur.',
      icon: 'PhoneCall',
      highlight: 'Direct WhatsApp or Call',
    },
    {
      step: '02',
      title: 'CHOOSE YOUR TRAINING',
      action: 'Select Course & Schedule',
      description: 'Discuss your goals with our team. Pick from our 7-Day, 15-Day, or 31-Day programs and lock in convenient morning or evening training batches.',
      icon: 'Calendar',
      highlight: 'Personalized Timetable',
    },
    {
      step: '03',
      title: 'START DRIVING',
      action: 'Take The Driver Seat',
      description: 'Step into our dual-control training car with your dedicated instructor (like Sudheer Kumar, Pradeep Pal, or Ravi Raj). Learn safely and build genuine confidence.',
      icon: 'Car',
      highlight: 'Real-Road Practical Experience',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Rahul Sharma',
      instructorMentioned: 'Sudheer Kumar',
      rating: 5,
      timeAgo: 'Verified Google Review',
      badge: '5-Star Student Review',
      text: 'I had a great experience learning car driving from Sudheer Kumar. He is a very patient, friendly, and professional instructor who explains everything clearly. His teaching style helped me build confidence and improve my driving skills.',
      verified: true,
    },
    {
      id: 'rev-2',
      author: 'Ankit Kumar',
      instructorMentioned: 'Sudheer Kumar',
      rating: 5,
      timeAgo: 'Verified Google Review',
      badge: 'Exceptional Experience',
      text: 'Exceptional Experience with A ONE Motors & Instructor Sudheer Kumar! The training methods and practical tips gave me immense confidence on Kerala roads.',
      verified: true,
    },
    {
      id: 'rev-3',
      author: 'Vibha Nigam',
      instructorMentioned: 'Pradeep Pal',
      rating: 5,
      timeAgo: 'Verified Google Review',
      badge: '5-Star Student Review',
      text: 'I had a wonderful experience learning car driving from Mr Pradeep Pal. He is extremely patient, calm, and professional, and explains everything in a very simple and practical way.',
      verified: true,
    },
    {
      id: 'rev-4',
      author: 'Verified Student',
      instructorMentioned: 'Ravi Raj',
      rating: 5,
      timeAgo: 'Verified Google Review',
      badge: 'Soft-Spoken Trainer',
      text: 'Ravi Raj is really a good teacher (soft spoken) for new drivers. Amazing experience, hassle free service throughout the training period.',
      verified: true,
    },
    {
      id: 'rev-5',
      author: 'Kerala Resident',
      instructorMentioned: 'Sudheer Kumar',
      rating: 5,
      timeAgo: 'Verified Google Review',
      badge: 'Highly Recommended',
      text: 'Learning to drive in Mayyil was a breeze with A ONE Motors. The dual-control cars make you feel totally safe, and the instructors are very polite and focused on real-life driving.',
      verified: true,
    },
  ],
  instructors: [
    {
      id: 'inst-1',
      name: 'Sudheer Kumar',
      role: 'Senior Driving Instructor',
      experienceBadge: 'Student Recommended',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      feedbackHighlight: '"Very patient, friendly, and professional instructor who explains everything clearly."',
      specialty: ['Beginner Confidence', 'Traffic Navigation', 'Smooth Clutch Control'],
      bio: 'Renowned among learners for his calm temperament and structured methodology that turns first-time steering nervousness into steady road mastery.',
    },
    {
      id: 'inst-2',
      name: 'Pradeep Pal',
      role: 'Senior Driving Instructor',
      experienceBadge: 'Student Recommended',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      feedbackHighlight: '"Extremely patient, calm, and professional, explaining everything simply and practically."',
      specialty: ['Defensive Driving', 'Reverse & Parallel Parking', 'City Maneuvering'],
      bio: 'Praised by students for his clear, step-by-step guidance and peaceful teaching style that makes parking and complex junctions easy to master.',
    },
    {
      id: 'inst-3',
      name: 'Ravi Raj',
      role: 'Professional Driving Instructor',
      experienceBadge: 'Student Recommended',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      feedbackHighlight: '"Really a good teacher (soft spoken) for new drivers with hassle-free learning."',
      specialty: ['First-Time Drivers', 'Road Awareness & Signs', 'Vehicle Handling'],
      bio: 'Known for his soft-spoken, encouraging demeanor that creates a stress-free environment for first-time learners who feel nervous behind the wheel.',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Dual Control Training Fleet',
      category: 'Training Cars',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      caption: 'Well-maintained, dual-pedal equipped training vehicles for maximum safety.',
    },
    {
      id: 'gal-2',
      title: 'Practical Road Sessions',
      category: 'Road Training',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Real-world road experience across Mayyil, Kannur and surrounding arterial roads.',
    },
    {
      id: 'gal-3',
      title: 'Precision Parking Drill',
      category: 'Driving Practice',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80',
      caption: 'Systematic reverse and parallel parking drills using real visual marker points.',
    },
    {
      id: 'gal-4',
      title: 'Dedicated Instructor Guidance',
      category: 'Instructor Sessions',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
      caption: 'One-on-one attention ensuring correct hand positioning and situational awareness.',
    },
    {
      id: 'gal-5',
      title: 'First Solo Drive Confidence',
      category: 'Learning Moments',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
      caption: 'Celebrating our students achieving complete independent driving freedom.',
    },
    {
      id: 'gal-6',
      title: 'Night Driving & Glare Training',
      category: 'Road Training',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      caption: 'Learning safe night navigation, high/low beam etiquette, and road reflections.',
    },
  ],
};
