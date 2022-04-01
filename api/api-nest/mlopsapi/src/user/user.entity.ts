import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Table,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  // @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  age: number;
}
