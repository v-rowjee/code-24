import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled, alpha } from '@mui/material/styles';
import { Button, InputBase, IconButton, ListItemText, ListItem, List, ListItemButton, Divider, Drawer, ListItemIcon, Typography, AppBar, Box, Toolbar, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

import Colours from '../colours';

import { UserAuth } from '../config/auth';
import API_URL from '../url';

// search input field
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(Colours.secondaryOrange, 0.8),
    '&:hover': {
        backgroundColor: alpha(Colours.secondaryOrange, 1),
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
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
            '&:focus': {
                width: '35ch',
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

// url pattern for google meet
const googleMeetUrlPattern = /^(https?:\/\/)?(www\.)?meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;


const AppBarHome = () => {

    const { googleSignOut } = UserAuth();
    const fileInput = React.useRef();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [meetingUrl, setMeetingURL] = React.useState('');
    const [isMeetingUrlDisabled, setIsMeetingUrlDisabled] = React.useState(true);
    const [uploadIsLoading, setUploadIsLoading] = React.useState(false);
    const [meetingUrlIsLoading, setMeetingUrlIsLoading] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogOut = async () => {
        try {
            await googleSignOut()
        } catch (error) {
            console.error(error)
        }
    }
    const handleUpload = () => {
        const formData = new FormData();
        const audioFile = fileInput.current.files[0];

        const userId = localStorage.getItem('user_id') // Replace this with your actual user_id logic
        const userEmail = localStorage.getItem('user_email') // Replace this with your actual user_email logic

        if (audioFile && userId) {
            formData.append('audio', audioFile);
            formData.append('user_id', userId);
            formData.append('user_email', userEmail)
            formData.append('filename', audioFile.name);

            setUploadIsLoading(true);
            toast("Uploading file")

            fetch(API_URL.postAudio, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    setUploadIsLoading(false);
                    toast("File uploaded successfully");
                })
                .catch(error => {
                    setUploadIsLoading(false);
                    toast("Error in uploading file");
                });
        } else {
            toast("Error in uploading file")
        }
    };



    const handleChangeMeetingURL = (event) => {
        const input = event.target.value;

        setIsMeetingUrlDisabled(input === '')

        const isValid = googleMeetUrlPattern.test(input);
        setIsMeetingUrlDisabled(!isValid);

        setMeetingURL(input);
    }

    const handleSubmitMeetingURL = async (event) => {
        event.preventDefault();

        const input = meetingUrl;
        const isValid = googleMeetUrlPattern.test(input);
        setIsMeetingUrlDisabled(!isValid);

        const user_id = localStorage.getItem('user_id');

        meetingUrlIsLoading(true);

        await axios.post(API_URL.postMeetingUrl, {
            "meetURL": meetingUrl,
            "user_id": user_id
        })
            .then(response => {
                setMeetingUrlIsLoading(false);
                toast("Recording will start soon");
            })
            .catch(error => {
                setMeetingUrlIsLoading(false);
                toast("Error in starting recording");
            })
            .finally(() => {
                setMeetingURL('');
            })
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" component="nav">
                    <Toolbar sx={{ justifyContent: "space-between", px: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
                        >
                            CODE-24
                        </Typography>
                        <form onSubmit={handleSubmitMeetingURL}>
                            <Search sx={{ mr: 2 }}>
                                <SearchIconWrapper>
                                    <VideocamIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Paste Meeting URL"
                                    onChange={handleChangeMeetingURL}
                                    value={meetingUrl}
                                />
                                <IconButton type='submit' disabled={isMeetingUrlDisabled || meetingUrlIsLoading} sx={{ display: { xs: "none", md: 'inline-flex' } }}>
                                    {meetingUrlIsLoading ? <CircularProgress size="1.5rem" /> : <SendIcon fontSize="small" />}
                                </IconButton>
                            </Search>
                        </form>
                        <Button
                            component="label"
                            variant="contained"
                            sx={{
                                px: { xs: 3, sm: 1, md: 2 },
                                mr: 2,
                                textTransform: 'none',
                                display: { xs: "none", sm: 'flex' },
                                backgroundColor: alpha(Colours.secondaryOrange, 0.8),
                                "&:hover": { backgroundColor: Colours.secondaryOrange }
                            }}
                            startIcon={<CloudUploadIcon />}
                            disableElevation
                        >
                            {uploadIsLoading ? <CircularProgress size="1.5rem" /> : 'Upload'}

                            <VisuallyHiddenInput type="file"
                                ref={fileInput}
                                style={{ display: 'none' }}
                                onChange={handleUpload} />
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                px: { xs: 3, sm: 1, md: 2 },
                                display: { xs: "none", sm: 'flex' },
                                textTransform: 'none',
                                backgroundColor: alpha(Colours.secondaryOrange, 0.8),
                                "&:hover": { backgroundColor: Colours.secondaryOrange }
                            }}
                            startIcon={<LogoutIcon />}
                            disableElevation
                            onClick={() => handleLogOut()}
                        >
                            Log Out
                        </Button>
                        <IconButton
                            sx={{ display: { xs: "flex", sm: 'none' }, ml: 1 }}
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
                                    <ListItemButton selected onClick={handleLogOut}>
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
        </>
    )
}

export default AppBarHome;