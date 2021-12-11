import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('int')
  authorId: number

  @Column('int')
  postId: number

  @Column('text')
  content: string

  @CreateDateColumn('timestamp')
  createTime: number

  @UpdateDateColumn('timestamp')
  updateTime: number

  constructor(attributes: Partial<Comment>) {
    Object.assign(this, attributes)
  }
}
