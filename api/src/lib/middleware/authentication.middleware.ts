import { NextFunction, Request, Response } from "express";
import { expressjwt } from "express-jwt";
import config from "../config";

const authenticationMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    expressjwt({
      secret: config.JWT_SECRET,
      algorithms: ["HS256"],
      credentialsRequired: true,
      requestProperty: "user",
    })(req, res, next);
  };
};

export default authenticationMiddleware;
