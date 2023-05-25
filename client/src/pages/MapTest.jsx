import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container } from "@mui/material";
// import { LocationMarker } from "../components/map/LocationMarker";
import { useNavigate } from "react-router-dom";
import { MapSearchField } from "../components/map/MapSearchField";
import { v4 as uuid } from "uuid";
import "./MapTest.scss";
export default function MapTest({ markerOptions }) {
  const [centerLat, setCenterLat] = useState(52.505);
  const [centerLng, setCenterLng] = useState(13.09);

  // display the courses on the map
  const data = markerOptions;
  console.log("data in maptest", data);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     Array.isArray(data) &&
  //     data.location &&
  //     !data.location.location.startsWith("http")
  //   ) {
  //     const locale = data.location?.location.split(",");
  //     console.log("locale", locale);
  //   }
  // }, []);
  return (
    <Container sx={{ my: 1 }} disableGutters={true}>
      <MapContainer
        center={{ lat: centerLat, lng: centerLng }}
        zoom={10}
        scrollWheelZoom={true}
        style={{ minHeight: "200px", maxHeight: "100%" }}
      >
        <MapSearchField markerOptions={markerOptions} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          Array.isArray(data) &&
          data.map((course) => {
            if (!course.location.location.startsWith("http")) {
              return (
                <Marker
                  key={uuid()}
                  position={{
                    lat: course.location.location.split(",")[0],
                    lng: course.location.location.split(",")[1],
                  }}
                >
                  <Popup>
                    <span
                      onClick={(e) => navigate(`/course/${course._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {course.title} | {course.price} €
                    </span>
                  </Popup>
                </Marker>
              );
            }
          })}
      </MapContainer>
    </Container>
  );
}
