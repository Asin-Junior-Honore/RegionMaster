import { Region } from './region.model';
import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
export declare class RegionsService {
    private readonly regionModel;
    constructor(regionModel: typeof Region);
    createRegion(createRegionDto: CreateRegionDto, user: any): Promise<any>;
    findAllRegions(): Promise<Region[]>;
    updateRegion(region_code: string, updateRegionDto: UpdateRegionDto, user: any): Promise<any>;
    deleteRegion(region_code: string): Promise<any>;
}
