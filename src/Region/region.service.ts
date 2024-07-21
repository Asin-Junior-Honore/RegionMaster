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
    const expectedFields = ['RegionCode', 'RegionName', 'Status'];
    const providedFields = Object.keys(createRegionDto);

    // Check for unexpected fields
    const unexpectedFields = providedFields.filter(field => !expectedFields.includes(field));
    if (unexpectedFields.length > 0) {
      throw new UnprocessableEntityException({
        status_code: 422,
        message: `Unexpected fields: ${unexpectedFields.join(', ')}`,
        expected_format: {
          RegionCode: 'string',
          RegionName: 'string',
          Status: 'active | inactive'
        }
      });
    }

    let { RegionCode, RegionName, Status } = createRegionDto;

    // Validation logic
    if (!RegionCode || !RegionName || !Status) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region code is required', field: 'RegionCode' },
          { message: 'Region name is required', field: 'RegionName' },
          { message: 'Status is required', field: 'Status' },
        ],
      });
    }

    // Capitalize region code if defined
    if (RegionCode) {
      RegionCode = RegionCode.toUpperCase();
    }

    if (Status !== 'active' && Status !== 'inactive') {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Status must be either "active" or "inactive"', field: 'Status' },
        ],
      });
    }

    // Check for existing region code
    const existingRegionCode = await this.regionModel.findOne({ where: { RegionCode } });
    if (existingRegionCode) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region code already exists', field: 'RegionCode' },
        ],
      });
    }

    // Check for existing region name
    const existingRegionName = await this.regionModel.findOne({ where: { RegionName } });
    if (existingRegionName) {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Region name already exists', field: 'RegionName' },
        ],
      });
    }

    const newRegion = new Region({
      RegionCode,
      RegionName,
      Status,
      CreatedOn: new Date(),
      CreatedBy: user.username,
      ModifiedOn: new Date(),
      ModifiedBy: user.username,
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

  async updateRegion(regionCode: string, updateRegionDto: UpdateRegionDto, user: any): Promise<any> {
    regionCode = regionCode.toUpperCase();
    const region = await this.regionModel.findOne({ where: { RegionCode: regionCode } });
    if (!region) {
      throw new NotFoundException({
        status_code: 404,
        message: `Region with code ${regionCode} not found`,
      });
    }

    const { RegionName, Status } = updateRegionDto;

    // Validation for status
    if (Status && Status !== 'active' && Status !== 'inactive') {
      throw new UnprocessableEntityException({
        status_code: 422,
        data: [
          { message: 'Status must be either "active" or "inactive"', field: 'Status' },
        ],
      });
    }

    // Check for existing region name if it's being updated
    if (RegionName && RegionName !== region.RegionName) {
      const existingRegionName = await this.regionModel.findOne({ where: { RegionName } });
      if (existingRegionName) {
        throw new UnprocessableEntityException({
          status_code: 422,
          data: [
            { message: 'Region name already exists', field: 'RegionName' },
          ],
        });
      }
      region.RegionName = RegionName;
    }

    region.Status = Status || region.Status;
    region.ModifiedOn = new Date();
    region.ModifiedBy = user.username;

    await region.save();

    return {
      status_code: 200,
      message: 'Operation was successful',
    };
  }

  async deleteRegion(regionCode: string): Promise<any> {
    regionCode = regionCode.toUpperCase();
    const result = await this.regionModel.destroy({ where: { RegionCode: regionCode } });
    if (result === 0) {
      throw new NotFoundException({
        status_code: 404,
        message: `Region with code ${regionCode} not found`,
      });
    }

    return {
      status_code: 200,
      message: 'Operation was successful',
    };
  }
}
