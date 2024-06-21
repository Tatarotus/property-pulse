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

// PUT api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;


    const formData = await request.formData();

    // Access all value from amenities and images
    const amenities = formData.getAll("amenities");

    // Get property from the database
    const existingProperty = await Property.findById(id);

    // Handle if the property doesn't exist
    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }
    
    // Verify owner
    if (existingProperty.owner.toString() !== userId) {
      return new Response("You are not the owner of this property", { status: 401 });
    }


    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId, // Add the user id
      // images,
    };

    // Update property in the database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });

  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
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
