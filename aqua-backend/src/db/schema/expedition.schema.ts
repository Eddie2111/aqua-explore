import * as mongoose from 'mongoose';
import { CustomBaseSchema } from './customBase.schema';

export const ExpeditionSchema = new mongoose.Schema(
  {
    ...CustomBaseSchema,

    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    expeditionDate: {
      type: Date,
      required: true,
    },
    expeditionStatus: {
      type: String,
      required: true,
    },
    expeditionType: {
      type: String,
      required: true,
    },
    expeditionLocation: {
      type: String,
      required: true,
      unique: true,
    },
    expeditionDuration: {
      type: Number,
      required: true,
    },
    expeditionCost: {
      type: Number,
      required: true,
    },
    expeditionCapacity: {
      type: Number,
      required: true,
    },
    expeditionParticipants: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'expeditions',
  },
);

export type ExpeditionDocument = mongoose.Document & {
  name: string;
  description: string;
  expeditionDate: Date;
  expeditionStatus: string;
  expeditionType: string;
  expeditionLocation: string;
  expeditionDuration: number;
  expeditionCost: number;
  expeditionCapacity: number;
  expeditionParticipants: string[];
};
