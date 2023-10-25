import React from "react";
import { Typography, Divider, Stack, Chip } from "@mui/material";
import Colours from "../colours";

const itemsArray = [
  {
    deadline: "Monday",
    content: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    owner: "aisha a",
  },
  {
    deadline: "Tuesday",
    content: "ccccc cccccc cccc cccc cccc cccc cccccc ccccc ccccccc",
    owner: "mehshar m",
  },
  {
    deadline: "Friday",
    content: "ddddddddddddddddddddddddddd",
    owner: "ved v",
  },
];

const ActionItemsTab = () => {
  return (
    <>
      <Typography variant="h4">Action Items</Typography>
      <Divider />
      {itemsArray.map((item, index) => (
        <Stack direction="column" spacing={1} key={index}>
          <Typography paragraph textAlign="justify">
            {item.content}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography>Assigned To:</Typography>
            <Chip
              label={item.owner}
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
