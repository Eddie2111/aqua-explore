import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/db/schema/user.schema';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 * 24 * 3 },
    }),
  ],
  controllers: [UserController],
  providers: [EmailService, UserService],
})
export class UserModule {}
