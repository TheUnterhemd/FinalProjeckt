import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapSearchField } from "./MapSearchField";
import { v4 as uuid } from "uuid";
import "./Map.scss";

export default function Map({ markerOptions }) {
  // display the courses on the map
  const data = markerOptions;
  const navigate = useNavigate();

  return (
    <Container sx={{ my: 1 }} disableGutters={true}>
      <MapContainer
        center={
          data.length === 1
            ? {
                lat: data[0].location.location.split(",")[0],
                lng: data[0].location.location.split(",")[1],
              }
            : { lat: 52.505, lng: 13.09 }
        }
        zoom={10}
        scrollWheelZoom={true}
        style={{ minHeight: "200px" }}
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
