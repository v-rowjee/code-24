import React, { useState, useEffect } from "react";
import { Typography, Divider, Stack, Avatar, Box } from "@mui/material";
import Colours from "../colours";
import BottomAppBar from "./audioPlayer";
import API_URLS from "../url";
import axios from "axios";

const Transcript = ({ meetingId }) => {
  const [transcriptData, setTranscriptData] = useState([]);

  const fetchInfo = async () => {
    try {
      const idToken = localStorage.getItem("token_flask");
      const headers = {
        Authorization: `${idToken}`
      };
      const response = await axios.get(API_URLS.getTranscripts(meetingId),{headers});
      setTranscriptData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Box marginRight="24px">
      <Typography variant="h4">Transcript</Typography>
      <Divider />
      {transcriptData?.transcript?.map((item, index) => (
        <Stack direction="column" spacing={1} key={index} marginTop={1}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ bgcolor: Colours.primaryOrange, width: 28, height: 28 }}
            >
              {item.speaker.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ fontWeight: 600 }}>{item.speaker}</Typography>
            <Typography sx={{ color: Colours.cardText }}>
              {item.start_time.length === 9
                ? item.start_time.slice(0, 5)
                : item.start_time.slice(0, 8)}
            </Typography>
          </Stack>
          <Typography paragraph textAlign="justify">
            {/*click on text and sync audio accordingly */}
            {item.text}
          </Typography>
          <Divider />
        </Stack>
      ))}
      {/* <BottomAppBar /> */}
    </Box>
  );
};

export default Transcript;
