import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { hslToHex } from "@/constants/hslToHex";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// Define the expected shape of sessionClaims
interface SessionClaims {
  o?: {
    id: string;
  };
  // Add other properties as needed
}

export async function POST(req: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(sessionClaims);
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(user);

  const { room } = await req.json();
  console.log(room);

  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }
  console.log(document);

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = document.organizationId
    ? document.organizationId === (sessionClaims as SessionClaims).o?.id
    : false;

  console.log(isOwner);
  console.log(isOrganizationMember);

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 });
  }

  const name =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.primaryEmailAddress?.emailAddress || "Anonymous";

  const nameToNumber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = hslToHex(hue, 80, 60); // HEX format
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
