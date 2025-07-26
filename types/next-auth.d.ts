// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ now 'id' is allowed
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }

  interface JWT {
    id: string;
  }
}
