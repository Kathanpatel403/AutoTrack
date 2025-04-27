// // // import { Box, Typography, useTheme } from "@mui/material";
// // // import { Header } from "../../components";
// // // import { DataGrid } from "@mui/x-data-grid";
// // // import { mockDataInvoices } from "../../data/mockData";
// // // import { tokens } from "../../theme";

// // // const Invoices = () => {
// // //   const theme = useTheme();
// // //   const colors = tokens(theme.palette.mode);

// // //   const columns = [
// // //     { field: "id", headerName: "ID" },
// // //     {
// // //       field: "name",
// // //       headerName: "Name",
// // //       flex: 1,
// // //       cellClassName: "name-column--cell",
// // //     },
// // //     {
// // //       field: "phone",
// // //       headerName: "Phone Number",
// // //       flex: 1,
// // //     },
// // //     {
// // //       field: "email",
// // //       headerName: "Email",
// // //       flex: 1,
// // //     },
// // //     {
// // //       field: "cost",
// // //       headerName: "Cost",
// // //       flex: 1,
// // //       renderCell: (params) => (
// // //         <Typography color={colors.greenAccent[500]}>
// // //           ${params.row.cost}
// // //         </Typography>
// // //       ),
// // //     },
// // //     {
// // //       field: "date",
// // //       headerName: "Date",
// // //       flex: 1,
// // //     },
// // //   ];
// // //   return (
// // //     <Box m="20px" height="100%" display="flex" flexDirection="column" gap="20px">
// // //       <Header title="E-CHALLAN INVOICES" subtitle="List of Invoice of Echallan" />
// // //       <Box
        
// // //         height="75vh"
// // //         maxWidth="100%"
// // //         sx={{
// // //           "& .MuiDataGrid-root": {
// // //             border: "none",
// // //           },
// // //           "& .MuiDataGrid-cell": {
// // //             border: "none",
// // //           },
// // //           "& .name-column--cell": {
// // //             color: colors.greenAccent[300],
// // //           },
// // //           "& .MuiDataGrid-columnHeaders": {
// // //             backgroundColor:"skyblue",
// // //             borderBottom: "none",
// // //           },
// // //           "& .MuiDataGrid-virtualScroller": {
// // //             backgroundColor: colors.primary[400],
// // //           },
// // //           "& .MuiDataGrid-footerContainer": {
// // //             borderTop: "none",
// // //             backgroundColor:"skyblue",
// // //           },
// // //           "& .MuiCheckbox-root": {
// // //             color: `${colors.greenAccent[200]} !important`,
// // //           },
// // //           "& .MuiDataGrid-iconSeparator": {
// // //             color: colors.primary[100],
// // //           },
// // //         }}
// // //       >
// // //         <DataGrid
// // //           rows={mockDataInvoices}
// // //           columns={columns}
// // //           initialState={{
// // //             pagination: {
// // //               paginationModel: {
// // //                 pageSize: 10,
// // //               },
// // //             },
// // //           }}
// // //           checkboxSelection
// // //         />
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default Invoices;



// // import { useState, useEffect } from "react";
// // import { Box, Typography, useTheme, IconButton } from "@mui/material";
// // import { Header } from "../../components";
// // import { DataGrid } from "@mui/x-data-grid";
// // import { tokens } from "../../theme";
// // import { CheckCircle, Warning, Visibility } from "@mui/icons-material"; // Icons for UI
// // import { useNavigate } from "react-router-dom"; // Import navigation


// // const Invoices = () => {
// //   const theme = useTheme();
// //   const colors = tokens(theme.palette.mode);
// //   const [data, setData] = useState([]);
// //   const navigate = useNavigate(); 
// //   // Fetch Data from Django API
// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/users/dashboard/echallan-limited/")
// //       .then((response) => response.json())
// //       .then((data) => setData(data))
// //       .catch((error) => console.error("Error fetching data:", error));
// //   }, []);

// //   // Define Columns for DataGrid
// //   const columns = [
// //     { field: "id", headerName: "ID", width: 90 },
// //     {
// //       field: "Vehicle_No",
// //       headerName: "Vehicle No",
// //       flex: 1,
// //       cellClassName: "name-column--cell",
// //     },
// //     {
// //       field: "FineAmount",
// //       headerName: "Fine Amount",
// //       flex: 1,
// //       renderCell: (params) => (
// //         <Typography color={params.value > 500 ? "red" : "green"}>
// //           ₹{params.value}
// //         </Typography>
// //       ),
// //     },
// //     {
// //       field: "ViolationType",
// //       headerName: "Violation Type",
// //       flex: 1,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center">
// //           {params.value === "Over-speeding" ? (
// //             <Warning color="error" sx={{ mr: 1 }} />
// //           ) : (
// //             <CheckCircle color="success" sx={{ mr: 1 }} />
// //           )}
// //           {params.value}
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "Challan_Date",
// //       headerName: "Challan Date",
// //       flex: 1,
// //     },
// //     {
// //       field: "actions",
// //       headerName: "Actions",
// //       flex: 1,
// //       renderCell: (params) => (
// //         <IconButton onClick={() => navigate(`/echallan/${params.row.id}`)}>
// //           <Visibility sx={{ color: "blue" }} />
// //         </IconButton>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Box m="20px" height="100%" display="flex" flexDirection="column" gap="20px" classname="bg-gradient-to-br from-blue-50 to-indigo-100">
// //       <Header title="E-CHALLAN RECORDS" subtitle="List of Challans with Details" />
// //       <Box
// //         height="75vh"
// //         maxWidth="100%"
// //         sx={{
// //           "& .MuiDataGrid-root": { border: "none" },
// //           "& .MuiDataGrid-cell": { borderBottom: "1px solid #ddd" },
// //           "& .name-column--cell": { color: colors.greenAccent[300] },
// //           "& .MuiDataGrid-columnHeaders": {
// //             backgroundColor: "skyblue",
// //             fontWeight: "bold",
// //             borderBottom: "none",
// //           },
// //           "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
// //           "& .MuiDataGrid-footerContainer": {
// //             borderTop: "none",
// //             backgroundColor: "skyblue",
// //           },
// //           "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
// //           "& .MuiDataGrid-iconSeparator": { color: colors.primary[100] },
// //         }}
// //       >
// //         <DataGrid
// //           rows={data}
// //           columns={columns}
// //           getRowId={(row) => row.id} // Ensure correct ID mapping
// //           initialState={{
// //             pagination: { paginationModel: { pageSize: 10 } },
// //           }}
// //           checkboxSelection
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Invoices;






// import { useState, useEffect } from "react";
// import { Box, Typography, useTheme, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { CheckCircle, Warning, Visibility } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const Invoices = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [paginationModel, setPaginationModel] = useState({
//     pageSize: 10,
//     page: 0
//   });
//   useEffect(() => {
//     setLoading(true);
//     fetch("http://127.0.0.1:8000/users/dashboard/echallan-limited/")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
    
//         setLoading(false);
    
//   }, []);

//   const handlePaginationModelChange = (newModel) => {
//     setPaginationModel(newModel);
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "Vehicle_No",
//       headerName: "Vehicle No",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "FineAmount",
//       headerName: "Fine Amount",
//       flex: 1,
//       renderCell: (params) => (
//         <Typography color={params.value > 500 ? "red" : "green"}>
//           ₹{params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "ViolationType",
//       headerName: "Violation Type",
//       flex: 1,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center">
//           {params.value === "Over-speeding" ? (
//             <Warning color="error" sx={{ mr: 1 }} />
//           ) : (
//             <CheckCircle color="success" sx={{ mr: 1 }} />
//           )}
//           {params.value}
//         </Box>
//       ),
//     },
//     {
//       field: "Challan_Date",
//       headerName: "Challan Date",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <IconButton onClick={() => navigate(`/echallan/${params.row.id}`)}>
//           <Visibility sx={{ color: "blue" }} />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Box className="p-5 space-y-4">
//       {/* Title & Subtitle (Centered) */}
//       <Box textAlign="center" mb={2}>
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           E-CHALLAN RECORDS
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           List of Challans with Details
//         </Typography>
//       </Box>

//       {/* Table Container */}
//       <Box className="bg-white rounded-lg shadow-lg border border-gray-200">
//         <Box sx={{ height: "70vh", overflow: "auto" }}>
//           <DataGrid
//             rows={data}
//             columns={columns}
//             getRowId={(row) => row.id}
//             checkboxSelection
//             loading={loading}
//           pageSizeOptions={[10, 25, 50]}
//           paginationModel={paginationModel}
//           onPaginationModelChange={handlePaginationModelChange}
//           paginationMode="client"
//             autoHeight={false}
//             initialState={{
//               pagination: { paginationModel: { pageSize: 10 } },
//             }}
//             sx={{
//               "& .MuiDataGrid-root": { border: "none" },
//               "& .MuiDataGrid-cell": { borderBottom: "1px solid #fcfcfc" },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#1780E3",
//                 fontWeight: "bold",
//                 borderBottom: "none",
//                 color: "#fff",
//                 position: "sticky",
//                 fontSize: "14px",
//                 top: 0,
//                 zIndex: 1,
//               },
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: "#fcfcfc",
//                 fontSize: "12px",
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 backgroundColor: "#1780E3",
//                 borderTop: "none",
//                 position: "sticky",
//                 bottom: 0,
//                 color: "#fff",
//                 zIndex: 1,
//                 fontSize: "14px",
//               },
//               "& .MuiTablePagination-root": {
//                 color: "#fff",
//                 fontSize: "14px",
//               },
//               "& .MuiTablePagination-select": {
//                 marginRight: "8px",
//                 fontSize: "14px",
//               },
//               "& .MuiDataGrid-row.Mui-selected": {
//                 backgroundColor: "#B8D6F5 !important", // Change background color for selected rows
//                 "&:hover": {
//               backgroundColor: "#B8D6F5 !important", // Change hover color for selected rows
//                 },
//               },
//             }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Invoices;






import { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton,Chip,Tooltip  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { CheckCircle, Warning,RemoveRedEyeOutlined ,MailOutline ,PhoneEnabled , Visibility,LocalAtmOutlined, Pending, Traffic, WrongLocation, Speed, SafetyCheck, SafetyCheckTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/users/dashboard/echallan-limited/");
        
        if (!response.ok) {
          throw new Error("Failed to fetch challan data");
        }
        
        const result = await response.json();
        
        // Process the data to format dates
        const formattedData = result.map(item => ({
          ...item,
          Challan_Date_Formatted: formatDate(item.Challan_Date)
        }));
        
        setData(formattedData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const showNotification = (message, type = "success") => {
    switch(type) {
      case "success":
        toast.success(message, {
          position: "top-right",
          autoClose: 3000
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-right",
          autoClose: 3000
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "top-right",
          autoClose: 3000
        });
        break;
      default:
        toast(message, {
          position: "top-right",
          autoClose: 3000
        });
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "Vehicle_No",
      headerName: "Vehicle No",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "FineAmount",
      headerName: "Fine Amount",
      flex: 1,
      renderCell: (params) => (
        <Chip
            // icon={<LocalAtmOutlined />}
            label={`₹${params.value}`}
            color="primary"
            variant="outlined"
            sx={{ 
            fontWeight: "bold", 
            minWidth: "90px" 
            }}
          />
          ),
        },
        {
          field: "ViolationType",
          headerName: "Violation Type",
          flex: 1.5,
          renderCell: (params) => (
          <Box display="flex" alignItems="center">
            {params.value === "red light" ? (
            <Traffic color="error" sx={{ mr: 1 }} />
            ) : params.value === "speeding" ? (
            <Speed  color="warning" sx={{ mr: 1 }} />
            ) : params.value === "wrong side" ? (
            <WrongLocation color="error" sx={{ mr: 1 }} />
            ): params.value === "no helmet" ? (
              <SafetyCheckTwoTone color="error" sx={{ mr: 1 }} />
              ) : (
            <CheckCircle color="success" sx={{ mr: 1 }} />
            )}
            <Typography>{params.value}</Typography>
          </Box>
          ),
        },
        {
          field: "Challan_Date",
          headerName: "Challan Date",
          flex: 1,
          renderCell: (params) => formatDate(params.value)
        },
        {
          field: "payed",
          headerName: "Status",
          flex: 1,
          renderCell: (params) => (
          <Box display="flex" alignItems="center">
            {params.value === false ? (
            <>
              <Typography color="warning.main"><Pending /> Pending</Typography>
            </>
            ) : (
            <>
              <CheckCircle color="success" sx={{ mr: 1 }} />
              <Typography color="success.main">Paid</Typography>
            </>
            )}
          </Box>
          ),
        },
        {
          field: "actions",
          headerName: "Actions",
          flex: 1.5,
          renderCell: (params) => (
          <Box display="flex" gap={1}>
            <Tooltip title="View Details">
            <IconButton
              onClick={() => navigate(`/echallan/${params.row.id}`)}
              sx={{
              backgroundColor: "#1780E3",
              color: "white",
              "&:hover": {
                backgroundColor: colors.blueAccent[300],
                color: "#fff",
              },
              transition: "all 0.3s"
              }}
              size="small"
            >
              <RemoveRedEyeOutlined fontSize="small" />
            </IconButton>
            </Tooltip>
            
            <Tooltip title="Send Email Notification">
            <IconButton
              onClick={() => {
                showNotification("Email notification sent successfully!");
              }}
              sx={{
                backgroundColor: "#1780E3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: colors.greenAccent[300],
                  color: "#fff",
                },
                transition: "all 0.3s"
              }}
              size="small"
            >
              <MailOutline fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Send SMS Notification">
            <IconButton
              onClick={() => {
                showNotification("SMS notification sent successfully!", "info");
              }}
              sx={{
                backgroundColor:"#1780E3",
                color: "white",
                "&:hover": {
                  backgroundColor: colors.redAccent[300],
                  color: "#fff",
                },
                transition: "all 0.3s"
              }}
              size="small"
            >
              <PhoneEnabled fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box className="p-5 h-full space-y-4 bg-gradient-to-br  from-blue-50 via-white to-blue-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Title & Subtitle (Centered) */}
      <Box textAlign="center" mb={7}>
        <Typography variant="h2" fontWeight="bold" color="primary">
          E-CHALLAN RECORDS
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          List of Challans with Details
        </Typography>
      </Box>

      {/* Error message if any */}
      {error && (
        <Box sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
          <Typography variant="body1">Error: {error}</Typography>
        </Box>
      )}

      {/* Table Container */}
      <Box className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <Box sx={{ height: "70vh", overflowY: "auto", overflowX: "hidden" }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            paginationMode="client"
            autoHeight={false}
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #fcfcfc" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1780E3",
                fontWeight: "bold",
                borderBottom: "none",
                color: "#fff",
                position: "sticky",
                fontSize: "14px",
                top: 0,
                zIndex: 1,
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#fcfcfc",
                fontSize: "12px",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#1780E3",
                borderTop: "none",
                position: "sticky",
                bottom: 0,
                color: "#fff",
                zIndex: 1,
                fontSize: "14px",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
                fontSize: "14px",
              },
              "& .MuiTablePagination-select": {
                marginRight: "8px",
                fontSize: "14px",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#B8D6F5 !important", // Change background color for selected rows
                "&:hover": {
              backgroundColor: "#B8D6F5 !important", // Change hover color for selected rows
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Invoices;