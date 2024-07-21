import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
import { RegionsService } from './region.service';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    findAllRegions(): Promise<import("./region.model").Region[]>;
    createRegion(createRegionDto: CreateRegionDto, req: any): Promise<any>;
    updateRegion(RegionCode: string, updateRegionDto: UpdateRegionDto, req: any): Promise<any>;
    deleteRegion(RegionCode: string): Promise<any>;
}
