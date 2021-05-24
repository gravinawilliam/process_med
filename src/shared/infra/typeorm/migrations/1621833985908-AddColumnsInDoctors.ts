import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsInDoctors1621833985908
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'doctors',
      new TableColumn({
        name: 'city',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'doctors',
      new TableColumn({
        name: 'neighborhood',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'doctors',
      new TableColumn({
        name: 'state',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'doctors',
      new TableColumn({
        name: 'street',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('doctors', 'street');
    await queryRunner.dropColumn('doctors', 'state');
    await queryRunner.dropColumn('doctors', 'neighborhood');
    await queryRunner.dropColumn('doctors', 'city');
  }
}
