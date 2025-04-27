// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import { Gavel, AccountBalanceWallet, CheckCircle, ErrorOutline } from "@mui/icons-material";
// import {
//   Header,
//   StatBox,
//   LineChart,
//   ProgressCircle,
//   BarChart,
// } from "../../components";
// import {
//   DownloadOutlined,
// } from "@mui/icons-material";
// import { tokens } from "../../theme";
// import axios from "axios";

// function Dashboard() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isXlDevices = useMediaQuery("(min-width: 1260px)");
//   const isMdDevices = useMediaQuery("(min-width: 724px)");
//   const isXsDevices = useMediaQuery("(max-width: 436px)");

//   // State for dashboard data
//   const [stats, setStats] = useState({
//     total_challans: 0,
//     total_amount: 0,
//     compliance_rate: 0,
//     pending_challans: 0,
//     challans_increase: '+0%',
//     amount_increase: '+0%',
//     compliance_increase: '+0%',
//     pending_increase: '+0%',
//   });

//   const [revenueData, setRevenueData] = useState({
//     labels: [],
//     data: []
//   });

//   const [recentChallans, setRecentChallans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data when component mounts
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch all data in parallel
//         const [statsRes, revenueRes, challansRes] = await Promise.all([
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/stats/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/revenue-chart/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/recent-challans/')
//         ]);

//         setStats(statsRes.data);
//         setRevenueData(revenueRes.data);
//         setRecentChallans(challansRes.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setError("Failed to load dashboard data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Format numbers with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `₹${formatNumber(amount)}`;
//   };

//   // Handle error snackbar close
//   const handleCloseError = () => {
//     setError(null);
//   };

//   return (
//     <Box padding={2} textAlign={"center"} className="bg-gradient-to-br  from-blue-50 via-white to-blue-100" >
//         <Header title="Traffic Dashboard" subtitle="Welcome to Ahmedabad Police Traffic Dashboard" />


//       {/* Loading indicator */}
//       {loading && (
//         <Box display="flex" justifyContent="center" p="20px">
//           <Typography variant="h5" color={colors.gray[100]}>
//             Loading dashboard data...
//           </Typography>
//         </Box>
//       )}

//       {/* GRID & CHARTS */}
//       {!loading && !error && (
//         <Box
//           display="grid"
//           gridTemplateColumns={
//             isXlDevices
//               ? "repeat(12, 1fr)"
//               : isMdDevices
//                 ? "repeat(6, 1fr)"
//                 : "repeat(3, 1fr)"
//           }
//           gridAutoRows="140px"
//           gap="20px"
//         >
//           {/* Card 1: Challans Issued */}
//           <Box
//             gridColumn="span 3"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//           >
//             <StatBox
//               title={formatNumber(stats.total_challans)}
//               subtitle="Echalans Issued"
//               progress={0.75} // You could calculate this dynamically if needed
//               increase={stats.challans_increase}
//               icon={<Gavel sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//             />
//           </Box>

//           {/* Card 2: Amount Collected */}
//           <Box
//             gridColumn="span 3"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//           >
//             <StatBox
//               title={formatCurrency(stats.total_amount)}
//               subtitle="Amount Collected"
//               progress={0.50} // You could calculate this dynamically if needed
//               increase={stats.amount_increase}
//               icon={<AccountBalanceWallet sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//             />
//           </Box>

//           {/* Card 3: Compliance Rate */}
//           <Box
//             gridColumn="span 3"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//           >
//             <StatBox
//               title={`${stats.compliance_rate}%`}
//               subtitle="Challan Payment Compliance Rate"
//               progress={stats.compliance_rate / 100} // Convert percentage to decimal
//               increase={stats.compliance_increase}
//               icon={<CheckCircle sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//             />
//           </Box>

//           {/* Card 4: Pending Challans */}
//           <Box
//             gridColumn="span 3"
//             bgcolor={colors.primary[400]}
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//           >
//             <StatBox
//               title={formatNumber(stats.pending_challans)}
//               subtitle="Pending Challans"
//               progress={0.80} // You could calculate this dynamically if needed
//               increase={stats.pending_increase}
//               icon={<ErrorOutline sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//             />
//           </Box>

//           {/* ---------------- Row 2 ---------------- */}

//           {/* Revenue Chart */}
//           <Box
//             gridColumn={
//               isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
//             }
//             gridRow="span 2"
//             bgcolor={colors.primary[400]}
//             className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl"
//           >
//             <Box
//               mt="25px"
//               px="30px"
//               display="flex"
//               justifyContent="space-between"
//             >
//               <Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="600"
//                   color={colors.gray[100]}
//                 >
//                   Revenue Generated
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   fontWeight="bold"
//                   color={colors.greenAccent[500]}
//                 >
//                   {formatCurrency(stats.total_amount)}
//                 </Typography>
//               </Box>
//               <IconButton>
//                 <DownloadOutlined
//                   sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
//                 />
//               </IconButton>
//             </Box>
//             <Box height="250px" mt="-20px">
//               <LineChart
//                 isDashboard={true}
//                 data={revenueData.data}
//                 labels={revenueData.labels}
//                 xAxisLabel="Month"
//                 yAxisLabel="Amount (₹)"
//               />
//             </Box>
//           </Box>

//           {/* Recent Challans */}
//           <Box
//             gridColumn={isXlDevices ? "span 4" : "span 3"}
//             gridRow="span 2"
//             bgcolor={colors.primary[400]}
//             overflow="auto"
//             className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl overflow-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-white"
//           >
//             <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
//               <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
//                 Recent Generated Challan
//               </Typography>
//             </Box>

//             {recentChallans.map((challan, index) => (
//               <Box
//                 key={`${challan.id}-${index}`}
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 borderBottom={`4px solid ${colors.primary[500]}`}
//                 p="15px"
//                 className="hover:bg-blue-100 transition-all duration-300"
//               >
//                 <Box>
//                   <Typography
//                     color={colors.greenAccent[500]}
//                     variant="h5"
//                     fontWeight="600"
//                   >
//                     {challan.vehicle_number}
//                   </Typography>
//                   <Typography color={colors.gray[100]}>
//                     {challan.owner_name}
//                   </Typography>
//                 </Box>
//                 <Typography color={colors.gray[100]}>
//                   {challan.created_at}
//                 </Typography>
//                 <Box
//                   bgcolor={colors.greenAccent[500]}
//                   p="5px 10px"
//                   borderRadius="4px"
//                 >
//                   ₹{challan.fineamount}
//                 </Box>
//               </Box>
//             ))}

//             {recentChallans.length === 0 && (
//               <Box p="20px">
//                 <Typography color={colors.gray[100]}>
//                   No recent challans found
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default Dashboard;





// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   Gavel,
//   AccountBalanceWallet,
//   CheckCircle,
//   ErrorOutline
// } from "@mui/icons-material";
// import {
//   Header,
//   StatBox,
//   LineChart,
//   BarChart,
//   PieChart,
//   StreamChart,
// } from "../../components";
// import {
//   DownloadOutlined,
// } from "@mui/icons-material";
// import { tokens } from "../../theme";
// import axios from "axios";

// function Dashboard() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isXlDevices = useMediaQuery("(min-width: 1260px)");
//   const isMdDevices = useMediaQuery("(min-width: 724px)");
//   const isXsDevices = useMediaQuery("(max-width: 436px)");

//   // State for dashboard data
//   const [stats, setStats] = useState({
//     total_challans: 0,
//     total_amount: 0,
//     compliance_rate: 0,
//     pending_challans: 0,
//     challans_increase: '+0%',
//     amount_increase: '+0%',
//     compliance_increase: '+0%',
//     pending_increase: '+0%',
//   });

//   const [revenueData, setRevenueData] = useState({
//     labels: [],
//     data: []
//   });

//   const [recentChallans, setRecentChallans] = useState([]);
//   const [violationTypes, setViolationTypes] = useState({ data: [], labels: [] });
//   const [weeklyViolations, setWeeklyViolations] = useState({ data: [], labels: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data when component mounts
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch all data in parallel
//         const [statsRes, revenueRes, challansRes, violationTypeRes, weeklyViolationsRes] = await Promise.all([
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/stats/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/revenue-chart/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/recent-challans/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/violation-counts/'),
//           axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/weekly-violations/'),
//         ]);

//         setStats(statsRes.data);
//         setRevenueData(revenueRes.data);
//         console.log(weeklyViolationsRes.data)
//         // Only take the first 4 challans from the API response
//         setRecentChallans(challansRes.data.slice(0, 4));

//         // Process weekly violations data
//         if (weeklyViolationsRes.data && weeklyViolationsRes.data.violations) {
//           const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//           const violationsData = weeklyViolationsRes.data.violations;

//           console.log("Weekly violations data:", violationsData);

//           // Map the array data to corresponding day names
//           setWeeklyViolations({
//             data: violationsData,
//             labels: weekDays
//           });
//         }

//         // Process violation type data for the pie chart
//         if (violationTypeRes.data && violationTypeRes.data.violation_counts) {
//           const violationCounts = violationTypeRes.data.violation_counts.reduce((acc, item) => {

//             let violationType = item.ViolationType.toLowerCase();

//             // Map all "wrong side" variants to the same key
//             if (violationType === 'wrongside' ||
//               violationType === 'wrong side' ||
//               violationType === 'wrong lane driving') {
//               violationType = 'wrong side';
//             }

//             // Map helmet-related violations
//             if (violationType === 'helmet' ||
//               violationType === 'without helmet') {
//               violationType = 'no helmet';
//             }

//             // Add counts for the same violation type
//             if (acc[violationType] !== undefined) {
//               acc[violationType] += item.count;
//             } else {
//               // For any other violation types not in the predefined list
//               acc[violationType] = item.count;
//             }

//             return acc;
//           }, {
//             speeding: 0,
//             'no helmet': 0,
//             'red light': 0,
//             'wrong side': 0,
//             total: violationTypeRes.data.total_challans
//           });

//           // Convert to format needed for PieChart
//           // Remove the 'total' field as it shouldn't be in the pie chart
//           const { total, ...pieData } = violationCounts;
//           const labels = Object.keys(pieData);
//           const data = Object.values(pieData);

//           setViolationTypes({ data, labels });
//         }
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setError("Failed to load dashboard data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Format numbers with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `₹${formatNumber(amount)}`;
//   };

//   // Handle error snackbar close
//   const handleCloseError = () => {
//     setError(null);
//   };

//   return (
//     <Box m="20px">
//       {/* Error Snackbar */}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={handleCloseError}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>

//       <Box display="flex" justifyContent="space-between">
//         <Header title="Traffic Dashboard" subtitle="Welcome to Ahmedabad Police Traffic Dashboard" />
//         {!isXsDevices && (
//           <Box>
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: colors.blueAccent[700],
//                 color: "#fcfcfc",
//                 fontSize: isMdDevices ? "14px" : "10px",
//                 fontWeight: "bold",
//                 p: "10px 20px",
//                 mt: "18px",
//                 transition: ".3s ease",
//                 ":hover": {
//                   bgcolor: colors.blueAccent[800],
//                 },
//               }}
//               startIcon={<DownloadOutlined />}
//             >
//               DOWNLOAD REPORTS
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Loading indicator */}
//       {loading && (
//         <Box display="flex" justifyContent="center" p="20px">
//           <Typography variant="h5" color={colors.gray[100]}>
//             Loading dashboard data...
//           </Typography>
//         </Box>
//       )}

//       {/* GRID & CHARTS */}
//       {!loading && !error && (
//         <>
//           {/* Stats Cards Row */}
//           <Box
//             display="grid"
//             gridTemplateColumns={
//               isXlDevices
//                 ? "repeat(12, 1fr)"
//                 : isMdDevices
//                   ? "repeat(6, 1fr)"
//                   : "repeat(3, 1fr)"
//             }
//             gridAutoRows="140px"
//             gap="20px"
//             mb="20px"
//           >
//             {/* Card 1: Challans Issued */}
//             <Box
//               gridColumn="span 3"
//               bgcolor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//             >
//               <StatBox
//                 title={formatNumber(stats.total_challans)}
//                 subtitle="Echalans Issued"
//                 progress={0.25} // You could calculate this dynamically if needed
//                 increase={"+75%"}
//                 icon={<Gavel sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//               />
//             </Box>

//             {/* Card 2: Amount Collected */}
//             <Box
//               gridColumn="span 3"
//               bgcolor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//             >
//               <StatBox
//                 title={formatCurrency(stats.total_amount)}
//                 subtitle="Amount Collected"
//                 progress={0.65} // You could calculate this dynamically if needed
//                 increase={"+30%"}
//                 icon={<AccountBalanceWallet sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//               />
//             </Box>

//             {/* Card 3: Compliance Rate */}
//             <Box
//               gridColumn="span 3"
//               bgcolor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//             >
//               <StatBox
//                 title={`${stats.compliance_rate}%`}
//                 subtitle="Challan Payment Compliance Rate"
//                 progress={stats.compliance_rate / 100} // Convert percentage to decimal
//                 increase={`${stats.compliance_increase}`}
//                 icon={<CheckCircle sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//               />
//             </Box>

//             {/* Card 4: Pending Challans */}
//             <Box
//               gridColumn="span 3"
//               bgcolor={colors.primary[400]}
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//               className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//             >
//               <StatBox
//                 title={formatNumber(stats.pending_challans)}
//                 subtitle="Pending Challans"
//                 progress={0.40} // You could calculate this dynamically if needed
//                 increase={stats.pending_increase}
//                 icon={<ErrorOutline sx={{ color: colors.greenAccent[600], fontSize: 26 }} />}
//               />
//             </Box>
//           </Box>

//           {/* Charts Row */}
//           <Box
//             display="grid"
//             gridTemplateColumns={
//               isXlDevices
//                 ? "repeat(12, 1fr)"
//                 : isMdDevices
//                   ? "repeat(6, 1fr)"
//                   : "repeat(3, 1fr)"
//             }
//             gridAutoRows="auto"
//             gap="20px"
//             mb="20px"
//           >
//             {/* Line Chart */}
//             <Box
//               gridColumn={isXlDevices ? "span 6" : "span 3"}
//               gridRow="span 2"
//               bgcolor={colors.primary[400]}
//               className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl"
//             >
//               <Box
//                 mt="25px"
//                 px="30px"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.gray[100]}
//                   >
//                     Monthly Revenue Trend
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="bold"
//                     color={colors.greenAccent[500]}
//                   >
//                     Total Revenue Generated: {formatCurrency(stats.total_amount)}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box height="250px" mt="-20px">
//                 <LineChart
//                   isDashboard={true}
//                   data={revenueData.data}
//                   labels={revenueData.labels}
//                   xAxisLabel="Month"
//                   yAxisLabel="Amount (₹)"
//                 />
//               </Box>
//             </Box>

//             {/* Bar Chart */}
//             <Box
//               gridColumn={isXlDevices ? "span 6" : "span 3"}
//               gridRow="span 2"
//               bgcolor={colors.primary[400]}
//               className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl h-96"
//             >
//               <Box
//                 mt="25px"
//                 px="30px"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Box className="pb-8">
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.gray[100]}
//                   >
//                     Weekly Violations
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box height="250px" mt="-20px">
//                 <BarChart
//                   isDashboard={true}
//                   data={weeklyViolations.data}
//                   labels={weeklyViolations.labels}
//                   xAxisLabel="Day"
//                   yAxisLabel="Number of Violations"
//                 />
//               </Box>
//             </Box>
//           </Box>

//           {/* Third Row - Pie Chart and Recent Challans */}
//           <Box
//             display="grid"
//             gridTemplateColumns={
//               isXlDevices
//                 ? "repeat(12, 1fr)"
//                 : isMdDevices
//                   ? "repeat(6, 1fr)"
//                   : "repeat(3, 1fr)"
//             }
//             gridAutoRows="auto"
//             gap="20px"
//           >

//             {/* Pie Chart */}
//             <Box
//               gridColumn={isXlDevices ? "span 6" : "span 3"}
//               gridRow="span 2"
//               bgcolor={colors.primary[400]}
//               className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl"
//             >
//               <Box
//                 mt="25px"
//                 px="30px"
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="600"
//                     color={colors.gray[100]}
//                   >
//                     Violation Type Distribution
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box height="250px" mt="10px" display="flex" justifyContent="center">
//                 {violationTypes.data && violationTypes.data.length > 0 ? (
//                   <PieChart
//                     isDashboard={true}
//                     data={violationTypes.data}
//                     labels={violationTypes.labels}
//                   />
//                 ) : (
//                   <Typography color={colors.gray[100]}>Loading violation data...</Typography>
//                 )}
//               </Box>
//             </Box>

//             {/* Recent Challans - Limited to 4 */}
//             <Box
//               gridColumn={isXlDevices ? "span 6" : "span 3"}
//               gridRow="span 2"
//               bgcolor={colors.primary[400]}
//               overflow="auto"
//               className="bg-white p-2 rounded-lg shadow-md text-center transform transition-all hover:shadow-2xl overflow-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-white"
//             >
//               <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
//                 <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
//                   Recent Generated Challan
//                 </Typography>
//               </Box>

//               {recentChallans.map((challan, index) => (
//                 <Box
//                   key={`${challan.id}-${index}`}
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="space-between"
//                   borderBottom={`4px solid ${colors.primary[500]}`}
//                   p="15px"
//                   className="hover:bg-blue-100 transition-all duration-300"
//                 >
//                   <Box>
//                     <Typography
//                       color={colors.greenAccent[500]}
//                       variant="h5"
//                       fontWeight="600"
//                     >
//                       {challan.vehicle_number}
//                     </Typography>
//                     <Typography color={colors.gray[100]}>
//                       {challan.owner_name}
//                     </Typography>
//                   </Box>
//                   <Typography color={colors.gray[100]}>
//                     {challan.created_at}
//                   </Typography>
//                   <Box
//                     bgcolor={colors.greenAccent[500]}
//                     p="5px 10px"
//                     borderRadius="4px"
//                   >
//                     ₹{challan.fineamount}
//                   </Box>
//                 </Box>
//               ))}

//               {recentChallans.length === 0 && (
//                 <Box p="20px">
//                   <Typography color={colors.gray[100]}>
//                     No recent challans found
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// }

// export default Dashboard;





import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
  Paper,
} from "@mui/material";
import {
  Gavel,
  AccountBalanceWallet,
  CheckCircle,
  ErrorOutline,
  DownloadOutlined,
} from "@mui/icons-material";
import {
  Header,
  StatBox,
  LineChart,
  BarChart,
  PieChart,
} from "../../components";
import { tokens } from "../../theme";
import axios from "axios";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  // State for dashboard data
  const [stats, setStats] = useState({
    total_challans: 0,
    total_amount: 0,
    compliance_rate: 0,
    pending_challans: 0,
    challans_increase: '+0%',
    amount_increase: '+0%',
    compliance_increase: '+0%',
    pending_increase: '+0%',
  });

  const [revenueData, setRevenueData] = useState({
    labels: [],
    data: []
  });

  const [recentChallans, setRecentChallans] = useState([]);
  const [violationTypes, setViolationTypes] = useState({ data: [], labels: [] });
  const [weeklyViolations, setWeeklyViolations] = useState({ data: [], labels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [statsRes, revenueRes, challansRes, violationTypeRes, weeklyViolationsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/stats/'),
          axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/revenue-chart/'),
          axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/recent-challans/'),
          axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/violation-counts/'),
          axios.get('http://127.0.0.1:8000/users/dashboard/api/dashboard/weekly-violations/'),
        ]);

        setStats(statsRes.data);
        setRevenueData(revenueRes.data);
        
        // Only take the first 4 challans from the API response
        setRecentChallans(challansRes.data.slice(0, 4));

        // Process weekly violations data
        if (weeklyViolationsRes.data && weeklyViolationsRes.data.violations) {
          const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const violationsData = weeklyViolationsRes.data.violations;

          // Map the array data to corresponding day names
          setWeeklyViolations({
            data: violationsData,
            labels: weekDays
          });
        }

        // Process violation type data for the pie chart
        if (violationTypeRes.data && violationTypeRes.data.violation_counts) {
          const violationCounts = violationTypeRes.data.violation_counts.reduce((acc, item) => {

            let violationType = item.ViolationType.toLowerCase();

            // Map all "wrong side" variants to the same key
            if (violationType === 'wrongside' ||
              violationType === 'wrong side' ||
              violationType === 'wrong lane driving') {
              violationType = 'wrong side';
            }

            // Map helmet-related violations
            if (violationType === 'helmet' ||
              violationType === 'without helmet') {
              violationType = 'no helmet';
            }

            // Add counts for the same violation type
            if (acc[violationType] !== undefined) {
              acc[violationType] += item.count;
            } else {
              // For any other violation types not in the predefined list
              acc[violationType] = item.count;
            }

            return acc;
          }, {
            speeding: 0,
            'no helmet': 0,
            'red light': 0,
            'wrong side': 0,
            total: violationTypeRes.data.total_challans
          });

          // Convert to format needed for PieChart
          // Remove the 'total' field as it shouldn't be in the pie chart
          const { total, ...pieData } = violationCounts;
          const labels = Object.keys(pieData);
          const data = Object.values(pieData);

          setViolationTypes({ data, labels });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${formatNumber(amount)}`;
  };

  // Handle error snackbar close
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box className="bg-gradient-to-br from-blue-50 via-white to-blue-100" m="0" p="20px" minHeight="100vh">
      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={1000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Box display="flex" textAlign="center" justifyContent="space-around" alignItems="center" mb="24px">
        <Header title="Traffic Dashboard"  subtitle="Welcome to Ahmedabad Police Traffic Dashboard" />
       
      </Box>

      {/* Loading indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" p="20px">
          <Typography variant="h5" color={colors.gray[100]}>
            Loading dashboard data...
          </Typography>
        </Box>
      )}

      {/* GRID & CHARTS */}
      {!loading && !error && (
        <>
          {/* Stats Cards Row */}
          <Box
  display="grid"
  gridTemplateColumns={
    isXlDevices
      ? "repeat(12, 1fr)"
      : isMdDevices
        ? "repeat(6, 1fr)"
        : "repeat(3, 1fr)"
  }
  gridAutoRows="140px"
  gap="20px"
  mb="20px"
>
  {/* Card 1: Challans Issued */}
  <Paper
    elevation={2}
    sx={{
      gridColumn: "span 3",
      bgcolor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.08)",
      },
      position: "relative",
    }}
  >
    <Box display="flex" justifyContent="space-between" p={3} alignItems="flex-start">
      <Box>
        <Typography variant="h2" fontWeight="bold"  color="#1e293b">
          {formatNumber(stats.total_challans)}
        </Typography>
        <Typography variant="h5" color="rgb(59 130 229)" mt="5px">
          Echalans Issued
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#dbeafe",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Gavel sx={{ color: "#3b82f6", fontSize: 24 }} />
      </Box>
    </Box>
 
  </Paper>

  {/* Card 2: Amount Collected */}
  <Paper
    elevation={2}
    sx={{
      gridColumn: "span 3",
      bgcolor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.08)",
      },
      position: "relative",
    }}
  >
    <Box display="flex" justifyContent="space-between" p={3} alignItems="flex-start">
      <Box>
        <Typography variant="h2" fontWeight="bold" color="#1e293b">
          {formatCurrency(stats.total_amount)}
        </Typography>
        <Typography variant="h6" color="rgb(59 130 229)" mt="5px">
          Amount Collected
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#dbeafe",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountBalanceWallet sx={{ color: "#3b82f6", fontSize: 24 }} />
      </Box>
    </Box>
  
  </Paper>

  {/* Card 3: Compliance Rate */}
  <Paper
    elevation={2}
    sx={{
      gridColumn: "span 3",
      bgcolor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.08)",
      },
      position: "relative",
    }}
  >
    <Box display="flex" justifyContent="space-between" p={3} alignItems="flex-start">
      <Box>
        <Typography variant="h2" fontWeight="bold" color="#1e293b">
          {stats.compliance_rate}%
        </Typography>
        <Typography variant="h6" color="rgb(59 130 229)" mt="5px">
        E-Challan Compliance  
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#dbeafe",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircle sx={{ color: "#3b82f6", fontSize: 24 }} />
      </Box>
    </Box>

  </Paper>

  {/* Card 4: Pending Challans */}
  <Paper
    elevation={2}
    sx={{
      gridColumn: "span 3",
      bgcolor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.08)",
      },
      position: "relative",
    }}
  >
    <Box display="flex" justifyContent="space-between" p={3} alignItems="flex-start">
      <Box>
        <Typography variant="h2" fontWeight="bold" color="#1e293b">
          {formatNumber(stats.pending_challans)}
        </Typography>
        <Typography variant="h6" color="rgb(59 130 229)" mt="5px">
          Pending Challans
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#dbeafe",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorOutline sx={{ color: "#3b82f6", fontSize: 24 }} />
      </Box>
    </Box>
  
  </Paper>
</Box>

          {/* Charts Row */}
          <Box
            display="grid"
            gridTemplateColumns={
              isXlDevices
                ? "repeat(12, 1fr)"
                : isMdDevices
                  ? "repeat(6, 1fr)"
                  : "repeat(3, 1fr)"
            }
            gridAutoRows="auto"
            gap="20px"
            mb="20px"
          >
            {/* Line Chart */}
            <Paper
              elevation={3}
              sx={{
                gridColumn: isXlDevices ? "span 6" : "span 3",
                gridRow: "span 2",
                bgcolor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
                },
                border: "1px solid #e0e7ff", // Light indigo border
              }}
            >
              <Box p={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color="#334155" // slate-700
                    >
                      Monthly Revenue Trend
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      color="#3b82f6" // blue-500
                    >
                      Total Revenue Generated: {formatCurrency(stats.total_amount)}
                    </Typography>
                  </Box>
                </Box>
                <Box height="250px" mt="10px">
                  <LineChart
                    isDashboard={true}
                    data={revenueData.data}
                    labels={revenueData.labels}
                    xAxisLabel="Month"
                    yAxisLabel="Amount (₹)"
                  />
                </Box>
              </Box>
            </Paper>

            {/* Bar Chart */}
            <Paper
              elevation={3}
              sx={{
                gridColumn: isXlDevices ? "span 6" : "span 3",
                gridRow: "span 2",
                bgcolor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
                },
                border: "1px solid #e0e7ff", // Light indigo border
              }}
            >
              <Box p={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color="#334155" // slate-700
                    >
                      Weekly Violations
                    </Typography>
                  </Box>
                </Box>
                <Box height="250px" mt="10px">
                  <BarChart
                    isDashboard={true}
                    data={weeklyViolations.data}
                    labels={weeklyViolations.labels}
                    xAxisLabel="Day"
                    yAxisLabel="Number of Violations"
                  />
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Third Row - Pie Chart and Recent Challans */}
          <Box
            display="grid"
            gridTemplateColumns={
              isXlDevices
                ? "repeat(12, 1fr)"
                : isMdDevices
                  ? "repeat(6, 1fr)"
                  : "repeat(3, 1fr)"
            }
            gridAutoRows="auto"
            gap="20px"
          >
            {/* Pie Chart */}
            <Paper
              elevation={3}
              sx={{
                gridColumn: isXlDevices ? "span 6" : "span 3",
                gridRow: "span 2",
                bgcolor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
                },
                border: "1px solid #e0e7ff", // Light indigo border
              }}
            >
              <Box p={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color="#334155" // slate-700
                    >
                      Violation Type Distribution
                    </Typography>
                  </Box>
                </Box>
                <Box height="250px" display="flex" justifyContent="center">
                  {violationTypes.data && violationTypes.data.length > 0 ? (
                    <PieChart
                      isDashboard={true}
                      data={violationTypes.data}
                      labels={violationTypes.labels}
                    />
                  ) : (
                    <Typography color="#334155">Loading violation data...</Typography>
                  )}
                </Box>
              </Box>
            </Paper>

            {/* Recent Challans */}
            <Paper
              elevation={3}
              sx={{
                gridColumn: isXlDevices ? "span 6" : "span 3",
                gridRow: "span 2",
                bgcolor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
                },
                border: "1px solid #e0e7ff", // Light indigo border
              }}
            >
              <Box 
                borderBottom="1px solid #e2e8f0" 
                p="15px"
                // bgcolor="#2563eb" // Blue-600
                color="black"
              >
                <Typography variant="h4" fontWeight="600">
                  Recent Generated Challan
                </Typography>
              </Box>

              <Box sx={{ maxHeight: "350px", overflow: "auto" }}>
                {recentChallans.map((challan, index) => (
                  <Box
                    key={`${challan.id}-${index}`}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px solid #e2e8f0"
                    p="15px"
                    sx={{
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        bgcolor: "#eff6ff", // Blue-50
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        color="#2563eb" // Blue-600
                        variant="h5"
                        fontWeight="600"
                      >
                        {challan.vehicle_number}
                      </Typography>
                      <Typography color="#475569"> {/* slate-600 */}
                        {challan.owner_name}
                      </Typography>
                    </Box>
                    <Typography color="#64748b"> {/* slate-500 */}
                      {challan.created_at}
                    </Typography>
                    <Box
                      bgcolor="#2563eb" // Blue-600
                      color="#ffffff"
                      p="5px 10px"
                      borderRadius="8px"
                      sx={{
                        boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
                      }}
                    >
                      ₹{challan.fineamount}
                    </Box>
                  </Box>
                ))}

                {recentChallans.length === 0 && (
                  <Box p="20px" textAlign="center">
                    <Typography color="#475569"> {/* slate-600 */}
                      No recent challans found
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Dashboard;