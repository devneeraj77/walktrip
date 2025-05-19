// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import redis from "./lib/redis";

import { User } from "@/types";
export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Fetch user from Redis (ensure user has a role)
        const user = await redis.hgetall<User>(`user:${credentials.email}`);

        if (!user) {
          throw new Error("User not found");
        }

        if (user.password !== credentials.password) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // ✅ Ensure role is included
          avatar: user.avatar,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role; // ✅ Store role in JWT
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role; // ✅ Store role in session
      }

      return session;
    },
  },
});
