// // import React, { useState } from "react";
// // import { Mail, AlertTriangle } from "lucide-react";

// // const ForgotPassword = () => {
// //   const [email, setEmail] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [isShaking, setIsShaking] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Basic validation
// //     if (!email) {
// //       setErrorMessage("Please enter your email address");
// //       setIsShaking(true);
// //       setTimeout(() => setIsShaking(false), 500);
// //       return;
// //     }

// //     // Simulate password reset logic
// //     setSuccessMessage("A password reset link has been sent to your email.");
// //     setErrorMessage("");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center align-center p-4 bg-[url('src/assets/images/bg.avif')]">
// //       <div
// //         className={`w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col justify center items-center p-8 transition-all duration-300 ${
// //           isShaking ? "animate-shake" : "animate-fade-in"
// //         }`}
// //       >
// //         {/* Heading */}
// //         <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 font-mono">
// //           Forgot Password
// //         </h2>
// //         <p className="text-center text-gray-600 mb-6">
// //           Enter your email address to reset your password.
// //         </p>

// //         {/* Forgot Password Form */}
// //         <form onSubmit={handleSubmit} className="w-full space-y-6">
// //           {/* Email Input */}
// //           <div className="relative w-full">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <Mail className="text-gray-400" />
// //             </div>
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
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
// //             Send Reset Link
// //           </button>
// //         </form>

// //         {/* Back to Login Link */}
// //         <div className="mt-6 text-center">
// //           <a
// //             href="/login"
// //             className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
// //           >
// //             Back to Login
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;





// import React, { useState } from "react";
// import { Mail, AlertTriangle, Lock, ArrowRight, Check } from "lucide-react";
// import axios from "axios";

// const ForgotPassword = () => {
//   // States
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [stage, setStage] = useState("email"); // email, otp
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isShaking, setIsShaking] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle OTP input change
//   const handleOtpChange = (index, value) => {
//     if (value.length > 1) return; // Only allow one character per input
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
    
//     // Auto-focus next input if value is entered
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Handle OTP input keydown for backspace
//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   // Handle email submission
//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
    
//     // Basic validation
//     if (!email) {
//       setErrorMessage("Please enter your email address");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//       return;
//     }

//     // Email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMessage("Please enter a valid email address");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       // Call your backend API to send OTP
//       const response = await axios.post("/forgot-password/email", { email });
      
//       setSuccessMessage("OTP has been sent to your email address");
//       setStage("otp");
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Failed to send OTP. Please try again.");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
    
//     // Check if OTP is complete
//     if (otp.some(digit => digit === "")) {
//       setErrorMessage("Please enter complete OTP");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       // Call your backend API to verify OTP
//       const response = await axios.post("/forgot-password/verify-opt", {
//         email,
//         otp: otp.join("")
//       });
      
//       setSuccessMessage("OTP verified successfully!");
//       // Redirect to home page after successful verification
//       setTimeout(() => {
//         window.location.href = "/"; // or any other page you want to redirect to
//       }, 1500);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div
//         className={`w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col justify-center items-center p-8 transition-all duration-300 ${
//           isShaking ? "animate-shake" : "animate-fade-in"
//         }`}
//       >
//         {/* Progress indicator */}
//         <div className="w-full flex items-center justify-center mb-6">
//           <div className={`h-2 w-8 rounded-full ${stage === "email" ? "bg-blue-600" : "bg-blue-300"} mr-2`}></div>
//           <div className="h-0.5 w-6 bg-gray-200 mr-2"></div>
//           <div className={`h-2 w-8 rounded-full ${stage === "otp" ? "bg-blue-600" : "bg-gray-200"}`}></div>
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 font-mono">
//           {stage === "email" ? "Forgot Password" : "Verify OTP"}
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           {stage === "email" 
//             ? "Enter your email address to receive a verification code." 
//             : "Enter the 6-digit code sent to your email."}
//         </p>

//         {/* Email Form */}
//         {stage === "email" && (
//           <form onSubmit={handleEmailSubmit} className="w-full space-y-6">
//             {/* Email Input */}
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Mail className="text-gray-400" size={20} />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 
//                   transition duration-300 hover:border-blue-500"
//               />
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="flex items-center text-red-500 text-sm animate-pulse">
//                 <AlertTriangle className="mr-2" size={16} />
//                 {errorMessage}
//               </div>
//             )}

//             {/* Success Message */}
//             {successMessage && (
//               <div className="flex items-center text-green-500 text-sm">
//                 <Check className="mr-2" size={16} />
//                 {successMessage}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-blue-600 text-white rounded-lg 
//                 hover:bg-blue-700 transition duration-300 
//                 transform hover:scale-105 active:scale-95 
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   Send Verification Code
//                   <ArrowRight className="ml-2" size={18} />
//                 </>
//               )}
//             </button>
//           </form>
//         )}

//         {/* OTP Verification Form */}
//         {stage === "otp" && (
//           <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
//             {/* OTP Input */}
//             <div className="flex justify-between gap-2 mb-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otp-${index}`}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                   className="w-12 h-16 text-center text-xl font-bold border border-gray-300 rounded-lg 
//                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               ))}
//             </div>

//             {/* Email display */}
//             <div className="text-center text-sm text-gray-500">
//               <span>Code sent to: </span>
//               <span className="font-medium">{email}</span>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="flex items-center text-red-500 text-sm animate-pulse">
//                 <AlertTriangle className="mr-2" size={16} />
//                 {errorMessage}
//               </div>
//             )}

//             {/* Success Message */}
//             {successMessage && (
//               <div className="flex items-center justify-center text-green-500 text-sm">
//                 <Check className="mr-2" size={16} />
//                 {successMessage}
//               </div>
//             )}

//             {/* Resend OTP Link */}
//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => handleEmailSubmit({ preventDefault: () => {} })}
//                 disabled={isLoading}
//                 className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
//               >
//                 Didn't receive code? Resend
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-blue-600 text-white rounded-lg 
//                 hover:bg-blue-700 transition duration-300 
//                 transform hover:scale-105 active:scale-95 
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   Verify OTP
//                   <Lock className="ml-2" size={18} />
//                 </>
//               )}
//             </button>

//             {/* Back Button */}
//             <button
//               type="button"
//               onClick={() => {
//                 setStage("email");
//                 setErrorMessage("");
//                 setSuccessMessage("");
//               }}
//               className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg 
//                 hover:bg-gray-100 transition duration-300 
//                 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//             >
//               Back to Email
//             </button>
//           </form>
//         )}

//         {/* Back to Login Link */}
//         <div className="mt-6 text-center">
//           <a
//             href="/login"
//             className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
//           >
//             Back to Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Check, X, AlertTriangle } from "lucide-react";
import axios from "axios";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    success: <Check size={18} className="text-white" />,
    error: <AlertTriangle size={18} className="text-white" />,
    info: <Mail size={18} className="text-white" />
  };

  const bgColorMap = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  };

  return (
    <div className={`flex items-center p-4 ${bgColorMap[type]} text-white rounded-lg shadow-lg mb-3`}>
      <div className="mr-3">{iconMap[type]}</div>
      <div className="flex-1">{message}</div>
      <button onClick={onClose} className="ml-2 focus:outline-none">
        <X size={18} className="text-white hover:text-gray-200" />
      </button>
    </div>
  );
};

const ForgotPassword = () => {
  // States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [stage, setStage] = useState("email"); // email, otp
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Add toast notification
  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
  };

  // Remove toast notification
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    if (value.length > 1) return; // Only allow one character per input
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP input keydown for backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        // Clear the previous input when backspace is pressed on empty input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste for OTP inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Check if pasted content is all digits and has appropriate length
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split("");
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus on the next empty field or the last field
      if (digits.length < 6) {
        const nextInput = document.getElementById(`otp-${digits.length}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Basic validation
    if (!email) {
      addToast("Please enter your email address", "error");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast("Please enter a valid email address", "error");
      return;
    }

    try {
      setIsLoading(true);
      // Call your backend API to send OTP
      const response = await axios.post("http://127.0.0.1:8000/users/forgot-password/email", { email });
      
      addToast("OTP has been sent to your email address", "success");
      setStage("otp");
    } catch (error) {
      addToast(error.response?.data?.message || "Failed to send OTP. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    // Check if OTP is complete
    if (otp.some(digit => digit === "")) {
      addToast("Please enter complete 6-digit OTP", "error");
      return;
    }

    try {
      setIsLoading(true);
      // Call your backend API to verify OTP
      const response = await axios.post("http://127.0.0.1:8000/users/forgot-password/verify-opt", {
        email,
        otp: otp.join("")
      });
      console.log(response.data); // Log the response for debugging
      const data  = response.data; // Assuming the role is returned in the response
       // Log the role for debugging
      addToast("OTP verified successfully! Redirecting...", "success");

      // Redirect based on role
      setTimeout(() => {
        if (role === "ADMIN" || role === "PO") {
          localStorage.setItem("role", data.role);
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("refreshToken", data.tokens.refresh);
          localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);
      localStorage.setItem("userId", data.user.id);

      localStorage.setItem("email", data.user.email);
          window.location.href = "/admin-home";
        } else if (role === "USER") {
          localStorage.setItem("role", data.role);
          localStorage.setItem("accessToken", data.tokens.access);
          localStorage.setItem("userId", data.user.id);

          localStorage.setItem("refreshToken", data.tokens.refresh);
          localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);
      localStorage.setItem("email", data.user.email);
          window.location.href = "/user-home";
        } else {
          
          window.location.href = "/login"; // Default redirect
        }
      }, 2000);
    } catch (error) {
      addToast(error.response?.message || "Invalid OTP. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Toast notifications container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Card Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">
            {stage === "email" ? "Forgot Password" : "Verify OTP"}
          </h2>
          <p className="text-center text-blue-100 mt-2">
            {stage === "email" 
              ? "Enter your email address to receive a verification code" 
              : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div 
            className="bg-blue-600 h-full transition-all duration-500 ease-in-out" 
            style={{ width: stage === "email" ? "50%" : "100%" }}
          ></div>
        </div>

        <div className="p-8">
          {/* Email Form */}
          {stage === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Email Input with floating label */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="block w-full pl-12 pr-4 py-4 text-gray-900 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer"
                />
                <label
                  htmlFor="email"
                  className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email Address
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
                  hover:from-blue-700 hover:to-indigo-700 transition duration-300 
                  transform hover:-translate-y-1 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* OTP Verification Form */}
          {stage === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* Email display */}
              <div className="text-center mb-2">
                <span className="text-sm text-gray-500">Code sent to: </span>
                <span className="font-medium text-gray-700">{email}</span>
              </div>

              {/* OTP Input */}
              <div className="flex justify-between gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-16 text-center text-xl font-bold border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      shadow-sm transition duration-200 ease-in-out"
                  />
                ))}
              </div>

              {/* Resend OTP Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => handleEmailSubmit()}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300 text-sm"
                >
                  Didn't receive code? Resend
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
                  hover:from-blue-700 hover:to-indigo-700 transition duration-300 
                  transform hover:-translate-y-1 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Verify OTP
                    <Lock className="ml-2" size={18} />
                  </>
                )}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStage("email");
                }}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg 
                  hover:bg-gray-50 transition duration-300 
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Back to Email
              </button>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;