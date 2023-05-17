import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { Container } from "@mui/material";
import { LocationMarker } from "../components/map/LocationMarker";
export default function MapTest({ markerOptions }) {
  return (
    <Container sx={{}}>
      <MapContainer
        center={{ lat: 52.505, lng: 13.09 }}
        zoom={10}
        scrollWheelZoom={true}
        style={{ minHeight: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker markerOptions={markerOptions} />
      </MapContainer>
    </Container>
  );
}
