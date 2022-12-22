import "express";
import { SafeUser } from "./users";

declare global {
  namespace Express {
    interface Request {
      user: SafeUser;
    }
  }
}
