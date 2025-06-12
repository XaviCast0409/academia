import { hash, compare } from "bcryptjs";
import dotenv from 'dotenv'
import { sign, verify } from "jsonwebtoken";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "toke.01010101"
export const encrypt = async (pass: string): Promise<string> => {
  const passHash = await hash(pass, 8);
	return passHash
};

export const verified = async (pass : string, passHash: string) : Promise<boolean> => {
	const isCorrect = await compare(pass, passHash)
	return isCorrect
};

export const generateToken = (id: number, roleId: number, idRole: number) => {
  console.log("JWT_SECRET", id, roleId);
  const jwt = sign({ id, roleId, idRole }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

export const verifyToken = (token: string) => {
  const decoded = verify(token, JWT_SECRET);
  return decoded;
};