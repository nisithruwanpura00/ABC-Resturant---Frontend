import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import user6 from "../../assets/images/user6.jpg";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 800, backgroundColor: "#F1F3C2", color: "white" }}>
      <CardMedia sx={{ height: 365 }} image={user6} title="green iguana" />
    </Card>
  );
}
