import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('int')
  authorId: number

  @Column('int')
  postId: number

  @Column('text')
  content: string

  @CreateDateColumn()
  createTime: number

  @UpdateDateColumn()
  updateTime: number

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post

  @ManyToOne(() => User, (author) => author.comments)
  author: User

  constructor(attributes: Partial<Comment>) {
    Object.assign(this, attributes)
  }
}
