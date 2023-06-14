import React, { useState } from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box } from "@mui/system";
import beispielBild from "../assets/beispielBild.jpg";
import "../styles.css";
import { Grid, Link, Typography } from "@mui/material";
import onlineCourse from "../assets/onlineCourse.jpg";
import outdoorCourse from "../assets/outdoorCourse.jpg";
import indoorCourse from "../assets/indoorCourse.jpg";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import s from "pure-react-carousel/dist/react-carousel.es.css";
import { Link as RouterLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
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
            top: "20%",
            left: "10%",
            width: { xs: "80%", sm: "90%" },
            textAlign: "left",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textShadow: "1px 1px 3px black",
            }}
          >
            Welcome to <span style={{ color: "#ebcbe5" }}>trainMe</span>
          </Typography>
          <Typography
            variant="h3"
            sx={{
              visibility: { xs: "hidden", sm: "visible" },
              textShadow: "1px 1px 3px black",
            }}
          >
            we find courses near you!
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "55%", sm: "50%", md: "45%" },
            left: { xs: "20%", sm: "25%" },
            backgroundColor: "#632b5df6",
            padding: { xs: "1px 0px", sm: "5px 10px" },
            width: "70%",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Searchbar />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem auto 0",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "2rem",
          borderRadius: "10px",
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "50%" },
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ marginBottom: "1rem", textDecoration: "underline" }}
        >
          About trainMe
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              title="Our Mission"
              text="Our Mission is to create connection.
We want to enable people to feel at home right where they are
by creating a way to easily connect with others around them through a shared goal."
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              title="Our Goals"
              text="We want to support learners in their strive for knowledge & excercise, and teachers in their search for an easy way to offer their knowledge.
Simply put, LocalTrainer does that, by offering a platform where teachers can offer courses (on- and offline) and learners can book those. "
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              title="Our Team"
              text={[
                "This Website was developed as our final project for the Web Development course @",
                <Link
                  href="https://digitalcareerinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "text.secondary" }}
                >
                  DigitalCareerInstitute,
                </Link>,
                " by : ",
                <Link
                  href="https://github.com/dkathrine"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "text.secondary" }}
                >
                  Kathrine Beuth,
                </Link>,
                <Link
                  href="https://github.com/LinaSimonovic"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "text.secondary" }}
                >
                  {" "}
                  Lina Simonovic,
                </Link>,
                <Link
                  href="https://github.com/TheUnterhemd"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "text.secondary" }}
                >
                  Thomas Kodel und{" "}
                </Link>,
                <Link
                  href="https://github.com/micha-lieber"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "text.secondary" }}
                >
                  Michael Lieber.
                </Link>,
              ]}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 10,
          mb: 10,
        }}
      >
        <Carousel />
      </Box>
    </>
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`card ${isClicked ? "active" : ""}`}
      onClick={handleClick}
    >
      {isClicked ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {text}
        </Typography>
      ) : (
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
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
      style={{
        maxWidth: "70%",
        padding: "20px",
        margin: "0 auto",
        position: "relative",
      }}
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={3}
      visibleSlides={2}
      step={1}
      dragStep={1}
      infinite={true}
    >
      <h2 style={{ fontSize: "1.9rem" }}>Our Courses</h2>
      <Slider className={s.slider}>
        <Slide index={0}>
          <RouterLink to="/search?q= ">
            <Image
              src={onlineCourse}
              alt="Online Course"
              isBgImage="true"
              children={
                <p
                  style={{
                    color: "#0a1d30",
                    fontSize: "1.8rem",
                    textAlign: "center",
                    position: "absolute",
                    top: "70%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                  }}
                >
                  Online Course
                </p>
              }
              tag="div"
            />
          </RouterLink>
        </Slide>

        <Slide index={1}>
          <RouterLink to="/search?q= ">
            <Image
              src={outdoorCourse}
              alt="Outdoor Course"
              isBgImage="true"
              children={
                <p
                  style={{
                    color: "#293c52",
                    fontSize: "1.8rem",
                    textAlign: "center",
                    position: "absolute",
                    top: "15%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                  }}
                >
                  Outdoor Course
                </p>
              }
              tag="div"
            />
          </RouterLink>
        </Slide>

        <Slide index={2}>
          <RouterLink to="/search?q= ">
            <Image
              src={indoorCourse}
              alt="Indoor Course"
              isBgImage="true"
              children={
                <p
                  style={{
                    color: "#f5f5f5",
                    fontSize: "1.8rem",
                    textAlign: "center",
                    position: "absolute",
                    top: "75%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                  }}
                >
                  Indoor Course
                </p>
              }
              tag="div"
            />
          </RouterLink>
        </Slide>
      </Slider>

      <ButtonBack
        style={{
          position: "absolute",
          top: "60%",
          left: "-10%",
          backgroundColor: "transparent",
          color: "#c73e9d",
          border: "none",
          borderRadius: "50%",
          fontSize: "3rem",
          fontWeight: "bold"
        }}
      >
        {"<"}
      </ButtonBack>

      <ButtonNext
        style={{
          position: "absolute",
          top: "60%",
          right: "-10%",
          backgroundColor: "transparent",
          color: "#c73e9d",
          border: "none",
          fontSize: "3rem",
          fontWeight: "bold"
        }}
      >
        {">"}
      </ButtonNext>
    </CarouselProvider>
  );
}
