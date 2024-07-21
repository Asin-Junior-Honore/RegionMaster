import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, HttpCode } from '@nestjs/common';
import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
import { RegionsService } from './region.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('v1/api/regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) { }

  @Get()
  async findAllRegions() {
    return this.regionsService.findAllRegions();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
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
