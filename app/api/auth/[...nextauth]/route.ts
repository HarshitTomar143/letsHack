import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/model/user";
import connectToDatabase from "@/lib/mongodb";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [

    Github({
      clientId:process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string
      
    }),


    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          throw new Error("Missing email or password");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email }).lean();
        console.log("User found:", user);

        if (!user || typeof user.password !== "string") {
          console.log("Invalid email or password");
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        console.log("Password valid:", isValid);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Return a serializable object
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      if (account && account.provider !== "credentials") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          image: null, // You can replace this with a real image field if needed
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home";
    },
  },
  pages: {
    signIn: "/signin", // ✅ fixed typo
    error: "/signin", // Redirect errors to the signin page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
