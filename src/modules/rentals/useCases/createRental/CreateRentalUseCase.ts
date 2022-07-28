import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { compareInHours, getDateNow } from "@utils/date";
interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car unavailable!");
    }
    const userWithOpenRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (userWithOpenRental) {
      throw new AppError("User already has an open rental!");
    }

    const hoursOfRent = compareInHours(getDateNow(), expected_return_date);
    if (hoursOfRent < minHours) {
      throw new AppError("Invalid return date!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
