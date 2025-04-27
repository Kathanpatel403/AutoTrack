// import React, { useState } from 'react';
// import { Menu, X, Home, User, Settings, LogOut } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../../assets/images/AT.svg'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userId');
    
//     navigate('/login');
//   };
//   const navItems = [
//     { icon: Home, label: 'Home', path: '/user' },
//     { icon: User, label: 'Profile', path: '/user-profile' },
   
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-4 animate-fade-in">
//           <img 
//             src={Logo} 
//             alt="Logo" 
//             className="h-10 w-10 rounded-full hover:rotate-6 transition-transform"
//           />
//           <span className="text-2xl font-bold text-blue-600 font-mono">Auto Track Echallan Query Portal</span>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-6">
//           {navItems.map((item, index) => (
//             <Link 
//               key={index} 
//               to={item.path} 
//               className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 
//                 transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </Link>
//           ))}
          
//           <Link 
//             to="/login" 
//             className="flex items-center space-x-2 text-red-500 hover:text-red-700 
//               bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-all duration-300"
//           >
//             <LogOut size={20} />
//             <span>Logout</span>
//           </Link>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-slide-down">
//           {navItems.map((item, index) => (
//             <Link 
//               key={index} 
//               to={item.path} 
//               className="block px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 
//                 border-b last:border-b-0 border-gray-100"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <item.icon size={20} className="text-blue-600" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         <button
//                      onClick={handleLogout}
//                      className="flex items-center space-x-2 text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-all duration-300"
//                    >
//                      <LogOut size={20} />
//                      <span>Logout</span>
//                    </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/AT.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicking outside menu to close it
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Navigate to login with replace to prevent going back
    navigate('/login', { replace: true });
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/user' },
    { icon: User, label: 'Profile', path: '/user-profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img 
            src={Logo} 
            alt="Logo" 
            className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:rotate-6 transition-transform"
          />
          <span className="text-lg md:text-2xl font-bold text-blue-600 font-mono truncate">
            {isMobile ? "Auto Track" : "Auto Track Echallan Query Portal"}
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 
                transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-700 
              bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-600 transition-colors menu-button p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu with improved animation */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg mobile-menu overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-1">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-50 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon size={20} className="text-blue-600" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

