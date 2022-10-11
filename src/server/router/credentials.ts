import { createRouter } from "./context";
import { z } from "zod";
import { omit } from "lodash";
import { hash, compare } from "bcryptjs";

export const credentialsRouter = createRouter()
  .query("check", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }).optional(),
    async resolve({ ctx, input }) {
      if (!ctx) {
        return {
          status: "error",
          message: "Context somehow not available",
        };
      }
      if (!input?.email || !input?.password) {
        return {
          status: "error",
          message: "Invalid email or password",
        };
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input?.email,
        },
      });
      if (!user) {
        return {
          status: "error",
          message: "Invalid email or password",
        };
      }

      const match = user.password && await compare(input?.password, user.password);
      if (match) {
        return {
          status: "success",
          user: omit(user, "password"),
        };
      }

      return {
        status: "error",
        message: "Invalid email or password",
      };
    },
  })
  .mutation("create", {
    input: z.object({
      email: z.string().email({ message: "* Invalid email address" }),
      password: z.string(),
    }),
    async resolve({ ctx, input: { email, password } }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return {
          status: "error",
          message: "* Email already exists",
        };
      }

      try {
        await ctx.prisma.user.create({
          data: {
            email: email,
            password: await hash(password, 12),
          },
        });
        return {
          status: "success",
          message: 'User created. Please log in.',
          email: email,
        };
      } catch (err) {
        return {
          status: "error",
          message: err as string,
        };
      }
    },
  });