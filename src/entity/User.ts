import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column('varchar')
  username: string

  @Column('varchar')
  passwordDigest: string

  @CreateDateColumn('timestamp')
  createTime: number

  @UpdateDateColumn('timestamp')
  updateTime: number

  constructor(attributes: Partial<User>) {
    Object.assign(this, attributes)
  }
}
