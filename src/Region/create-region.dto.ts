import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  region_code: string;

  @IsString()
  @IsNotEmpty()
  region_name: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
