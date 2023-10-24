import React from "react";
import {
  Box,
  AppBar,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  // Link,
  ListItem,
  ListItemButton,
  // ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { Menu, Share } from "@mui/icons-material";
import Colours from "./colours";

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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        style={{ height: "64px", backgroundColor: Colours.primaryOrange }}
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="outlined"
              sx={{
                color: Colours.lightText,
                borderColor: Colours.lightText,
              }}
              startIcon={<Share />}
            >
              Share
            </Button>
          </Box>
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
