// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { Box, Typography, Button, TextField, Paper, CircularProgress } from "@mui/material";
// // import jsPDF from "jspdf";
// // import autoTable from 'jspdf-autotable';
// // import axios from "axios";

// // const EchallanDetail = () => {
// //   const { id } = useParams();
// //   const [challan, setChallan] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchChallanDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.get(`http://127.0.0.1:8000/users/dashboard/echallan-limited/${id}/`);
// //         setChallan(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setError("Failed to fetch challan details");
// //         setLoading(false);
// //       }
// //     };

// //     fetchChallanDetails();
// //   }, [id]);

// //   const generatePDF = () => {
// //     if (!challan) return;

// //     try {
// //       // Create a new jsPDF instance
// //       const doc = new jsPDF();
      
// //       // PDF Styling
// //       doc.setFont("helvetica");
      
// //       // Title and Header
// //       doc.setFontSize(18);
// //       doc.setTextColor(0, 0, 0);
// //       doc.text("E-Challan Details", 105, 20, { align: "center" });
      
// //       // Challan Details
// //       doc.setFontSize(12);
// //       doc.text(`Challan ID: ${challan.id || 'N/A'}`, 20, 35);
      
// //       // Prepare table data
// //       const tableColumns = ["Field", "Value"];
// //       const tableRows = Object.entries(challan)
// //         .filter(([key]) => 
// //           !["id", "created_at", "updated_at", "_id"].includes(key)
// //         )
// //         .map(([key, value]) => [
// //           key.replace(/_/g, " ").toUpperCase(), 
// //           value !== null && value !== undefined 
// //             ? String(typeof value === 'object' ? JSON.stringify(value) : value)
// //             : 'N/A'
// //         ]);

// //       // Generate Table using autoTable
// //       autoTable(doc, {
// //         startY: 45,
// //         head: [tableColumns],
// //         body: tableRows,
// //         theme: 'striped',
// //         headStyles: { 
// //           fillColor: [41, 128, 185],  // Blue header
// //           textColor: 255 
// //         },
// //         styles: { 
// //           fontSize: 10,
// //           cellPadding: 3,
// //         },
// //         columnStyles: {
// //           0: { fontStyle: 'bold' }
// //         }
// //       });

// //       // Footer
// //       const pageCount = doc.internal.getNumberOfPages();
// //       for (let i = 1; i <= pageCount; i++) {
// //         doc.setPage(i);
// //         doc.setFontSize(10);
// //         doc.setTextColor(150);
// //         doc.text(
// //           `Page ${i} of ${pageCount}`, 
// //           doc.internal.pageSize.width - 20, 
// //           doc.internal.pageSize.height - 10, 
// //           { align: "right" }
// //         );
// //       }

// //       // Save PDF
// //       doc.save(`Echallan_${challan.id || 'Details'}.pdf`);
// //     } catch (pdfError) {
// //       console.error("PDF Generation Error:", pdfError);
// //       alert("Failed to generate PDF. Please try again.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box m="20px">
// //         <Typography color="error">{error}</Typography>
// //       </Box>
// //     );
// //   }

// //   if (!challan) {
// //     return <Typography>No challan details found.</Typography>;
// //   }

// //   return (
// //     <Box m="20px">
// //       <Typography variant="h4" gutterBottom>
// //         E-Challan Details
// //       </Typography>
// //       <Paper elevation={3} sx={{ padding: 3 }}>
// //         <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
// //           {Object.entries(challan)
// //             .filter(([key]) => !["id", "created_at", "updated_at", "_id"].includes(key))
// //             .map(([key, value]) => (
// //               <TextField
// //                 key={key}
// //                 label={key.replace(/_/g, " ")}
// //                 value={
// //                   value !== null && value !== undefined
// //                     ? typeof value === "object"
// //                       ? JSON.stringify(value)
// //                       : value
// //                     : 'N/A'
// //                 }
// //                 fullWidth
// //                 InputProps={{ readOnly: true }}
// //               />
// //             ))}
// //         </Box>
// //         <Button 
// //           variant="contained" 
// //           color="primary" 
// //           sx={{ mt: 3 }} 
// //           onClick={generatePDF}
// //         >
// //           Download PDF
// //         </Button>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default EchallanDetail;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button, TextField, Paper, CircularProgress } from "@mui/material";
// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';
// import axios from "axios";

// const EchallanDetail = () => {
//   const { id } = useParams();
//   const [challan, setChallan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChallanDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://127.0.0.1:8000/users/dashboard/echallan-limited/${id}/`);
//         setChallan(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch challan details");
//         setLoading(false);
//       }
//     };

//     fetchChallanDetails();
//   }, [id]);

//   const generatePDF = () => {
//     if (!challan) return;

//     try {
//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();

//       // Header
//       doc.setFontSize(16);
//       doc.setFont('helvetica', 'bold');
//       doc.text('E-Challan Details', pageWidth / 2, 20, { align: 'center' });

//       // Challan Metadata
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.text(`Challan ID: ${challan.id || 'N/A'}`, 20, 30);
//       doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, 30, { align: 'right' });

//       // Prepare detailed data dynamically
//       const detailedFields = Object.entries(challan)
//         .filter(([key]) => !['id', 'created_at', 'updated_at', '_id','vehicle_details'].includes(key))
//         .map(([key, value]) => ({
//           label: key.replace(/_/g, ' ').toUpperCase(),
//           value: value !== null && value !== undefined 
//             ? (typeof value === 'object' ? JSON.stringify(value) : String(value))
//             : 'N/A'
//         }));

//       // Detailed Table
//       const tableStartY = 40;
//       autoTable(doc, {
//         startY: tableStartY,
//         head: [['Field', 'Details']],
//         body: detailedFields.map(field => [field.label, field.value]),
//         theme: 'striped',
//         styles: { 
//           fontSize: 10,
//           cellPadding: 4,
//         },
//         headStyles: { 
//           fillColor: [41, 128, 185],
//           textColor: 255,
//           fontStyle: 'bold'
//         },
//         columnStyles: {
//           0: { fontStyle: 'bold', cellWidth: 60 }
//         }
//       });

//       // Safely get the final Y position
//       const finalY = doc.previousAutoTable ? 
//         (doc.previousAutoTable.finalY || tableStartY + 450) : 
//         tableStartY + 450;

//       // Additional Notes Section
//       doc.setFontSize(10);
//       doc.setTextColor(100);
//       doc.text('Important Notes:', 20, finalY + 10);
//       doc.text('- Please pay the fine within 30 days', 20, finalY + 16);
//       doc.text('- Failure to pay may result in legal action', 20, finalY + 22);

//       // Footer
//       doc.setLineDash([1, 1], 0);
//       doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
//       doc.setFontSize(8);
//       doc.text('© Traffic Police Department', pageWidth / 2, pageHeight - 10, { align: 'center' });

//       // Page Number
//       const pageCount = doc.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         doc.setPage(i);
//         doc.setFontSize(8);
//         doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 5, { align: 'right' });
//       }

//       // Save PDF
//       doc.save(`Echallan_${challan.id || 'Details'}.pdf`);
//     } catch (pdfError) {
//       console.error("PDF Generation Error:", pdfError);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box m="20px">
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!challan) {
//     return <Typography>No challan details found.</Typography>;
//   }

//   return (
//     <Box m="20px">
//       <Typography variant="h4" gutterBottom>
//         E-Challan Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
//           {Object.entries(challan)
//             .filter(([key]) => !["id", "created_at", "updated_at", "_id",'vehicle_details'].includes(key))
//             .map(([key, value]) => (
//               <TextField
//                 key={key}
//                 label={key.replace(/_/g, " ")}
//                 value={
//                   value !== null && value !== undefined
//                     ? typeof value === "object"
//                       ? JSON.stringify(value)
//                       : value
//                     : 'N/A'
//                 }
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             ))}
//         </Box>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           sx={{ mt: 3 }} 
//           onClick={generatePDF}
//         >
//           Download PDF
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default EchallanDetail;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  CircularProgress, 
  Grid, 
  Divider,
  Chip,
  Alert,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import { 
  PictureAsPdf, 
  ArrowBack, 
  Warning, 
  CheckCircle, 
  CalendarToday, 
  DirectionsCar, 
  AttachMoney 
} from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import axios from "axios";
import { tokens } from "../../theme"; // Adjust the import path as needed

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function to format field names
const formatFieldName = (key) => {
  return key
    .replace(/_/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const EchallanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challan, setChallan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchChallanDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/users/dashboard/echallan-limited/${id}/`);
        setChallan(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch challan details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallanDetails();
  }, [id]);

  const generatePDF = async () => {
    if (!challan) return;

    try {
      setPdfGenerating(true);
      
      // Create new PDF document
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add logo or watermark (example)
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      // Header
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      doc.text('E-CHALLAN DETAIL REPORT', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Traffic Police Department', pageWidth / 2, 28, { align: 'center' });

      // Challan Summary Box
      doc.setFillColor(230, 246, 255);
      doc.roundedRect(14, 45, pageWidth - 28, 25, 3, 3, 'F');
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 100, 150);
      doc.text(`Challan ID: ${challan.id || 'N/A'}`, 20, 53);
      doc.text(`Vehicle: ${challan.Vehicle_No || 'N/A'}`, 20, 60);
      
      doc.text(`Date: ${formatDate(challan.Challan_Date)}`, pageWidth - 20, 53, { align: 'right' });
      doc.text(`Fine Amount: ${challan.FineAmount || '0'}`, pageWidth - 20, 60, { align: 'right' });

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(15, 75, pageWidth - 15, 75);

      // Prepare data for detailed table
      const detailedFields = Object.entries(challan)
        .filter(([key]) => !['id', 'created_at', 'updated_at', '_id', 'vehicle_details'].includes(key))
        .map(([key, value]) => ({
          label: formatFieldName(key),
          value: value !== null && value !== undefined 
            ? (typeof value === 'object' ? JSON.stringify(value) : String(value))
            : 'N/A'
        }));

      // Detailed Table
      autoTable(doc, {
        startY: 80,
        head: [['Field', 'Details']],
        body: detailedFields.map(field => [field.label, field.value]),
        theme: 'striped',
        styles: { 
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: { 
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 60 }
        },
        alternateRowStyles: {
          fillColor: [245, 250, 255]
        }
      });

      // Safely get the final Y position
      const finalY = doc.previousAutoTable ? 
        (doc.previousAutoTable.finalY || 160) : 
        160;

      // Additional Notes Section
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(14, finalY + 10, pageWidth - 28, 30, 3, 3, 'F');
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text('Important Notes:', 20, finalY + 20);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('1. Please pay the fine within 30 days of issuance.', 20, finalY + 27);
      doc.text('2. For any queries, contact the Traffic Police Department.', 20, finalY + 33);
      doc.text('3. Failure to pay may result in legal action.', 20, finalY + 39);

      // Footer
      doc.setDrawColor(100, 100, 100);
      doc.setLineDash([1, 1], 0);
      doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
      
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('© Traffic Police Department - Generated on ' + new Date().toLocaleDateString(), pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Page Number
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, pageHeight - 5, { align: 'right' });
      }

      // Save PDF
      doc.save(`Echallan_${challan.id || 'Details'}_${formatDate(challan.Challan_Date)}.pdf`);
    } catch (pdfError) {
      console.error("PDF Generation Error:", pdfError);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setPdfGenerating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box m="20px" display="flex" flexDirection="column" alignItems="center">
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
        >
          Back to E-Challans
        </Button>
      </Box>
    );
  }

  // No data state
  if (!challan) {
    return (
      <Box m="20px" display="flex" flexDirection="column" alignItems="center">
        <Alert severity="info" sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
          No challan details found for ID: {id}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={() => navigate(-1)}
        >
          Back to E-Challans
        </Button>
      </Box>
    );
  }

  return (
    <Box className="p-5 space-y-4 bg-gradient-to-br  from-blue-50 via-white to-blue-100">
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight="bold" color="primary">
            E-Challan Details
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={pdfGenerating ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdf />}
          onClick={generatePDF}
          disabled={pdfGenerating}
          sx={{ 
            boxShadow: 2,
            backgroundColor: "#1976D2",
            "&:hover": { boxShadow: 4 }
          }}
        >
          {pdfGenerating ? "Generating..." : "Download PDF"}
        </Button>
      </Box>

      {/* Summary Card */}
      <Card sx={{ mb: 3, backgroundColor: "#1976D2", boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <DirectionsCar fontSize="large" sx={{ mr: 1, color: "white" }} />
              <Box>
                <Typography variant="caption" color="white">Vehicle Number</Typography>
                <Typography variant="h6" color="white" fontWeight="bold">{challan.Vehicle_No || "N/A"}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <AttachMoney fontSize="large" sx={{ mr: 1, color: "white" }} />
              <Box>
                <Typography variant="caption" color="white">Fine Amount</Typography>
                <Typography variant="h6" fontWeight="bold" color="white">
                  ₹{challan.FineAmount || "0"}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              <CalendarToday fontSize="large" sx={{ mr: 1, color: "white" }} />
              <Box>
                <Typography variant="caption" color="white">Challan Date</Typography>
                <Typography variant="h6" color="white" fontWeight="bold">{formatDate(challan.Challan_Date)}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3} display="flex" alignItems="center">
              {challan.payed === false ? (
                <Warning fontSize="large" sx={{ mr: 1, color: "white" }} />
              ) : (
                <CheckCircle fontSize="large" sx={{ mr: 1, color: "white" }} />
              )}
              <Box>
                <Typography variant="caption" color="white">Violation Type</Typography>
                <Typography variant="h6" color="white" fontWeight="bold">{challan.ViolationType || "N/A"}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#fff", borderRadius: 2 }}>
        <Typography variant="h5" mb={2} color="primary.main">Detailed Information</Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {Object.entries(challan)
            .filter(([key]) => !["id", "created_at", "updated_at", "_id", "vehicle_details", "Vehicle_No", "FineAmount", "Challan_Date", "ViolationType"].includes(key))
            .map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <TextField
                  label={formatFieldName(key)}
                  value={
                    value !== null && value !== undefined
                      ? typeof value === "object"
                        ? JSON.stringify(value)
                        : value
                      : 'N/A'
                  }
                  fullWidth
                  InputProps={{ 
                    readOnly: true,
                    sx: { 
                      backgroundColor: "#f8f9fa",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.1)"
                      }
                    }
                  }}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              </Grid>
            ))}
        </Grid>
      </Paper>

      {/* Status Section */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, borderLeft: '5px solid', borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" fontWeight="bold">Important Notes:</Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          • Please pay the fine within 30 days of challan issuance
        </Typography>
        <Typography variant="body2" color="textSecondary">
          • For any disputes, contact the Traffic Police Department with your challan ID
        </Typography>
        <Typography variant="body2" color="textSecondary">
          • Keep a copy of this document for your records
        </Typography>
      </Paper>
    </Box>
  );
};

export default EchallanDetail;