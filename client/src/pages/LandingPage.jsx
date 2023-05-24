// import React, { useState } from "react";
// import Searchbar from "../components/Search/Searchbar.jsx";
// import { Box } from "@mui/system";
// import beispielBild from "../assets/beispielBild.jpg";

// export default function LandingPage() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "80%",
//         margin: "4rem auto",
//         position: "relative",
//       }}
//     >
//       <img
//         src={beispielBild}
//         alt="bild"
//         style={{
//           width: "100%",
//           height: "auto",
//           maxHeight: "950px",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           backgroundColor: "#632b5d",
//           padding: "1rem",
//           width: "70%",
//           borderRadius: "10px",
//           boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
//         }}
//       >
//         <Searchbar />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: "2rem",
//           backdropFilter: "blur(10px)",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           padding: "2rem",
//           borderRadius: "10px",
//           boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <h2 style={{ marginBottom: "1rem" }}>About Local Trainer</h2>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <Card title="Our Mission" text="bla bla" />
//           <Card title="Our Goals" text="bla bla" />
//           <Card title="Our Team" text="bla bla" />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// function Card({ title, text }) {
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = () => {
//     setIsClicked(!isClicked);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "rgba(255, 255, 255, 0.8)",
//         borderRadius: "10px",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//         padding: "6rem",
//         margin: "1rem",
//         width: "60%",
//         backdropFilter: "blur(10px)",
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//         boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//         cursor: "pointer", // za hover efekat
//       }}
//       onClick={handleClick}
//     >
//       {isClicked ? (
//         <p style={{ textAlign: "center" }}>{text}</p>
//       ) : (
//         <h2
//           style={{
//             textAlign: "center",
//             fontSize: "1.5rem",
//             marginBottom: "4rem",
//             whiteSpace: "nowrap", // da naslov bude u jednom redu
//           }}
//         >
//           {title}
//         </h2>
//       )}
//     </Box>
//   );
// }


import React, { useState } from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box } from "@mui/system";
import beispielBild from "../assets/beispielBild.jpg";
import "../styles.css"; // Dodali smo import za CSS datoteku

export default function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        margin: "4rem auto",
        position: "relative",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Card title="Our Mission" text="bla bla" />
          <Card title="Our Goals" text="bla bla" />
          <Card title="Our Team" text="bla bla" />
        </Box>
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