import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { FaUsers, FaHouseUser } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { IoCaretBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  
);

const AdminDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar className="bg-green-800">
          <IconButton edge="start" color="inherit" >
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium  " focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
            </svg>
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="font-semibold " >
            Soba Tea
          </Typography>
        </Toolbar>
      </AppBar>
      <CustomDrawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton  >
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium bg-black" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
            </svg>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => navigate('/')}>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoCaretBack className="w-10 h-10" />
              </ListItemIcon>
              {open && <ListItemText primary="Back" />}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => navigate('/AdminHome')}>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FaHouseUser className="w-10 h-7  hover:scale-125" />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => navigate('/usermanagement')}>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FaUsers className="w-10 h-7  hover:scale-125" />
              </ListItemIcon>
              {open && <ListItemText primary="User Management"  />}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => navigate('/equipmentmaintenancemanagement')}>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <GrServices className="w-12 h-12  hover:scale-125" />
              </ListItemIcon>
              {open && <ListItemText primary="Maintenance" />}
            </ListItemButton>
          </ListItem>
        </List>
      </CustomDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
