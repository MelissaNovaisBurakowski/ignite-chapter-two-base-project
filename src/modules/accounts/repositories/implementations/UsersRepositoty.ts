import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
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
  }: ICreateUserDTO): Promise<void> {
    const user = this.respository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.respository.save(user);
  }

  async findByEmail(email: string): Promise<ICreateUserDTO> {
    const user = await this.respository.findOne({ where: { email } });
    return user;
  }
}

export { UsersRepository };
