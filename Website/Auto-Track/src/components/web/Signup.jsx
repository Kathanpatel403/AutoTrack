// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Lock, Mail, Key, AlertTriangle, Eye, EyeOff } from "lucide-react";
// import logo from "../src/assets/ATFE.png";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isShaking, setIsShaking] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//       return;
//     }

//     // Here you would typically add your signup logic, 
//     // such as API call to create a new user
//     // For now, we'll just simulate a successful signup
//     if (username && email && password) {
//       // Redirect to login or dashboard
//       navigate("/login");
//     } else {
//       setErrorMessage("Please fill in all fields");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/images/bg.avif')]">
//       <div
//         className={`w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex transition-all duration-300 ${
//           isShaking ? "animate-shake" : "animate-fade-in"
//         }`}
//       >
//         {/* Left Side - Government Logo Section */}
//         <div className="w-1/2 bg-blue-600 flex items-center justify-center">
//           <div className="text-center text-white">
//             <img src={logo} alt="Auto Track Logo" />
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="w-1/2 p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 font-mono">
//             Create Account
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Username Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 
//                   transition duration-300 hover:border-blue-500"
//               />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 
//                   transition duration-300 hover:border-blue-500"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 
//                   transition duration-300 hover:border-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
//               </button>
//             </div>

//             {/* Confirm Password Input */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Key className="text-gray-400" />
//               </div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 
//                   transition duration-300 hover:border-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showConfirmPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
//               </button>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="flex items-center text-red-500 text animate-shake">
//                 <AlertTriangle className="mr-2" />
//                 {errorMessage}
//               </div>
//             )}

//             {/* Signup Button */}
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white rounded-lg 
//                 hover:bg-blue-700 transition duration-300 
//                 transform hover:scale-105 active:scale-95 
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Additional Links */}
//           <div className="mt-6 text-center">
//             <span className="text-gray-600">Already have an account? </span>
//             <a
//               href="/login"
//               className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
//             >
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Eye, EyeOff } from "lucide-react";
// import logo from "../../assets/images/ATFE.png"; // Make sure this path is correct

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   // Backend integration would be added here
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (password.length < 8) {
//       setErrorMessage("Password must be at least 8 characters long");
//       return;
//     }
//     // Basic validation
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }

//     if (!username || !email || !password) {
//       setErrorMessage("Please fill in all fields");
//       return;
//     }

//     try {
//       // This is where you would integrate with your backend
//       // Example API call:
      
//       const response = await fetch('http://127.0.0.1:8000/users/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           first_name: username.first_name, 
//           last_name: username.last_name, 
//           email, 
//           password,
//           password2: confirmPassword 
//         }),
//       });

//       if (response.ok) {
//         navigate("/login");
//       } else {
//         const data = await response.json();
//         setErrorMessage(data.message || "Signup failed");
//       }
      
      
//       // For now, just navigate to login
//       navigate("/login");
//     } catch (error) {
//       setErrorMessage("An error occurred during signup");
//       console.error("Signup error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       <div className="w-full max-w-md">
//         {/* Logo Section */}
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Auto Track Logo" className="h-16" />
//         </div>
        
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1 className="text-3xl font-bold">Welcome to Auto Track</h1>
//           <h2 className="text-lg text-gray-600">Create your account</h2>
//         </div>

//         {/* Signup Form */}
//         <div className="p-2 rounded-lg ">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* First Name and Last Name Inputs */}
//             <div className="flex space-x-4">
//               <div className="w-1/2">
//                 <label htmlFor="first_name" className="block text font-medium text-gray-700 mb-1">
//                   First Name
//                 </label>
//                 <input
//                   id="first_name"
//                   type="text"
//                   value={username.firstName || ""}
//                   onChange={(e) => setUsername({ ...username, firstName: e.target.value })}
//                   required
//                   className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow"
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label htmlFor="last_name" className="block text font-medium text-gray-700 mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   id="last_name"
//                   type="text"
//                   value={username.lastName || ""}
//                   onChange={(e) => setUsername({ ...username, lastName: e.target.value })}
//                   required
//                   className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow"
//                   placeholder="Enter last name"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="email" className="block text font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-5 py-3 shadow border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter email"
//               />
//             </div>

//             {/* Password Input */}
//             <div>
//               <label htmlFor="password" className="block text font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-5 py-3 shadow border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password Input */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text font-medium text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   className="w-full px-5 py-3 shadow border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Confirm password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="text-red-500 text">
//                 {errorMessage}
//               </div>
//             )}

//             {/* Signup Button */}
//             <button
//               type="submit"
//               className="w-full py-4 shadow px-5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Additional Links */}
//           <div className="mt-6 text-center">
//             <p className="text">
//               Already have an account?{" "}
//               <a
//                 href="/login"
//                 className="text-blue-500 hover:text-blue-700 font-medium"
//               >
//                 Sign In
//               </a>
//             </p>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-8 text-center text text-gray-500">
//           Copyright © 2025 Auto Track. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/ATFE.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear specific field error when user starts typing
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Check for empty fields
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    // Password match validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Show toast for the first error
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      return;
    }

    try {
      // API call to register user
      const response = await fetch('http://127.0.0.1:8000/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          first_name: formData.firstName, 
          last_name: formData.lastName, 
          email: formData.email, 
          password: formData.password,
          password2: formData.confirmPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000
        });
        
        // Redirect after a short delay
        setTimeout(() => navigate("/user"), 3000);
      } else {
        // Handle API error responses
        let errorMsg = "Registration failed";
        
        // Extract error message from API response if available
        if (data.message) {
          errorMsg = data.message;
        } else if (data.error) {
          errorMsg = data.error;
        } else if (data.email) {
          errorMsg = `Email: ${data.email}`;
        }
        
        setErrorMessage(errorMsg);
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 5000
        });
      }
    } catch (error) {
      const errorMsg = "Connection error. Please try again later.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000
      });
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Toast Container */}
      <ToastContainer />
      
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Auto Track Logo" className="h-16" />
        </div>
        
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">Welcome to Auto Track</h1>
          <h2 className="text-lg text-gray-600">Create your account</h2>
        </div>

        {/* Signup Form */}
        <div className="p-2 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name Inputs */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text font-medium text-gray-700 mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow`}
                  placeholder="Enter first name"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text font-medium text-gray-700 mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow`}
                  placeholder="Enter last name"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                )}
              </div>
            </div>
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text font-medium text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-5 py-3 shadow border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text font-medium text-gray-700 mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 shadow border ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text font-medium text-gray-700 mb-1">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 shadow border ${
                    formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* General Error Message */}
            {errorMessage && (
              <div className="flex items-center space-x-1 text-red-500 text-sm bg-red-50 p-2 rounded">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-4 shadow px-5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Sign Up
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text text-gray-500">
          Copyright © 2025 Auto Track. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup;