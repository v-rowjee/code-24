import React from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import { Button, InputBase, IconButton, ListItemText, ListItem, List, ListItemButton, Divider, Drawer, ListItemIcon, Typography, AppBar, Box, Toolbar, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

import Colours from '../colours';

import { UserAuth } from '../config/auth';


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

        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVOMEl5T1RWQk1UZEVRVEEzUlRZNE16UkJPVU00UVRRM016TXlSalUzUmpnMk4wSTBPQSJ9.eyJodHRwczovL3VpcGF0aC9lbWFpbCI6Imxvby5raW0tc29vMUB1bWFpbC51b20uYWMubXUiLCJodHRwczovL3VpcGF0aC9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LnVpcGF0aC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDc0MDE5ODcwNjA3NTk2NDQyMjciLCJhdWQiOlsiaHR0cHM6Ly9vcmNoZXN0cmF0b3IuY2xvdWQudWlwYXRoLmNvbSIsImh0dHBzOi8vdWlwYXRoLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTgzMDI1NDAsImV4cCI6MTY5ODM4ODk0MCwiYXpwIjoiOERFdjFBTU5YY3pXM3k0VTE1TEwzallmNjJqSzkzbjUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIn0.igQUbXUZLujAwo42WmWFmm-5YQPg8vJJgWuwdZh0_e6GdguGlWsnvICM6Xe1d-aAJ9GAjZ_IeyJYnD01Rsdd4t1St1Pm3HfsXM8BVwto48lsh10qQ1Yu1nnii-FBGubHs6WaSjsec6WP4Gn1U8rStZ8mdoFRFHtxWLUaThdDc6nZ9T8aLMbczg18aRXaPae9OV8b3A2Sa9uqBMmtJ-r8zVOpxACcNDcKDfPdyJjIQuaBAe1kQUKQnxAPzqGUXvXnMACPw9TjXTYqmSzDqOq707K1XRvHP5V6_tMh_tBkBGd4dflmWNLkiEpaATWa7MJ2o3vKCGuKB9_lq87XJw18lQ"; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token

        await axios.post('https://cloud.uipath.com/uomvcizzgy/DefaultTenant/orchestrator_/odata/Queues/UiPathODataSvc.AddQueueItem', {
            itemData: {
                DeferDate: "2021-03-11T14:19:56.4407392Z",
                DueDate: "2021-03-11T15:19:56.4407392Z",
                Priority: "Normal",
                Name: "GmeetStartRecording",
                SpecificContent: {
                    "meetURL@odata.type": "#String",
                    meetURL: `${meetingUrl}`,
                    "newRecordID@odata.type": "#String",
                    newRecordID: "92376",
                    "dBChromeProfilePath@odata.type": "#String",
                    dBChromeProfilePath: "C:/Alex/Docs1/1_Codings/RPA_UIPath/ChromeProfiles/BrowserDataFolder",
                    "machineID@odata.type": "#String",
                    machineID: "1"
                },
                Reference: "92376"
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-UIPATH-OrganizationUnitId': 4854455
            }
        })
            .then(response => {
                console.log('Queue item added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding queue item:', error);
            });
    }

    return (
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
                            <IconButton type='submit' disabled={isMeetingUrlDisabled} sx={{ display: { xs: "none", md: 'inline-flex' } }}>
                                <SendIcon fontSize="small" />
                            </IconButton>
                        </Search>
                    </form>
                    <Button
                        component="label"
                        ref={fileInput}
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
                        Upload
                        <VisuallyHiddenInput type="file" />
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
    )
}

export default AppBarHome;