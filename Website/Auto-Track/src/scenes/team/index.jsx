
// // import { useState, useEffect } from "react";
// // import { Box, Typography, Button, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
// // import { DataGrid } from "@mui/x-data-grid";
// // import { AdminPanelSettingsOutlined, SecurityOutlined, PersonOutline, ShieldOutlined, CheckCircle, Cancel } from "@mui/icons-material";
// // import axios from "axios";
// // import { Header } from "../../components";

// // const API_BASE_URL = "http://localhost:8000/users/dashboard"; // Change this if needed

// // const Team = () => {
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/users-with-police/`);
// //       const formattedData = response.data.map((user) => ({
// //         id: user.id,
// //         email: user.email,
// //         role: user.role,
// //         badge_number: user.badge_number || "N/A",
// //         rank: user.rank || "N/A",
// //         status: user.status ? "Active" : "Inactive",
// //       }));
// //       setUsers(formattedData);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   const handleStatusUpdate = async (id, newStatus) => {
// //     try {
// //       await axios.patch(`${API_BASE_URL}/update-police-status/${id}/`, { status: newStatus });
// //       fetchUsers();
// //     } catch (error) {
// //       console.error("Error updating status:", error);
// //     }
// //   };

// //   const handleRoleUpdate = async (id, newRole) => {
// //     try {
// //       await axios.patch(`${API_BASE_URL}/update-user-role/${id}/`, { role: newRole });
// //       fetchUsers();
// //     } catch (error) {
// //       console.error("Error updating role:", error);
// //     }
// //   };

// //   const roleIcons = {
// //     ADMIN: <AdminPanelSettingsOutlined className="text-red-600" />,
// //     MANAGER: <SecurityOutlined className="text-blue-600" />,
// //     USER: <PersonOutline className="text-gray-600" />,
// //     PO: <ShieldOutlined className="text-green-600" />,
// //   };

// //   const columns = [
// //     { field: "id", headerName: "ID", width: 90 },
// //     { 
// //       field: "email", 
// //       headerName: "Email", 
// //       flex: 1,
// //       renderCell: ({ row }) => (
// //         <Tooltip title={row.email} arrow>
// //           <Typography className="truncate max-w-x">{row.email}</Typography>
// //         </Tooltip>
// //       ),
// //     },
// //     { 
// //       field: "role", 
// //       headerName: "Role", 
// //       flex: 1,
// //       renderCell: ({ row }) => (
// //         <Box className="flex items-center gap-2">
// //           {roleIcons[row.role] || <PersonOutline className="text-gray-400" />}
// //           <Select
// //             value={row.role}
// //             onChange={(e) => handleRoleUpdate(row.id, e.target.value)}
// //             size="small"
// //           >
// //             <MenuItem value="ADMIN">Admin</MenuItem>
// //             <MenuItem value="MANAGER">Manager</MenuItem>
// //             <MenuItem value="USER">User</MenuItem>
// //             <MenuItem value="PO">Police Officer</MenuItem>
// //           </Select>
// //         </Box>
// //       ),
// //     },
// //     { field: "rank", headerName: "Rank", flex: 1 },
// //     { field: "badge_number", headerName: "Badge ID", flex: 1 },
// //     { 
// //       field: "status", 
// //       headerName: "Status", 
// //       flex: 1,
// //       renderCell: ({ row }) => (
// //         <Tooltip title="Toggle Status" arrow>
// //           <IconButton
// //             onClick={() => handleStatusUpdate(row.id, row.status === "Active" ? false : true)}
// //             color={row.status === "Active" ? "success" : "error"}
// //           >
// //             {row.status === "Active" ? <CheckCircle /> : <Cancel />}
// //           </IconButton>
// //         </Tooltip>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Box className="p-5 space-y-4">
// //       <Header title="TEAM" subtitle="Ahmedabad Police Enforcement" />
// //       <Box className="mt-6 h-[75vh]">
// //         <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 overflow-hidden">
// //           <DataGrid
// //             rows={users}
// //             columns={columns}
// //             pageSizeOptions={[10]}
// //             checkboxSelection
// //           />
// //         </div>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Team;





// import { useState, useEffect } from "react";
// import { Box, Typography, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   AdminPanelSettingsOutlined,
//   SecurityOutlined,
//   PersonOutline,
//   ShieldOutlined,
//   CheckCircle,
//   Cancel,
// } from "@mui/icons-material";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/users/dashboard"; // Change this if needed

// const Team = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users-with-police/`);
//       const formattedData = response.data.map((user) => ({
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         badge_number: user.badge_number || "N/A",
//         rank: user.rank || "N/A",
//         status: user.status ? "Active" : "Inactive",
//       }));
//       setUsers(formattedData);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await axios.patch(`${API_BASE_URL}/update-police-status/${id}/`, { status: newStatus });
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleRoleUpdate = async (id, newRole) => {
//     try {
//       await axios.patch(`${API_BASE_URL}/update-user-role/${id}/`, { role: newRole });
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   const roleIcons = {
//     ADMIN: <AdminPanelSettingsOutlined className="text-red-600" />,
//     MANAGER: <SecurityOutlined className="text-blue-600" />,
//     USER: <PersonOutline className="text-gray-600" />,
//     PO: <ShieldOutlined className="text-green-600" />,
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       renderCell: ({ row }) => (
//         <Tooltip title={row.email} arrow>
//           <Typography className="truncate max-w-x">{row.email}</Typography>
//         </Tooltip>
//       ),
//     },
//     {
//       field: "role",
//       headerName: "Role",
//       flex: 1,
//       renderCell: ({ row }) => (
//         <Box className="flex items-center gap-2">
//           {roleIcons[row.role] || <PersonOutline className="text-gray-400" />}
//           <Select
//             value={row.role}
//             onChange={(e) => handleRoleUpdate(row.id, e.target.value)}
//             size="small"
//           >
//             <MenuItem value="ADMIN">Admin</MenuItem>
//             <MenuItem value="MANAGER">Manager</MenuItem>
//             <MenuItem value="USER">User</MenuItem>
//             <MenuItem value="PO">Police Officer</MenuItem>
//           </Select>
//         </Box>
//       ),
//     },
//     { field: "rank", headerName: "Rank", flex: 1 },
//     { field: "badge_number", headerName: "Badge ID", flex: 1 },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: ({ row }) => (
//         <Tooltip title="Toggle Status" arrow>
//           <IconButton
//             onClick={() => handleStatusUpdate(row.id, row.status === "Active" ? false : true)}
//             color={row.status === "Active" ? "success" : "error"}
//           >
//             {row.status === "Active" ? <CheckCircle /> : <Cancel />}
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];

//   return (
//     <Box className="p-5 space-y-4">
//       {/* Centered Title and Subtitle */}
//       <Box textAlign="center" mb={2}>
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           Police Team Management
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary">
//           Ahmedabad City Enforcement Panel
//         </Typography>
//       </Box>

//       {/* Scrollable Table Section */}
//       <Box className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//         <Box sx={{ height: "70vh", overflow: "auto" }}>
//           <DataGrid
//             rows={users}
//             columns={columns}
//             pageSizeOptions={[10]}
//             checkboxSelection
//             disableRowSelectionOnClick
//             autoHeight={false}
//             sx={{
//               "& .MuiDataGrid-root": { border: "none" },
//               "& .MuiDataGrid-cell": { borderBottom: "1px solid #ddd" },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#87CEEB",
//                 fontWeight: "bold",
//                 borderBottom: "none",
//                 color: "#fff",
//               },
//               "& .MuiDataGrid-virtualScroller": {
//                 backgroundColor: "#f5f5f5",
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 backgroundColor: "#87CEEB",
//                 borderTop: "none",
//               },
//             }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Team;

import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, IconButton, Tooltip, Chip, Badge } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  AdminPanelSettingsOutlined,
  SecurityOutlined,
  PersonOutline,
  ShieldOutlined,
  CheckCircle,
  Cancel,
  RemoveRedEyeOutlined
} from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/users/dashboard"; // Change this if needed

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users-with-police/`);
      const formattedData = response.data.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
        badge_number: user.badge_number || "N/A",
        rank: user.rank || "N/A",
        assigned_area: user.assigned_area || "N/A",
        status: user.status ? "Active" : "Inactive",
      }));
      setUsers(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch user data");
      setLoading(false);
    }
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
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/update-police-status/${id}/`, { status: newStatus });
      fetchUsers();
      showNotification(response.data.message || "User status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification(error.response?.data?.error || "Failed to update status", "error");
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axios.patch(`${API_BASE_URL}/update-user-role/${id}/`, { role: newRole });
      fetchUsers();
      showNotification(`User role updated to ${newRole}!`);
    } catch (error) {
      console.error("Error updating role:", error);
      showNotification("Failed to update role", "error");
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const roleIcons = {
    ADMIN: <AdminPanelSettingsOutlined sx={{ fontSize: 20 }} />,
    MANAGER: <SecurityOutlined sx={{ fontSize: 20 }} />,
    USER: <PersonOutline sx={{ fontSize: 20 }} />,
    PO: <ShieldOutlined sx={{ fontSize: 20 }} />,
  };

  const getRoleColor = (role) => {
    switch(role) {
      case "ADMIN": return "error";
      case "MANAGER": return "primary";
      case "PO": return "success";
      default: return "default";
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case "ADMIN": return "Admin";
      case "MANAGER": return "Manager";
      case "USER": return "User";
      case "PO": return "Police Officer";
      default: return role;
    }
  };

  // Fixed width columns to prevent layout shifts during tab navigation
  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 70,
      renderCell: (params) => (
        <Typography fontWeight="medium">{params.value}</Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      renderCell: ({ row }) => (
        <Tooltip title={row.email} arrow>
          <Typography sx={{ 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            whiteSpace: "nowrap",
            width: "100%"
          }}>
            {row.email}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: ({ row }) => (
        <Select
          value={row.role}
          onChange={(e) => handleRoleUpdate(row.id, e.target.value)}
          size="small"
          sx={{
            width: "90%",
            maxWidth: "160px",
            '.MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 8px'
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: getRoleColor(row.role) === "default" ? "#E0E0E0" : undefined
            }
          }}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {roleIcons[value]}
              <Typography sx={{ 
                fontSize: '0.875rem',
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100px" 
              }}>
                {getRoleLabel(value)}
              </Typography>
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 180
              }
            }
          }}
        >
          <MenuItem value="ADMIN">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AdminPanelSettingsOutlined color="error" />
              <Typography>Admin</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="MANAGER">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityOutlined color="primary" />
              <Typography>Manager</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="USER">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonOutline color="action" />
              <Typography>User</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="PO">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldOutlined color="success" />
              <Typography>Police Officer</Typography>
            </Box>
          </MenuItem>
        </Select>
      ),
    },
    { 
      field: "rank", 
      headerName: "Rank", 
      width: 150,
      renderCell: ({ row }) => (
        <Chip
          label={row.rank}
          variant="outlined"
          color="primary"
          size="small"
          sx={{ 
            minWidth: "80px",
            maxWidth: "120px", 
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }
          }}
        />
      ),
    },
    { 
      field: "assigned_area", 
      headerName: "Assigned Area", 
      width: 150,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" width="100%">
          <ShieldOutlined sx={{ mr: 1, color: "#1780E3", flexShrink: 0 }} />
          <Typography sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap"
          }}>
            {row.assigned_area || "N/A"}
          </Typography>
        </Box>
      ),
    },
    { 
      field: "badge_number", 
      headerName: "Badge ID", 
      width: 150,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" width="100%">
          <ShieldOutlined sx={{ mr: 1, color: "#1780E3", flexShrink: 0 }} />
          <Typography sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            {row.badge_number}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <Tooltip title="Toggle Status" arrow>
            <IconButton
              onClick={() => handleStatusUpdate(row.id, row.status === "Active" ? false : true)}
              sx={{
                backgroundColor: row.status === "Active" ? "#DFF2E1" : "#FEE7E7",
                color: row.status === "Active" ? "#4CAF50" : "#F44336",
                "&:hover": {
                  backgroundColor: row.status === "Active" ? "#C8E6C9" : "#FFCDD2",
                },
                transition: "all 0.3s",
                marginRight: "10px",
                flexShrink: 0
              }}
              size="small"
            >
              {row.status === "Active" ? <CheckCircle /> : <Cancel />}
            </IconButton>
          </Tooltip>
          <Typography
            color={row.status === "Active" ? "success.main" : "error.main"}
            fontWeight="medium"
          >
            {row.status}
          </Typography>
        </Box>
      ),
    },
    
    
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      height: "100%", 
      width: "100%", 
      maxWidth: "100%", // Prevent overflow
      overflow: "hidden", // Prevent overflow
      background: "linear-gradient(135deg, #EBF5FF 0%, #FFFFFF 50%, #E6F0FF 100%)"
    }}>
      {/* Toast Container */}
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
      <Box textAlign="center" mb={5} sx={{ maxWidth: "100%", overflow: "hidden" }}>
        <Typography 
          variant="h2" 
          fontWeight="bold" 
          color="primary" 
          sx={{ 
            letterSpacing: '0.05em',
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" }
          }}
        >
          POLICE TEAM MANAGEMENT
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="textSecondary" 
          sx={{ mt: 1 }}
        >
          Ahmedabad City Enforcement Panel
        </Typography>
      </Box>

      {/* Error message if any */}
      {error && (
        <Box sx={{ 
          color: 'error.main', 
          textAlign: 'center', 
          mb: 2,
          p: 2,
          backgroundColor: 'error.light',
          borderRadius: '8px'
        }}>
          <Typography variant="body1">Error: {error}</Typography>
        </Box>
      )}

      {/* Table Container with fixed width settings */}
      <Box sx={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
        border: '1px solid #E0E0E0',
        overflow: 'hidden',
        height: "calc(100vh - 220px)",
        minHeight: "500px",
        width: "100%",
        maxWidth: "100%", // Prevent overflow
        "& .MuiDataGrid-main": {
          maxWidth: "100%" // Important for preventing overflow
        }
      }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          paginationMode="client"
          disableColumnMenu
          disableAutoSize={true} // Prevent auto resizing which can cause layout shifts
          autoHeight={false}
          columnBuffer={columns.length} // Ensure all columns are rendered initially
          sx={{
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
            "& .MuiDataGrid-root": { 
              border: "none",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden"
            },
            "& .MuiDataGrid-main": {
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden"
            },
            "& .MuiDataGrid-virtualScroller": {
              width: "100%",
              maxWidth: "100%",
              overflow: "auto"
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              width: "100%",
              maxWidth: "100%"
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              width: "100%",
              maxWidth: "100%"
            },
            "& .MuiDataGrid-cell": { 
              borderBottom: "1px solid #f0f0f0",
              padding: "8px 12px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              boxSizing: "border-box"
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1780E3",
              borderBottom: "none",
              color: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 1,
              padding: "12px 4px",
              fontWeight: "bold",
              fontSize: "14px",
              width: "100%"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1780E3",
              color: "#fff",
              borderTop: "1px solid #E0E0E0",
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              width: "100%"
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.2s ease",
              width: "100%",
              "&:hover": {
                backgroundColor: "#f5f9fe !important",
              },
              "&:nth-of-type(even)": {
                backgroundColor: "#f8fafc",
              },
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#E3F2FD !important", 
              "&:hover": {
                backgroundColor: "#BBDEFB !important",
              },
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
              fontSize: "14px",
            },
            "& .MuiTablePagination-select": {
              marginRight: "8px",
              fontSize: "14px",
              color: "#fff",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "#fff"
            },
            "& .MuiCheckbox-root": {
              color: "#1780E3",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;