import { Injectable } from '@nestjs/common';
import { CreateExpeditionDto } from './dto/create-expedition.dto';
import { UpdateExpeditionDto } from './dto/update-expedition.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpeditionService {
  constructor(
    @InjectModel('Expedition')
    private readonly expeditionRepository: Model<any>,
  ) {}

  create(createExpeditionDto: CreateExpeditionDto) {
    return this.expeditionRepository.create(createExpeditionDto);
  }

  findAll() {
    return this.expeditionRepository.find();
  }

  findOne(id: number) {
    return this.expeditionRepository.findOne({ id: id });
  }

  update(id: number, updateExpeditionDto: UpdateExpeditionDto) {
    return this.expeditionRepository.updateOne({ id: id }, updateExpeditionDto);
  }

  delete(id: number): Promise<any> {
    return this.expeditionRepository.deleteOne({ id: id });
  }
}
