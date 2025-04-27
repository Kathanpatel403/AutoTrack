// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Check,
//   X,
//   ZoomIn,
//   ZoomOut,
//   Loader,
//   BookOpen,
//   AlertCircle,
// } from "lucide-react";
// import Header from "./Header";
// import "react-toastify/dist/ReactToastify.css";

// const Automation = () => {
//   const [challan, setChallan] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const imageContainerRef = useRef(null);
  
//   // State for editable fields
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [violationType, setViolationType] = useState("");
//   const [fineAmount, setFineAmount] = useState("");

//   // Rules and regulations
//   const approvalGuidelines = [
//     { id: 1, title: "Clear Evidence", description: "The image clearly shows the violation" },
//     { id: 2, title: "Vehicle Identification", description: "License plate is clearly visible and matches the record" },
//     { id: 3, title: "Proper Documentation", description: "All required fields are properly documented" },
//     { id: 4, title: "Legal Compliance", description: "The violation type aligns with local traffic laws" },
//     { id: 5, title: "Fine Accuracy", description: "The fine amount corresponds to the severity of violation" }
//   ];
  
//   const rejectionReasons = [
//     { id: 1, title: "Unclear Evidence", description: "The image is blurry or doesn't clearly show a violation" },
//     { id: 2, title: "Incorrect Vehicle", description: "License plate doesn't match or is unreadable" },
//     { id: 3, title: "Insufficient Documentation", description: "Required fields are missing or incomplete" },
//     { id: 4, title: "Technical Error", description: "System errors or duplicate records" },
//     { id: 5, title: "Legal Exception", description: "The vehicle has proper exemption (emergency, authorized)" }
//   ];

//   // Base URLs for API endpoints
//   const BACKEND_URL = "http://127.0.0.1:8000/users";
  
//   useEffect(() => {
//     fetchPendingChallan();
//   }, []);

//   useEffect(() => {
//     if (challan) {
//       // Initialize editable field states with current challan values
//       setVehicleNumber(challan.Vehicle_No || "");
//       setViolationType(challan.ViolationType || "");
//       setFineAmount(challan.FineAmount || "");
//     }
//   }, [challan]);

//   const fetchPendingChallan = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${BACKEND_URL}/pending-challan/`);
      
//       if (!response.ok) {
//         if (response.status === 404) {
//           toast.info("No pending challans available");
//           setIsLoading(false);
//           setChallan(null);
//           return;
//         }
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setChallan(data);
//     } catch (error) {
//       console.error("Error fetching pending challan:", error);
//       toast.error("Failed to fetch challan data");
//     }
//     setIsLoading(false);
//   };

//   const handleSubmit = async (action) => {
//     if (!challan) return;
    
//     setIsLoading(true);
//     try {
//       // Prepare data with edited fields
//       const updatedData = {
//         action: action === "approved" ? "approve" : "reject",
//         Vehicle_No: vehicleNumber,
//         ViolationType: violationType,
//         FineAmount: fineAmount
//       };

//       const response = await fetch(`${BACKEND_URL}/update-challan-status/${challan.id}/`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       await response.json();
//       if (action === "approved") {
//         toast.success("Challan Approved");
//       } else {
//         toast.error("Challan Rejected");
//       }
      
//       // Fetch the next pending challan
//       fetchPendingChallan();
//     } catch (error) {
//       console.error("Error updating challan:", error);
//       toast.error("Failed to update challan");
//       setIsLoading(false);
//     }
//   };

//   const handleZoom = (delta) => {
//     setZoomLevel((prev) => Math.min(Math.max(1, prev + delta), 4));
//   };

//   // Function to get evidence images from challan
//   const getEvidenceImages = () => {
//     if (!challan) return [];
    
//     // If there's a document_url, we use that
//     if (challan.document_url) {
//       return [{ url: challan.document_url, alt: "Evidence 1" }];
//     }
    
//     // For demo/testing purposes - use these if no real images in challan
//     return [
//       { url: "src/assets/images/abc.png", alt: "Evidence 1" },
//       { url: "src/assets/images/abc2.png", alt: "Evidence 2" }
//     ];
//   };

//   // Component for displaying rules and regulations
//   const RulesRegulations = () => (
//     <div className="bg-white p-6 rounded-2xl shadow-xl h-full">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
//         <BookOpen className="mr-2 text-blue-600" /> 
//         Challan Review Guidelines
//       </h2>
      
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
//           <Check className="mr-2" /> Approval Criteria
//         </h3>
//         <ul className="space-y-3">
//           {approvalGuidelines.map(guideline => (
//             <li key={guideline.id} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
//               <span className="font-medium text-green-700">{guideline.title}: </span>
//               <span className="text-gray-700">{guideline.description}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       <div>
//         <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
//           <X className="mr-2" /> Rejection Reasons
//         </h3>
//         <ul className="space-y-3">
//           {rejectionReasons.map(reason => (
//             <li key={reason.id} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
//               <span className="font-medium text-red-700">{reason.title}: </span>
//               <span className="text-gray-700">{reason.description}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//         <h3 className="flex items-center font-semibold text-yellow-700 mb-2">
//           <AlertCircle className="mr-2" /> Important Note
//         </h3>
//         <p className="text-gray-700">
//           Always carefully review all evidence before making a decision. If uncertain about any aspect of the challan, 
//           consult with a supervisor before proceeding.
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Header />
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center p-8">
//         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Challan Verification Form */}
//           <div>
//             {isLoading ? (
//               <div className="flex items-center justify-center h-64 bg-white p-8 rounded-2xl shadow-xl">
//                 <Loader className="animate-spin text-blue-600" size={48} />
//               </div>
//             ) : !challan ? (
//               <motion.div
//                 className="bg-white p-8 rounded-2xl shadow-xl flex items-center justify-center h-64"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-600">No pending challans available</h2>
//               </motion.div>
//             ) : (
//               <motion.div 
//                 className="bg-white p-8 rounded-2xl shadow-xl"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//               >
//                 <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">E-Challan Verification</h2>
                
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Vehicle Number</label>
//                       <input
//                         type="text"
//                         value={vehicleNumber}
//                         onChange={(e) => setVehicleNumber(e.target.value)}
//                         className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Violation Type</label>
//                       <input
//                         type="text"
//                         value={violationType}
//                         onChange={(e) => setViolationType(e.target.value)}
//                         className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Owner Name</label>
//                       <input
//                         type="text"
//                         value={`${challan.Owner_First_Name || ""} ${challan.Owner_Last_Name || ""}`}
//                         readOnly
//                         className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Fine Amount</label>
//                       <input
//                         type="text"
//                         value={fineAmount}
//                         onChange={(e) => setFineAmount(e.target.value)}
//                         className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Violation Date</label>
//                       <input
//                         type="text"
//                         value={challan.Violation_Date || ""}
//                         readOnly
//                         className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600 text-sm font-medium">Place of Violation</label>
//                       <input
//                         type="text"
//                         value={challan.Place_Of_Violation || ""}
//                         readOnly
//                         className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <label className="block text-gray-600 text-sm font-medium mb-2">Evidence</label>
//                     <div className="grid grid-cols-2 gap-6">
//                       {getEvidenceImages().map((image, index) => (
//                         <img
//                           key={index}
//                           src={image.url}
//                           alt={image.alt}
//                           className="rounded-xl cursor-pointer transition-transform transform hover:scale-105 shadow-lg object-cover h-48 w-full"
//                           onClick={() => setSelectedImage(image.url)}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-between mt-6">
//                     <button
//                       onClick={() => handleSubmit("approved")}
//                       className="px-5 py-3 bg-green-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-md hover:bg-green-600 transition-all"
//                     >
//                       <Check className="w-5 h-5" /> Approve
//                     </button>
//                     <button
//                       onClick={() => handleSubmit("rejected")}
//                       className="px-5 py-3 bg-red-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-md hover:bg-red-600 transition-all"
//                     >
//                       <X className="w-5 h-5" /> Reject
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Right Column - Rules & Regulations */}
//           <div>
//             <RulesRegulations />
//           </div>
//         </div>
//       </div>

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <motion.div 
//             className="relative bg-white p-6 rounded-2xl shadow-xl w-4/5 max-w-2xl"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <div ref={imageContainerRef} className="flex justify-center overflow-hidden h-64">
//               <img
//                 src={selectedImage}
//                 alt="Evidence"
//                 style={{ transform: `scale(${zoomLevel})` }}
//                 className="rounded-lg shadow-md object-contain max-h-full"
//               />
//             </div>
            
//             <div className="flex justify-center gap-4 mt-4">
//               <button 
//                 onClick={() => handleZoom(0.5)} 
//                 className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all shadow"
//               >
//                 <ZoomIn className="w-5 h-5" />
//               </button>
//               <button 
//                 onClick={() => handleZoom(-0.5)} 
//                 className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all shadow"
//               >
//                 <ZoomOut className="w-5 h-5" />
//               </button>
//               <button 
//                 onClick={() => setSelectedImage(null)} 
//                 className="p-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all flex items-center gap-2"
//               >
//                 <X className="w-5 h-5" /> Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Automation;




import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import {
  Check,
  X,
  ZoomIn,
  ZoomOut,
  Loader,
  BookOpen,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Camera
} from "lucide-react";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";

const Automation = () => {
  const [challan, setChallan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("approval");
  const [showImportantNote, setShowImportantNote] = useState(false);
  const imageContainerRef = useRef(null);
  
  // State for editable fields
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [violationType, setViolationType] = useState("");
  const [fineAmount, setFineAmount] = useState("");

  // Rules and regulations
  const approvalGuidelines = [
    { id: 1, title: "Clear Evidence", description: "The image clearly shows the violation" },
    { id: 2, title: "Vehicle Identification", description: "License plate is clearly visible and matches the record" },
    { id: 3, title: "Proper Documentation", description: "All required fields are properly documented" },
    { id: 4, title: "Legal Compliance", description: "The violation type aligns with local traffic laws" },
    { id: 5, title: "Fine Accuracy", description: "The fine amount corresponds to the severity of violation" }
  ];
  
  const rejectionReasons = [
    { id: 1, title: "Unclear Evidence", description: "The image is blurry or doesn't clearly show a violation" },
    { id: 2, title: "Incorrect Vehicle", description: "License plate doesn't match or is unreadable" },
    { id: 3, title: "Insufficient Documentation", description: "Required fields are missing or incomplete" },
    { id: 4, title: "Technical Error", description: "System errors or duplicate records" },
    { id: 5, title: "Legal Exception", description: "The vehicle has proper exemption (emergency, authorized)" }
  ];

  // Base URLs for API endpoints
  const BACKEND_URL = "http://127.0.0.1:8000/users";
  
  useEffect(() => {
    fetchPendingChallan();
  }, []);

  useEffect(() => {
    if (challan) {
      // Initialize editable field states with current challan values
      setVehicleNumber(challan.Vehicle_No || "");
      setViolationType(challan.ViolationType || "");
      setFineAmount(challan.FineAmount || "");
    }
  }, [challan]);

  const fetchPendingChallan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/pending-challan/`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.info("No pending challans available");
          setIsLoading(false);
          setChallan(null);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setChallan(data);
    } catch (error) {
      console.error("Error fetching pending challan:", error);
      toast.error("Failed to fetch challan data");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (action) => {
    if (!challan) return;
    
    setIsLoading(true);
    try {
      // Prepare data with edited fields
      const updatedData = {
        action: action === "approved" ? "approve" : "reject",
        Vehicle_No: vehicleNumber,
        ViolationType: violationType,
        FineAmount: fineAmount
      };

      const response = await fetch(`${BACKEND_URL}/update-challan-status/${challan.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      await response.json();
      if (action === "approved") {
        toast.success("Challan Approved");
      } else {
        toast.error("Challan Rejected");
      }
      
      // Fetch the next pending challan
      fetchPendingChallan();
    } catch (error) {
      console.error("Error updating challan:", error);
      toast.error("Failed to update challan");
      setIsLoading(false);
    }
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(1, prev + delta), 4));
  };

  // Function to get evidence images from challan
  const getEvidenceImages = () => {
    if (!challan) return [];
    
    // If there's a document_url, we use that
    if (challan.document_url) {
      return [{ url: challan.document_url, alt: "Evidence 1" }];
    }
    
    // For demo/testing purposes - use these if no real images in challan
    return [
      { url: "src/assets/images/abc.png", alt: "Evidence 1" },
      { url: "src/assets/images/abc2.png", alt: "Evidence 2" }
    ];
  };

  // Component for displaying compact rules and regulations with tabs
  const RulesRegulations = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden pb-10 mt-14">
      {/* Tabs */}
      <div className="flex text-center border-b">
        <motion.button
          className={`flex-1 py-3 px-4 font-medium text-sm flex items-center justify-center ${activeTab === "approval" ? "text-green-600 border-b-2 border-green-500 bg-green-50" : "text-gray-500 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("approval")}
          whileHover={{ backgroundColor: activeTab === "approval" ? "#f0fdf4" : "#f9fafb" }}
          transition={{ duration: 0.2 }}
        >
          <Check className="w-4 h-4 mr-2" /> Approval Guidelines
        </motion.button>
        <motion.button
          className={`flex-1 py-3 px-4 font-medium text-sm flex items-center justify-center ${activeTab === "rejection" ? "text-red-600 border-b-2 border-red-500 bg-red-50" : "text-gray-500 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("rejection")}
          whileHover={{ backgroundColor: activeTab === "rejection" ? "#fef2f2" : "#f9fafb" }}
          transition={{ duration: 0.2 }}
        >
          <X className="w-4 h-4 mr-2" /> Rejection Reasons
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "approval" && (
            <motion.div
              key="approval"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-2">
                {approvalGuidelines.map(guideline => (
                  <motion.li 
                    key={guideline.id} 
                    className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="font-medium text-green-700">{guideline.title}: </span>
                    <span className="text-gray-700">{guideline.description}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "rejection" && (
            <motion.div
              key="rejection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-2">
                {rejectionReasons.map(reason => (
                  <motion.li 
                    key={reason.id} 
                    className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="font-medium text-red-700">{reason.title}: </span>
                    <span className="text-gray-700">{reason.description}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Important Note - Collapsible */}
      <div className="border-t p-2">
        <motion.button 
          className="w-full flex justify-between items-center p-2 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          onClick={() => setShowImportantNote(!showImportantNote)}
          whileHover={{ backgroundColor: "#fefce8" }}
        >
          <div className="flex items-center text-yellow-700 font-medium">
            <AlertCircle className="w-4 h-4 mr-2" />
            Important Note
          </div>
          {showImportantNote ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>
        
        <AnimatePresence>
          {showImportantNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-3 mt-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-gray-700 text-sm">
                  Always carefully review all evidence before making a decision. If uncertain about any aspect of the challan, 
                  consult with a supervisor before proceeding.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen mt-20 pt-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
          {/* Left Column - Challan Verification Form */}
          <div>
          {isLoading ? (
              <div className="flex items-center justify-center h-64 bg-white p-8 rounded-2xl shadow-xl">
                <Loader className="animate-spin text-blue-600" size={48} />
              </div>
            ) : !challan ? (
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl flex items-center justify-center h-64"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-600">No pending challans available</h2>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">E-Challan Verification</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Vehicle Number</label>
                      <input
                        type="text"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Violation Type</label>
                      <input
                        type="text"
                        value={violationType}
                        onChange={(e) => setViolationType(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Owner Name</label>
                      <input
                        type="text"
                        value={`${challan.Owner_First_Name || ""} ${challan.Owner_Last_Name || ""}`}
                        readOnly
                        className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Fine Amount</label>
                      <input
                        type="text"
                        value={fineAmount}
                        onChange={(e) => setFineAmount(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Violation Date</label>
                      <input
                        type="text"
                        value={challan.Violation_Date || ""}
                        readOnly
                        className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-sm font-medium">Place of Violation</label>
                      <input
                        type="text"
                        value={challan.Place_Of_Violation || ""}
                        readOnly
                        className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Evidence</label>
                    <div className="grid grid-cols-2 gap-6">
                      {getEvidenceImages().map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={image.alt}
                          className="rounded-xl cursor-pointer transition-transform transform hover:scale-105 shadow-lg object-cover h-48 w-full"
                          onClick={() => setSelectedImage(image.url)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => handleSubmit("approved")}
                      className="px-5 py-3 bg-green-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-md hover:bg-green-600 transition-all"
                    >
                      <Check className="w-5 h-5" /> Approve
                    </button>
                    <button
                      onClick={() => handleSubmit("rejected")}
                      className="px-5 py-3 bg-red-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-md hover:bg-red-600 transition-all"
                    >
                      <X className="w-5 h-5" /> Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          {/* Right Column - Rules & Regulations */}
          <div className="h-calc-screen-minus-header">
            <RulesRegulations />
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative bg-white p-4 rounded-xl shadow-xl w-4/5 max-w-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div ref={imageContainerRef} className="flex justify-center overflow-hidden h-64 bg-gray-100 rounded-lg">
                <motion.img
                  src={selectedImage}
                  alt="Evidence"
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="rounded-lg object-contain max-h-full"
                  layoutId="selectedImage"
                />
              </div>
              
              <div className="flex justify-center gap-2 mt-4">
                <motion.button 
                  onClick={() => handleZoom(0.5)} 
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  onClick={() => handleZoom(-0.5)} 
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomOut className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedImage(null)} 
                  className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all flex items-center gap-1"
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" /> Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Add this to your CSS
const globalStyles = `
  .h-calc-screen-minus-header {
    height: calc(100vh - 100px);
  }
`;

export default Automation;