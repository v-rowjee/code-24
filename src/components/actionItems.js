import React, { useState, useEffect } from "react";
import { Typography, Divider, Stack, Chip } from "@mui/material";
import Colours from "../colours";
import API_URLS from "../url";
import axios from "axios";

const ActionItemsTab = ({ meetingId }) => {
  const [actionItemsData, setActionItemsData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get(API_URLS.getActionItem(meetingId));
      setActionItemsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Action Items</Typography>
      {actionItemsData?.action_item?.map((item, index) => (
        <Stack direction="column" spacing={1} key={index} marginTop={1}>
          <Typography paragraph textAlign="justify">
            {item.content}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography>Assigned To:</Typography>
            <Chip
              label={item.owner.split(". ")[1]}
              variant="outlined"
              size="small"
              sx={{
                color: Colours.primaryOrange,
                borderColor: Colours.primaryOrange,
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Due:</Typography>
            <Chip
              label={item.deadline}
              variant="outlined"
              size="small"
              sx={{
                color: Colours.primaryOrange,
                borderColor: Colours.primaryOrange,
              }}
            />
          </Stack>
          <Divider />
        </Stack>
      ))}
    </>
  );
};

export default ActionItemsTab;
