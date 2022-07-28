import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarChangeLicensePlate1658948824168
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "cars",
      "license_plate",
      new TableColumn({
        name: "license_plate",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "cars",
      new TableColumn({
        name: "license_plate",
        type: "numeric",
      })
    );
  }
}
