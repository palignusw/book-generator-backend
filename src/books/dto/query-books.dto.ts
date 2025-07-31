import { IsString, IsNumberString } from 'class-validator';

export class QueryBooksDto {
  @IsString()
  seed: string;

  @IsString()
  region: string;

  @IsNumberString()
  page: string;

  @IsNumberString()
  likes: string;

  @IsNumberString()
  reviews: string;
}
