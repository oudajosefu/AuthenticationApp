import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { trpc } from "../../../utils/trpc";

export const authOptions: NextAuthOptions = {
  // Configure session
  // session: {
  //   strategy: 'jwt',
  // },
  // // Configure pages
  pages: {
    signIn: "/",
    signOut: "/",
  },
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.email = user.email;
      }
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (credentials) {
    //     try {
    //       const { data } = trpc.useQuery(["credentials.check", credentials as Record<'email' | 'password', string>]);
    //       if (data && data.status === "success") {
    //         return true;
    //       }
    //       return false;
    //     } catch (err) {
    //       throw new Error('SIGN IN ERROR: ' + err as string);
    //     }
    //   }
    //   console.log("signIn", { user, account, profile, email, credentials });
    //   return true;
    // }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const { data } = trpc.useQuery(["credentials.check", credentials]);
        if (data && data.status === 'success' && data.user) {
          return data.user;
        } else {
          return null;
        }
      }
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
