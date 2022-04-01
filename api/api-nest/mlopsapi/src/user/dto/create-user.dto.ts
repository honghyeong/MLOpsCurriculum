import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsInt()
  age: number;
}
