import * as mongoose from 'mongoose';

import { CustomBaseSchema } from './customBase.schema';
import { EUserRoles } from 'src/common/enums/userRoles.enum';

export const UserSchema = new mongoose.Schema(
  {
    ...CustomBaseSchema,
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(EUserRoles),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'User',
  },
);

export type UserDocument = mongoose.Document & {
  id?: string;
  name: string;
  email: string;
  role: EUserRoles;
  createdAt?: string;
  updatedAt?: string;
};
