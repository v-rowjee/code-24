import React from "react";
import { Typography, Divider, Stack, Avatar, Box } from "@mui/material";
import Colours from "../colours";

const meetingArray = [
  {
    startTime: "00:02.380",
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    speaker: "aisha a",
  },
  {
    startTime: "00:23.281",
    text: "This is a long text that may not fit in a single row and should wrap to the next line as needed. This is a long text that may not fit in a single row and should wrap to the next line as needed.",
    speaker: "mehshar m",
  },
  {
    startTime: "00:26.371",
    text: "ddddddddddddddddddddddddddd",
    speaker: "ved v",
  },
];

const Transcript = () => {
  return (
    <Box marginRight="24px">
      <Typography variant="h4">Transcript</Typography>
      <Divider />
      {meetingArray.map((item, index) => (
        <Stack direction="column" spacing={1} key={index} marginTop={1}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{ bgcolor: Colours.primaryOrange, width: 28, height: 28 }}
            >
              {item.speaker.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ fontWeight: 600 }}>{item.speaker}</Typography>
            <Typography sx={{ color: Colours.cardText }}>
              {item.startTime.slice(0, 5)}
            </Typography>
          </Stack>
          <Typography paragraph textAlign="justify">
            {item.text}
          </Typography>
          <Divider />
        </Stack>
      ))}
    </Box>
  );
};

export default Transcript;
