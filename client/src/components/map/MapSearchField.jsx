import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

export const MapSearchField = ({ markerOptions }) => {
  // necessary to get city out of coordinates
  const GEOCODE_URL =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
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
      getCity(e.latlng);
    }
  });
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, searchControl]);

  const getCity = async (position) => {
    const result = await fetch(GEOCODE_URL + `${position.lng},${position.lat}`);
    const place = await result.json();
    console.log("place from coordinates", place.address.City);
  };
  return !position ? null : <Marker position={position}></Marker>;
};
