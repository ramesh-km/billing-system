import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";

const readItemHandler: RequestHandler = async (req, res) => {
  const idResult = numberSchema.safeParse(req.params.id);

  if (!idResult.success) {
    return res.json({
      message: "Invalid id",
      errors: idResult.error.issues,
    });
  }

  // Read item
  const item = await db.item.findUnique({
    where: { id: idResult.data },
  });

  return res.json(item);
};

export default readItemHandler;
