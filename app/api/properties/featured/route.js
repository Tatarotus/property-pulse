import connectDB from "@/config/database";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

// GET api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({
      isFeatured: true,
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
