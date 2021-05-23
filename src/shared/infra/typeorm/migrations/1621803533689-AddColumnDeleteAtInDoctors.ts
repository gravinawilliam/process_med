import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnDeleteAtInDoctors1621803533689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'doctors',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('doctors', 'deleted_at');
  }
}
