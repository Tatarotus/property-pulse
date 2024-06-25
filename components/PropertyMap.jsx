"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import pin from "@/assets/images/pin-48.svg";
import Spinner from "@/components/Spinner";
import Image from "next/image";
// import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/geocode/${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`
        );

        const res = await response.json();

        if (res.length === 0) {
          throw new Error("No results found");
        }

        const { latitude, longitude } = res[0];
        setLat(latitude);
        setLng(longitude);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property.location]);

  if (loading) return <Spinner loading={loading} />;
  return (
    !loading && (
      <>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapLib={import("mapbox-gl")}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 15,
          }}
          style={{ width: "100%", height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker latitude={lat} longitude={lng} anchor="bottom">
            <Image src={pin}
              width={40}
              height={40}
              alt="Pin" />
          </Marker>
        </Map>
      </>
    )
  );
};
export default PropertyMap;
