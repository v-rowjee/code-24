import React, { useState, useEffect } from "react";
import { Typography, Divider, Chip, Avatar, Stack } from "@mui/material";
import API_URLS from "../url";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Colours from "../colours";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const MeetingInsightsTab = ({ meetingId }) => {
  const [speakerParticipationData, setSpeakerParticipationData] = useState({});
  const [sentimentScoreData, setSentimentScoreData] = useState({});

  const fetchSpeakerInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getEfficiencyMetric(meetingId));
      setSpeakerParticipationData(response.data);
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
        Speaker Participation
      </Divider>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={1}
        marginTop={1}
      >
        <Typography>Most Dominant Speaker:</Typography>
        <Chip
          avatar={
            <Avatar
              sx={{
                bgcolor: Colours.primaryOrange,
              }}
            >
              {speakerParticipationData?.efficiency_metric?.most_dominant_speaker
                ?.charAt(0)
                .toUpperCase()}
            </Avatar>
          }
          label={
            speakerParticipationData?.efficiency_metric?.most_dominant_speaker
          }
          variant="outlined"
          size="small"
          sx={{
            color: Colours.primaryOrange,
            borderColor: Colours.primaryOrange,
          }}
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Least Engaged Speaker:</Typography>
        <Chip
          avatar={
            <Avatar
              sx={{
                bgcolor: Colours.primaryOrange,
              }}
            >
              {speakerParticipationData?.efficiency_metric?.least_engaged_speaker
                ?.charAt(0)
                .toUpperCase()}
            </Avatar>
          }
          label={
            speakerParticipationData?.efficiency_metric?.least_engaged_speaker
          }
          variant="outlined"
          size="small"
          sx={{
            color: Colours.primaryOrange,
            borderColor: Colours.primaryOrange,
          }}
        />
      </Stack>
      {speakerParticipationData?.efficiency_metric?.speakers_details?.map(
        (item, index) => (
          <Stack direction="column" spacing={1} key={index} marginTop={1}>
            <Chip
              label={
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>{item.name}</Typography>
                  <Typography>{item.time}</Typography>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div style={{ width: 24, height: 24 }}>
                      <CircularProgressbar
                        value={parseFloat(item.percentage.match(/\d+\.\d+/)[0])}
                        styles={buildStyles({
                          pathColor: Colours.primaryOrange,
                          trailColor: Colours.secondaryOrange,
                        })}
                      />
                    </div>
                    <Typography>
                      {item.percentage.replace(/[()]/g, "")}
                    </Typography>
                  </Stack>
                </Stack>
              }
              variant="outlined"
              sx={{
                color: Colours.darkText,
                borderColor: Colours.darkText,
              }}
            />
          </Stack>
        )
      )}
      <Divider component="div" sx={{ marginTop: 1 }}>
        Sentiment Score
      </Divider>
      <Doughnut data={data} />
    </>
  );
};

export default MeetingInsightsTab;
