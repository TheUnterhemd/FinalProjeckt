// carousel mora da bude veci
import React, { useState } from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box } from "@mui/system";
import beispielBild from "../assets/beispielBild.jpg";
import "../styles.css";
import { Grid } from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "4rem auto",
        position: "relative",
        padding: "2rem",
      }}
    >
      <img
        src={beispielBild}
        alt="bild"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "950px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#632b5d",
          padding: "1rem",
          width: "70%",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Searchbar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>About Local Trainer</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card title="Our Mission" text="bla bla" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card title="Our Goals" text="bla bla" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              title="Our Team"
              text="bla blabla blabla bla bla blabla bla blablabla bla bla blabla blabla bla bla blabla bla blablabla blabla blabla blabla bla bla blabla bla blablabla bla"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          width: "100%",  // Povećana širina Carousel kontejnera
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel />
      </Box>
    </Box>
  );
}

function Card({ title, text }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Box
      sx={{
        width: "300px",
        height: "300px",
        overflow: "hidden",
      }}
      className={`card ${isClicked ? "active" : ""}`}
      onClick={handleClick}
    >
      {isClicked ? (
        <p style={{ textAlign: "center" }}>{text}</p>
      ) : (
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "4rem",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      )}
    </Box>
  );
}

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={2}
      visibleSlides={1}
      step={1}
      currentSlide={activeSlide}
      className="carousel-container"
    >
      <Slider>
        <Slide index={0}>
          <h2>Online Course</h2>
          <img src="../assets/onlineCourse.jpg" alt="Online Course" />
        </Slide>
        <Slide index={1}>
          <h2>Outdoor Course</h2>
          <img src="../assets/outdoorCourse.jpg" alt="Outdoor Course" />
        </Slide>
      </Slider>

      <ButtonBack>{"<"}</ButtonBack>
      <ButtonNext>{">"}</ButtonNext>
    </CarouselProvider>
  );
}
