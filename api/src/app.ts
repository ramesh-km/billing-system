import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import itemsRouter from "./items/items.router";
import customersRouter from "./customers/customers.router";
import errorMiddleware from "./lib/error.middleware";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routers
app.use("/api/items", itemsRouter);
app.use("/api/customers", customersRouter);

// Error handling
app.use(errorMiddleware);

export default app;
