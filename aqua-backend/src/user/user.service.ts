import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ERequestType, VerifyUserDto } from './dto/verify-user.dto';
import { UserDocument } from 'src/db/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userRepository: Model<UserDocument>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async getMe(@Req() request: Request){
    const getToken = request.cookies['auth_token'];
    if (!getToken) throw new Error('no token');
    const verifyUser = await this.jwtService.verify(getToken, {
      secret: process.env.JWT_SECRET,
    });
    const getUser = await this.userRepository.findOne({email: verifyUser.email});
    if(!getUser) throw new NotFoundException('User not found');
    return {
      email: getUser.email,
      name: getUser.name,
      id: getUser._id,
    }
  }

  login(createUserDto: CreateUserDto) {
    return this.emailService.sendLoginEmail(createUserDto.email);
  }

  signup(createUserDto: CreateUserDto) {
    return this.emailService.sendSignupEmail(createUserDto.email);
  }

  async verify(verifyUserDto: VerifyUserDto, res: Response) {
    try {
      const data = await this.jwtService.verify(verifyUserDto.token);
      if (verifyUserDto.requestType == ERequestType.SIGNIN) {
        const userData = await this.userRepository.findOne({
          email: data.email,
        });
        const token = this.jwtService.sign(
          { email: userData.email, name: userData.name, id: userData._id },
          {
            secret: process.env.JWT_SECRET,
          },
        );
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return token;
      }
      if (verifyUserDto.requestType == ERequestType.SIGNUP) {
        return {
          email: data.email,
          message: 'verification success',
        };
      }
    } catch (e) {
      throw new Error('Invalid token');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
