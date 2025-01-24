import { IsString } from 'class-validator';

export class CreateExpeditionDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  expeditionDate!: Date;

  @IsString()
  expeditionStatus!: string;

  @IsString()
  expeditionType!: string;

  @IsString()
  expeditionLocation!: string;

  @IsString()
  expeditionDuration!: number;

  @IsString()
  expeditionCost!: number;

  @IsString()
  expeditionCapacity!: number;

  @IsString()
  expeditionParticipants!: string[];
}
