import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity('task')
export class TaskModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'agent' }) //* name in table
  agent: UserModel;

  @Column('bool', { default: false })
  compeleted: boolean;

  @Column('date')
  createdAt: Date;

  @BeforeInsert()
  async createdAtBeforeInsert() {
    this.createdAt = new Date();
  }
}
