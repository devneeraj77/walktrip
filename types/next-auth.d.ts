// types/next-auth.d.ts

import { DefaultSession, DefaultJWT } from "next-auth";

import { User as CustomUser } from "./User"; // Import your custom User interface

declare module "next-auth" {
  interface Session {
    user: CustomUser & DefaultSession["user"]; // Use your custom User type
  }
  interface User extends CustomUser {} // Extend the NextAuth User type
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: boolean; // Ensure JWT contains the role
  }
}
