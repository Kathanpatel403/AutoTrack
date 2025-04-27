// import React, { useState, useEffect } from "react";
// import { TextField, Typography, InputAdornment } from "@mui/material";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import Confetti from "react-confetti";
// import axios from "axios";
// import {
//   BadgeOutlined,
//   Person,
//   Email,
//   Phone,
//   LocationOn,
//   Business,
//   MilitaryTech,
//   CheckCircleOutline,
//   ErrorOutline
// } from "@mui/icons-material";

// const API_BASE_URL = "http://localhost:8000";

// const AddPoliceOfficerForm = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Initial form values matching backend expectations
//   const initialValues = {
//     first_name: "",
//     last_name: "",
//     email: "",
//     contact: "",
//     badge_number: "",
//     station_name: "",
//     assigned_area: "",
//     rank: "",
//   };

//   // Phone number validation regex
//   const phoneRegExp =
//     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

//   // Validation schema matching backend requirements
//   const validationSchema = Yup.object({
//     first_name: Yup.string().required("First Name is required"),
//     last_name: Yup.string().required("Last Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     contact: Yup.string()
//       .matches(phoneRegExp, "Invalid phone number")
//       .required("Contact number is required"),
//     badge_number: Yup.string().required("Badge Number is required"),
//     rank: Yup.string().required("Rank is required"),
//     station_name: Yup.string(),
//     assigned_area: Yup.string(),
//   });

//   // const handleFormSubmit = async (values, actions) => {
//   //   try {
//   //     const response = await axios.post(
//   //       `${API_BASE_URL}/users/dashboard/add-police-officer/`,
//   //       values
//   //     );
//   //     console.log("Response:", response.data);

//   //     // Reset form
//   //     actions.resetForm();

//   //     // Show success
//   //     setIsSuccess(true);
//   //     setErrorMessage("");

//   //     // Hide success message after 5 seconds
//   //     setTimeout(() => setIsSuccess(false), 5000);
//   //   } catch (error) {
//   //     console.error("Error adding police officer:", error);
//   //     setErrorMessage(
//   //       error.response?.data?.error || "Something went wrong!"
//   //     );
      
//   //     // Clear error after 5 seconds
//   //     setTimeout(() => setErrorMessage(""), 5000);
//   //   }
//   // };

//   // Card animation variants
  
//   const handleFormSubmit = (values, actions) => {
//     // Simulate API processing time
//     setTimeout(() => {
//       console.log("Form submitted with values:", values);
      
//       // Simulate successful submission 90% of the time
//       const isSuccessful = Math.random() > 0.1;
      
//       if (isSuccessful) {
//         // Reset form on success
//         actions.resetForm();
        
//         // Show success message
//         setIsSuccess(true);
//         setErrorMessage("");
        
//         // Hide success message after 5 seconds
//         setTimeout(() => setIsSuccess(false), 5000);
//       } else {
//         // Simulate random error
//         setErrorMessage("Simulated error: Unable to add officer at this time. Please try again.");
        
//         // Clear error message after 5 seconds
//         setTimeout(() => setErrorMessage(""), 5000);
//       }
      
//       // Reset submission state
//       actions.setSubmitting(false);
//     }, 1500); // Simulate network delay
//   };
  
//   const cardVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };

//   const inputFieldVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: custom => ({
//       opacity: 1,
//       x: 0,
//       transition: { 
//         delay: custom * 0.1,
//         duration: 0.5
//       }
//     })
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
//       {isSuccess && (
//         <Confetti
//           width={windowSize.width}
//           height={windowSize.height}
//           recycle={false}
//           numberOfPieces={500}
//         />
//       )}

//       <motion.div
//         className="w-full max-w-4xl"
//         initial="hidden"
//         animate="visible"
//         variants={cardVariants}
//       >
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-[#1780E3] p-3 text-white">
//             <div className="flex items-center justify-center space-x-3">
//               <BadgeOutlined fontSize="large" />
//               <Typography variant="h4" className="font-bold">
//                 Add Police Officer
//               </Typography>
//             </div>
//             <Typography variant="subtitle1" className="text-center mt-2 text-blue-100">
//               Enter the details to register a new officer in the system
//             </Typography>
//           </div>

//           {/* Form Section */}
//           <div className="p-8">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleFormSubmit}
//             >
//               {({
//                 values,
//                 errors,
//                 touched,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 isSubmitting
//               }) => (
//                 <Form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Personal Information Section */}
//                     <motion.div 
//                       className="md:col-span-2"
//                       custom={0}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Typography variant="h6" className="text-gray-700 font-medium mb-3 flex items-center">
//                         <Person className="mr-2 text-blue-600" />
//                         Personal Information
//                       </Typography>
//                       <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />
//                     </motion.div>

//                     {/* First Name */}
//                     <motion.div
//                       custom={1}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="First Name"
//                         name="first_name"
//                         placeholder="Enter First Name"
//                         value={values.first_name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.first_name && Boolean(errors.first_name)}
//                         helperText={touched.first_name && errors.first_name}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Person className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                         className="rounded-lg"
//                       />
//                     </motion.div>

//                     {/* Last Name */}
//                     <motion.div
//                       custom={2}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Last Name"
//                         name="last_name"
//                         placeholder="Enter Last Name"
//                         value={values.last_name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.last_name && Boolean(errors.last_name)}
//                         helperText={touched.last_name && errors.last_name}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Person className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Email */}
//                     <motion.div
//                       custom={3}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         placeholder="Enter Email Address"
//                         value={values.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.email && Boolean(errors.email)}
//                         helperText={touched.email && errors.email}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Email className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Contact Number */}
//                     <motion.div
//                       custom={4}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Contact Number"
//                         name="contact"
//                         placeholder="Enter Contact Number"
//                         value={values.contact}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.contact && Boolean(errors.contact)}
//                         helperText={touched.contact && errors.contact}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Phone className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Officer Information Section */}
//                     <motion.div 
//                       className="md:col-span-2 mt-4"
//                       custom={5}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Typography variant="h6" className="text-gray-700 font-medium mb-3 flex items-center">
//                         <BadgeOutlined className="mr-2 text-blue-600" />
//                         Officer Information
//                       </Typography>
//                       <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />
//                     </motion.div>

//                     {/* Badge Number */}
//                     <motion.div
//                       custom={6}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Badge Number"
//                         name="badge_number"
//                         placeholder="Enter Badge Number"
//                         value={values.badge_number}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.badge_number && Boolean(errors.badge_number)}
//                         helperText={touched.badge_number && errors.badge_number}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <BadgeOutlined className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Rank */}
//                     <motion.div
//                       custom={7}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Rank"
//                         name="rank"
//                         placeholder="Enter Rank"
//                         value={values.rank}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.rank && Boolean(errors.rank)}
//                         helperText={touched.rank && errors.rank}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <MilitaryTech className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Station Name */}
//                     <motion.div
//                       custom={8}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Station Name"
//                         placeholder="Enter Station Name"
//                         name="station_name"
//                         value={values.station_name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <Business className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Assigned Area */}
//                     <motion.div
//                       custom={9}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <TextField
//                         fullWidth
//                         label="Assigned Area"
//                         placeholder="Enter Assigned Area"
//                         name="assigned_area"
//                         value={values.assigned_area}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         InputProps={{
//                           startAdornment: (
//                             <InputAdornment position="start">
//                               <LocationOn className="text-blue-500" />
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </motion.div>

//                     {/* Submit Button */}
//                     <motion.div 
//                       className="md:col-span-2 flex justify-end mt-6"
//                       custom={10}
//                       variants={inputFieldVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//                         whileTap={{ scale: 0.97 }}
//                         disabled={isSubmitting}
//                         type="submit"
//                         className={`
//                           ${isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} 
//                           text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center space-x-2
//                         `}
//                       >
//                         <span>Add Police Officer</span>
//                         <BadgeOutlined fontSize="small" />
//                       </motion.button>
//                     </motion.div>
//                   </div>
//                 </Form>
//               )}
//             </Formik>

//             {/* Success Message */}
//             <AnimatePresence>
//               {isSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="mt-6 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center justify-center space-x-2"
//                 >
//                   <CheckCircleOutline className="text-green-500" />
//                   <span className="font-medium">Police Officer successfully added!</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Error Message */}
//             <AnimatePresence>
//               {errorMessage && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center justify-center space-x-2"
//                 >
//                   <ErrorOutline className="text-red-500" />
//                   <span className="font-medium">{errorMessage}</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AddPoliceOfficerForm;






import React, { useState, useEffect } from "react";
import { TextField, Typography, InputAdornment } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import axios from "axios";
import {
  BadgeOutlined,
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  MilitaryTech,
  CheckCircleOutline,
  ErrorOutline
} from "@mui/icons-material";

// Backend API URL - Change this to your actual backend URL
const API_BASE_URL = "http://localhost:8000";

const AddPoliceOfficerForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial form values matching backend expectations
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    badge_number: "",
    station_name: "",
    assigned_area: "",
    rank: "",
  };

  // Phone number validation regex
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // Validation schema matching backend requirements
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(phoneRegExp, "Invalid phone number")
      .required("Contact number is required"),
    badge_number: Yup.string().required("Badge Number is required"),
    rank: Yup.string().required("Rank is required"),
    station_name: Yup.string(),
    assigned_area: Yup.string(),
  });

  // Backend integration implementation
  const handleFormSubmit = async (values, actions) => {
    try {
      // Show loading state through the isSubmitting property
      
      // Make API call to backend
      const response = await axios.post(
        `${API_BASE_URL}/users/dashboard/add-police-officer/`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      console.log("Backend response:", response.data);

      // Reset form on success
      actions.resetForm();

      // Show success message
      setIsSuccess(true);
      setErrorMessage("");

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error adding police officer:", error);
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with an error status
        setErrorMessage(
          error.response.data?.error || 
          error.response.data?.message || 
          `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setErrorMessage("Error sending request. Please try again.");
      }
      
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      // Reset submission state
      actions.setSubmitting(false);
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const inputFieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: custom => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
      {isSuccess && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <motion.div
        className="w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#1780E3] p-3 text-white">
            <div className="flex items-center justify-center space-x-3">
              <BadgeOutlined fontSize="large" />
              <Typography variant="h4" className="font-bold">
                Add Police Officer
              </Typography>
            </div>
            <Typography variant="subtitle1" className="text-center mt-2 text-blue-100">
              Enter the details to register a new officer in the system
            </Typography>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <motion.div 
                      className="md:col-span-2"
                      custom={0}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Typography variant="h6" className="text-gray-700 font-medium mb-3 flex items-center">
                        <Person className="mr-2 text-blue-600" />
                        Personal Information
                      </Typography>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />
                    </motion.div>

                    {/* First Name */}
                    <motion.div
                      custom={1}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        placeholder="Enter First Name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && Boolean(errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                        className="rounded-lg"
                      />
                    </motion.div>

                    {/* Last Name */}
                    <motion.div
                      custom={2}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter Last Name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && Boolean(errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      custom={3}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Contact Number */}
                    <motion.div
                      custom={4}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contact"
                        placeholder="Enter Contact Number"
                        value={values.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.contact && Boolean(errors.contact)}
                        helperText={touched.contact && errors.contact}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Officer Information Section */}
                    <motion.div 
                      className="md:col-span-2 mt-4"
                      custom={5}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Typography variant="h6" className="text-gray-700 font-medium mb-3 flex items-center">
                        <BadgeOutlined className="mr-2 text-blue-600" />
                        Officer Information
                      </Typography>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />
                    </motion.div>

                    {/* Badge Number */}
                    <motion.div
                      custom={6}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Badge Number"
                        name="badge_number"
                        placeholder="Enter Badge Number"
                        value={values.badge_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.badge_number && Boolean(errors.badge_number)}
                        helperText={touched.badge_number && errors.badge_number}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeOutlined className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Rank */}
                    <motion.div
                      custom={7}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Rank"
                        name="rank"
                        placeholder="Enter Rank"
                        value={values.rank}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.rank && Boolean(errors.rank)}
                        helperText={touched.rank && errors.rank}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MilitaryTech className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Station Name */}
                    <motion.div
                      custom={8}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Station Name"
                        placeholder="Enter Station Name"
                        name="station_name"
                        value={values.station_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Business className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Assigned Area */}
                    <motion.div
                      custom={9}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <TextField
                        fullWidth
                        label="Assigned Area"
                        placeholder="Enter Assigned Area"
                        name="assigned_area"
                        value={values.assigned_area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn className="text-blue-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div 
                      className="md:col-span-2 flex justify-end mt-6"
                      custom={10}
                      variants={inputFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSubmitting}
                        type="submit"
                        className={`
                          ${isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} 
                          text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center space-x-2
                        `}
                      >
                        {isSubmitting ? (
                          <>
                            <span>Processing...</span>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                          </>
                        ) : (
                          <>
                            <span>Add Police Officer</span>
                            <BadgeOutlined fontSize="small" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center justify-center space-x-2"
                >
                  <CheckCircleOutline className="text-green-500" />
                  <span className="font-medium">Police Officer successfully added!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center justify-center space-x-2"
                >
                  <ErrorOutline className="text-red-500" />
                  <span className="font-medium">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPoliceOfficerForm;