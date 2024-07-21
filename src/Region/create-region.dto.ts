import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  RegionCode: string;

  @IsString()
  @IsNotEmpty()
  RegionName: string;

  @IsString()
  @IsNotEmpty()
  Status: string;
}