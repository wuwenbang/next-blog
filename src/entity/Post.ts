import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('int')
  authorId: number

  @Column('varchar')
  title: string

  @Column('text')
  content: string

  @CreateDateColumn('timestamp')
  createTime: number

  @UpdateDateColumn('timestamp')
  updateTime: number

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes)
  }
}
