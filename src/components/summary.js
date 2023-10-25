import React from "react";
import { Typography, Divider } from "@mui/material";

const SummaryTab = () => {
  return (
    <>
      <Typography variant="h4">Summary</Typography>
      <Divider />
      <Typography paragraph textAlign="justify">
        In this meeting, the team discusses tasks for a new project. The first
        task is data collection, with Ayesha responsible for recording the next
        session with clients using an existing app. The deadline for this
        delivery is Thursday. The team also needs to investigate how to generate
        a transcript using automatic speech recognition, with Junaid assigned to
        this task. They will evaluate licensed software and open source
        solutions. The team decides that an audio recording will suffice. The
        meeting concludes with a discussion about the schedule for the next day.
      </Typography>
    </>
  );
};

export default SummaryTab;
