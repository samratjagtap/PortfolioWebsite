import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Instagram, Code2, Smartphone, Globe, Zap, Video, Camera, Users, ExternalLink, Menu, X, ArrowRight, Play, Pause, ChevronRight, FileText, Download, Eye } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { CursorTrail } from './components/CursorTrail';
import { InteractiveBackground } from './components/InteractiveBackground';
import { FloatingElements } from './components/FloatingElements';
import { GlitchText } from './components/GlitchText';
import { MorphingCard } from './components/MorphingCard';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { MultilingualName } from './components/MultilingualName';

function AppContent() {
  const { themeConfig } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  const roles = ['Software Developer', 'Mobile Developer', 'Web Developer', 'Full Stack Engineer'];
  const fullText = roles[currentRole];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setTypedText('');
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentRole, fullText]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    {
      category: 'Frontend Technologies & Frameworks',
      icon: <Code2 className="w-6 h-6" />,
      color: 'cyan',
      skills: [
        { 
          name: 'Flutter', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
          color: 'blue' 
        },
        { 
          name: 'React Native', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          color: 'cyan' 
        },
        { 
          name: 'React.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          color: 'cyan' 
        },
        { 
          name: 'Redux', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
          color: 'purple' 
        },
        { 
          name: 'AngularJS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
          color: 'red' 
        },
      ]
    },
    {
      category: 'Backend Technologies & Frameworks',
      icon: <Globe className="w-6 h-6" />,
      color: 'emerald',
      skills: [
        { 
          name: 'Node.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          color: 'emerald' 
        },
        { 
          name: 'Django', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
          color: 'green' 
        },
        { 
          name: 'Supabase', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
          color: 'emerald' 
        },
        { 
          name: 'RESTful APIs', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
          color: 'blue' 
        },
      ]
    },
    {
      category: 'DevOps & Cloud Tools',
      icon: <Zap className="w-6 h-6" />,
      color: 'orange',
      skills: [
        { 
          name: 'Docker', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
          color: 'blue' 
        },
        { 
          name: 'AWS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
          color: 'orange' 
        },
      ]
    },
    {
      category: 'Mobile Development Tools',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'green',
      skills: [
        { 
          name: 'Android Studio', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
          color: 'green' 
        },
      ]
    },
    {
      category: 'Databases',
      icon: <Globe className="w-6 h-6" />,
      color: 'blue',
      skills: [
        { 
          name: 'Firebase', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
          color: 'orange' 
        },
        { 
          name: 'PostgreSQL', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
          color: 'blue' 
        },
        { 
          name: 'MySQL', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
          color: 'blue' 
        },
        { 
          name: 'MongoDB', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          color: 'green' 
        },
      ]
    },
    {
      category: 'Software Development Practices & Tools',
      icon: <Code2 className="w-6 h-6" />,
      color: 'purple',
      skills: [
        { 
          name: 'Git', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
          color: 'orange' 
        },
        { 
          name: 'CI/CD', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
          color: 'purple' 
        },
        { 
          name: 'Agile Methodology', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
          color: 'pink' 
        },
        { 
          name: 'Microservice Architecture', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
          color: 'indigo' 
        },
        { 
          name: 'Object-Oriented Programming', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          color: 'cyan' 
        },
      ]
    },
  ];

  const projects = [
    {
      title: 'Neural Commerce Platform',
      description: 'AI-powered e-commerce with real-time personalization and advanced analytics',
      tech: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Quantum Task Manager',
      description: 'Cross-platform productivity app with quantum-inspired algorithms',
      tech: ['React Native', 'Firebase', 'Redux', 'ML Kit'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Holographic Chat System',
      description: 'Next-gen communication platform with AR/VR integration',
      tech: ['WebRTC', 'Three.js', 'Socket.io', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const offbeatActivities = [
    {
      title: 'Street Skateboarding',
      description: 'Technical street tricks and urban exploration',
      icon: <Zap className="w-8 h-8" />,
      details: 'Mastering technical street tricks, rail grinds, and stair sets. Featured in local skate videos and constantly pushing the boundaries of what\'s possible on four wheels.',
      color: 'orange',
      gallery: [
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Street Session',
          size: 'large'
        },
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          poster: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Kickflip Combo',
          size: 'medium'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Rail Grind',
          size: 'small'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/1374065/pexels-photo-1374065.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Stair Set',
          size: 'medium'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/1374066/pexels-photo-1374066.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Urban Spot',
          size: 'small'
        },
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
          poster: 'https://images.pexels.com/photos/1374067/pexels-photo-1374067.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Street Line',
          size: 'large'
        }
      ]
    },
    {
      title: 'Live Streaming',
      description: 'Gaming and coding content creation',
      icon: <Video className="w-8 h-8" />,
      details: 'Building a vibrant community through live coding sessions and gaming streams. Sharing knowledge, entertaining viewers, and creating meaningful connections in the digital space.',
      color: 'purple',
      gallery: [
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          poster: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Live Coding Session',
          size: 'large'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Setup Tour',
          size: 'medium'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Gaming Stream',
          size: 'small'
        },
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4',
          poster: 'https://images.pexels.com/photos/4009403/pexels-photo-4009403.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'React Tutorial',
          size: 'medium'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500',
          title: 'Community Chat',
          size: 'small'
        }
      ]
    },
    {
      title: 'Motorcycle Stunts',
      description: 'Precision riding and choreographed performances',
      icon: <Camera className="w-8 h-8" />,
      details: 'Performing precision wheelies, stoppies, and custom choreographed routines. Each performance is a carefully crafted blend of skill, timing, and adrenaline.',
      color: 'cyan',
      gallery: [
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
          poster: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Wheelie Performance',
          size: 'large'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Stoppie Precision',
          size: 'medium'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/2116476/pexels-photo-2116476.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Track Day',
          size: 'small'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/2116477/pexels-photo-2116477.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Group Ride',
          size: 'medium'
        },
        {
          type: 'video',
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_5mb.mp4',
          poster: 'https://images.pexels.com/photos/2116478/pexels-photo-2116478.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'Choreographed Routine',
          size: 'large'
        },
        {
          type: 'image',
          src: 'https://images.pexels.com/photos/2116479/pexels-photo-2116479.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Behind Scenes',
          size: 'small'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeConfig.background} ${themeConfig.textPrimary} relative overflow-x-hidden transition-all duration-500`}>
      <CursorTrail />
      <InteractiveBackground />
      <FloatingElements />
      <ThemeSwitcher />

      {/* Navigation */}
      {/* Clean Header Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${themeConfig.cardBg}/80 backdrop-blur-md ${themeConfig.border} border-b`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-display font-bold">
              <GlitchText text="ALEX" className={`${themeConfig.accent} font-bold`} />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'offbeat', label: 'Offbeat' },
                { id: 'music', label: 'Music' },
                { id: 'resume', label: 'Resume' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'resume' ? setIsResumeModalOpen(true) : scrollToSection(item.id)}
                  className={`${item.id === 'resume' ? 
                    `px-4 py-2 rounded-full border-2 ${themeConfig.border} ${themeConfig.accent} hover:${themeConfig.accent.replace('text-', 'bg-')} hover:text-white transition-all duration-300 font-semibold` : 
                    `${themeConfig.textSecondary} hover:${themeConfig.accent} transition-colors duration-300 font-medium`
                  } ${
                    activeSection === item.id ? themeConfig.accent : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${themeConfig.textSecondary} hover:${themeConfig.accent} transition-colors`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4">
              <div className="flex flex-col space-y-3">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'offbeat', label: 'Offbeat' },
                  { id: 'music', label: 'Music' },
                  { id: 'resume', label: 'Resume' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.id === 'resume' ? setIsResumeModalOpen(true) : scrollToSection(item.id)}
                    className={`text-left ${item.id === 'resume' ? 
                      `px-3 py-2 rounded-lg border ${themeConfig.border} ${themeConfig.accent} hover:${themeConfig.accent.replace('text-', 'bg-')} hover:text-white transition-all duration-300 font-semibold` : 
                      `${themeConfig.textSecondary} hover:${themeConfig.accent} transition-colors duration-300 font-medium py-2`
                    } ${
                      activeSection === item.id ? themeConfig.accent : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative section-padding pt-24">
        <div className="container mx-auto text-center relative z-20">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-display font-bold mb-6">
              <span className={themeConfig.textPrimary}>Hi, I'm</span>
              <br />
              <MultilingualName className={`${themeConfig.accent} font-bold ml-4`} />
            </h1>
          </div>
          
          <div className="text-3xl md:text-4xl font-display font-medium mb-8 h-16 flex items-center justify-center">
            <span className={`${themeConfig.accent} font-mono`}>{typedText}</span>
            <span className={`animate-pulse ${themeConfig.accent} ml-1`}>|</span>
          </div>
          
          <p className={`text-xl ${themeConfig.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}>
            Crafting digital experiences that push boundaries. When I'm not coding the future, 
            I'm living it through <span className="text-orange-400 font-semibold">skateboarding</span>, 
            <span className="text-purple-400 font-semibold"> live streaming</span>, and 
            <span className={`${themeConfig.accent} font-semibold`}> motorcycle stunts</span>.
          </p>
          
          <div className="flex justify-center space-x-8 mb-16">
            {[
              { icon: Github, href: '#', color: `hover:${themeConfig.textPrimary}` },
              { icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
              { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
              { icon: Mail, href: '#', color: 'hover:text-emerald-400' },
            ].map(({ icon: Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                className={`${themeConfig.textSecondary} ${color} transition-all duration-300 hover:scale-125 hover-lift`}
              >
                <Icon className="w-8 h-8" />
              </a>
            ))}
          </div>
          
          <button
            onClick={() => scrollToSection('about')}
            className={`group flex items-center mx-auto space-x-2 ${themeConfig.accent} hover:${themeConfig.textPrimary} transition-all duration-300`}
          >
            <span className="font-medium">Explore My World</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative z-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <GlitchText text="About Me" className={themeConfig.accent} />
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MorphingCard className="p-8" hoverColor={themeConfig.accent.split('-')[1]}>
              <h3 className={`text-3xl font-display font-semibold mb-6 ${themeConfig.textPrimary}`}>The Developer</h3>
              <p className={`${themeConfig.textSecondary} mb-6 leading-relaxed text-lg`}>
                I'm a passionate full-stack developer with 5+ years of experience crafting digital solutions 
                that matter. I specialize in modern web technologies, mobile development, and creating 
                user experiences that leave lasting impressions.
              </p>
              <p className={`${themeConfig.textSecondary} mb-8 leading-relaxed text-lg`}>
                My approach combines technical excellence with creative problem-solving, always pushing 
                the boundaries of what's possible in the digital realm.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Projects Completed', value: '50+' },
                  { label: 'Years Experience', value: '5+' },
                  { label: 'Technologies Mastered', value: '20+' },
                  { label: 'Coffee Consumed', value: '∞' },
                ].map((stat, index) => (
                  <div key={index} className={`text-center p-4 ${themeConfig.cardBg} ${themeConfig.border} border rounded-lg`}>
                    <div className={`text-2xl font-bold ${themeConfig.accent}`}>{stat.value}</div>
                    <div className={`text-sm ${themeConfig.textSecondary}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </MorphingCard>

            <MorphingCard className="p-8" hoverColor={themeConfig.accentSecondary.split('-')[1]}>
              <h3 className={`text-3xl font-display font-semibold mb-6 ${themeConfig.textPrimary}`}>The Adventurer</h3>
              <p className={`${themeConfig.textSecondary} mb-6 leading-relaxed text-lg`}>
                Beyond the screen, I'm all about pushing limits and exploring the unconventional. 
                Whether I'm landing a new skateboard trick, engaging with my streaming community, 
                or performing motorcycle stunts, I bring the same passion and precision to everything I do.
              </p>
              <p className={`${themeConfig.textSecondary} mb-8 leading-relaxed text-lg`}>
                This adventurous spirit directly influences my development work, encouraging me to 
                take creative risks and find innovative solutions to complex problems.
              </p>
              
              {/* Adventure Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`p-6 ${themeConfig.cardBg} ${themeConfig.border} border rounded-xl group hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-full mr-4">
                      <Zap className="w-6 h-6 text-orange-400" />
                    </div>
                    <h4 className={`text-xl font-display font-semibold ${themeConfig.textPrimary}`}>Skateboarding</h4>
                  </div>
                  <p className={`${themeConfig.textSecondary} text-sm leading-relaxed`}>
                    Street tricks, rail grinds, and urban exploration. Every session teaches me about persistence, 
                    precision, and the importance of getting back up after every fall.
                  </p>
                </div>

                <div className={`p-6 ${themeConfig.cardBg} ${themeConfig.border} border rounded-xl group hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                      <Video className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className={`text-xl font-display font-semibold ${themeConfig.textPrimary}`}>Live Streaming</h4>
                  </div>
                  <p className={`${themeConfig.textSecondary} text-sm leading-relaxed`}>
                    Building communities through gaming and coding streams. Real-time interaction and 
                    problem-solving while entertaining and educating viewers.
                  </p>
                </div>

                <div className={`p-6 ${themeConfig.cardBg} ${themeConfig.border} border rounded-xl group hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-cyan-500/20 rounded-full mr-4">
                      <Camera className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className={`text-xl font-display font-semibold ${themeConfig.textPrimary}`}>Motorcycle Stunts</h4>
                  </div>
                  <p className={`${themeConfig.textSecondary} text-sm leading-relaxed`}>
                    Precision wheelies and choreographed performances. Each stunt requires careful 
                    planning, risk assessment, and flawless execution.
                  </p>
                </div>

                <div className={`p-6 ${themeConfig.cardBg} ${themeConfig.border} border rounded-xl group hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-full mr-4">
                      <Users className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className={`text-xl font-display font-semibold ${themeConfig.textPrimary}`}>Community Building</h4>
                  </div>
                  <p className={`${themeConfig.textSecondary} text-sm leading-relaxed`}>
                    Creating meaningful connections across different platforms and activities. 
                    From coding communities to extreme sports enthusiasts.
                  </p>
                </div>
              </div>

              {/* Philosophy Quote */}
              <div className={`p-6 ${themeConfig.cardBg} ${themeConfig.border} border rounded-xl text-center`}>
                <blockquote className={`text-xl font-display italic ${themeConfig.textPrimary} mb-4`}>
                  "The same mindset that helps me land a difficult trick or nail a complex stunt 
                  is what drives me to solve challenging coding problems."
                </blockquote>
                <div className={`w-16 h-1 bg-gradient-to-r ${themeConfig.accent.replace('text-', 'from-')} to-purple-500 mx-auto rounded-full`} />
              </div>
            </MorphingCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding relative z-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <GlitchText text="Technical Arsenal" className={themeConfig.accent} />
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {skills.map((category, categoryIndex) => (
              <MorphingCard key={categoryIndex} className="overflow-hidden" hoverColor={category.color}>
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.category ? null : category.category
                  )}
                  className="w-full p-6 flex items-center justify-between transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-${category.color}-500/20 text-${category.color}-400`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-display font-bold ${themeConfig.textPrimary}`}>
                        {category.category}
                      </h3>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-6 h-6 ${themeConfig.textSecondary} transition-transform duration-300 ${
                      expandedCategory === category.category ? 'rotate-90' : ''
                    }`} 
                  />
                </button>

                {/* Skills Grid */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCategory === category.category 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-6 pt-4 pb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className={`group relative p-4 rounded-xl ${themeConfig.cardBg} ${themeConfig.border} border hover:border-${skill.color}-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-3 cursor-pointer mb-2`}
                        >
                          {/* Skill Logo */}
                          <div className="flex flex-col items-center space-y-3">
                            <div className="relative">
                              <img 
                                src={skill.logo} 
                                alt={skill.name}
                                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  // Fallback to a generic icon if logo fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'block';
                                }}
                              />
                              <div className={`hidden w-12 h-12 rounded-lg bg-${skill.color}-500/20 flex items-center justify-center`}>
                                <Code2 className={`w-6 h-6 text-${skill.color}-400`} />
                              </div>
                              
                              {/* Glow effect on hover */}
                              <div className={`absolute inset-0 rounded-lg bg-${skill.color}-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                            </div>
                            
                            <h4 className={`text-sm font-display font-semibold ${themeConfig.textPrimary} text-center leading-tight group-hover:text-${skill.color}-400 transition-colors duration-300`}>
                              {skill.name}
                            </h4>
                          </div>

                          {/* Floating particles on hover */}
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className={`absolute top-2 right-2 w-1 h-1 bg-${skill.color}-400 rounded-full animate-ping`} />
                            <div className={`absolute bottom-2 left-2 w-1 h-1 bg-${skill.color}-400 rounded-full animate-ping`} style={{ animationDelay: '0.3s' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MorphingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding relative z-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <GlitchText text="Featured Projects" className={themeConfig.accent} />
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <MorphingCard 
                key={index} 
                className={`overflow-hidden group ${project.featured ? 'lg:col-span-2' : ''}`}
                hoverColor={themeConfig.accent.split('-')[1]}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href={project.github} className={`p-2 ${themeConfig.cardBg} rounded-full hover:bg-white/20 transition-colors`}>
                        <Github className={`w-5 h-5 ${themeConfig.textPrimary}`} />
                      </a>
                      <a href={project.demo} className={`p-2 ${themeConfig.cardBg} rounded-full hover:bg-white/20 transition-colors`}>
                        <ExternalLink className={`w-5 h-5 ${themeConfig.textPrimary}`} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-2xl font-display font-semibold mb-3 ${themeConfig.textPrimary} group-hover:${themeConfig.accent} transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={`${themeConfig.textSecondary} mb-4 leading-relaxed`}>{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`px-3 py-1 ${themeConfig.cardBg} ${themeConfig.border} border rounded-full text-sm ${themeConfig.accent} font-mono`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </MorphingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Offbeat Me Section */}
      <section id="offbeat" className={`section-padding relative z-20 ${themeConfig.cardBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-6">
            <GlitchText text="Offbeat Me" className={themeConfig.accent} />
          </h2>
          <p className={`text-center ${themeConfig.textSecondary} mb-16 max-w-3xl mx-auto text-lg leading-relaxed`}>
            Life's too short for ordinary. Here's where I channel my energy when I'm not crafting code.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {offbeatActivities.map((activity, index) => (
              <div key={index} className="space-y-6">
                {/* Activity Header */}
                <MorphingCard className="p-6 group" hoverColor={activity.color}>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 glass-morphism rounded-full text-${activity.color}-400 mr-4`}>
                      {activity.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-display font-bold ${themeConfig.textPrimary} mb-1`}>{activity.title}</h3>
                      <p className={`text-${activity.color}-400 font-semibold`}>{activity.description}</p>
                    </div>
                  </div>
                  <p className={`${themeConfig.textSecondary} mb-4 leading-relaxed`}>{activity.details}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-${activity.color}-400 font-mono text-sm font-bold`}>
                      {activity.stats}
                    </span>
                    <span className={`${themeConfig.textSecondary} text-sm`}>
                      {activity.gallery.length} items
                    </span>
                  </div>
                </MorphingCard>

                {/* Dynamic Gallery Grid */}
                <div className="grid grid-cols-12 gap-4 auto-rows-min">
                  {activity.gallery.map((item, itemIndex) => {
                    const getGridClasses = () => {
                      switch (item.size) {
                        case 'large':
                          return 'col-span-12 md:col-span-8 row-span-2';
                        case 'medium':
                          return 'col-span-6 md:col-span-4 row-span-1';
                        case 'small':
                          return 'col-span-6 md:col-span-4 row-span-1';
                        default:
                          return 'col-span-6 md:col-span-4 row-span-1';
                      }
                    };

                    const getHeightClass = () => {
                      switch (item.size) {
                        case 'large':
                          return 'h-80 md:h-96';
                        case 'medium':
                          return 'h-48 md:h-56';
                        case 'small':
                          return 'h-32 md:h-40';
                        default:
                          return 'h-48';
                      }
                    };

                    return (
                      <MorphingCard 
                        key={itemIndex} 
                        className={`${getGridClasses()} group overflow-hidden cursor-pointer`}
                        hoverColor={activity.color}
                      >
                        <div className={`relative ${getHeightClass()} overflow-hidden`}>
                          {item.type === 'video' ? (
                            <div className="relative w-full h-full">
                              <video
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                poster={item.poster}
                                preload="metadata"
                                muted
                                onMouseEnter={(e) => {
                                  const video = e.target as HTMLVideoElement;
                                  video.play().catch(() => {});
                                }}
                                onMouseLeave={(e) => {
                                  const video = e.target as HTMLVideoElement;
                                  video.pause();
                                  video.currentTime = 0;
                                }}
                              >
                                <source src={item.src} type="video/mp4" />
                              </video>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className={`p-2 glass-morphism rounded-full text-${activity.color}-400`}>
                                  <Play className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img 
                              src={item.src} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                            <h4 className={`${themeConfig.textPrimary} font-display font-semibold text-sm md:text-base mb-1`}>
                              {item.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className={`text-${activity.color}-400 text-xs font-mono uppercase tracking-wide`}>
                                {item.type}
                              </span>
                              <span className={`text-${activity.color}-400 text-xs`}>•</span>
                              <span className={`${themeConfig.textSecondary} text-xs capitalize`}>
                                {item.size}
                              </span>
                            </div>
                          </div>
                        </div>
                      </MorphingCard>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className={`section-padding relative z-20 ${themeConfig.cardBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <GlitchText text="My Soundtrack" className={themeConfig.accent} />
          </h2>
          <SpotifyPlayer />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative z-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <GlitchText text="Let's Connect" className={themeConfig.accent} />
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <MorphingCard className="p-8" hoverColor={themeConfig.accent.split('-')[1]}>
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`block ${themeConfig.textSecondary} font-medium`}>Name</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-4 ${themeConfig.cardBg} ${themeConfig.border} border rounded-lg focus:ring-2 focus:ring-current focus:outline-none transition-all ${themeConfig.textPrimary} placeholder-opacity-60`}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block ${themeConfig.textSecondary} font-medium`}>Email</label>
                    <input 
                      type="email" 
                      className={`w-full px-4 py-4 ${themeConfig.cardBg} ${themeConfig.border} border rounded-lg focus:ring-2 focus:ring-current focus:outline-none transition-all ${themeConfig.textPrimary} placeholder-opacity-60`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className={`block ${themeConfig.textSecondary} font-medium`}>Subject</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-4 ${themeConfig.cardBg} ${themeConfig.border} border rounded-lg focus:ring-2 focus:ring-current focus:outline-none transition-all ${themeConfig.textPrimary} placeholder-opacity-60`}
                    placeholder="Project collaboration"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className={`block ${themeConfig.textSecondary} font-medium`}>Message</label>
                  <textarea 
                    rows={6}
                    className={`w-full px-4 py-4 ${themeConfig.cardBg} ${themeConfig.border} border rounded-lg focus:ring-2 focus:ring-current focus:outline-none transition-all ${themeConfig.textPrimary} placeholder-opacity-60 resize-none`}
                    placeholder="Tell me about your project or just say hi..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className={`w-full ${themeConfig.accent.replace('text-', 'bg-')} ${themeConfig.textPrimary} py-4 px-8 rounded-lg font-display font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                >
                  Send Message
                </button>
              </form>
            </MorphingCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeConfig.cardBg} py-12 ${themeConfig.border} border-t relative z-20`}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <GlitchText text="DEV.PORTFOLIO" className={`text-2xl font-display font-bold ${themeConfig.accent}`} />
          </div>
          
          <p className={`${themeConfig.textSecondary} mb-8 font-mono`}>
            © 2024 Alex Portfolio. Crafted with passion and lots of coffee.
          </p>
          
          <div className="flex justify-center space-x-8">
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Mail, href: '#', label: 'Email' },
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                className={`${themeConfig.textSecondary} hover:${themeConfig.accent} transition-all duration-300 hover:scale-125 hover-lift group`}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsResumeModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className={`relative ${themeConfig.cardBg} ${themeConfig.border} border rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-3xl font-display font-bold ${themeConfig.textPrimary}`}>
                My Resume
              </h2>
              <div className="flex items-center space-x-4">
                <a
                  href="/resume.pdf"
                  download="Alex_Resume.pdf"
                  className={`flex items-center space-x-2 px-4 py-2 ${themeConfig.accent.replace('text-', 'bg-')} text-white rounded-lg hover:opacity-90 transition-all duration-300`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className={`p-2 ${themeConfig.textSecondary} hover:${themeConfig.accent} transition-colors`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* PDF Viewer */}
            <div className="w-full h-[70vh] rounded-xl overflow-hidden">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-0"
                title="Resume PDF"
              />
            </div>
            
            {/* Fallback message */}
            <div className="mt-4 text-center">
              <p className={`${themeConfig.textSecondary} text-sm`}>
                Can't see the resume? <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`${themeConfig.accent} hover:underline`}>Open in new tab</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;