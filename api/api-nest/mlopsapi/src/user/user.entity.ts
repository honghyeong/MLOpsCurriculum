import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Table,
} from 'typeorm';

@Entity()
export class User {
  // @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  age: number;
}
