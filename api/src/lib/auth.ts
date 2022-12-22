import jwt from "jsonwebtoken";
import { SafeUser } from "../types/users";
import config from "./config";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";
import db from "./db";
import signale from "signale";
import { pick } from "./util";

export const generateToken = (user: SafeUser) => {
  const token = jwt.sign(user, config.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  const user = jwt.verify(token, config.JWT_SECRET) as SafeUser;
  return user;
};

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

export const comparePasswords = async (password: string, hash: string) => {
  const result = await bcryptjs.compare(password, hash);
  return result;
};

export const generateSafeUser = async (user: User): Promise<SafeUser> => {
  const safeUser = pick(user, ["id", "email", "name", "roles"]);

  // Fetch permissions from database
  let permissions: string[] = [];

  try {
    permissions = (
      await db.permission.findMany({
        where: {
          roles: {
            some: {
              name: {
                in: user.roles,
              },
            },
          },
        },
        select: {
          name: true,
        },
      })
    ).map((permission) => permission.name);
  } catch (error) {
    signale.error("Failed to fetch permissions for user", error);
  }

  return {
    ...safeUser,
    permissions,
  } as SafeUser;
};
