import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import foodsOne from "../../assets/images/foodsOne.jpg";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 800, backgroundColor: "#F1F3C2", color: "white" }}>
      <CardMedia sx={{ height: 365 }} image={foodsOne} title="green iguana" />   
    </Card>
  );
}
