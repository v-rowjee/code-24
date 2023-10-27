import React from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  Box,
  InputBase,
  Skeleton,
  Divider,
} from "@mui/material";
import MeetingCard from "../components/meetingCard";
import AppBar from "../components/appbarHome";
import Colours from "../colours";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import API_URLS from "../url";


const Home = () => {
  const userId = localStorage.getItem("user_id");
  const [meetings, setMeetings] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [actionItems, setActionItems] = React.useState([]);
  const [loadingActionItems, setLoadingActionItems] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDateChange = async (date) => {
    setLoadingActionItems(true);
    await showActionItems(date);
    setSelectedDate(date);
    setLoadingActionItems(false);
  };

  const showActionItems = async (date) => {
    try {
      const actionItemData = await axios.get(API_URLS.getActionItems(date));
      setActionItems(actionItemData.data.action_items);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URLS.getMeetings(userId));
        setLoading(false);
        setMeetings(data.meetings);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataActionItems = async () => {
      try {
        setLoadingActionItems(true);
        const actionItemData = await axios.get(API_URLS.getActionItems(selectedDate));
        setLoadingActionItems(false);
        setActionItems(actionItemData.data.action_items);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    fetchDataActionItems();
  }, []);

  return (
    <>
      <AppBar />
      <Box sx={{ p: 3, mt: "64px" }} component="main">
        <Grid container justifyContent="space-evenly">
          <Grid item xs={12} md={8} sx={{ flexGrow: 1 }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mx: 3, width: "auto" }}
            >
              <Grid item xs={12} md={6}>
                <Typography
                  component="h1"
                  variant="h3"
                  fontWeight="bold"
                  sx={{ pb: 1, pt: 1, mr: { sx: 3, md: 0 } }}
                >
                  Meetings
                </Typography>
              </Grid>
            </Grid>
            {loading
              ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    height="200px"
                    sx={{ m: 3, borderRadius: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height="200px"
                    sx={{ m: 3, borderRadius: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height="200px"
                    sx={{ m: 3, borderRadius: 2 }}
                  />
                </>
              )

              : <Box>{
                meetings.map((data, index) => (
                  <Box sx={{ m: 3 }} id={index}>
                    <MeetingCard data={data} />
                  </Box>
                ))
              }
              </Box>
            }
          </Grid>
          <Grid item xs={12} md={"auto"} sx={{ flexGrow: 1 }}>
            <Typography
              component="h1"
              variant="h3"
              fontWeight="bold"
              sx={{ pb: 1, pt: 1, ml: 3 }}
            >
              Calendar
            </Typography>
            {loadingActionItems
              ? <Skeleton variant="rectangular" height="290px" width="365px" sx={{ m: 3, borderRadius: 2 }} />
              : <Paper
                sx={{
                  m: { sx: 0, md: 3 },
                  p: { sx: 0, md: 3 },
                  pb: 0,
                  borderRadius: 2,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    views={["day", "month", "year"]}
                    fixedWeekNumber={5}
                    showDaysOutsideCurrentMonth
                    sx={{ height: "290px" }}
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Paper>
            }
            <Typography
              component="h2"
              variant="h4"
              fontWeight="bold"
              sx={{ pt: 1, ml: 3 }}
            >
              Action Items
            </Typography>
            {loadingActionItems
              ? <Skeleton variant="rectangular" height="290px" width="365px" sx={{ m: 3, borderRadius: 2 }} />
              : <Paper
                sx={{
                  m: { sx: 0, md: 3 },
                  p: { sx: 0, md: 3 },
                  pb: 0,
                  borderRadius: 2,
                  maxWidth: "365px",
                }}
              >
                <Typography component="h5" variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{selectedDate.format("DD MMM YYYY")}</Typography>
                {actionItems.map((data, index) => (
                  <>
                    <Typography key={index}>{data.content}</Typography>
                    {index < actionItems.length - 1 && <Divider sx={{ my: 2 }} />}
                  </>
                ))}
              </Paper>
            }
          </Grid>
        </Grid>
      </Box >
    </>
  );
};

export default Home;
