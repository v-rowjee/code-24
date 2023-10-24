import React from "react";
import { Typography, Divider, Stack } from "@mui/material";

const array = [
  "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "ccccc cccccc cccc cccc cccc cccc cccccc ccccc ccccccc",
  "ddddddddddddddddddddddddddd",
];

const KeyPointsTab = () => {
  return (
    <>
      <Typography variant="h4">Key Points</Typography>
      <Divider />
      {array.map((item, index) => (
        <Stack direction="column" spacing={1} key={index}>
          <Typography paragraph textAlign="justify">
            <ul>
              <li>{item}</li>
            </ul>
          </Typography>
        </Stack>
      ))}
    </>
  );
};

export default KeyPointsTab;
