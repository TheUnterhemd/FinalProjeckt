import React, { useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

export function LocationMarker({ markerOptions }) {
  const { draggable, setLocation } = markerOptions;
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(marker.getLatLng().lng);
          setPosition(marker.getLatLng());
          setLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );

  return position === null ? null : (
    <Marker
      position={position}
      draggable={draggable || false}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup>{draggable ? "You are here" : "Another text"}</Popup>
    </Marker>
  );
}
