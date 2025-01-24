import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017')],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
