import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHouseUser, FaMoneyBillWave } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { IoCaretBack } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md"; // For Supplier Management
import { Box, List, ListItem, ListItemIcon } from "@mui/material";
import { styled } from "@mui/system";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion"; // Import framer-motion for animations
import { FaAddressCard } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { ImHammer } from "react-icons/im";
const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "800px",
  backgroundColor: "#e5e5e5", // Match the light grey color from the image
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20px",
  borderRadius: "0 0 200px", // Rounded corner similar to the image
  [theme.breakpoints.up("md")]: {
    width: "100px", // Wider sidebar on medium screens and up
  },
}));

const IconWrapper = styled(ListItemIcon)(() => ({
  minWidth: "auto",
  justifyContent: "center",
}));

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarContainer className="bg-cyan-200">
        <List component="nav">
        
          <Tooltip title="Admin Home" arrow>
            <motion.div whileHover={{ scale: 1.5 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/AdminHome")}
                className="  rounded-md"
              >
                <IconWrapper>
                  <FaHouseUser className="w-8 h-8 text-red-800" />
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="User Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/usermanagement")}
                className=""
              >
                <IconWrapper>
                  <FaUsers className="w-10 h-10" />
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Inventory Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Inventory_Managment")}
                className=""
              >
                <IconWrapper>
                  <MdInventory2 className="w-10 h-10" />{" "}
                  {/* Replace with an inventory icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Maintenance Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Maintainingdashboard")}
                className=""
              >
                <IconWrapper>
                  <ImHammer className="w-10 h-10" />{" "}
                  {/* Replace with a maintenance icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Employee Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Employee_Management")}
                className="py-3"
              >
                <IconWrapper>
                  <FaUsers className="w-10 h-10" />{" "}
                  {/* Replace with an employee icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Quality Control" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/QualityControllerManeger")}
                className="py-3"
              >
                <IconWrapper>
                  <FaClipboardList className="w-10 h-10" />{" "}
                  {/* Replace with a quality control icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Supplier Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Supplier")}
                className="py-3"
              >
                <IconWrapper>
                  <MdLocalShipping className="w-10 h-10" />
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Finance management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/FinancialManagement")}
                className="py-3"
              >
                <IconWrapper>
                  <FaAddressCard className="w-10 h-10" />
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Order Management" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Orderdashboard")}
                className="py-3"
              >
                <IconWrapper>
                  <FaBox className="w-10 h-10" />{" "}
                  {/* Replace with an order management icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>

          <Tooltip title="Feedback" arrow>
            <motion.div whileHover={{ scale: 1.1 }}>
              <ListItem
                button
                onClick={() => handleNavigation("/Feedback")}
                className=""
              >
                <IconWrapper>
                  <MdFeedback className="w-10 h-10" />{" "}
                  {/* Replace with a feedback icon */}
                </IconWrapper>
              </ListItem>
            </motion.div>
          </Tooltip>
        </List>
      </SidebarContainer>

      <main className="flex-1 ml-auto p-6">{/* Add main content here */}</main>
    </div>
  );
};

export default AdminDashboard;
