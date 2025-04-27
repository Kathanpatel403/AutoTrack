import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {

  MenuOutlined,

} from "@mui/icons-material";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

import avatar from "../../../assets/images/ATFE.png";
import logo from "../../../assets/images/ATFE.svg";
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Sidebar
      backgroundColor="#ffffff"
      rootStyles={{ border: 0, height: "100%" }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
      overflow="auto"
      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", zIndex: 100 }}
    >
      <Menu
        menuItemStyles={{ button: { ":hover": { background: "transparent" } } }}
      >
        <MenuItem rootStyles={{ margin: "10px 0 20px 0", color: "black" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="26px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "2px",
                    marginTop: "5px",
                  }}
                  src={logo}
                  alt="Auto Track"
                />
                <Link to="/admin-home">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="rgb(59 130 229)"
                  >
                    Auto Track
                  </Typography>
                </Link>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="600" color="rgb(59 130 229)">
              {localStorage.getItem("first_name") + " " + localStorage.getItem("last_name") || "Guest"}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color="black"
              sx={{ m: "3px 0 0 0" }}
            >
              {localStorage.getItem("role") || "Guest"}
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={3} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#388FEB",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<LayoutDashboard />}
          />
        </Menu>
        <Typography
          variant="h6"
          fontSize={17}
          fontWeight={400}
          color={colors.gray[200]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "User Management" : " "}
        </Typography>{" "}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Manage Team"
            path="/admin-team"
            colors={colors}
            icon={<Users />}
          />
          <Item
            title="Add Police Officer"
            path="/admin-form"
            colors={colors}
            icon={<UserPlus />}
          />
        </Menu>
        <Typography
          variant="h6"
          fontSize={17}
          fontWeight={400}
          color={colors.gray[200]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Invoice Management" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="E-Challan Invoices"
            path="/echallan"
            colors={colors}
            icon={<FileText />}
          />
          <Item
            title="E-Challan Verification"
            path="/admin-echallanverification"
            colors={colors}
            icon={<ShieldCheck />}
          />
        </Menu>
        <Typography
          variant="h6"
          fontSize={17}
          fontWeight={400}
          color={colors.gray[200]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Profile" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="My Profile"
            path="/Profile"
            colors={colors}
            icon={<UserCircle />}
          />
          
        </Menu>
       
        {/* E-Challan Query Section */}
      </Box>
    </Sidebar>
  );
};

export default SideBar;
