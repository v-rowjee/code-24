import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Grid, Stack, Select, MenuItem, Typography, Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MeetingCard from '../components/meetingCard';
import AppBar from '../components/appbarHome';
import Colours from '../colours';
import axios from 'axios';
import { MeetingRoom } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(Colours.cardText, 0.15),
    '&:hover': {
        backgroundColor: alpha(Colours.cardText, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '15ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const meetingData = {
    name: 'xwk-rivn-dlk',
    speakers: ['Jean Black', 'Paul White', 'Pierre Brown', 'Jack Green'],
    startTime: '10:35',
    duration: '13 min',
    date: '25 Oct 2023',
    hostName: 'John Doe',
};

const Home = () => {

    const [meetings, setMeetings] = React.useState([meetingData, meetingData, meetingData, meetingData, meetingData]);
    const [meetingType, setMeetingType] = React.useState('All');
    const [query, setQuery] = React.useState('');

    const handleChange = (event) => {
        setMeetingType(event.target.value);
    };

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
    //             setMeetings(data.results)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }

    //     fetchData()
    // }, [query, setMeetings])

    return (
        <>
            <AppBar />
            <Box sx={{ p: 3 }} component="main">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" justifyContent="start" alignItems="center">
                            {/* <MeetingRoom sx={{ fontSize: 40, mr: 1 }} /> */}
                            <Typography component="h1" variant="h3" fontWeight="bold" sx={{ pb: 2, pt: 1 }}>Meetings</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" justifyContent="end" alignItems="center">
                            <Select
                                value={meetingType}
                                onChange={handleChange}
                                sx={{ mr: 2, px: { md: 2 } }}
                                size='small'
                            >
                                <MenuItem value={"All"} sx={{ px: { md: 2 } }} selected>All Meetings</MenuItem>
                                <MenuItem value={"Hosted"} sx={{ px: { md: 2 } }}>Hosted Only</MenuItem>
                                <MenuItem value={"Shared"} sx={{ px: { md: 2 } }}>Shared Only</MenuItem>
                            </Select>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search meeting"
                                    value={query}
                                    onChange={event => setQuery(event.target.value)}
                                />
                            </Search>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    {meetings.map((data, index) => (
                        <Grid item xs={12} md={6} key={index} sx={{ p: 2 }}>
                            <MeetingCard data={data} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Home;