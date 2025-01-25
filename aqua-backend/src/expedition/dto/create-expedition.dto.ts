import { IsArray, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpeditionDto {
  @IsString()
  _id?: string;
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @Type(() => Date)
  expeditionDate!: Date;
  @IsString()
  expeditionStatus!: string;
  @IsString()
  expeditionType!: string;
  @IsString()
  expeditionLocation!: string;
  @IsNumber()
  expeditionDuration!: number;
  @IsNumber()
  expeditionCost!: number;
  @IsNumber()
  expeditionCapacity!: number;
  @IsArray()
  expeditionParticipants!: string[];
}
