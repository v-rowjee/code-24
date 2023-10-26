import React, { useState, useEffect } from "react";
import { Typography, Divider, Chip, Avatar } from "@mui/material";
import API_URLS from "../url";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MeetingInsightsTab = ({ meetingId }) => {
  const [speakerParticipationData, setSpeakerParticipationData] = useState({});
  const [sentimentScoreData, setSentimentScoreData] = useState({});

  const fetchSpeakerInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getEfficiencyMetric(meetingId));
      setSpeakerParticipationData(response.data);
      console.log({ speakerParticipation: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSentimentInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getSentimentScore(meetingId));
      setSentimentScoreData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSpeakerInfo();
    fetchSentimentInfo();
  }, []);

  console.log({
    test1: speakerParticipationData?.efficiency_metric?.speakers_details,
  });

  const data = {
    labels: ["Negative", "Neutral", "Positive"],
    datasets: [
      {
        label: "Sentiment Score",
        data: [
          sentimentScoreData?.sentiment_score?.negative,
          sentimentScoreData?.sentiment_score?.neutral,
          sentimentScoreData?.sentiment_score?.positive,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Typography variant="h4">Meeting Insights</Typography>
      <Divider />
      <Divider component="div" sx={{ marginTop: 1 }}>
        Meeting Time Metrics
      </Divider>

      <Divider component="div">Speaker Participation</Divider>

      <Divider component="div">Sentiment Score</Divider>
      <Doughnut data={data} />
    </>
  );
};

export default MeetingInsightsTab;
