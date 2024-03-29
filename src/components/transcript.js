import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  Typography,
  Divider,
  Stack,
  Avatar,
  Box,
  Button,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Colours from "../colours";
import API_URLS from "../url";
import axios from "axios";

//modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Transcript = ({ meetingId }) => {
  const [transcriptData, setTranscriptData] = useState([]);

  const fetchTranscript = async () => {
    try {
      const idToken = localStorage.getItem("token_flask");
      const headers = {
        Authorization: `${idToken}`,
      };
      const response = await axios.get(API_URLS.getTranscripts(meetingId), {
        headers,
      });
      setTranscriptData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [audioData, setAudioData] = useState("");

  const fetchAudio = async () => {
    try {
      const idToken = localStorage.getItem("token_flask");
      const headers = {
        Authorization: `${idToken}`,
      };
      const response = await axios.get(API_URLS.getAudio(meetingId), {
        headers,
      });
      setAudioData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTranscript();
    fetchAudio();
  }, []);

  //sync audio with transcript
  const audioPlayerRef = useRef(null);

  const handleClickTranscript = (timestamp) => {
    if (timestamp.length === 9) {
      timestamp = timestamp.slice(0, 5);
    } else {
      timestamp = timestamp.slice(0, 8);
    }

    // Convert the timestamp to seconds
    const parts = timestamp.split(":");

    let totalSeconds = 0;
    if (parts.length === 3) {
      // The timestamp is in the "hh:mm:ss" format
      const [hours, minutes, seconds] = parts.map(Number);
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else {
      // The timestamp is in the "mm:ss" format
      const [minutes, seconds] = parts.map(Number);
      totalSeconds = minutes * 60 + seconds;
    }

    if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
      const audioElement = audioPlayerRef.current.audio.current;
      audioElement.currentTime = totalSeconds;
      audioElement.play();
    }
  };

  //edit modal
  const [open, setOpen] = useState(false);
  const [oldSpeakerName, setOldSpeakerName] = React.useState("");
  const [value, setValue] = useState("");
  const handleOpen = (name) => {
    setOpen(true);
    setOldSpeakerName(name);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    await axios.post(API_URLS.postSpeakerName, {
      meeting_id: meetingId,
      old_speakername: oldSpeakerName,
      new_speakername: value,
    });
    window.location.reload();
    handleClose();
  };

  const handleChange = (event) => {
    // gives the value of the targetted element
    let value = event.target.value;
    setValue(value);
  };

  return (
    <Box marginRight="24px">
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Transcript</Typography>
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
            <div>
              <Tooltip title="Edit Speaker Name" arrow placement="top">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleOpen(item.speaker)}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}
              >
                <DialogTitle>Edit Speaker Name</DialogTitle>
                <DialogContent dividers>
                  <TextField
                    margin="dense"
                    onChange={handleChange}
                    value={value}
                    id="name"
                    label="Speaker Name"
                    variant="outlined"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Stack>
          <Box textAlign="start">
            <Button
              sx={{
                textAlign: "justify",
                textTransform: "none",
                color: Colours.darkText,
              }}
              onClick={() => {
                handleClickTranscript(item.start_time);
              }}
            >
              {item.text}
            </Button>
          </Box>
          <Divider />
        </Stack>
      ))}
      <Paper
        sx={{
          position: "sticky",
          bottom: 6,
          mt: 2,
        }}
      >
        <AudioPlayer
          ref={audioPlayerRef}
          src={audioData.audio}
          style={{ marginBottom: "10px", borderRadius: "5px" }}
          progressJumpStep={10000}
        />
      </Paper>
    </Box>
  );
};

export default Transcript;
