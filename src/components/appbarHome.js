import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, InputBase, IconButton, ListItemText, ListItem, List, ListItemButton, Divider, Drawer, ListItemIcon, Typography, AppBar, Box, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import LogoutIcon from '@mui/icons-material/Logout';

import Colours from '../colours';


// search input field
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(Colours.secondaryOrange, 0.8),
    '&:hover': {
        backgroundColor: Colours.secondaryOrange,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

// upload file button
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// Drawer responsive
const navItems = ['Home', 'About', 'Contact'];


export default function AppBarHome() {

    const fileInput = React.useRef();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" component="nav">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        CODE-24
                    </Typography>
                    <Search sx={{ mr: 3 }}>
                        <SearchIconWrapper>
                            <LinkIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Paste Meeting URL..."
                        />
                    </Search>
                    <Button
                        component="label"
                        ref={fileInput}
                        variant="contained"
                        sx={{
                            px: { xs: 4, md: 2 },
                            display: { xs: "none", sm: 'flex' },
                            backgroundColor: alpha(Colours.secondaryOrange, 0.8),
                            "&:hover": { backgroundColor: Colours.secondaryOrange }
                        }}
                        startIcon={<CloudUploadIcon />}
                        disableElevation
                    >
                        Upload
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <IconButton
                        sx={{ display: { xs: "flex", sm: 'none' } }}
                        onClick={() => fileInput.current.click()}
                    >
                        <CloudUploadIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ my: 1.5 }}>
                            CODE-24
                        </Typography>
                        <Divider />
                        <List>
                            <ListItem >
                                <ListItemButton onClick={() => fileInput.current.click()}>
                                    <ListItemIcon>
                                        <CloudUploadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Upload" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{ position: "fixed", bottom: 0, maxWidth: "240px" }}>
                                <ListItemButton selected>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </nav>
        </Box>
    )
}