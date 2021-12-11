import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { Comment } from './Comment'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('varchar')
  username: string

  @Column('varchar')
  passwordDigest: string

  @CreateDateColumn()
  createTime: number

  @UpdateDateColumn()
  updateTime: number

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]

  constructor(attributes?: Partial<User>) {
    Object.assign(this, attributes)
  }
}
