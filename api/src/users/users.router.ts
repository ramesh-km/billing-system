import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { forgotPasswordHandler } from "./fogot-password";
import { SignInDataSchema, SignUpDataSchema } from "./schema";
import { signInHandler } from "./sign-in";
import { signUpHandler } from "./sign-up";

// ! This is only for public routes

const usersRouter = Router({
  mergeParams: true,
});

usersRouter.post(
  "/sign-up",
  zodValidatorMiddleware(SignUpDataSchema),
  signUpHandler
);

usersRouter.post(
  "/sign-in",
  zodValidatorMiddleware(SignInDataSchema),
  signInHandler
);

usersRouter.post("/forgot-password", forgotPasswordHandler);

export default usersRouter;
