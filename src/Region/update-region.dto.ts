import { IsString, IsOptional } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @IsOptional()
  region_name?: string;

  @IsString()
  @IsOptional()
  status?: string;
}