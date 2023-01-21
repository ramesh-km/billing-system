import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import itemsRouter from "./items/items.router";
import customersRouter from "./customers/customers.router";
import errorMiddleware from "./lib/middleware/error.middleware";
import config from "./lib/config";
import cors from "cors";
import usersRouter from "./users/users.router";
import authenticationMiddleware from "./lib/middleware/authentication.middleware";
import ordersRouter from "./orders/orders.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./lib/swaggerDocument";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Healthcheck route
app.get("/healthcheck", (req, res) =>
  res.json({
    env: config.NODE_ENV,
  })
);

// Routers
app.use("/api/v1/auth", usersRouter);

// Swagger UI
app.use("/api-docs-v1", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Protect all routes after this middleware
// Authentication middleware
app.use(authenticationMiddleware());
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/customers", customersRouter);
app.use("/api/v1/orders", ordersRouter);

// Error handling
app.use(errorMiddleware);

export default app;
