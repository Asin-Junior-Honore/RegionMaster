import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
import { RegionsService } from './region.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Regions')
@Controller('v1/api/regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) { }

  @Get()
  @ApiOperation({ summary: 'Retrieve all regions' })
  @ApiResponse({
    status: 200,
    description: 'List of all regions',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          region_code: { type: 'string' },
          region_name: { type: 'string' },
          status: { type: 'string' },
          created_on: { type: 'string', format: 'date-time' },
          created_by: { type: 'string' },
          modified_on: { type: 'string', format: 'date-time' },
          modified_by: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'No regions found' })
  async findAllRegions() {
    return this.regionsService.findAllRegions();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new region' })
  @ApiBody({
    description: 'Details of the region to be created',
    type: CreateRegionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Region created successfully',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Operation was successful' },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 422 },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              field: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async createRegion(@Body() createRegionDto: CreateRegionDto, @Request() req) {
    return this.regionsService.createRegion(createRegionDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':regionCode')
  @ApiOperation({ summary: 'Update an existing region' })
  @ApiParam({ name: 'regionCode', description: 'Code of the region to update' })
  @ApiBody({
    description: 'Details of the region to be updated',
    type: UpdateRegionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Region updated successfully',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Operation was successful' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Region not found',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Region with code NA not found' },
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 422 },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              field: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async updateRegion(
    @Param('regionCode') regionCode: string,
    @Body() updateRegionDto: UpdateRegionDto,
    @Request() req
  ) {
    return this.regionsService.updateRegion(regionCode, updateRegionDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':regionCode')
  @ApiOperation({ summary: 'Delete a region' })
  @ApiParam({ name: 'regionCode', description: 'Code of the region to delete' })
  @ApiResponse({
    status: 200,
    description: 'Region deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Operation was successful' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Region not found',
    schema: {
      type: 'object',
      properties: {
        status_code: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Region with code NA not found' },
      },
    },
  })
  async deleteRegion(@Param('regionCode') regionCode: string) {
    return this.regionsService.deleteRegion(regionCode);
  }
}
