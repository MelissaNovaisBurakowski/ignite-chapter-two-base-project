import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../IUsersRepository";

class UsersRepositoryInMemeory implements IUsersRepository {
  users: User[] = [];
  create(data: ICreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

export { UsersRepositoryInMemeory };
