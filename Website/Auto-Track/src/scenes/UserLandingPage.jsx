import React, { useState, useEffect,useCallback  } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight,  ChevronLeft, ChevronRight,Car, Search, FileText, AlertCircle } from 'lucide-react';
import Navbar from '../components/web/UserNavbar';

const HeroCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  }, [images.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[300px] rounded-xl shadow-2xl overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 
          bg-white/50 hover:bg-white/75 rounded-full p-2 
          z-10 transition-all duration-300"
      >
        <ChevronLeft className="text-gray-800" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 
          bg-white/50 hover:bg-white/75 rounded-full p-2 
          z-10 transition-all duration-300"
      >
        <ChevronRight className="text-gray-800" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 
              ${index === currentIndex ? 'bg-blue-600 w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const UserLandingPage = () => {
  const heroImages = [
    { 
      src: "src/assets/images/p1.jpg", 
      alt: "E-Challan System 1" 
    },
    { 
      src: "src/assets/images/p2.jpg", 
      alt: "E-Challan System 2" 
    },
    { 
      src: "src/assets/images/p3.jpg", 
      alt: "E-Challan System 3" 
    },
    { 
      src: "src/assets/images/p4.jpg", 
      alt: "E-Challan System 4" 
    },
    { 
      src: "src/assets/images/p5.jpg", 
      alt: "E-Challan System 5" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8">
        <Navbar />

        <div className="flex flex-col md:flex-row items-center justify-between py-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Manage Your E-Challans
              <span className="text-blue-600"> Easily</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Track your applications, resolve incorrect challans, and stay updated with your e-challan status all in one place.
            </p>
            
            <div className="flex space-x-4">
            <Link to='/user/application-tracking'>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
                <span>Track Application</span>
                <ArrowRight className="h-5 w-5" />
              </button>
</Link>
<Link to='/user/issue-registration'>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full transition-all duration-300">
                Report Issue
              </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 mr-10 flex justify-center">
      <HeroCarousel images={heroImages} />
    </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-blue-600" />,
                title: "Track Applications",
                description: "Check the status of your e-challan applications in real-time"
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "File Complaints",
                description: "Report incorrect challans and track resolution progress"
              },
              {
                icon: <AlertCircle className="h-8 w-8 text-blue-600" />,
                title: "Get Updates",
                description: "Receive notifications about your application status"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/user/application-tracking">
            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
            
              <h3 className="text-xl font-semibold mb-2">Check Challan Status</h3>
              <p className="text-white/80">Enter your challan number to check current status</p>
            </div>
            </Link>
            <Link to="/user/issue-registration">
            <div className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">Submit New Application</h3>
              <p className="text-white/80">Create a new application for incorrect challans</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;