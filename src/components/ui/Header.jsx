import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState('student');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items based on role
  const navigationItems = {
    student: [
      { path: '/student-dashboard', label: 'Dashboard', icon: 'Home' },
      { path: '/lesson-content', label: 'Lessons', icon: 'BookOpen' },
      { path: '/quiz-assessment', label: 'Quizzes', icon: 'FileText' },
      { path: '/progress-tracking', label: 'Progress', icon: 'TrendingUp' }
    ],
    teacher: [
      { path: '/teacher-dashboard', label: 'Dashboard', icon: 'BarChart3' },
      { path: '/content-management', label: 'Content', icon: 'FolderOpen' }
    ]
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
  ];

  // Detect role based on current path
  useEffect(() => {
    const teacherPaths = ['/teacher-dashboard', '/content-management'];
    const isTeacherPath = teacherPaths?.some(path => location?.pathname?.startsWith(path));
    setCurrentRole(isTeacherPath ? 'teacher' : 'student');
  }, [location?.pathname]);

  // Online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('eduquest-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('eduquest-language', langCode);
    // Trigger language change event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: langCode }));
  };

  const handleRoleSwitch = (role) => {
    setCurrentRole(role);
    const defaultPaths = {
      student: '/student-dashboard',
      teacher: '/teacher-dashboard'
    };
    navigate(defaultPaths?.[role]);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const currentNavItems = navigationItems?.[currentRole];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-heading font-bold text-foreground">EduQuest</h1>
            <p className="text-xs font-caption text-muted-foreground">Learn. Grow. Achieve.</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {currentNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              onClick={() => navigate(item?.path)}
              className="micro-scale"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2">
          {/* Connectivity Status */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-warning'}`} />
            <span className="text-xs font-caption text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="relative group">
            <Button variant="ghost" size="sm" className="micro-scale">
              <span className="text-sm">{languages?.find(l => l?.code === currentLanguage)?.flag}</span>
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </Button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageChange(lang?.code)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="mr-2">{lang?.flag}</span>
                  {lang?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role Switcher */}
          <div className="relative group">
            <Button variant="outline" size="sm" className="micro-scale">
              <Icon name={currentRole === 'student' ? 'User' : 'Users'} size={16} />
              <span className="hidden sm:inline ml-2 capitalize">{currentRole}</span>
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </Button>
            <div className="absolute right-0 top-full mt-1 w-36 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors rounded-t-lg ${
                  currentRole === 'student' ? 'bg-muted text-primary' : 'text-foreground'
                }`}
              >
                <Icon name="User" size={16} className="inline mr-2" />
                Student
              </button>
              <button
                onClick={() => handleRoleSwitch('teacher')}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors rounded-b-lg ${
                  currentRole === 'teacher' ? 'bg-muted text-primary' : 'text-foreground'
                }`}
              >
                <Icon name="Users" size={16} className="inline mr-2" />
                Teacher
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden micro-scale"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-3 space-y-1">
            {currentNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                onClick={() => {
                  navigate(item?.path);
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start micro-scale"
              >
                {item?.label}
              </Button>
            ))}
            
            {/* Mobile Connectivity Status */}
            <div className="flex items-center justify-center space-x-2 py-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-warning'}`} />
              <span>{isOnline ? 'Connected' : 'Offline Mode'}</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;