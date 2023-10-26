import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Typography, Divider, Stack, Avatar, Box, Button, Paper } from "@mui/material";
import Colours from "../colours";
import API_URLS from "../url";
import axios from "axios";
import AudioPlayerBar from "./audioPlayer";
import testAudio from "../assets/testAudio.wav"


const Transcript = ({ meetingId }) => {
  const [transcriptData, setTranscriptData] = useState([]);

  const fetchInfo = async () => {
    try {
      const idToken = localStorage.getItem("token_flask");
      const headers = {
        Authorization: `${idToken}`
      };
      const response = await axios.get(API_URLS.getTranscripts(meetingId), { headers });
      setTranscriptData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleClickTranscript = (time) => {
    alert(time)
  }

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
          <Box textAlign="start">
            <Button sx={{ textAlign: "start", textTransform: 'none', color: Colours.darkText }} onClick={() => { handleClickTranscript(item.start_time) }}>
              {item.text}
            </Button>
          </Box>
          <Divider />
        </Stack>
      ))}
      <Paper
        sx={{
          position: 'sticky',
          bottom: 6,
          mt: 2
        }}
      >
        <AudioPlayer
          src={testAudio}
          style={{ marginBottom: "10px", borderRadius: "5px" }}
        />
      </Paper>
    </Box>
  );
};

export default Transcript;
