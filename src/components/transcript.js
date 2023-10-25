import React, { useState, useEffect } from "react";
import { Typography, Divider, Stack, Avatar, Box } from "@mui/material";
import Colours from "../colours";
import BottomAppBar from "./audioPlayer";
import API_URLS from "../url";
import axios from "axios";

const meetingArray = [
  {
    start_time: "00:02.380",
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    speaker: "aisha a",
  },
  {
    start_time: "00:23.281",
    text: "This is a long text that may not fit in a single row and should wrap to the next line as needed. This is a long text that may not fit in a single row and should wrap to the next line as needed.",
    speaker: "mehshar m",
  },
  {
    start_time: "00:26.371",
    text: "ddddddddddddddddddddddddddd",
    speaker: "ved v",
  },
  {
    start_time: "00:02.380",
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    speaker: "aisha a",
  },
  {
    start_time: "00:23.281",
    text: "This is a long text that may not fit in a single row and should wrap to the next line as needed. This is a long text that may not fit in a single row and should wrap to the next line as needed.",
    speaker: "mehshar m",
  },
  {
    start_time: "00:26.371",
    text: "ddddddddddddddddddddddddddd",
    speaker: "ved v",
  },
  {
    start_time: "00:02.380",
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    speaker: "aisha a",
  },
  {
    start_time: "00:23.281",
    text: "This is a long text that may not fit in a single row and should wrap to the next line as needed. This is a long text that may not fit in a single row and should wrap to the next line as needed.",
    speaker: "mehshar m",
  },
  {
    start_time: "00:26.371",
    text: "ddddddddddddddddddddddddddd",
    speaker: "ved v",
  },
];

const Transcript = ({ meetingId }) => {
  const [transcriptData, setTranscriptData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getTranscripts(meetingId));
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
