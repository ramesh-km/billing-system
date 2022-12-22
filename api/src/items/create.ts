import { Item } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { ResBody } from "../types/util";
import { CreateItemData } from "./schemas";

const createItemHandler: RequestHandler<
  unknown,
  ResBody<Item>,
  CreateItemData
> = async (req, res, next) => {
  // Create the item
  const data = req.body;
  try {
    const item = await db.item.create({
      data,
    });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export default createItemHandler;
