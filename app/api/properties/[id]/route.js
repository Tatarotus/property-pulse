import connectDB from "@/config/database";
import Property from "@/models/Property";

// api/properties/:id
export const GET = async (_, { params }) => {
  await connectDB();

  const property = await Property.findById(params.id);
  try {
    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
