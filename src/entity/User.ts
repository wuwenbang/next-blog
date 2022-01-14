import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';
import { Comment } from './Comment';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import md5 from 'md5';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  passwordDigest: string;

  @CreateDateColumn()
  createTime: number;

  @UpdateDateColumn()
  updateTime: number;

  @OneToMany('Post', 'author')
  posts: Post[];
  @OneToMany('Comment', 'author')
  comments: Comment[];

  constructor(attributes?: Partial<User>) {
    Object.assign(this, attributes);
  }

  password = '';
  passwordConfirmation = '';

  async validate() {
    const connection = await getDatabaseConnection();
    const found = await connection.manager.findOne(User, {
      username: this.username,
    });
    let errorMessage = '';
    if (this.username === '') {
      errorMessage = '用户名为空';
    } else if (this.password === '') {
      errorMessage = '密码为空';
    } else if (this.password !== this.passwordConfirmation) {
      errorMessage = '密码不匹配';
    } else if (found) {
      errorMessage = '用户名已存在';
    }
    return errorMessage;
  }

  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password);
  }
}
