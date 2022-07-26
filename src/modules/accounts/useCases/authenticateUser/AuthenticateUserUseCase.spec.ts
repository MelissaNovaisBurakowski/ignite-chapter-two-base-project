import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemeory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemeory: UsersRepositoryInMemeory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User ", () => {
  beforeEach(() => {
    usersRepositoryInMemeory = new UsersRepositoryInMemeory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemeory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemeory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@email.com",
      password: "123456",
      name: "User Test",
    };

    await createUserUseCase.execute(user);
    const authUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(authUser).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user@email.com",
        password: "123456",
        name: "User Test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password + "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
