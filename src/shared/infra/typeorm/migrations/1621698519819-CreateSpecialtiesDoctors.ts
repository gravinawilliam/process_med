import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSpecialtiesDoctors1621698519819
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specialties_doctors',
        columns: [
          {
            name: 'doctor_id',
            type: 'uuid',
          },
          {
            name: 'specialty_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'DoctorIdInDoctors',
            columnNames: ['doctor_id'],
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'SpecialtyIdInSpecialties',
            columnNames: ['specialty_id'],
            referencedTableName: 'specialties',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specialties_doctors');
  }
}
