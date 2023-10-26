import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import { AppBar, CssBaseline } from "@mui/material";
import Colours from "../colours";
const BottomAppBar = () => {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: Colours.primaryOrange,
        }}
      >
        <AudioPlayer
          autoPlay
          src="C:/Users/user/Downloads/5 min.wav"
          onPlay={(e) => console.log("onPlay")}
        />
      </AppBar>
    </React.Fragment>
  );
};

export default BottomAppBar;
