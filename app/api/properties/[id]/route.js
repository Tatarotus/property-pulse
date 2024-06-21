import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// api/properties/:id
export const GET = async (_, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    // Check for session authentication
    if (!sessionUser || !userId) {
      return new Response("User ID is required", { status: 401 });
    }

    // Get the correct property from database
    const property = await Property.findById(propertyId);

    // handle no property
    if (!property) return new Response("Property not found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();
    return new Response("Property deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
