import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Hero from "./Hero.jsx";
import getScrollAnimation from "./getScrollAnimation.jsx";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper.jsx";
import background1 from "../../assets/images/background1.jpg";
import background2 from "../../assets/images/pic 1.jpg";
import background3 from "../../assets/images/pic 5.jpg";
import background4 from "../../assets/images/pic 6.jpg";
import background5 from "../../assets/images/pic 2.jpg";

import TabComponent from "./Tab.jsx";

const LandingPage = () => {
  const scrollAnimation = getScrollAnimation();
  const images = [background1,background2,background3,background4,background5];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900 min-h-screen">

  
<section className="py-16 md:py-28 px-4 md:px-8 text-center relative overflow-hidden">
  {/* Background pattern for visual interest */}
  <div className="absolute inset-0 bg-blue-50 opacity-50 z-0">
    <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
  </div>
  
  {/* Main content container with improved shadow and dimensions */}
  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl mb-12 mx-auto max-w-6xl z-10">
    {/* Background image with improved transition */}
    <div
      className="absolute inset-0 transition-all duration-1000 ease-in-out bg-center bg-cover transform hover:scale-105"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    />
    
    {/* Enhanced gradient overlay with more depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    
    {/* Decorative lines for visual interest */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 opacity-50"></div>
    
    {/* Main heading with improved animations */}
    <motion.h1
      className="absolute inset-0 z-10 text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center text-center px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
    >
      <span className="drop-shadow-lg">
        Welcome to the <span className="text-blue-400">Traffic Violation</span> Monitoring System
      </span>
    </motion.h1>
    
    {/* Accent dots for visual interest */}
    <motion.div 
      className="absolute bottom-6 left-0 right-0 flex justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full ${currentImageIndex === i ? 'bg-blue-400 scale-125' : 'bg-white/60'}`}
        ></div>
      ))}
    </motion.div>
  </div>

  {/* Description with stagger animation */}
  <div className="relative z-10 max-w-4xl mx-auto">
    <motion.p
      className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      A comprehensive system to monitor traffic violations, enhance road
      safety, and provide actionable insights for smarter urban traffic
      management.
    </motion.p>
    
    {/* Call to action button */}
 
  </div>
</section>
      {/* Features Section */}
      <Hero />
      <TabComponent />

      {/* CTA Section */}
      <section
        id="cta"
        className="py-20 px-6 relative overflow-hidden mt-20 rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 blur-2xl opacity-40 -z-10" />

        <ScrollAnimationWrapper className="text-center">
          <motion.div
            className="text-4xl lg:text-5xl  mb-6 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Enhancing Road Safety with Technology
          </motion.div>

          <motion.p
            className="text-lg max-w-2xl mx-auto mb-10 text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            We are committed to utilizing the latest advancements in traffic
            monitoring to make roads safer for everyone. Join us in our mission
            to enhance road safety across the nation.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: "spring",
              stiffness: 120,
            }}
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 animate-fade-in-down"
            >
              Contact Us for More Information
            </Link>
          </motion.div>
        </ScrollAnimationWrapper>
      </section>
    </div>
  );
};

export default LandingPage;
