import { Injectable } from '@nestjs/common';
import { CreateExpeditionDto } from './dto/create-expedition.dto';
import { UpdateExpeditionDto } from './dto/update-expedition.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ExpeditionDocument } from 'src/db/schema/expedition.schema';

@Injectable()
export class ExpeditionService {
  constructor(
    @InjectModel('Expedition')
    private readonly expeditionRepository: Model<ExpeditionDocument>,
  ) {}

  create(createExpeditionDto: CreateExpeditionDto) {
    return this.expeditionRepository.create(createExpeditionDto);
  }

  async find(params: string) {
    return this.expeditionRepository.find({
      $or: [
        { name: { $regex: params, $options: 'i' } },
        { location: { $regex: params, $options: 'i' } },
        { type: { $regex: params, $options: 'i' } },
      ],
    });
  }

  findAll() {
    return this.expeditionRepository.find();
  }

  findOne(id: string) {
    return this.expeditionRepository.findOne({ _id: id });
  }

  update(id: string, updateExpeditionDto: UpdateExpeditionDto) {
    return this.expeditionRepository.updateOne(
      { _id: id },
      updateExpeditionDto,
    );
  }
  async addParticipants(expeditionParticipant: {
    expeditionId: string;
    participantId: string;
  }) {
    const expedition = await this.expeditionRepository.findById(
      expeditionParticipant.expeditionId,
    );

    if (!expedition) {
      throw new Error('Expedition not found');
    }

    if (
      expedition.expeditionParticipants.length >= expedition.expeditionCapacity
    ) {
      throw new Error('Expedition has reached maximum capacity');
    }

    return this.expeditionRepository.findOneAndUpdate(
      { _id: expeditionParticipant.expeditionId },
      {
        $addToSet: {
          expeditionParticipants: expeditionParticipant.participantId,
        },
      },
      { new: true },
    );
  }

  delete(id: string): Promise<any> {
    return this.expeditionRepository.deleteOne({ _id: id });
  }
}
