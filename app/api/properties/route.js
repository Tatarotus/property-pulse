import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// api/properties
export const GET = async (request) => {
  const page = request.nextUrl.searchParams.get("page") || 1;
  const pageSize = request.nextUrl.searchParams.get("pageSize") || 9;
  const skip = (page - 1) * pageSize;
  try {
    await connectDB();

    const totalProperties = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);
      
    const result = {
      total: totalProperties,
      properties
    }

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // access all value from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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

    // Upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      // Assuming image is a File object, extract the file data
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Upload the image data as a base64 string to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        }
      );

      imageUploadPromises.push(result.secure_url);
    }

    // wait for all images to upload
    //
    const uploadedImages = await Promise.all(imageUploadPromises);
    // add uploaded images to propertyData object
    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    // return new Response(JSON.stringify(propertyData), {
    //   status: 200,
    // });
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
