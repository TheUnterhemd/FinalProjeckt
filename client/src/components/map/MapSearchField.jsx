import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

export const MapSearchField = ({ markerOptions }) => {
  const { setLocation } = markerOptions;
  const [position, setPosition] = useState("");
  const provider = new OpenStreetMapProvider();

  // creates the search field
  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: false,
    position: "bottomleft",
  });

  // shows Maker on click, sets Location in create Course field

  const map = useMapEvent("click", (e) => {
    if (setLocation) {
      setPosition(e.latlng);
      setLocation([e.latlng.lat, e.latlng.lng]);
    }
  });
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, searchControl]);

  return !position ? null : <Marker position={position}></Marker>;
};
