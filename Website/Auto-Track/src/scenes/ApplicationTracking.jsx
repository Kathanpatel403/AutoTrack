// // import React, { useState } from 'react';
// // import { 
// //   Timeline, 
// //   TimelineItem, 
// //   TimelineSeparator, 
// //   TimelineConnector, 
// //   TimelineContent, 
// //   TimelineDot 
// // } from '@mui/lab';
// // import { 
// //   CheckCircle, 
// //   HourglassEmpty, 
// //   RadioButtonUnchecked, 
// //   Error,
// //   Person, 
// //   Info, 
// //   HelpOutline,
// //   ExpandMore
// // } from '@mui/icons-material';
// // import { 
// //   Card, 
// //   CardContent, 
// //   Typography, 
// //   Tooltip, 
// //   Collapse,
// //   TextField,
// //   Button,
// //   Alert,
// //   Avatar,
// //   List,
// //   ListItem,
// //   ListItemAvatar,
// //   ListItemText,
// //   CircularProgress,
// //   Divider,
// //   IconButton,
// //   CardHeader
// // } from '@mui/material';
// // import Navbar from '../components/web/UserNavbar';
// // import { Link } from 'react-router-dom';

// // const ApplicationTracking = () => {
// //   const [ticketNumber, setTicketNumber] = useState("");
// //   const [showStatus, setShowStatus] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [expandedStage, setExpandedStage] = useState(null);
// //   const [selectedStage, setSelectedStage] = useState(null);
// //   const [notification, setNotification] = useState(null);

// //   const stages = [
// //     {
// //       id: 1,
// //       title: "Application Received",
// //       date: "12 Jan 2025",
// //       time: "11:45 AM",
// //       status: "completed",
// //       details: "Your application has been successfully submitted and assigned to our processing team. Initial review will begin shortly.",
// //       icon: CheckCircle,
// //       color: "green",
// //       expectedDuration: "1 day"
// //     },
// //     {
// //       id: 2,
// //       title: "Initial Verification",
// //       date: "13 Jan 2025",
// //       time: "02:15 PM", 
// //       status: "completed",
// //       details: "Comprehensive document verification and initial assessment completed. All submitted documents have been carefully reviewed.",
// //       icon: CheckCircle,
// //       color: "green",
// //       expectedDuration: "2-3 days"
// //     },
// //     {
// //       id: 3,
// //       title: "Detailed Investigation",
// //       date: "15 Jan 2025",
// //       time: "10:30 AM",
// //       status: "current",
// //       details: "Our specialized team is conducting an in-depth investigation of your application. This involves cross-referencing documents and gathering additional information if required.",
// //       icon: HourglassEmpty,
// //       color: "blue",
// //       expectedDuration: "3-5 days"
// //     },
// //     {
// //       id: 4,
// //       title: "Final Processing",
// //       date: "Pending",
// //       time: "-",
// //       status: "pending",
// //       details: "Preparation for final decision-making process. Our review committee will assess all gathered information and make a comprehensive evaluation.",
// //       icon: RadioButtonUnchecked,
// //       color: "gray",
// //       expectedDuration: "2-3 days"
// //     },
// //     {
// //       id: 5,
// //       title: "Resolution & Closure",
// //       date: "Pending",
// //       time: "-",
// //       status: "pending",
// //       details: "Final stage where the application will be resolved and officially closed. You will receive a comprehensive communication about the final outcome.",
// //       icon: RadioButtonUnchecked,
// //       color: "gray",
// //       expectedDuration: "1-2 days"
// //     }
// //   ];

// //   const statusUpdates = [
// //     {
// //       date: "15 Jan 2025",
// //       time: "10:30 AM",
// //       message: "Investigation team has started reviewing your case.",
// //       type: "info",
// //     },
// //     {
// //       date: "13 Jan 2025",
// //       time: "02:15 PM",
// //       message: "All submitted documents have been verified.",
// //       type: "success",
// //     },
// //     {
// //       date: "12 Jan 2025",
// //       time: "11:45 AM",
// //       message: "Application received and ticket generated.",
// //       type: "success",
// //     },
// //   ];

// //   const validateTicketNumber = (number) => /^ECH-\d{4}-\d{3}$/.test(number);

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'completed': return 'text-green-500';
// //       case 'current': return 'text-blue-500';
// //       default: return 'text-gray-400';
// //     }
// //   };

// //   const handleTrack = async (e) => {
// //     e.preventDefault();
// //     if (!validateTicketNumber(ticketNumber)) {
// //       setError("Please enter a valid ticket number (e.g., ECH-2025-001)");
// //       return;
// //     }
// //     setError("");
// //     setLoading(true);
  
// //     try {
// //       const response = await fetch(`http://127.0.0.1:8000/users/echallan-queries/${ticketNumber}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         }
// //       });
  
// //       if (!response.ok) {
// //         const errorData = await response.text();
// //         throw new Error(errorData || 'Failed to fetch query details');
// //       }
      
// //       const queryData = await response.json();
      
// //       setShowStatus(true);
      
// //       // You can customize the notification message based on the resolution status
// //       let statusMessage = "Your application is currently under investigation.";
// //       if (queryData.resolved_at) {
// //         statusMessage = `Query resolved on ${new Date(queryData.resolved_at).toLocaleDateString()}`;
// //       }
      
// //       setNotification({
// //         type: "info",
// //         message: `Latest update: ${statusMessage}`,
// //       });
  
// //       // Optionally, you can store the full query data in state if you want to display more details
// //       // setQueryDetails(queryData);
  
// //     } catch (error) {
// //       console.error('Error fetching query:', error);
// //       setNotification({
// //         type: "error",
// //         message: error.message || "Failed to fetch query details. Please try again.",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   const handleStageExpand = (stageId) => {
// //     setExpandedStage(expandedStage === stageId ? null : stageId);
// //   };

// //   const handleStageClick = (stage) => {
// //     setSelectedStage(selectedStage?.id === stage.id ? null : stage);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />
// //       <div className="container mx-auto mt-16 px-4 py-8">
// //         <div className="grid md:grid-cols-3 gap-8">
// //           {/* Tracking Section */}
// //           <div className="md:col-span-2">
// //             <Card className="shadow-lg rounded-xl">
// //               <CardHeader
// //                 title="Track Your Application"
// //                 subheader="Enter your ticket number to view your application status"
// //               />
// //               <CardContent>
// //                 <form onSubmit={handleTrack} className="mb-6">
// //                   <TextField
// //                     label="Ticket Number"
// //                     value={ticketNumber}
// //                     onChange={(e) => setTicketNumber(e.target.value)}
// //                     placeholder="e.g., ECH-2025-001"
// //                     fullWidth
// //                     variant="outlined"
// //                     margin="normal"
// //                     error={!!error}
// //                     helperText={error}
// //                   />
// //                   <Button
// //                     type="submit"
// //                     variant="contained"
// //                     color="primary"
// //                     fullWidth
// //                     disabled={loading}
// //                     className="mt-4"
// //                   >
// //                     {loading ? <CircularProgress size={24} /> : "Track Status"}
// //                   </Button>
// //                 </form>

// //                 {showStatus && (
// //                   <>
// //                     {notification && (
// //                       <Alert severity={notification.type} className="mb-6">
// //                         {notification.message}
// //                       </Alert>
// //                     )}

// //                     <Typography variant="h6" gutterBottom>
// //                       Application Journey
// //                     </Typography>
                    
// //                     <Timeline position="alternate">
// //                       {stages.map((stage, index) => (
// //                         <TimelineItem key={stage.id}>
// //                           <TimelineSeparator>
// //                             <Tooltip title={stage.status.charAt(0).toUpperCase() + stage.status.slice(1)} arrow>
// //                               <TimelineDot 
// //                                 className={`
// //                                   ${stage.status === 'completed' ? 'bg-green-500' : 
// //                                     stage.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'}
// //                                   transform hover:scale-110 transition-transform
// //                                 `}
// //                               >
// //                                 <stage.icon />
// //                               </TimelineDot>
// //                             </Tooltip>
// //                             {index < stages.length - 1 && <TimelineConnector />}
// //                           </TimelineSeparator>
                          
// //                           <TimelineContent>
// //                             <Card 
// //                               className={`
// //                                 p-4 rounded-lg cursor-pointer transition-all duration-300 
// //                                 hover:shadow-md
// //                                 ${expandedStage === stage.id ? 'bg-blue-50' : 'bg-white'}
// //                               `}
// //                               onClick={() => handleStageExpand(stage.id)}
// //                             >
// //                               <Typography 
// //                                 variant="h6" 
// //                                 className={`
// //                                   ${getStatusColor(stage.status)} 
// //                                   font-semibold mb-2
// //                                 `}
// //                               >
// //                                 {stage.title}
// //                               </Typography>
// //                               <Typography variant="body2" className="text-gray-600 mb-2">
// //                                 {stage.date} • {stage.time} • Expected: {stage.expectedDuration}
// //                               </Typography>
                              
// //                               <Collapse in={expandedStage === stage.id}>
// //                                 <Typography variant="body2" className="text-gray-700 mt-2">
// //                                   {stage.details}
// //                                 </Typography>
// //                               </Collapse>
// //                             </Card>
// //                           </TimelineContent>
// //                         </TimelineItem>
// //                       ))}
// //                     </Timeline>

// //                     <Typography variant="h6" gutterBottom className="mt-6">
// //                       Recent Updates
// //                     </Typography>
// //                     <List>
// //                       {statusUpdates.map((update, index) => (
// //                         <ListItem key={index}>
// //                           <ListItemAvatar>
// //                             <Avatar
// //                               className={
// //                                 update.type === "success" 
// //                                   ? "bg-green-500" 
// //                                   : "bg-blue-500"
// //                               }
// //                             >
// //                               {update.type === "success" ? <CheckCircle /> : <Info />}
// //                             </Avatar>
// //                           </ListItemAvatar>
// //                           <ListItemText
// //                             primary={update.message}
// //                             secondary={`${update.date} at ${update.time}`}
// //                           />
// //                         </ListItem>
// //                       ))}
// //                     </List>
// //                   </>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Sidebar Information */}
// //           <div>
// //             <Card className="shadow-lg rounded-xl mb-6">
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom>
// //                   <HelpOutline className="mr-2 text-blue-600" />
// //                   Need Help?
// //                 </Typography>
// //                 <Typography variant="body2" color="textSecondary">
// //                   If you're experiencing issues tracking your application or have questions, 
// //                   our support team is here to assist you.
// //                 </Typography>
// //                 <Link to="/contact">
// //                 <Button 
// //                   variant="outlined" 
// //                   color="primary" 
// //                   fullWidth 
// //                   className="mt-4"
// //                 >
// //                   Contact Support
// //                 </Button>
// //                 </Link>
// //               </CardContent>
// //             </Card>

// //             <Card className="shadow-lg rounded-xl">
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom>
// //                   Ticket Number Guide
// //                 </Typography>
// //                 <Typography variant="body2" color="textSecondary">
// //                   Your ticket number follows the format ECH-YYYY-NNN:
// //                   <ul className="list-disc pl-5 mt-2">
// //                     <li>ECH: E-Challan Identifier</li>
// //                     <li>YYYY: Year of Application</li>
// //                     <li>NNN: Unique Application Number</li>
// //                   </ul>
// //                 </Typography>
// //                 <Typography variant="caption" className="mt-2 text-gray-500">
// //                   Example: ECH-2025-001
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApplicationTracking;



// import React, { useState } from 'react';
// import { 
//   Timeline, 
//   TimelineItem, 
//   TimelineSeparator, 
//   TimelineConnector, 
//   TimelineContent, 
//   TimelineDot 
// } from '@mui/lab';
// import { 
//   CheckCircle, 
//   HourglassEmpty, 
//   RadioButtonUnchecked, 
//   Info, 
//   HelpOutline
// } from '@mui/icons-material';
// import { 
//   Card, 
//   CardContent, 
//   Typography, 
//   Tooltip, 
//   Collapse,
//   TextField,
//   Button,
//   Alert,
//   Avatar,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   CircularProgress,
//   CardHeader
// } from '@mui/material';
// import Navbar from '../components/web/UserNavbar';
// import { Link } from 'react-router-dom';
// import { CheckCircle, Cancel, HourglassEmpty } from "@mui/icons-material";


// const ApplicationTracking = () => {
//   const [ticketNumber, setTicketNumber] = useState("");
//   const [showStatus, setShowStatus] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [expandedStage, setExpandedStage] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [stages, setStages] = useState([]);
//   const [statusUpdates, setStatusUpdates] = useState([]);

//   const validateTicketNumber = (number) => /^ECH-\d{4}-\d{3}$/.test(number);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'completed': return 'text-green-500';
//       case 'current': return 'text-blue-500';
//       default: return 'text-gray-400';
//     }
//   };



// const handleTrack = async (e) => {
//   e.preventDefault();
//   if (!validateTicketNumber(ticketNumber)) {
//     setError("Please enter a valid ticket number (e.g., ECH-2025-001)");
//     return;
//   }
//   setError("");
//   setLoading(true);

//   try {
//     const response = await fetch(`http://127.0.0.1:8000/users/dashboard/echallan-query/${ticketNumber}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       throw new Error(errorData || 'Failed to fetch query details');
//     }

//     const queryData = await response.json();
//     setShowStatus(true);
//     console.log(queryData);
//     const resolutionId = queryData.resolution_status.id;
//     // Default Static Steps based on resolution_id
//     let staticSteps = [];
//     console.log(resolutionId);
//     if (resolutionId === 1) {
//       staticSteps = [
//         { id: 1, title: "Application Received", status: "completed" },
//         { id: 2, title: "Under Review", status: "current" },
//         { id: 3, title: "Awaiting Decision", status: "pending" }
//       ];
//     } else if (resolutionId === 2) {
//       staticSteps = [
//         { id: 1, title: "Application Received", status: "completed" },
//         { id: 2, title: "Under Review", status: "completed" },
//         { id: 3, title: "Decision Made", status: "completed" }
//       ];
//     } else if (resolutionId === 3) {
//       staticSteps = [
//         { id: 1, title: "Application Received", status: "completed" },
//         { id: 2, title: "Under Review", status: "completed" },
//         { id: 3, title: "Rejected", status: "completed" }
//       ];
//     }

//     setStages(staticSteps);

//     setNotification({
//       type: "info",
//       message: `Status: ${queryData.status}`,
//     });

//   } catch (error) {
//     console.error('Error fetching query:', error);
//     setNotification({
//       type: "error",
//       message: error.message || "Failed to fetch query details. Please try again.",
//     });
//   } finally {
//     setLoading(false);
//   }
// };
// const handleStageExpand = (stageId) => {
//   setExpandedStage(expandedStage === stageId ? null : stageId);
// };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="container mx-auto mt-16 px-4 py-8">
//         <Card className="shadow-lg rounded-xl">
//           <CardHeader title="Track Your Application" subheader="Enter your ticket number to view your application status" />
//           <CardContent>
//             <form onSubmit={handleTrack} className="mb-6">
//               <TextField
//                 label="Ticket Number"
//                 value={ticketNumber}
//                 onChange={(e) => setTicketNumber(e.target.value)}
//                 placeholder="e.g., ECH-2025-001"
//                 fullWidth
//                 variant="outlined"
//                 margin="normal"
//                 error={!!error}
//                 helperText={error}
//               />
//               <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} className="mt-4">
//                 {loading ? <CircularProgress size={24} /> : "Track Status"}
//               </Button>
//             </form>

//             {showStatus && (
//               <>
//                 {notification && <Alert severity={notification.type} className="mb-6">{notification.message}</Alert>}
//                 <Typography variant="h6" gutterBottom>Application Journey</Typography>
//                 <Timeline position="alternate">
//                   {stages.map((stage) => (
//                     <TimelineItem key={stage.id}>
//                       <TimelineSeparator>
//                         <Tooltip title={stage.status.charAt(0).toUpperCase() + stage.status.slice(1)} arrow>
//                         <TimelineDot className={`${getStatusColor(stage.status)} transform hover:scale-110 transition-transform`}>
//   {stage.icon && <stage.icon />} {/* ✅ This ensures no error if icon is undefined */}
// </TimelineDot>
//                         </Tooltip>
//                         <TimelineConnector />
//                       </TimelineSeparator>
//                       <TimelineContent>
//                         <Card className="p-4 rounded-lg cursor-pointer hover:shadow-md" onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}>
//                           <Typography variant="h6" className={`${getStatusColor(stage.status)} font-semibold mb-2`}>{stage.title}</Typography>
//                           <Typography variant="body2" className="text-gray-600 mb-2">{stage.date} • {stage.time} • Expected: {stage.expectedDuration}</Typography>
//                           <Collapse in={expandedStage === stage.id}><Typography variant="body2" className="text-gray-700 mt-2">{stage.details}</Typography></Collapse>
//                         </Card>
//                       </TimelineContent>
//                     </TimelineItem>
//                   ))}
//                 </Timeline>
//                 <Typography variant="h6" gutterBottom className="mt-6">Recent Updates</Typography>
//                 <List>
//                   {statusUpdates.map((update, index) => (
//                     <ListItem key={index}>
//                       <ListItemAvatar>
//                         <Avatar className={update.type === "success" ? "bg-green-500" : "bg-blue-500"}>{update.type === "success" ? <CheckCircle /> : <Info />}</Avatar>
//                       </ListItemAvatar>
//                       <ListItemText primary={update.message} secondary={`${update.date} at ${update.time}`} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ApplicationTracking;




// import React, { useState } from 'react';
// import { 
//   Timeline, 
//   TimelineItem, 
//   TimelineSeparator, 
//   TimelineConnector, 
//   TimelineContent, 
//   TimelineDot 
// } from '@mui/lab';
// import { 
//   CheckCircle, 
//   HourglassEmpty, 
//   RadioButtonUnchecked, 
//   Error,
//   Info
// } from '@mui/icons-material';
// import { 
//   Card, 
//   CardContent, 
//   Typography, 
//   Tooltip, 
//   Collapse,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   CardHeader
// } from '@mui/material';
// import Navbar from '../components/web/UserNavbar';

// const ApplicationTracking = () => {
//   const [ticketNumber, setTicketNumber] = useState("");
//   const [showStatus, setShowStatus] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [expandedStage, setExpandedStage] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [stages, setStages] = useState([]);  // Ensure default is an empty array
//   const [statusUpdates, setStatusUpdates] = useState([]); // Ensure default is an empty array

//   const validateTicketNumber = (number) => /^ECH-\d{4}-\d{3}$/.test(number);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'completed': return 'text-green-500';
//       case 'current': return 'text-blue-500';
//       default: return 'text-gray-400';
//     }
//   };

//   // const handleTrack = async (e) => {
//   //   e.preventDefault();
//   //   if (!validateTicketNumber(ticketNumber)) {
//   //     setError("Please enter a valid ticket number (e.g., ECH-2025-001)");
//   //     return;
//   //   }
//   //   setError("");
//   //   setLoading(true);
  
//   //   try {
//   //     const response = await fetch(`http://127.0.0.1:8000/users/dashboard/echallan-query/${ticketNumber}`, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       }
//   //     });
  
//   //     if (!response.ok) {
//   //       const errorData = await response.text();
//   //       throw new Error(errorData || 'Failed to fetch query details');
//   //     }
      
//   //     const queryData = await response.json();
      
//   //     setShowStatus(true);

//   //     // Process API response
//   //     const apiStages = queryData.stages?.map((stage, index) => ({
//   //       id: index + 1,
//   //       title: stage.title,
//   //       date: stage.date || "Pending",
//   //       time: stage.time || "-",
//   //       status: stage.status || "pending",
//   //       details: stage.details || "No details available.",
//   //       icon: stage.status === "completed" ? CheckCircle : 
//   //             stage.status === "current" ? HourglassEmpty : 
//   //             RadioButtonUnchecked,
//   //       color: stage.status === "completed" ? "green" : 
//   //              stage.status === "current" ? "blue" : "gray",
//   //       expectedDuration: stage.expectedDuration || "Unknown"
//   //     })) || [];

//   //     setStages(apiStages);

//   //     // Process status updates
//   //     const apiUpdates = queryData.status_updates?.map(update => ({
//   //       date: update.date || "Unknown",
//   //       time: update.time || "Unknown",
//   //       message: update.message || "No update available",
//   //       type: update.type || "info",
//   //     })) || [];

//   //     setStatusUpdates(apiUpdates);

//   //     // Set notification if resolved
//   //     let statusMessage = "Your application is currently under investigation.";
//   //     if (queryData.resolved_at) {
//   //       statusMessage = `Query resolved on ${new Date(queryData.resolved_at).toLocaleDateString()}`;
//   //     }
      
//   //     setNotification({
//   //       type: "info",
//   //       message: `Latest update: ${statusMessage}`,
//   //     });
  
//   //   } catch (error) {
//   //     console.error('Error fetching query:', error);
//   //     setNotification({
//   //       type: "error",
//   //       message: error.message || "Failed to fetch query details. Please try again.",
//   //     });
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handleTrack = async (e) => {
//     e.preventDefault();
//     if (!validateTicketNumber(ticketNumber)) {
//       setError("Please enter a valid ticket number (e.g., ECH-2025-001)");
//       return;
//     }
//     setError("");
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/users/dashboard/echallan-query/${ticketNumber}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
  
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(errorData || 'Failed to fetch query details');
//       }
  
//       const queryData = await response.json();
//       setShowStatus(true);
//       console.log(queryData);
//       const resolutionId = queryData.resolution_status.id;
//       // Default Static Steps based on resolution_id
//       let staticSteps = [];
//       console.log(resolutionId);
//       if (resolutionId === 1) {
//         staticSteps = [
//           { id: 1, title: "Application Received", status: "completed" },
//           { id: 2, title: "Under Review", status: "current" },
//           { id: 3, title: "Awaiting Decision", status: "pending" }
//         ];
//       } else if (resolutionId === 2) {
//         staticSteps = [
//           { id: 1, title: "Application Received", status: "completed" },
//           { id: 2, title: "Under Review", status: "completed" },
//           { id: 3, title: "Decision Made", status: "completed" }
//         ];
//       } else if (resolutionId === 3) {
//         staticSteps = [
//           { id: 1, title: "Application Received", status: "completed" },
//           { id: 2, title: "Under Review", status: "completed" },
//           { id: 3, title: "Rejected", status: "completed" }
//         ];
//       }
  
//       setStages(staticSteps);
  
//       setNotification({
//         type: "info",
//         message: `Status: ${queryData.status}`,
//       });
  
//     } catch (error) {
//       console.error('Error fetching query:', error);
//       setNotification({
//         type: "error",
//         message: error.message || "Failed to fetch query details. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleStageExpand = (stageId) => {
//     setExpandedStage(expandedStage === stageId ? null : stageId);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="container mx-auto mt-16 px-4 py-8">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Tracking Section */}
//           <div className="md:col-span-2">
//             <Card className="shadow-lg rounded-xl">
//               <CardHeader
//                 title="Track Your Application"
//                 subheader="Enter your ticket number to view your application status"
//               />
//               <CardContent>
//                 <form onSubmit={handleTrack} className="mb-6">
//                   <TextField
//                     label="Ticket Number"
//                     value={ticketNumber}
//                     onChange={(e) => setTicketNumber(e.target.value)}
//                     placeholder="e.g., ECH-2025-001"
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                     error={!!error}
//                     helperText={error}
//                   />
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     disabled={loading}
//                     className="mt-4"
//                   >
//                     {loading ? <CircularProgress size={24} /> : "Track Status"}
//                   </Button>
//                 </form>

//                 {showStatus && (
//                   <>
//                     {notification && (
//                       <Alert severity={notification.type} className="mb-6">
//                         {notification.message}
//                       </Alert>
//                     )}

//                     <Typography variant="h6" gutterBottom>
//                       Application Journey
//                     </Typography>
                    
//                     <Timeline position="alternate">
//                       {stages?.map((stage, index) => (
//                         <TimelineItem key={stage.id}>
//                           <TimelineSeparator>
//                             <Tooltip title={stage.status.charAt(0).toUpperCase() + stage.status.slice(1)} arrow>
//                               <TimelineDot className={stage.color}>
//                                 <stage.icon />
//                               </TimelineDot>
//                             </Tooltip>
//                             {index < stages.length - 1 && <TimelineConnector />}
//                           </TimelineSeparator>
                          
//                           <TimelineContent>
//                             <Card 
//                               className={`p-4 rounded-lg cursor-pointer transition-all duration-300 
//                                 hover:shadow-md ${expandedStage === stage.id ? 'bg-blue-50' : 'bg-white'}`}
//                               onClick={() => handleStageExpand(stage.id)}
//                             >
//                               <Typography variant="h6" className={getStatusColor(stage.status)}>
//                                 {stage.title}
//                               </Typography>
//                               <Typography variant="body2" className="text-gray-600 mb-2">
//                                 {stage.date} • {stage.time} • Expected: {stage.expectedDuration}
//                               </Typography>
//                               <Collapse in={expandedStage === stage.id}>
//                                 <Typography variant="body2" className="text-gray-700 mt-2">
//                                   {stage.details}
//                                 </Typography>
//                               </Collapse>
//                             </Card>
//                           </TimelineContent>
//                         </TimelineItem>
//                       ))}
//                     </Timeline>
//                   </>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationTracking;



import React, { useState } from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot 
} from '@mui/lab';
import { 
  CheckCircle, 
  HourglassEmpty, 
  Cancel, 
  Info
} from '@mui/icons-material';
import { 
  Card, 
  CardContent, 
  Typography, 
  Tooltip, 
  Collapse,
  TextField,
  Button,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  CardHeader
} from '@mui/material';
import Navbar from '../components/web/UserNavbar';
import { Link } from 'react-router-dom';

const ApplicationTracking = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedStage, setExpandedStage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [stages, setStages] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState([]);

  const validateTicketNumber = (number) => /^ECH-\d{4}-\d{3}$/.test(number);

  const getStatusColor = (status) => {
  switch(status) {
    case 'completed': return '#4CAF50'; // Green
    case 'current': return '#2196F3'; // Blue
    case 'pending': return '#FFC107'; // Yellow
    case 'rejected': return '#F44336'; // Red
    default: return '#BDBDBD'; // Grey for unknown statuses
  }
  
};


const getTextStatusColor = (status) => {
  switch(status) {
    case 'completed': return 'text-green-500';  // Green
    case 'current': return 'text-blue-500';    // Blue
    case 'pending': return 'text-yellow-500';  // Yellow
    case 'rejected': return 'text-red-500';    // Red
    default: return 'text-gray-500';           // Grey for unknown statuses
  }
};

const handleTrack = async (e) => {
  e.preventDefault();
  if (!validateTicketNumber(ticketNumber)) {
    setError("Please enter a valid ticket number (e.g., ECH-2025-001)");
    return;
  }
  setError("");
  setLoading(true);

  try {
    const response = await fetch(`http://127.0.0.1:8000/users/dashboard/echallan-query/${ticketNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to fetch query details');
    }

    const queryData = await response.json();
    setShowStatus(true);
    console.log(queryData);
    const resolutionId = queryData.resolution_status;

    // ✅ Static Steps with Icons
    let staticSteps = [];
    if (resolutionId === 1) {
      staticSteps = [
        { id: 1, title: "Application Received", status: "completed", icon: CheckCircle },
        { id: 2, title: "Under Review", status: "current", icon: HourglassEmpty },
        { id: 3, title: "Awaiting Decision", status: "pending", icon: Info }
      ];
    } else if (resolutionId === 2) {
      staticSteps = [
        { id: 1, title: "Application Received", status: "completed", icon: CheckCircle },
        { id: 2, title: "Under Review", status: "completed", icon: CheckCircle },
        { id: 3, title: "Decision Made", status: "completed", icon: CheckCircle }
      ];
    } else if (resolutionId === 3) {
      staticSteps = [
        { id: 1, title: "Application Received", status: "completed", icon: CheckCircle },
        { id: 2, title: "Under Review", status: "completed", icon: CheckCircle },
        { id: 3, title: "Rejected", status: "rejected", icon: Cancel }
      ];
    }

    setStages(staticSteps);

    setNotification({
      type: "info",
      message: `Status: ${queryData.resolution_details}`,
    });

  } catch (error) {
    console.error('Error fetching query:', error);
    setNotification({
      type: "error",
      message: error.message || "Failed to fetch query details. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

const handleStageExpand = (stageId) => {
  setExpandedStage(expandedStage === stageId ? null : stageId);
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto mt-16 px-4 py-8">
        <Card className="shadow-lg rounded-xl">
          <CardHeader title="Check Your Application" subheader="Enter your ticket number to view your application status" />
          <CardContent>
            <form onSubmit={handleTrack} className="mb-6">
              <TextField
                label="Ticket Number"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                placeholder="e.g., ECH-2025-001"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!error}
                helperText={error}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} className="mt-4">
                {loading ? <CircularProgress size={24} /> : "Show Status"}
              </Button>
            </form>

            {showStatus && (
              <>
                {notification && <Alert severity={notification.type} className="mb-6">{notification.message}</Alert>}
                <Typography variant="h6" gutterBottom>Application Journey</Typography>
                <Timeline position="alternate">
                  {stages.map((stage) => (
                    <TimelineItem key={stage.id}>
                      <TimelineSeparator>
                        <Tooltip title={stage.status.charAt(0).toUpperCase() + stage.status.slice(1)} arrow>
                        <TimelineDot style={{ backgroundColor: getStatusColor(stage.status) }} className="transform hover:scale-110 transition-transform">
  {stage.icon && <stage.icon style={{ color: 'white' }} />} {/* Ensuring the icon has proper contrast */}
</TimelineDot>
                        </Tooltip>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card className="p-4 rounded-lg cursor-pointer hover:shadow-md" onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}>
                          <Typography variant="h6" className={`${getTextStatusColor(stage.status)} font-semibold mb-2`}>{stage.title}</Typography>
                          <Collapse in={expandedStage === stage.id}>
                            <Typography variant="body2" className="text-gray-700 mt-2">{stage.details || "No additional details available."}</Typography>
                          </Collapse>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
                  
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationTracking;
