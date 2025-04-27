// // import React, { useState } from "react";
// // import { Mail, Phone, AlertTriangle } from "lucide-react";

// // const ContactForm = () => {
// //   const [email, setEmail] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [isShaking, setIsShaking] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Basic validation
// //     if (!email || !message) {
// //       setErrorMessage("Please fill out both fields.");
// //       setIsShaking(true);
// //       setTimeout(() => setIsShaking(false), 500);
// //       return;
// //     }

// //     // Simulate contact form submission
// //     setSuccessMessage("Your message has been sent. We will get back to you shortly.");
// //     setErrorMessage("");
// //     setEmail("");
// //     setMessage("");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/images/bg.avif')]">
// //       <div
// //         className={`w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col items-center p-8 transition-all duration-300 ${
// //           isShaking ? "animate-shake" : "animate-fade-in"
// //         }`}
// //       >
// //         {/* Heading */}
// //         <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 font-mono">
// //           Contact Support
// //         </h2>
// //         <p className="text-center text-gray-600 mb-6">
// //           Have a question? We're here to help!
// //         </p>

// //         {/* Contact Form */}
// //         <form onSubmit={handleSubmit} className="w-full space-y-6">
// //           {/* Email Input */}
// //           <div className="relative w-full">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <Mail className="text-gray-400" />
// //             </div>
// //             <input
// //               type="email"
// //               placeholder="Your Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
// //                 focus:outline-none focus:ring-2 focus:ring-blue-500 
// //                 transition duration-300 hover:border-blue-500"
// //             />
// //           </div>

// //           {/* Message Input */}
// //           <div className="relative w-full">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <Phone className="text-gray-400" />
// //             </div>
// //             <textarea
// //               placeholder="Your Message"
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               required
// //               rows="4"
// //               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
// //                 focus:outline-none focus:ring-2 focus:ring-blue-500 
// //                 transition duration-300 hover:border-blue-500"
// //             />
// //           </div>

// //           {/* Error Message */}
// //           {errorMessage && (
// //             <div className="flex items-center text-red-500 text-sm animate-shake">
// //               <AlertTriangle className="mr-2" />
// //               {errorMessage}
// //             </div>
// //           )}

// //           {/* Success Message */}
// //           {successMessage && (
// //             <div className="text-green-500 text-sm text-center break-words">
// //               {successMessage}
// //             </div>
// //           )}

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             className="w-full py-3 bg-blue-600 text-white rounded-lg 
// //               hover:bg-blue-700 transition duration-300 
// //               transform hover:scale-105 active:scale-95 
// //               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //           >
// //             Send Message
// //           </button>
// //         </form>

// //         {/* Contact Number Section */}
// //         <div className="mt-6 text-center text-gray-600">
// //           <p className="text-sm">For more details, contact us at:</p>
// //           <p className="font-bold text-lg text-blue-600">+1 234 567 8901</p>
// //         </div>

// //         {/* Back to Home Link */}
// //         <div className="mt-6 text-center">
// //           <a
// //             href="/"
// //             className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
// //           >
// //             Back to Home
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContactForm;




// import React, { useState } from "react";
// import { Mail, Phone, AlertTriangle, MapPin } from "lucide-react";

// const ContactForm = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [location, setLocation] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isShaking, setIsShaking] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !message || !location) {
//       setErrorMessage("Please fill out all fields.");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//       return;
//     }

//     // Simulate contact form submission
//     setSuccessMessage("Your message has been sent. We will get back to you shortly.");
//     setErrorMessage("");
//     setEmail("");
//     setMessage("");
//     setLocation("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/images/bg.avif')] bg-cover bg-center">
//       <div
//         className={`w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col items-center p-8 transition-all duration-300 ${
//           isShaking ? "animate-shake" : "animate-fade-in"
//         }`}
//       >
//         {/* Heading */}
//         <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 font-mono">
//           Contact Support
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           Have a question? We're here to help! Reach out to us for any assistance.
//         </p>

//         {/* Contact Form */}
//         <form onSubmit={handleSubmit} className="w-full space-y-6">
//           {/* Email Input */}
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="text-gray-400" />
//             </div>
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
//             />
//           </div>

//           {/* Message Input */}
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Phone className="text-gray-400" />
//             </div>
//             <textarea
//               placeholder="Your Message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//               rows="4"
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
//             />
//           </div>

//           {/* Location Input */}
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MapPin className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Your Location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
//             />
//           </div>

//           {/* Error Message */}
//           {errorMessage && (
//             <div className="flex items-center text-red-500 text-sm animate-shake">
//               <AlertTriangle className="mr-2" />
//               {errorMessage}
//             </div>
//           )}

//           {/* Success Message */}
//           {successMessage && (
//             <div className="text-green-500 text-sm text-center break-words">
//               {successMessage}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Send Message
//           </button>
//         </form>

//         {/* Contact Number Section */}
//         <div className="mt-6 text-center text-gray-600">
//           <p className="text-sm">For more details, contact us at:</p>
//           <p className="font-bold text-lg text-blue-600">+1 234 567 8901</p>
//         </div>

//         {/* Back to Home Link */}
//         <div className="mt-6 text-center">
//           <a
//             href="/"
//             className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
//           >
//             Back to Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;



import React, { useState } from "react";
import { Mail, Phone, AlertTriangle, MapPin } from "lucide-react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !message || !location) {
      setErrorMessage("Please fill out all fields.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Simulate contact form submission
    setSuccessMessage("Your message has been sent. We will get back to you shortly.");
    setErrorMessage("");
    setEmail("");
    setMessage("");
    setLocation("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/images/bg2.jpg')] bg-cover bg-center  ">
      <div
        className={`w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col items-center p-8 transition-all duration-300 ${
          isShaking ? "animate-shake" : "animate-fade-in"
        }`}
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 font-mono">
          Contact Support
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Have a question? We're here to help! Reach out to us for any assistance.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
            />
          </div>

          {/* Message Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="text-gray-400" />
            </div>
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
            />
          </div>

          {/* Location Input */}


          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center text-red-500 text-sm animate-shake">
              <AlertTriangle className="mr-2" />
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-500 text-sm text-center break-words">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details Section */}
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">For more details, you can reach us at:</p>
          <p className="font-bold text-lg text-blue-600">+1 234 567 8901</p>
          <p className="text-sm text-gray-600 mt-4">
            Our Location: <span className="font-bold">123 Business Ave, City, Country</span>
          </p>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <a
            href="/user"
            className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
