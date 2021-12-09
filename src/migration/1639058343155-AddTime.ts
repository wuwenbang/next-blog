import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
const tableNameList = ['users', 'posts', 'comments']

export class AddTime1639058343155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let tableName of tableNameList) {
      await queryRunner.addColumns(tableName, [
        new TableColumn({
          name: 'create_time',
          type: 'time',
          isNullable: false,
          default: 'now()',
        }),
        new TableColumn({
          name: 'update_time',
          type: 'time',
          isNullable: false,
          default: 'now()',
        }),
      ])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let tableName of tableNameList) {
      await queryRunner.dropColumn(tableName, 'create_time')
      await queryRunner.dropColumn(tableName, 'update_time')
    }
  }
}
