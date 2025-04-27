

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
  Paper,
  IconButton 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme.js";
import CloseIcon from '@mui/icons-material/Close';
import { Cancel, CancelRounded, Done, DoneAllOutlined, Pending } from "@mui/icons-material";
const API_URL = "http://127.0.0.1:8000/users/dashboard/echallan-queries/";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EchallanQueryVerification = () => {
  const [open, setOpen] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });

  const theme = useTheme();
  
  const UPDATE_API_URL = "http://127.0.0.1:8000/users/echallan-queries/"
  const handleStatusUpdate = async (status) => {
        if (!selectedChallan) return;
        try {
          const response = await fetch(`${UPDATE_API_URL}${selectedChallan.ticket_no}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resolution_status: status }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to update status");
          }
    
          const updatedData = data.map((item) =>
            item.id === selectedChallan.id ? { ...item, resolution_status: status } : item
          );
          setData(updatedData);
          handleClose();
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        
        // Process the data to format dates
        const formattedData = result.map(item => ({
          ...item,
          query_date_formatted: formatDate(item.query_date)
        }));
        
        setData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (challan) => {
    setSelectedChallan(challan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedChallan(null);
  };

  const handleImageClick = (image) => {
    setFullScreenImage(image);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "ticket_no", headerName: "Ticket No", flex: 1 },
    { field: "name", headerName: "Owner Name", flex: 1 },
    { field: "license", headerName: "License", flex: 1 },
    { 
      field: "query_date", 
      headerName: "Date", 
      flex: 1,
      renderCell: (params) => formatDate(params.value)
    },
    { field: "issue_type", headerName: "Issue Type", flex: 1 },
    { 
      field: "resolution_status", 
      headerName: "Resolution Status", 
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {params.value === "Pending" && (
            <>
              <Typography color="warning.main" fontWeight="bold"> <Pending/> Pending</Typography>
            </>
          )}
          {params.value === "Resolved" && (
            <>
              <Typography color="success.main" fontWeight="bold"><DoneAllOutlined/> Resolved</Typography>
            </>
          )}
          {params.value === "Rejected" && (
            <>
              <Typography color="error.main" fontWeight="bold"><CancelRounded/> Rejected</Typography>
            </>
          )}
        </Box>
      )
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            onClick={() => handleOpen(params.row)}
            sx={{
              color: "#26CAEB",
              ":hover": {
                color: "#1780E3",
              },
            }}
          >
           
          </IconButton>
          <Button
            variant="contained"
            onClick={() => handleOpen(params.row)}
            sx={{
              backgroundColor: "#78D9EB",
              color: "black",
              ":hover": {
                backgroundColor: "#26CAEB",
              },
              maxWidth: "150px",
              padding: "6px 12px",
            }}
          >
            Verify
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box className="p-7 h-full space-y-4 bg-gradient-to-br  from-blue-50 via-white to-blue-100">
      {/* Centered Title and Subtitle */}
      <Box textAlign="center" mb={5}>
      <Typography variant="h2" fontWeight="bold" color="primary">
        E-Challan Query Verification
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Streamlined Challan Query Verification
      </Typography>
      </Box>

      {/* Error message if any */}
      {error && (
      <Box sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
        <Typography variant="body1">Error: {error}</Typography>
      </Box>
      )}

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

      {/* Challan Detail Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
    {/* Close Icon at top-right corner */}
    <IconButton
    onClick={handleClose}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 1,
      color: "black",
      backgroundColor: "#fff",
      boxShadow: 1,
      "&:hover": {
      backgroundColor: "#f0f0f0"
      }
    }}
    >
    <CloseIcon />
    </IconButton>

    <DialogTitle>
    <Typography variant="h4" fontWeight="bold" textAlign="center">
      Verify E-Challan
    </Typography>
    </DialogTitle>

    <DialogContent dividers>
    {selectedChallan && (
      <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#f9fafb"
      }}
      >
      {/* Images */}
      <Box display="flex" gap={3} justifyContent="center" mb={3}>
        <Box
        width="45%"
        height={250}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff"
        }}
        onClick={() => handleImageClick(selectedChallan.document_url)}
        >
        <img
          src={selectedChallan.document_url || "/path/to/no-image.png"}
          alt={selectedChallan.document_url ? "Generated Challan" : "No Image Available"}
          style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "object-cover",
          borderRadius: "2px"
          }}
        />
        </Box>
      
      </Box>

      {/* Description Section */}
      <Box sx={{ px: 2 }}>
        <Typography variant="body1" fontSize={16} fontWeight="bold">
        Date: {formatDate(selectedChallan.query_date)}
        </Typography>
        <Typography variant="h5" mt={2}>
        Description: {selectedChallan.query_description}
        </Typography>
      </Box>
      </Paper>
    )}
    </DialogContent>

    <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
    <Button
      onClick={() => handleStatusUpdate("Rejected")}  
      color="secondary"
      variant="contained"
      sx={{
      backgroundColor: "white",
      color: "red",
      ":hover": {
        backgroundColor: "red",
        color: "white"
      }
      }}
    >
      Reject
    </Button>
    <Button
      onClick={() => handleStatusUpdate("Resolved")}
      color="primary"
      variant="contained"
      sx={{
      backgroundColor: "white",
      color: "green",
      ":hover": {
        backgroundColor: "#01EB3A",
        color: "white"
      }
      }}
    >
      Approve
    </Button>
    </DialogActions>
  </Dialog>

      {/* Fullscreen Image Dialog */}
      <Dialog open={!!fullScreenImage} onClose={handleCloseFullScreen} fullWidth maxWidth="xl">
      <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 0 }}>
        <img
        src={fullScreenImage}
        alt="Full Screen View"
        style={{ maxWidth: "100vw", maxHeight: "100vh", objectFit: "cover" }}
        />
      </DialogContent>
      </Dialog>
    </Box>
    );
};

export default EchallanQueryVerification;