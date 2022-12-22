import { RequestHandler } from "express";
import { generateSafeUser, generateToken, hashPassword } from "../lib/auth";
import db from "../lib/db";
import { AuthResponse } from "../types/users";
import { ResBody } from "../types/util";
import { SignUpData } from "./schema";

export const signUpHandler: RequestHandler<
  unknown,
  ResBody<AuthResponse>,
  SignUpData
> = async (req, res, next) => {
  const { email, password, name } = req.body;

  // Create user in database
  let user = null;
  try {
    user = await db.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
    });
  } catch (error) {
    next(error);
    return;
  }

  // Generate safe user
  const safeUser = await generateSafeUser(user);

  // Generate token
  const token = generateToken(safeUser);

  // Send response
  res.status(201).json({
    token,
    user: safeUser,
  });
};
