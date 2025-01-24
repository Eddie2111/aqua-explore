import { Module } from '@nestjs/common';
import { ExpeditionService } from './expedition.service';
import { ExpeditionController } from './expedition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpeditionSchema } from 'src/db/schema/expedition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Expedition', schema: ExpeditionSchema },
    ]),
  ],
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
  exports: [MongooseModule],
})
export class ExpeditionModule {}
