import { createRouter } from "./context";
import { z } from "zod";
import sha256 from "crypto-js/sha256";
import { omit } from "lodash";

export const credentialsRouter = createRouter()
  .query("check", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }).nullish(),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input?.email,
        },
      });
      if (user && user.password === hashPassword(input?.password as string)) {
        return {
          status: "ok",
          user: omit(user, "password"),
        };
      } else {
        return {
          status: "error",
          message: "Invalid email or password",
        };
      }
    },
  })
  .mutation("create", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: hashPassword(input.password),
          },
        });
      } catch (err) {
        console.log('Prisma user create error:', err);
      }
    },
  });

const hashPassword = (password: string) => {
  return sha256(password).toString();
};