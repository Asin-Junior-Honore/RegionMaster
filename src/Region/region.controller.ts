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
  @Put(':regionCode')
  async updateRegion(
    @Param('regionCode') regionCode: string,
    @Body() updateRegionDto: UpdateRegionDto,
    @Request() req
  ) {
    return this.regionsService.updateRegion(regionCode, updateRegionDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':regionCode')
  async deleteRegion(@Param('regionCode') regionCode: string) {
    return this.regionsService.deleteRegion(regionCode);
  }
}