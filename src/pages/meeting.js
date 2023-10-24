import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Box,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import DrawerAppBar from "../AppBar";
import Colours from "../colours";
import PropTypes from "prop-types";
import {
  TextSnippet,
  VpnKey,
  ListAlt,
  SentimentSatisfied,
  PendingActions,
} from "@mui/icons-material";
import SummaryTab from "../components/summary";
import KeyPointsTab from "../components/keypoints";
import ActionItemsTab from "../components/actionItems";
import SentimentAnalysisTab from "../components/sentimentAnalysis";
import MeetingInsightsTab from "../components/meetingInsights";
import Transcript from "../components/transcript";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const Meeting = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <DrawerAppBar />
      <Grid
        container
        spacing="24px"
        marginTop="24px"
        marginLeft="6px"
        padding="24px"
        height="100vh"
      >
        <Grid
          item
          xs={12}
          md={7}
          marginTop="24px"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Transcript />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <TabPanel value={value} index={0}>
            <SummaryTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <KeyPointsTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ActionItemsTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SentimentAnalysisTab />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <MeetingInsightsTab />
          </TabPanel>
        </Grid>

        <Grid item xs={12} md={1}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            <Tab
              icon={
                <Tooltip title="Summary" placement="left">
                  <TextSnippet />
                </Tooltip>
              }
              aria-label="summary"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Tooltip title="Key Points" placement="left">
                  <VpnKey />
                </Tooltip>
              }
              aria-label="key points"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Tooltip title="Action Items" placement="left">
                  <ListAlt />
                </Tooltip>
              }
              aria-label="action items"
              {...a11yProps(2)}
            />
            <Tab
              icon={
                <Tooltip title="Sentiment Analysis" placement="left">
                  <SentimentSatisfied />
                </Tooltip>
              }
              aria-label="sentiment analysis"
              {...a11yProps(3)}
            />
            <Tab
              icon={
                <Tooltip title="Meeting Insights" placement="left">
                  <PendingActions />
                </Tooltip>
              }
              aria-label="meeting insights"
              {...a11yProps(4)}
            />
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
};

export default Meeting;
