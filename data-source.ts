import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/modules/cars/entities/*.ts"],
});
// cli: {
//   migrationsDir: "src/database/migrations",
// },
