"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Define the expected shape of sessionClaims
interface SessionClaims {
  o?: {
    id: string;
  };
}

export async function getDocuments(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
}

export async function getUsers() {
  const { sessionClaims, userId } = await auth();

  const clerk = await clerkClient();

  if (!sessionClaims || !userId) {
    throw new Error("User not authenticated");
  }

  // Check if user is in organization context
  const organizationId = (sessionClaims as SessionClaims).o?.id;

  if (organizationId) {
    // Organization context - get all users in the organization
    const response = await clerk.users.getUserList({
      organizationId: [organizationId],
    });

    const users = response.data.map((user) => ({
      id: user.id,
      name:
        user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
      color: "",
    }));

    return users;
  } else {
    // Personal context - return just the current user for comments
    const currentUser = await clerk.users.getUser(userId);

    return [
      {
        id: currentUser.id,
        name:
          currentUser.fullName ??
          currentUser.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: currentUser.imageUrl,
        color: "",
      },
    ];
  }
}
