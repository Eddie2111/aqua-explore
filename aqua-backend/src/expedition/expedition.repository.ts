import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpeditionDto } from './dto/create-expedition.dto';
import { UpdateExpeditionDto } from './dto/update-expedition.dto';
import type { ExpeditionDocument } from '../db/schema/expedition.schema';

@Injectable()
export class ExpeditionRepository {
  constructor(
    @InjectModel('Expedition')
    private expeditionModel: Model<ExpeditionDocument>,
  ) {}

  async create(
    createExpeditionDto: CreateExpeditionDto,
  ): Promise<ExpeditionDocument> {
    const createdExpedition = new this.expeditionModel(createExpeditionDto);
    const data = await createdExpedition.save();
    return data;
  }

  async findAll(): Promise<ExpeditionDocument[]> {
    return this.expeditionModel.find().exec();
  }

  async findOne(id: string): Promise<ExpeditionDocument | null> {
    return this.expeditionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateExpeditionDto: UpdateExpeditionDto,
  ): Promise<ExpeditionDocument | null> {
    return this.expeditionModel
      .findByIdAndUpdate(id, updateExpeditionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ExpeditionDocument | null> {
    return this.expeditionModel.findByIdAndDelete(id).exec();
  }
}
