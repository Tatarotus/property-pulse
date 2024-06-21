import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userid
export const GET = async (request, { params }) => {
  await connectDB();
  const { userId } = params;
  console.log(params);

  if (!userId) {
    return new Response("userId is required", { status: 400 });
  }

  const properties = await Property.find({ owner: userId });
  try {
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
