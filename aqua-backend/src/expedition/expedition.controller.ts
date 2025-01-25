import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpeditionService } from './expedition.service';
import { CreateExpeditionDto } from './dto/create-expedition.dto';
import { UpdateExpeditionDto } from './dto/update-expedition.dto';

@Controller('expedition')
export class ExpeditionController {
  constructor(private readonly expeditionService: ExpeditionService) {}

  @Post()
  create(@Body() createExpeditionDto: CreateExpeditionDto) {
    return this.expeditionService.create(createExpeditionDto);
  }

  @Get()
  findAll() {
    return this.expeditionService.findAll();
  }

  @Get('/search/:params')
  find(@Param('params') params: string) {
    return this.expeditionService.find(params);
  }

  @Post('/addParticipant')
  addParticipant(@Body() createExpeditionDto: UpdateExpeditionDto) {
    const id = createExpeditionDto._id;
    return this.expeditionService.update(id, createExpeditionDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expeditionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpeditionDto: UpdateExpeditionDto,
  ) {
    return this.expeditionService.update(id, updateExpeditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expeditionService.delete(id);
  }
}
