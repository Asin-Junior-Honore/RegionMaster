import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './region.model';
import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) { }

  async createRegion(createRegionDto: CreateRegionDto, user: any): Promise<any> {
    let { region_code, region_name, status } = createRegionDto;

    // Capitalize region code
    region_code = region_code.toUpperCase();

    // Validation logic
    if (!region_code || !region_name || !status) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region code is required', field: 'region_code' },
          { message: 'Region name is required', field: 'region_name' },
          { message: 'Status is required', field: 'status' },
        ],
      });
    }

    if (status !== 'active' && status !== 'inactive') {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Status must be either "active" or "inactive"', field: 'status' },
        ],
      });
    }

    // Check for existing region code
    const existingRegionCode = await this.regionModel.findOne({ where: { region_code } });
    if (existingRegionCode) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region code already exists', field: 'region_code' },
        ],
      });
    }

    // Check for existing region name
    const existingRegionName = await this.regionModel.findOne({ where: { region_name } });
    if (existingRegionName) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region name already exists', field: 'region_name' },
        ],
      });
    }

    const newRegion = new Region({
      region_code,
      region_name,
      status,
      created_on: new Date(),
      created_by: user.username,
      modified_on: new Date(),
      modified_by: user.username,
    });

    await newRegion.save();

    return {
      status_code: 200,
      message: 'Operation was successful',
    };
  }

  async findAllRegions(): Promise<Region[]> {
    return this.regionModel.findAll();
  }

  async updateRegion(region_code: string, updateRegionDto: UpdateRegionDto, user: any): Promise<any> {
    region_code = region_code.toUpperCase();
    const region = await this.regionModel.findOne({ where: { region_code } });
    if (!region) {
      throw new NotFoundException({
        status_code: 404,
        message: `Region with code ${region_code} not found`,
      });
    }

    const { region_name, status } = updateRegionDto;

    // Validation for status
    if (status && status !== 'active' && status !== 'inactive') {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Status must be either "active" or "inactive"', field: 'status' },
        ],
      });
    }

    // Check for existing region name if it's being updated
    if (region_name && region_name !== region.region_name) {
      const existingRegionName = await this.regionModel.findOne({ where: { region_name } });
      if (existingRegionName) {
        throw new UnprocessableEntityException({
          status_code: 422,
          data: [
            { message: 'Region name already exists', field: 'region_name' },
          ],
        });
      }
      region.region_name = region_name;
    }

    region.status = status || region.status;
    region.modified_on = new Date();
    region.modified_by = user.username;

    await region.save();

    return {
      status_code: 200,
      message: 'Operation was successful',
    };
  }

  async deleteRegion(region_code: string): Promise<any> {
    region_code = region_code.toUpperCase();
    const result = await this.regionModel.destroy({ where: { region_code } });
    if (result === 0) {
      throw new NotFoundException({
        status_code: 404,
        message: `Region with code ${region_code} not found`,
      });
    }

    return {
      status_code: 200,
      message: 'Operation was successful',
    };
  }
}