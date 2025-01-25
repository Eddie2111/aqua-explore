import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req, Res
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/getme")
  getMe(@Body() authToken: { authToken: string}) {
    return this.userService.getMe(authToken);
  }
  @Post('/login')
  userLogin(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }
  @Post('/signup')
  userSignup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }
  @Post('/verify')
  userVerify(@Body() verifyUserDto: VerifyUserDto, @Res() res: Response) {
    return this.userService.verify(verifyUserDto,res);
  }
  @Post("/onboard")
  userOnboard(@Body() onboardUserDto: { name: string; id: string; }) {
    return this.userService.onboarding(onboardUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
