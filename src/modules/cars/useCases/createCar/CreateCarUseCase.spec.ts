import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 10,
      license_plate: "ABDE",
      brand: "SUV",
      fine_amount: 2,
      category_id: "456abc-ff",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        description: "Car description",
        daily_rate: 10,
        license_plate: "ABDE",
        brand: "SUV",
        fine_amount: 2,
        category_id: "456abc-ff",
      });

      await createCarUseCase.execute({
        name: "Car name 2",
        description: "Car description",
        daily_rate: 10,
        license_plate: "ABDE",
        brand: "SUV",
        fine_amount: 2,
        category_id: "456abc-ff",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 10,
      license_plate: "ABDE-789",
      brand: "SUV",
      fine_amount: 2,
      category_id: "456abc-ff",
    });
    expect(car.available).toBe(true);
  });
});
