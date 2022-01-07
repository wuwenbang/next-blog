import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddUniqueUsernameToUsers1641525535756
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'username',
        columnNames: ['username'],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'username');
  }
}
