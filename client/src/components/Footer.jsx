import { AppBar, Container, Link, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  const creators = [
    { fullName: "Kathrine Beuth", github: "https://github.com/dkathrine" },
    { fullName: "Lina Simonovic", github: "https://github.com/LinaSimonovic" },
    { fullName: "Thomas Kodel", github: "https://github.com/TheUnterhemd" },
    { fullName: "Michael Lieber", github: "https://github.com/micha-lieber" },
  ];
  return (
    <Container fullWidth sx={{ p: 3, backgroundColor: "background.navbar" }}>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        &copy; 2023. Created with &#128149; by{" "}
        {creators.map((creator) => (
          <Link href={creator.github} sx={{ color: "text.secondary" }}>
            {`${creator.fullName}, `}
          </Link>
        ))}
      </Typography>
    </Container>
  );
}
