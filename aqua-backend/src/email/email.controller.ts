import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/login')
  LoginEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendLoginEmail(sendEmailDto.email);
  }

  @Post('/signup')
  SignupEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendSignupEmail(sendEmailDto.email);
  }
}
