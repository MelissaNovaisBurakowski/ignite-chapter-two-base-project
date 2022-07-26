import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }
    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    const token = sign({}, "2ed500a3529637175e675a8791b7c56e", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
