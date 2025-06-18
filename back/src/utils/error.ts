import { Response } from "express";

export class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}
export const errorHelper = (error: any, res: Response) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  }
};
