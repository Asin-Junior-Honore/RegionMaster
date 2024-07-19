import { CreateRegionDto } from './create-region.dto';
import { UpdateRegionDto } from './update-region.dto';
import { RegionsService } from './region.service';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    findAllRegions(): Promise<import("./region.model").Region[]>;
    createRegion(createRegionDto: CreateRegionDto, req: any): Promise<any>;
    updateRegion(regionCode: string, updateRegionDto: UpdateRegionDto, req: any): Promise<any>;
    deleteRegion(regionCode: string): Promise<any>;
}
