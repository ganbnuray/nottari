import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import DocumentsPage from "@/app/documents/page";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized operation");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });

    return documentId;
  },
});

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
    // do something with `tasks`
  },
});
