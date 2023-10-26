import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import { AppBar, Paper } from "@mui/material";
import Colours from "../colours";
import testAudio from "../assets/testAudio.wav"

const AudioPlayerBar = () => {
  return (
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
  );
};

export default AudioPlayerBar;
