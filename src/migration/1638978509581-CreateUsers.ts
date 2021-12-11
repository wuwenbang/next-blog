import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1638978509581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'username', type: 'varchar' },
          { name: 'passwordDigest', type: 'varchar' },
          {
            name: 'craeteTime',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updateTime',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users')
  }
}
