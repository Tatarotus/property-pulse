import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/Messages/:id
export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;

    // Check user login
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "Not logged in" }), {
        status: 401,
      });
    }
    // Get user
    const { userId } = sessionUser;

    // Find message by id
    const message = await Message.findById(id);

    if (!message) {
      return new Response(JSON.stringify({ message: "No message found" }), {
        status: 404,
      });
    }

    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Update message to red/unread depending on the current status
    message.read = !message.read;

    // Save message object
    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (_, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find message by id
    const message = await Message.findById(id);

    // Check if message exists
    if (!message) return new Response("Message Not Found", { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete message
    await message.deleteOne();

    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
