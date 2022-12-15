import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";

const deleteItemHandler: RequestHandler = async (req, res) => {
  // Validate req params
  const idResult = numberSchema.safeParse(req.params.itemId);
  if (!idResult.success) {
    return res.json({
      message: "Invalid item id",
      errors: idResult.error.issues,
    });
  }

  // Delete item from db
  try {
    const data = await db.item.delete({
      where: {
        id: idResult.data,
      },
    });
    return res.json(data);
  } catch (error) {
    return res.json({
      message: "Error deleting item",
      errors: error,
    });
  }
};

export default deleteItemHandler;
