import React, { useState, useEffect } from "react";
import { Typography, Divider, Stack } from "@mui/material";
import API_URLS from "../url";
import axios from "axios";

const KeyPointsTab = ({ meetingId }) => {
  const [keyPointsData, setKeyPointsData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getKeypoint(meetingId));
      setKeyPointsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Key Points</Typography>
      {keyPointsData?.keypoint?.map((item, index) => (
        <Stack direction="column" spacing={1} key={index} marginTop={1}>
          <Typography paragraph textAlign="justify">
            {item}
          </Typography>
          <Divider />
        </Stack>
      ))}
    </>
  );
};

export default KeyPointsTab;
