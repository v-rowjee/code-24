import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import { AppBar } from "@mui/material";
import Colours from "../colours";

const AudioPlayerBar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        top: "auto",
        bottom: 0,
      }}
    >
      <AudioPlayer
        autoPlay
        src="C:/Users/user/Downloads/5 min.wav"
        onPlay={(e) => console.log("onPlay")}
        style={{ marginBottom: "10px" }}
      />
    </AppBar>
  );
};

export default AudioPlayerBar;
