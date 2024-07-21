import { IsString, IsOptional } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @IsOptional()
  RegionName?: string;

  @IsString()
  @IsOptional()
  Status?: string;
}