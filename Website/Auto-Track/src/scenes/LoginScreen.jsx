// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { User, Lock, AlertTriangle } from "lucide-react";
// // // import logo from "../assets/images/ATFE.png";

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [errorMessage, setErrorMessage] = useState("");
// // //   const [isShaking, setIsShaking] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   const roleRoutes = {
// // //     ADMIN: "/dashboard",
// // //     USER: "/user",
// // //     GUEST: "/login"
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);
// // //     setErrorMessage("");

// // //     try {
// // //       const response = await fetch('http://127.0.0.1:8000/users/login', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email, password }),
// // //       });

// // //       const data = await response.json();
// // //       if (!response.ok) throw new Error(data.error || "Login failed");

// // //       // Store role and tokens
// // //       localStorage.setItem("accessToken", data.tokens.access);
// // //       localStorage.setItem("refreshToken", data.tokens.refresh);
// // //       localStorage.setItem("role", data.role);

// // //       // Redirect based on role
// // //       navigate(roleRoutes[data.role] || "/");

// // //     } catch (error) {
// // //       setErrorMessage(error.message);
// // //       setIsShaking(true);
// // //       setTimeout(() => setIsShaking(false), 500);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/images/bg.jpg')] bg-cover bg-center">
// // //       <div className={`w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex transition-all duration-300 ${isShaking ? "animate-shake" : "animate-fade-in"}`}>
        
// // //         {/* Left Section */}
// // //         <div className="w-1/2 bg-blue-600 flex items-center justify-center">
// // //           <div className="text-center text-white">
// // //             <img src={logo} alt="Logo" />
// // //           </div>
// // //         </div>

// // //         {/* Right Section */}
// // //         <div className="w-1/2 p-12 flex flex-col justify-center">
// // //           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 font-mono">
// // //             Auto Track Login
// // //           </h2>

// // //           <form onSubmit={handleSubmit} className="space-y-6">
// // //             <div className="relative">
// // //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                 <User className="text-gray-400" />
// // //               </div>
// // //               <input
// // //                 type="email"
// // //                 placeholder="Email"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //                 required
// // //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
// // //               />
// // //             </div>

// // //             <div className="relative">
// // //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                 <Lock className="text-gray-400" />
// // //               </div>
// // //               <input
// // //                 type="password"
// // //                 placeholder="Password"
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 required
// // //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-500"
// // //               />
// // //             </div>

// // //             {errorMessage && (
// // //               <div className="flex items-center text-red-500 text-sm animate-shake">
// // //                 <AlertTriangle className="mr-2" />
// // //                 {errorMessage}
// // //               </div>
// // //             )}

// // //             <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
// // //               Login
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;






// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { User, Lock, AlertTriangle } from "lucide-react";
// // import logo from "../assets/images/ATFE.png";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [isShaking, setIsShaking] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const roleRoutes = {
// //     ADMIN: "/dashboard",
// //     USER: "/user",
// //     GUEST: "/login"
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setErrorMessage("");

// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/users/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();
// //       if (!response.ok) throw new Error(data.error || "Login failed");

// //       // Store role and tokens
// //       localStorage.setItem("accessToken", data.tokens.access);
// //       localStorage.setItem("refreshToken", data.tokens.refresh);
// //       localStorage.setItem("role", data.role);

// //       // Redirect based on role
// //       navigate(roleRoutes[data.role] || "/");

// //     } catch (error) {
// //       setErrorMessage(error.message);
// //       setIsShaking(true);
// //       setTimeout(() => setIsShaking(false), 500);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-white p-4">
// //       <div className={`w-full max-w-md bg-white shadow-lg rounded-xl p-8 transition-all duration-300 ${isShaking ? "animate-shake" : "animate-fade-in"}`}>
// //         {/* Logo centered at top */}
// //         <div className="flex justify-center mb-8">
// //           <img src={logo} alt="Logo" className="h-20" />
// //         </div>
        
// //         <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
// //           Auto Track Login
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div className="relative">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <User className="text-blue-400" size={18} />
// //             </div>
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-400"
// //             />
// //           </div>

// //           <div className="relative">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <Lock className="text-blue-400" size={18} />
// //             </div>
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-400"
// //             />
// //           </div>

// //           {errorMessage && (
// //             <div className="flex items-center text-red-500 text-sm p-2 bg-red-50 rounded">
// //               <AlertTriangle className="mr-2" size={16} />
// //               {errorMessage}
// //             </div>
// //           )}

// //           <button 
// //             type="submit" 
// //             className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center"
// //             disabled={isLoading}
// //           >
// //             {isLoading ? "Logging in..." : "Login"}
// //           </button>
          
// //           <div className="text-center">
// //             <a href="#" className="text-blue-600 text-sm hover:underline">
// //               Forgot Password?
// //             </a>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Lock, AlertTriangle, CheckCircle, X } from "lucide-react";
// import logo from "../assets/images/ATFE.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });
//   const navigate = useNavigate();

//   const roleRoutes = {
//     ADMIN: "/dashboard",
//     USER: "/user",
//     GUEST: "/login"
//   };

//   // Close toast after 4 seconds
//   useEffect(() => {
//     let timer;
//     if (toast.show) {
//       timer = setTimeout(() => {
//         setToast({ ...toast, show: false });
//       }, 4000);
//     }
//     return () => clearTimeout(timer);
//   }, [toast]);

//   const showToast = (message, type) => {
//     setToast({ show: true, message, type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch('http://127.0.0.1:8000/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Login failed");

//       // Store role and tokens
//       localStorage.setItem("accessToken", data.tokens.access);
//       localStorage.setItem("refreshToken", data.tokens.refresh);
//       localStorage.setItem("role", data.role);

//       // Show success toast
//       showToast("Login successful! Redirecting...", "success");
      
//       // Short delay before redirect for better UX
//       setTimeout(() => {
//         // Redirect based on role
//         navigate(roleRoutes[data.role] || "/");
//       }, 1000);

//     } catch (error) {
//       setErrorMessage(error.message);
//       showToast(error.message, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       {/* Toast Notification */}
//       {toast.show && (
//         <div className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg flex items-center justify-between z-50 transform transition-all duration-500 opacity-100 translate-y-0 ${
//           toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//         }`}>
//           <div className="flex items-center">
//             {toast.type === "success" ? (
//               <CheckCircle className="mr-2 text-green-600" size={20} />
//             ) : (
//               <AlertTriangle className="mr-2 text-red-600" size={20} />
//             )}
//             <p className="font-medium">{toast.message}</p>
//           </div>
//           <button 
//             onClick={() => setToast({ ...toast, show: false })}
//             className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
//           {/* Logo centered at top */}
//           <div className="flex justify-center pt-8 pb-2">
//             <img src={logo} alt="Logo" className="h-20 animate-fade-in" />
//           </div>
          
//           <div className="px-8 pb-8">
//             <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//               Auto Track Login
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="relative transition-all duration-300 group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="text-blue-400 group-hover:text-blue-600 transition-colors duration-300" size={18} />
//                 </div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:shadow-md"
//                 />
//               </div>

//               <div className="relative transition-all duration-300 group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="text-blue-400 group-hover:text-blue-600 transition-colors duration-300" size={18} />
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:shadow-md"
//                 />
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
//                 disabled={isLoading}
//               >
//                 <span className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}>
//                   Login
//                 </span>
//                 {isLoading && (
//                   <div className="absolute flex items-center justify-center">
//                     <div className="w-5 h-5 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </button>
              
//               <div className="text-center">
//                 <a 
//                   href="#" 
//                   className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors duration-300"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login; 




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/ATFE.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const roleRoutes = {
    ADMIN: "/admin-home",
    USER: "/user",
    GUEST: "/login",
    PO:'/admin-home',
  };

  // Close toast after 4 seconds
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      // Store role and tokens
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("last_name", data.user.last_name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.role);

      // Show success toast
      showToast("Login successful! Redirecting...", "success");
      
      // Redirect based on role
      setTimeout(() => {
        navigate(roleRoutes[data.role] || "/");
      }, 1000);

    } catch (error) {
      setErrorMessage(error.message);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg flex items-center justify-between z-50 ${
          toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          <p className="font-medium">{toast.message}</p>
          <button 
            onClick={() => setToast({ ...toast, show: false })}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo centered at top */}
        <div className="mb-6">
          <img src={logo} alt="Logo" className="h-28 rounded" />
        </div>
        
        <h1 className="text-3xl font-bold mb-3 text-center">
          Welcome to Auto Track
        </h1>
        <h2 className="text-xl font-semibold mb-8 text-center text-gray-800">
          Login to your account
        </h2>


        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Login"}
          </button>
          <div className="mt-6 text-center text-gray-600 text-sm border-t pt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </a>
        </div>  
          <div className="text-center mt-2"> 
            <a 
              href="/forgot-password" 
              className="text-blue-600 text-sm hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        

        <div className="mt-16 text-center text-gray-600 text-sm">
          Copyright © 2025 Auto Track. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;