import { ICreateCarDTO } from "../dtos/ICreateCar";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAvailableCars(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
