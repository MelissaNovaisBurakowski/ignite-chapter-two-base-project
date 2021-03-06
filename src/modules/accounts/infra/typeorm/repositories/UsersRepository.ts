import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private respository: Repository<User>;

  constructor() {
    this.respository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.respository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.respository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.respository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.respository.findOne({ where: { id } });
    return user;
  }
}

export { UsersRepository };
