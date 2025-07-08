import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { email, password, confirmPassword } = await req.json();

  // ✅ Email validation regex (fixed)
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Field presence check
  if (!email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 }
    );
  }

  // ✅ Email format validation
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Invalid email!" }, { status: 400 });
  }

  // Password strength validation
  const isValidPassword = (password: string) => {
    // At least 8 chars, one uppercase, one lowercase, one number, one special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  // ✅ Password match check
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match!" },
      { status: 400 }
    );
  }

  // ✅ Password regex validation
  if (!isValidPassword(password)) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
