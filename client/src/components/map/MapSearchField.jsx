import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

export const MapSearchField = ({ markerOptions }) => {
  // necessary to get city from coordinates
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
    autoClose: true,
  });

  // shows Maker on click, sets Location in create Course field
  const map = useMapEvent("click", async (e) => {
    if (setLocation) {
      setPosition(e.latlng);
      setLocation({
        location: `${e.latlng.lat},${e.latlng.lng}`,
        description: await getCity(e.latlng),
      });
    }
  });

  /** gets city name from coordinates */
  const getCity = async (position) => {
    try {
      const result = await fetch(
        GEOCODE_URL + `${position.lng},${position.lat}`
      );
      const place = await result.json();
      return place.address.City;
    } catch (error) {
      console.log("error in MapSearchField:getCity", error);
    }
  };
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return !position ? null : <Marker position={position}></Marker>;
};
