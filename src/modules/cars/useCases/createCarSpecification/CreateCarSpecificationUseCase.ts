import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);
    if (!carAlreadyExists) {
      throw new AppError("Car does not exists!");
    }
    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );
    carAlreadyExists.specifications = specifications;
    await this.carsRepository.create(carAlreadyExists);
    return carAlreadyExists;
  }
}

export { CreateCarSpecificationUseCase };
