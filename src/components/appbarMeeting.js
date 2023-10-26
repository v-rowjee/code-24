import React from "react";
import axios from "axios";
import {
  Box,
  AppBar,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { alpha } from '@mui/material/styles';
import { Menu, Share } from "@mui/icons-material";
import Colours from "../colours";
import API_URLS from "../url";

const drawerWidth = 240;
const navItems = [
  "Share",
  "Summary",
  "Keypoint",
  "Action Item",
  "Sentiment Analysis",
  "Meeting Insight",
];

const DrawerAppBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MEETING
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleShare = async () => {
    await axios.post()
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        style={{ backgroundColor: Colours.primaryOrange }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MEETING
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: alpha(Colours.secondaryOrange, 0.8),
              "&:hover": { backgroundColor: Colours.secondaryOrange },
              ml: "auto"
            }}
            startIcon={<Share />}
            disableElevation
            size="small"
            onClick={() => handleShare()}
          >
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            backgroundColor: Colours.secondaryOrange,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default DrawerAppBar;
