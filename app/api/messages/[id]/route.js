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
