import { RequestHandler } from "express";
import { comparePasswords, generateSafeUser, generateToken } from "../lib/auth";
import db from "../lib/db";
import { AuthResponse } from "../types/users";
import { ResBody } from "../types/util";
import { SignInData } from "./schema";

export const signInHandler: RequestHandler<
  unknown,
  ResBody<AuthResponse>,
  SignInData
> = async (req, res, next) => {
  const { email, password } = req.body;

  // Find user in database
  let user = null;
  try {
    user = await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    next(error);
    return;
  }

  // Check if user exists
  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  // Check if password is correct
  const passwordCorrect = await comparePasswords(password, user.password);
  if (!passwordCorrect) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  // Generate safe user
  const safeUser = await generateSafeUser(user);

  // Generate token
  const token = generateToken(safeUser);

  // Send response
  res.status(200).json({
    token,
    user: safeUser,
  });
};
