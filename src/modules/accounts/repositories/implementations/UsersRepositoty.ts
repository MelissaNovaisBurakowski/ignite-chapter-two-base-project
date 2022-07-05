import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
class UsersRepository implements IUsersRepository {
  private respository: Repository<User>;

  constructor() {
    this.respository = getRepository(User);
  }
  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.respository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.respository.save(user);
  }
}

export { UsersRepository };
