import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../lib/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    // verifing user by username
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      verified: true,
    });

    if (!existingUserVerifiedByUsername) return;

    if (existingUserVerifiedByUsername)
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();

    if (!existingUserByEmail) return;

    if (existingUserByEmail) {
      if (existingUserByEmail.verified) {
        return Response.json(
          {
            success: false,
            message: "User already exists wiht this email",
          },
          { status: 400 }
        );
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hasedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpires = new Date(Date.now() + 3600000);
        existingUserByEmail.save();
      }
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const expiryData = new Date();
      expiryData.setHours(expiryData.getHours() + 1);

      const newUser = await new UserModel({
        username,
        email,
        password: hasedPassword,
        verifyCode,
        verifyCodeExpires: expiryData,
        verified: false,
        isAcceptingMessages: true,
        // createdAt: Date;
        messages: [],
      });

      await newUser.save();

      // send verification code
      const emailResponse = await sendVerificationEmail(
        username,
        email,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
