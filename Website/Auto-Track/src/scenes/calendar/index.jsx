// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   User, 
//   Mail, 
//   UserCircle, 
//   Shield, 
//   MapPin, 
//   Award, 
//   LogOut, 
//   Trash2, 
//   Edit2, 
//   Camera, 
//   X, 
//   Check, 
//   AlertTriangle 
// } from "lucide-react";

// const Calendar = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const fileInputRef = useRef(null);
  
//   // Sample user data - would come from your API/context in a real app
//   const [userData, setUserData] = useState({
//     firstName: "John",
//     lastName: "Smith",
//     email: "john.smith@police.gov",
//     role: "PO", // Police Officer
//     rank: "Sergeant",
//     badgeNumber: "B-4721",
//     station: "Central Division",
//     area: "Downtown",
//     profilePhoto: "/api/placeholder/120/120" // Placeholder for demo
//   });
  
//   // Form state for editable fields
//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     profilePhoto: userData.profilePhoto
//   });
  
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   // Handle profile photo upload
//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // In a real app, upload to server and get URL
//       // For demo, we'll use a placeholder
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({
//           ...formData,
//           profilePhoto: reader.result
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   // Trigger file input click
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };
  
//   // Save profile changes
//   const saveChanges = () => {
//     setUserData({
//       ...userData,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       profilePhoto: formData.profilePhoto
//     });
//     setIsEditing(false);
    
//     // Here you would make API call to update the user data
//   };
  
//   // Cancel editing
//   const cancelEditing = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       profilePhoto: userData.profilePhoto
//     });
//     setIsEditing(false);
//   };
  
//   // Handle logout
//   const handleLogout = () => {
//     // Clear tokens/session
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("role");
    
//     // Close modal and redirect to login
//     setShowLogoutModal(false);
//     navigate("/login");
//   };
  
//   // Handle account deletion
//   const handleDeleteAccount = () => {
//     // Here you would make API call to delete account
//     // Then clear local storage and redirect
//     localStorage.clear();
//     setShowDeleteModal(false);
//     navigate("/login");
//   };
  
//   // Animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         duration: 0.5,
//         staggerChildren: 0.1 
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         duration: 0.5,
//         type: "spring",
//         bounce: 0.3
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    
//       <motion.div 
//         className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
      
//           <div className="bg-blue-600 py-6 px-8 flex items-center justify-center gap-2">
//             <UserCircle className="text-white" size={24} />
//             <motion.h1 
//               className="text-white text-2xl font-bold text-center text-pretty"
//               variants={itemVariants}
//             >
//               My Profile
//             </motion.h1>
//           </div>
          
//           <div className="p-8">
//             <div className="flex flex-col align-middle  md:flex-row gap-8">
             
//                     <motion.div 
//                       className="md:w-1/3 flex flex-col items-center justify-center"
//                       variants={itemVariants}
//                     >
//                       <div className="relative group">
//                       <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
//                         <img 
//                         src={formData.profilePhoto} 
//                         alt="Profile" 
//                         className="w-full h-full object-cover"
//                         />
//                       </div>
                      
//                       {isEditing && (
//                         <div 
//                         className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         onClick={triggerFileInput}
//                         >
//                         <Camera className="text-white" size={24} />
//                         <input 
//                           type="file" 
//                           ref={fileInputRef} 
//                           className="hidden" 
//                           accept="image/*" 
//                           onChange={handlePhotoUpload}
//                         />
//                         </div>
//                       )}
//                       </div>
                      
//                       {isEditing ? (
//                       <p className="text-sm text-gray-500 mt-2 text-center">
//                         Click on the photo to change
//                       </p>
//                       ) : (
//                       <h2 className="text-xl font-semibold mt-4 text-gray-900">
//                         {userData.firstName} {userData.lastName}
//                       </h2>
//                       )}
                      
//                       <div className="mt-4 flex flex-col items-center">
//                       <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm flex items-center">
//                         <Shield size={16} className="mr-1" />
//                         {userData.role === "PO" ? "Police Officer" : userData.role}
//                       </span>
//                       </div>
//                     </motion.div>
                    
//                     {/* Right column - Info */}
//             <motion.div 
//               className="md:w-2/3"
//               variants={itemVariants}
//             >
//               <div className="grid grid-cols-1 gap-6">
//                 {/* Personal Info Section */}
//                 <div className="border border-gray-200 rounded-xl p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                       <UserCircle className="mr-2 text-blue-600" size={20} />
//                       Personal Information
//                     </h3>
                    
//                     {!isEditing ? (
//                       <button 
//                         onClick={() => setIsEditing(true)}
//                         className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
//                       >
//                         <Edit2 size={16} className="mr-1" />
//                         Edit
//                       </button>
//                     ) : (
//                       <div className="flex space-x-2">
//                         <button 
//                           onClick={cancelEditing}
//                           className="text-gray-600 hover:text-gray-800 flex items-center text-sm font-medium"
//                         >
//                           <X size={16} className="mr-1" />
//                           Cancel
//                         </button>
//                         <button 
//                           onClick={saveChanges}
//                           className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium"
//                         >
//                           <Check size={16} className="mr-1" />
//                           Save
//                         </button>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* First Name */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         First Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <div className="flex items-center">
//                           <User size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.firstName}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Last Name */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Last Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <div className="flex items-center">
//                           <User size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.lastName}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Email */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       ) : (
//                         <div className="flex items-center">
//                           <Mail size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.email}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Role - Not editable */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Role
//                       </label>
//                       <div className="flex items-center text-gray-600">
//                         <Shield size={16} className="text-gray-400 mr-2" />
//                         <span>{userData.role === "PO" ? "Police Officer" : userData.role}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Officer Details Section - Only for PO role */}
//                 {userData.role === "PO" && (
//                   <motion.div 
//                     className="border border-gray-200 rounded-xl p-6"
//                     variants={itemVariants}
//                   >
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                       <Award className="mr-2 text-blue-600" size={20} />
//                       Officer Details
//                     </h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {/* Rank */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Rank
//                         </label>
//                         <div className="flex items-center text-gray-600">
//                           <Award size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.rank}</span>
//                         </div>
//                       </div>
                      
//                       {/* Badge Number */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Badge Number
//                         </label>
//                         <div className="flex items-center text-gray-600">
//                           <Shield size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.badgeNumber}</span>
//                         </div>
//                       </div>
                      
//                       {/* Station */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Station
//                         </label>
//                         <div className="flex items-center text-gray-600">
//                           <MapPin size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.station}</span>
//                         </div>
//                       </div>
                      
//                       {/* Area */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Area
//                         </label>
//                         <div className="flex items-center text-gray-600">
//                           <MapPin size={16} className="text-gray-400 mr-2" />
//                           <span>{userData.area}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
          
//           {/* Action Buttons */}
//           <motion.div 
//             className="mt-8 flex flex-col sm:flex-row justify-end gap-4"
//             variants={itemVariants}
//           >
//             <button 
//               onClick={() => setShowLogoutModal(true)} 
//               className="flex items-center justify-center px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
            
//             <button 
//               onClick={() => setShowDeleteModal(true)} 
//               className="flex items-center justify-center px-5 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//             >
//               <Trash2 size={18} className="mr-2" />
//               Delete Account
//             </button>
//           </motion.div>
//         </div>
//       </motion.div>
      
//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div 
//             className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
//             <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
            
//             <div className="flex justify-end gap-3">
//               <button 
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 onClick={() => setShowLogoutModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
      
//       {/* Delete Account Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <motion.div 
//             className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center text-red-600 mb-4">
//               <AlertTriangle size={24} className="mr-2" />
//               <h3 className="text-lg font-semibold">Delete Account</h3>
//             </div>
            
//             <p className="text-gray-600 mb-2">Are you sure you want to delete your account? This action cannot be undone.</p>
//             <p className="text-gray-600 mb-4">All your data will be permanently removed.</p>
            
//             <div className="flex justify-end gap-3">
//               <button 
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 onClick={handleDeleteAccount}
//               >
//                 Delete Account
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Calendar;





import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  UserCircle, 
  Shield, 
  MapPin, 
  Award, 
  LogOut, 
  Trash2, 
  Edit2, 
  Camera, 
  X, 
  Check, 
  AlertTriangle 
} from "lucide-react";

// API service functions
const apiService = {
  // Base URL for API calls - adjust this to your backend URL
  baseUrl: "http://127.0.0.1:8000/users",
  
  // Get user profile data
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile/`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
  
  // Update user profile
  async updateUserProfile(userId, userData) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  
  // Upload profile photo
  async uploadProfilePhoto(userId, photoFile) {
    try {
      const formData = new FormData();
      formData.append('profile_photo', photoFile);
      
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile/photo/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      throw error;
    }
  },
  
  // Delete user account
  async deleteUserAccount(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  }
};

const Calendar = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  // Get user ID from local storage or context
  const userId = localStorage.getItem('userId') || '1'; // Default to '1' if not found
  
  // State for user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    rank: "",
    badgeNumber: "",
    station: "",
    area: "",
    profilePhoto: "/api/placeholder/120/120"
  });
  
  // Form state for editable fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: ""
  });
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getUserProfile(userId);
        
        // Map backend data to component state
        setUserData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          role: data.role,
          rank: data.rank,
          badgeNumber: data.badge_number,
          station: data.station,
          area: data.area,
          profilePhoto: data.profile_photo || "/api/placeholder/120/120"
        });
        
        // Set form data as well
        setFormData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          profilePhoto: data.profile_photo || "/api/placeholder/120/120"
        });
        
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load profile data");
        setIsLoading(false);
        console.error("Error fetching profile:", err);
      }
    };
    
    fetchUserData();
  }, [userId]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle profile photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            profilePhoto: reader.result
          });
        };
        reader.readAsDataURL(file);
        
        // Upload to server in background
        const result = await apiService.uploadProfilePhoto(userId, file);
        
        // Update with server URL if successful
        if (result.profile_photo) {
          setFormData({
            ...formData,
            profilePhoto: result.profile_photo
          });
        }
      } catch (err) {
        console.error("Error uploading photo:", err);
        // Revert to previous photo on error
        setFormData({
          ...formData,
          profilePhoto: userData.profilePhoto
        });
        alert("Failed to upload profile photo. Please try again.");
      }
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Save profile changes
  const saveChanges = async () => {
    try {
      // Prepare data for backend
      const updatedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email
      };
      
      // Make API call
      const result = await apiService.updateUserProfile(userId, updatedData);
      
      // Update local state with server response
      setUserData({
        ...userData,
        firstName: result.first_name,
        lastName: result.last_name,
        email: result.email,
        profilePhoto: result.profile_photo || userData.profilePhoto
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile changes:", err);
      alert("Failed to save profile changes. Please try again.");
    }
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      profilePhoto: userData.profilePhoto
    });
    setIsEditing(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear tokens/session
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    
    // Close modal and redirect to login
    setShowLogoutModal(false);
    navigate("/login");
  };
  
  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await apiService.deleteUserAccount(userId);
      
      // Clear local storage and redirect
      localStorage.clear();
      setShowDeleteModal(false);
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account. Please try again.");
      setShowDeleteModal(false);
    }
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        bounce: 0.3
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading profile...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <AlertTriangle className="text-red-500 mb-4 mx-auto" size={48} />
          <h2 className="text-xl font-semibold text-center mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    
      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      
        <div className="bg-blue-600 py-6 px-8 flex items-center justify-center gap-2">
          <UserCircle className="text-white" size={24} />
          <motion.h1 
            className="text-white text-2xl font-bold text-center text-pretty"
            variants={itemVariants}
          >
            My Profile
          </motion.h1>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col align-middle md:flex-row gap-8">
            <motion.div 
              className="md:w-1/3 flex flex-col items-center justify-center"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                  <img 
                    src={formData.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEditing && (
                  <div 
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={triggerFileInput}
                  >
                    <Camera className="text-white" size={24} />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                    />
                  </div>
                )}
              </div>
              
              {isEditing ? (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Click on the photo to change
                </p>
              ) : (
                <h2 className="text-xl font-semibold mt-4 text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h2>
              )}
              
              <div className="mt-4 flex flex-col items-center">
                <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm flex items-center">
                  <Shield size={16} className="mr-1" />
                  {userData.role === "PO" ? "Police Officer" : userData.role}
                </span>
              </div>
            </motion.div>
            
            {/* Right column - Info */}
            <motion.div 
              className="md:w-2/3"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 gap-6">
                {/* Personal Info Section */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <UserCircle className="mr-2 text-blue-600" size={20} />
                      Personal Information
                    </h3>
                    
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                      >
                        <Edit2 size={16} className="mr-1" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={cancelEditing}
                          className="text-gray-600 hover:text-gray-800 flex items-center text-sm font-medium"
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </button>
                        <button 
                          onClick={saveChanges}
                          className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium"
                        >
                          <Check size={16} className="mr-1" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <User size={16} className="text-gray-400 mr-2" />
                          <span>{userData.firstName}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <User size={16} className="text-gray-400 mr-2" />
                          <span>{userData.lastName}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <span>{userData.email}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Role - Not editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <div className="flex items-center text-gray-600">
                        <Shield size={16} className="text-gray-400 mr-2" />
                        <span>{userData.role === "PO" ? "Police Officer" : userData.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Officer Details Section - Only for PO role */}
                {userData.role === "PO" && (
                  <motion.div 
                    className="border border-gray-200 rounded-xl p-6"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Award className="mr-2 text-blue-600" size={20} />
                      Officer Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Rank */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rank
                        </label>
                        <div className="flex items-center text-gray-600">
                          <Award size={16} className="text-gray-400 mr-2" />
                          <span>{userData.rank}</span>
                        </div>
                      </div>
                      
                      {/* Badge Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Badge Number
                        </label>
                        <div className="flex items-center text-gray-600">
                          <Shield size={16} className="text-gray-400 mr-2" />
                          <span>{userData.badgeNumber}</span>
                        </div>
                      </div>
                      
                      {/* Station */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Station
                        </label>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span>{userData.station}</span>
                        </div>
                      </div>
                      
                      {/* Area */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Area
                        </label>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span>{userData.area}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Action Buttons */}
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row justify-end gap-4"
            variants={itemVariants}
          >
            <button 
              onClick={() => setShowLogoutModal(true)} 
              className="flex items-center justify-center px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
            
            <button 
              onClick={() => setShowDeleteModal(true)} 
              className="flex items-center justify-center px-5 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              Delete Account
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to log out of your account?</p>
            
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Delete Account</h3>
            </div>
            
            <p className="text-gray-600 mb-2">Are you sure you want to delete your account? This action cannot be undone.</p>
            <p className="text-gray-600 mb-4">All your data will be permanently removed.</p>
            
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Calendar;