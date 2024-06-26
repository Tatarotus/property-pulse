import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search

export const GET = async (request) => {
  const location = request.nextUrl.searchParams.get("location");
  const propertyType = request.nextUrl.searchParams.get("propertyType");

  try {
    await connectDB();

    // Create a regex pattern for location search
    const locationPattern = new RegExp(location, "i");

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property type if it's not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
