import React, { useState, useEffect } from "react";
import { Typography, Divider, Paper } from "@mui/material";
import API_URLS from "../url";
import axios from "axios";

const SummaryTab = ({ meetingId }) => {
  const [summaryData, setSummaryData] = useState("");

  const fetchInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getSummary(meetingId));
      setSummaryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Summary</Typography>
      <Typography paragraph textAlign="justify" marginTop={1}>
        {summaryData.summary}
      </Typography>
    </>
  );
};

export default SummaryTab;
