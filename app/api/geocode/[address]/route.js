const NodeGeocoder = require("node-geocoder");
import fetch from "node-fetch";
// import NodeGeocoder from "node-geocoder";

// Configure the geocoder with the OpenStreetMap Nominatim provider
const options = {
  provider: "mapbox",
  apiKey: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  fetch,
};

const geocoder = NodeGeocoder(options);

//api/geocode/:address
export const GET = async (_, { params }) => {
  const { address } = params;
  if(!address) return new Response("Address is required", { status: 400 });

  try {
    const response = await geocoder.geocode(address);
    console.log(address);

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
