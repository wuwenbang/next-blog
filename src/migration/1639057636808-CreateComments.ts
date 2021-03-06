import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateComments1639057636808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'authorId', type: 'int' },
          { name: 'postId', type: 'int' },
          { name: 'content', type: 'text' },
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
    return await queryRunner.dropTable('comments')
  }
}
