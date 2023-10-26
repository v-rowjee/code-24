import React from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import { Grid, Paper, Typography, Box, InputBase, Skeleton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MeetingCard from '../components/meetingCard';
import AppBar from '../components/appbarHome';
import Colours from '../colours';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import API_URLS from '../url';


// Search input field
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



const Home = () => {
    const userId = localStorage.getItem('user_id');
    const [meetings, setMeetings] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [loading, setLoading] = React.useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(API_URLS.getMeeting(userId))
                setLoading(false)
                console.log(data)
                setMeetings(data.meetings)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <AppBar />
            <Box sx={{ p: 3, mt: "64px" }} component="main">
                <Grid container justifyContent="space-evenly">
                    <Grid item xs={12} lg={8} sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mx: 3, width: "auto" }}>
                            <Grid item xs={12} md={6}>
                                <Typography component="h1" variant="h3" fontWeight="bold" sx={{ pb: 1, pt: 1, mr: { sx: 3, md: 0 } }}>Meetings</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Search sx={{ mr: { sx: 6 } }}>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search meeting"
                                        value={query}
                                        onChange={event => setQuery(event.target.value)}
                                    />
                                </Search>
                            </Grid>
                        </Grid>
                        {loading &&
                            <Box>
                                <Skeleton variant="rectangular" height="200px" sx={{ m: 3, borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height="200px" sx={{ m: 3, borderRadius: 2 }} />
                                <Skeleton variant="rectangular" height="200px" sx={{ m: 3, borderRadius: 2 }} />
                            </Box>
                        }
                        {meetings.map((data, index) => (
                            <Box sx={{ m: 3 }} id={index} >
                                <MeetingCard data={data} />
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={12} lg={"auto"} sx={{ flexGrow: 1 }}>
                        <Typography component="h1" variant="h3" fontWeight="bold" sx={{ pb: 1, pt: 1, ml: 3 }}>Calendar</Typography>
                        <Paper sx={{ m: { sx: 0, md: 3 }, p: { sx: 0, md: 3 }, pb: 0, borderRadius: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    views={['day', 'month', 'year']}
                                    fixedWeekNumber={5}
                                    showDaysOutsideCurrentMonth
                                    sx={{ height: "290px" }}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </Paper>
                        <Typography component="h2" variant="h4" fontWeight="bold" sx={{ pt: 1, ml: 3 }}>Action Items</Typography>
                        <Paper sx={{ m: { sx: 0, md: 3 }, p: { sx: 0, md: 3 }, pb: 0, borderRadius: 2 }}>
                            {selectedDate.format('DD MMM YYYY')}
                        </Paper>

                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default Home;