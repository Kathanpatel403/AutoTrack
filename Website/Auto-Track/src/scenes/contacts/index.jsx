import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { tokens } from "../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];
  return (
    <Box m="20px"  height="100%" display="flex" flexDirection="column" gap="20px" >
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        
        height="75vh"
        maxWidth="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "skyblue",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-virtualScroller .MuiDataGrid-window": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-virtualScroller .MuiDataGrid-window .MuiDataGrid-viewport": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-virtualScroller .MuiDataGrid-window .MuiDataGrid-viewport .MuiDataGrid-row": {
            backgroundColor: colors.primary[400],
          },
          
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "skyblue",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: colors.primary[500],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
            color: `${colors.gray[100]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-root:hover": {
            backgroundColor: "skyblue",

          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-root.Mui-disabled": {
            color: `${colors.gray[100]} !important`,
          },
          
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          className=""
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Contacts;
