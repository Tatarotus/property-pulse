"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import Spinner from "@/components/Spinner";
import Image from "next/image";
// import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = "rua tenente euler horta carvalho";
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${property.location.street}, ${property.location.city}&format=json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        if (res.length === 0) {
          throw new Error("No results found");
        }

        const { lat, lon } = res[0];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    fetchCoords();
    // const address = "rua tenente euler horta carvalho";
    // const response = await fetch(
    //   `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${property.location.street}, ${property.location.city}&format=json`
    // );
    // const res = response.json();
    // const { lat, lon } = res[0];
    // // const lat = await res[0].lat
    // // setLat(lat);
    // // setLng(lon);
    // };
    // fetchCoords();
    // setViewport({
    // ...viewport,
    // latitude: lat,
    // longitude: lng,
    // });
    // setLoading(false);
  }, []);

  if (loading) return <Spinner loading={loading} />;
  return (
    !loading && (
      <>
        <Map
          // mapboxAccessToken={
          //   "pk.eyJ1IjoiYWxhYmF0cnVzIiwiYSI6ImNseHAxZ2Y2cDA1cHYybG16d2I5amRvbWEifQ.Ibs43kvBfsYg3uOXlQPdAA"
          // }
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 15,
          }}
          style={{ width: "100%", height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </>
    )
  );
};
export default PropertyMap;
