import bcrypt from 'node_modules/bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: ['owner', 'agent'], default: 'agent' })
  role: 'owner' | 'agent';

  @BeforeInsert()
  async hashPasswordBeforInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
