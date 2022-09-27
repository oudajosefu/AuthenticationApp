// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../db/client";
import sha256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();

export const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const unhashPassword = (password: string) => {
  return CryptoJS.AES.decrypt(password, password).toString(
    CryptoJS.enc.Utf8,
  );
};