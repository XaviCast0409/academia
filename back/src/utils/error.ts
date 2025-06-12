import { Response } from "express";
export const errorHelper = (error: any, res: Response) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: error });
  }
};
