import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import { hash } from "bcryptjs";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedUserRouter = createProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getUser", {
    input: z.string().optional(),
    async resolve({ ctx, input: id }) {
      try {
        return await ctx.prisma.user.findUnique({
          where: {
            id: id ?? ctx.session.user.id,
          }
        });
      } catch (err) {
        throw new Error(err as string);
      }
    },
  })
  .mutation("updateUser", {
    input: z.object({
      id: z.string().optional(),
      image: z.string().optional(),
      name: z.string(),
      bio: z.string(),
      phone: z.string(),
      email: z.string().email(),
      password: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const { id, ...rest } = input;
      try {
        console.log('About to resolve updateUser with', input);
        return await ctx.prisma.user.update({
          where: {
            id: id ?? ctx.session.user.id,
          },
          data: {
            ...rest,
            image: rest.image || ctx.session.user.image,
            password: rest.password && await hash(rest.password, 12),
          },
        });
      } catch (err) {
        throw new Error(err as string);
      }
    }
  });
