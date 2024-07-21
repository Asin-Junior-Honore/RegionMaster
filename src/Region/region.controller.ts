import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
import { RegionsService } from './region.service';

@Controller('v1/api/regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) { }

  @Get()
  async findAllRegions() {
    return this.regionsService.findAllRegions();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRegion(@Body() createRegionDto: CreateRegionDto, @Request() req) {
    return this.regionsService.createRegion(createRegionDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':RegionCode')
  async updateRegion(
    @Param('RegionCode') RegionCode: string,
    @Body() updateRegionDto: UpdateRegionDto,
    @Request() req
  ) {
    return this.regionsService.updateRegion(RegionCode, updateRegionDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':RegionCode')
  async deleteRegion(@Param('RegionCode') RegionCode: string) {
    return this.regionsService.deleteRegion(RegionCode);
  }
}
