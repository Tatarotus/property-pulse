import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
// GET /api/Messages
export async function GET() {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "Not logged in" }), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort("{createdAt: -1}") // sort in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort("{createdAt: -1}") // sort in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// POST /api/messages
export async function POST(request) {
  try {
    await connectDB();
    const { name, email, phone, message, propertyId, recipientId } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "Not logged in" }), {
        status: 401,
      });
    }
    const { user } = sessionUser;

    // Cannot send message to self
    if (user.id === recipientId) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to self" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      name,
      email,
      phone,
      body: message,
      property: propertyId,
      recipient: recipientId,
    });

    newMessage.save();
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
