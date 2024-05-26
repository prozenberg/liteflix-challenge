import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Inception',
    description: 'The title of the movie',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
