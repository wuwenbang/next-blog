import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('int')
  authorId: number

  @Column('varchar')
  title: string

  @Column('text')
  content: string

  @CreateDateColumn()
  createTime: number

  @UpdateDateColumn()
  updateTime: number

  @ManyToOne('User', 'posts')
  author: User;
  @OneToMany('Comment', 'post')
  comments: Comment[];

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes)
  }
}
