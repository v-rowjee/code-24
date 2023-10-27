import React, { useState, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import API_URLS from "../url";
import axios from "axios";

const SentimentAnalysisTab = ({ meetingId }) => {
  const [sentimentAnalysisData, setSentimentAnalysisData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        API_URLS.getSentimentAnalysis(meetingId)
      );
      setSentimentAnalysisData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Sentiment Analysis</Typography>
      <Typography paragraph textAlign="justify" marginTop={1}>
        {sentimentAnalysisData.sentiment_analysis.replace(/-/g, "").trim()}
      </Typography>
    </>
  );
};

export default SentimentAnalysisTab;
