import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepositoty";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      "2ed500a3529637175e675a8791b7c56e"
    ) as IPayload;
    const userRepository = new UsersRepository();
    const user = userRepository.findById(id);
    if (!user) {
      throw new AppError("Invalid token", 401);
    }
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
