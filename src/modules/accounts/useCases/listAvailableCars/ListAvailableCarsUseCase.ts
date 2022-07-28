import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
interface IResquest {
  category_id?: string;
  brand?: string;
  name?: string;
}
@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository
  ) {}
  async execute({ category_id, name, brand }: IResquest): Promise<Car[]> {
    return this.carsRespository.listAvailableCars(category_id, name, brand);
  }
}

export { ListAvailableCarsUseCase };
