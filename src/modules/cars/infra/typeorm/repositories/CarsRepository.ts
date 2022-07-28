import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCar";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";
import { AppDataSource } from "@shared/infra/typeorm";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { license_plate: licensePlate },
    });
    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { id },
    });
    return car;
  }

  async listAvailableCars(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });
    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
}

export { CarsRepository };
