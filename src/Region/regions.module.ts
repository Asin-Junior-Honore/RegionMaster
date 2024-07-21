import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Region } from './region.model';
import { RegionsController } from './region.controller';
import { RegionsService } from './region.service';

@Module({
    imports: [SequelizeModule.forFeature([Region])],
    controllers: [RegionsController],
    providers: [RegionsService],
})
export class RegionsModule { }
