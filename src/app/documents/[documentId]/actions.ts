"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const { sessionClaims } = await auth();

  const clerk = await clerkClient();

  if (!sessionClaims) {
    throw new Error("User not authenticated");
  }

  if (!sessionClaims.o) {
    throw new Error("User not in organization context");
  }

  const response = await clerk.users.getUserList({
    organizationId: [(sessionClaims.o as any).id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}
