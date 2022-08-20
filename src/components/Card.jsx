import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

export default function MediaCard({ text, imgsrc }) {
  return (
    <Card
      sx={{ maxWidth: 345, minWidth: 345 }}
      style={{ backgroundColor: "beige", margin: "10px", textAlign: "center" }}
      elevation="8"
    >
      {imgsrc && (
        <CardMedia
          component="img"
          height="140"
          image={imgsrc}
          alt="tweet image"
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
