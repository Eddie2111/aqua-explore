import * as mongoose from 'mongoose';

import { CustomBaseSchema } from './customBase.schema';
import { EUserRoles } from 'src/common/enums/userRoles.enum';

export const UserSchema = new mongoose.Schema({
  ...CustomBaseSchema,
  name: String,
  email: Number,
  role: EUserRoles,
});
