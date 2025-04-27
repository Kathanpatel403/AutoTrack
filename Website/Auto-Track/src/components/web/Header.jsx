import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  LogOut,
  MonitorCheck,
  ShieldCheck,
  LayoutDashboardIcon,
} from 'lucide-react';
import logo from '../../assets/images/ATFE.svg';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/admin-home' },
    { icon: ShieldCheck, label: 'Echallan Verification', path: '/echallan-verification' },
    { icon: MonitorCheck, label: 'Real-Time Feed', path: '/feed' },
    { icon: LayoutDashboardIcon, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full hover:rotate-6 transition-transform"
            />
            <span className="text-2xl font-bold text-blue-600 font-mono">
              AutoTrack Traffic System
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-all duration-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 border-b last:border-b-0 border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} className="text-blue-600" />
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left block px-4 py-3 text-red-500 hover:bg-red-50 flex items-center space-x-3"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Header;
