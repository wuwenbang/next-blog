import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'
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

  @OneToOne(() => User)
  @JoinColumn()
  author: User

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes)
  }
}
