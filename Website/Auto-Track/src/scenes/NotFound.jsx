// // import React from "react";
// // import { motion } from "framer-motion";
// // import { FaCarSide, FaTrafficLight } from "react-icons/fa";

// // export default function NotFound() {
// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
// //       {/* Header */}
// //       <h1 className="text-4xl font-bold text-gray-800 mb-4">
// //         404 - Page Not Found
// //       </h1>
// //       <p className="text-lg text-gray-600 mb-8">
// //         Oops! It seems you've taken the wrong route.
// //       </p>

// //       {/* Animation */}
// //       <div className="relative w-full max-w-lg h-64">
// //         {/* Road */}
// //         <div className="absolute inset-x-0 bottom-0 h-16 bg-gray-300 rounded-lg">
// //           <div className="absolute inset-0 w-full h-full bg-gray-400 bg-stripes"></div>
// //         </div>

// //         {/* Moving Car */}
// //         <motion.div
// //           className="absolute left-0 top-20 flex items-center space-x-4"
// //           animate={{ x: [0, 300, 0] }}
// //           transition={{
// //             duration: 6,
// //             repeat: Infinity,
// //             repeatType: "loop",
// //             ease: "linear",
// //           }}
// //         >
// //           <FaCarSide className="text-6xl text-red-500" />
// //           <div className="text-lg font-semibold text-gray-700">
// //             <p>Lost Driver</p>
// //           </div>
// //         </motion.div>

// //         {/* Traffic Light */}
// //         <motion.div
// //           className="absolute right-10 top-10 text-6xl"
// //           animate={{ scale: [1, 1.2, 1] }}
// //           transition={{
// //             duration: 1,
// //             repeat: Infinity,
// //             repeatType: "mirror",
// //           }}
// //         >
// //           <FaTrafficLight className="text-green-500" />
// //         </motion.div>
// //       </div>

// //       {/* Call to Action */}
// //       <div className="mt-8">
// //         <a
// //           href="/"
// //           className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
// //         >
// //           Go Back to Safety
// //         </a>
// //       </div>
// //     </div>
// //   );
// // }




// import React from "react";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center relative overflow-hidden">
//       {/* Background Decorations */}
//       <motion.div
//         className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-30"
//         animate={{ scale: [1, 1.3, 1] }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           repeatType: "mirror",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full opacity-30"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           repeatType: "mirror",
//         }}
//       />

//       {/* 3D Illustration */}
//       <div className="w-full max-w-4xl h-96">
        
//       </div>

//       {/* Text Content */}
//       <motion.div
//         className="text-center mt-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-5xl font-bold text-gray-800">
//           Oops! Lost on the road?
//         </h1>
//         <p className="text-lg text-gray-600 mt-4">
//           The page you’re looking for doesn’t exist. But don’t worry, we’re here
//           to guide you back.
//         </p>
//       </motion.div>

//       {/* Call to Action */}
//       <motion.div
//         className="mt-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 1 }}
//       >
//         <a
//           href="/"
//           className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Safety
//         </a>
//       </motion.div>
//     </div>
//   );
// }




import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import * as THREE from 'three';

export default function NotFound() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-30"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
        </h1>
      

      {/* Text Content */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Oops! Lost on the road?
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          The page you're looking for doesn't exist. But don't worry, we're here
          to guide you back.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <a
          href="/login"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Safety
        </a>
      </motion.div>
    </div>
  );
}