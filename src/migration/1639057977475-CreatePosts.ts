import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePosts1639057977475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'content', type: 'text' },
          { name: 'authorId', type: 'int' },
          {
            name: 'createTime',
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
    return await queryRunner.dropTable('posts')
  }
}
