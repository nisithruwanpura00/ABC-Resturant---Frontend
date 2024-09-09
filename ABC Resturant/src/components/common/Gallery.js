import * as React from "react";
import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";

export default function Gallery() {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/rate/${id}`);
  };

  return (
    <div style={styles.galleryContainer}>
      {itemData.map((item) => (
        <div key={item.img} style={styles.imageCard}>
          <div style={styles.imageWrapper}>
            <img
              src={item.img}
              alt={item.title}
              style={styles.image}
              onClick={() => handleImageClick(item.title)}
            />
            <div style={styles.infoOverlay}>
              <IconButton
                sx={{ color: "white" }}
                aria-label={`star ${item.title}`}
              >
                <StarBorderIcon />
              </IconButton>
              <span style={styles.title}>{item.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  galleryContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    boxSizing: "border-box",
  },
  imageCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  infoOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "10px",
    color: "white",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.3s ease",
  },
  title: {
    fontWeight: "bold",
  },
};

// Sample data
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
