import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container } from "@mui/material";
// import { LocationMarker } from "../components/map/LocationMarker";
import { useNavigate } from "react-router-dom";
import { MapSearchField } from "../components/map/MapSearchField";
import { v4 as uuid } from "uuid";
import "./MapTest.scss";
export default function MapTest({ markerOptions }) {
  // display the courses on the map
  const data = markerOptions;
  const navigate = useNavigate();

  return (
    <Container sx={{ my: 1 }} disableGutters={true}>
      <MapContainer
        center={{ lat: 52.505, lng: 13.09 }}
        zoom={10}
        scrollWheelZoom={true}
        style={{ minHeight: "500px" }}
      >
        <MapSearchField markerOptions={markerOptions} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          Array.isArray(data) &&
          data.map((course) => (
            <Marker
              key={uuid()}
              position={{
                lat: course.location.split(",")[0],
                lng: course.location.split(",")[1],
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
          ))}
      </MapContainer>
    </Container>
  );
}
