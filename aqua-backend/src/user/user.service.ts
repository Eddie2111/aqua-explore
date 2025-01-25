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
import { EUserRoles } from 'src/common/enums/userRoles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userRepository: Model<UserDocument>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async getMe(token: { authToken: string}){
    const getToken = token.authToken.slice(3, -3);
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
    };
  }

  login(createUserDto: CreateUserDto) {
    return this.emailService.sendLoginEmail(createUserDto.email);
  }

  signup(createUserDto: CreateUserDto) {
    return this.emailService.sendSignupEmail(createUserDto.email);
  }

  async verify(verifyUserDto: VerifyUserDto, res: Response) {
    console.log(verifyUserDto);
    try {
      const data = await this.jwtService.verify(verifyUserDto.token, {secret: process.env.JWT_SECRET});
      if (verifyUserDto.requestType == ERequestType.LOGIN) {
        console.log("request hit with login");
        const userData = await this.userRepository.findOne({
          email: data.email,
        });
        const token = await this.jwtService.sign(
          { email: userData.email, name: userData.name, id: userData._id, role: userData.role },
          {
            secret: process.env.JWT_SECRET,
          },
        );
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return res.json({ token: token, id: userData._id, email: userData.email, role: userData.role, message: 'verification success' });
      }
      if (verifyUserDto.requestType == ERequestType.SIGNUP) {
        const createUserEmail = await this.userRepository.create({
          email: data.email,
          role: EUserRoles.USER,
        });
        const token = await this.jwtService.sign(
          { email: data.email, role: EUserRoles.USER },
          {
            secret: process.env.JWT_SECRET,
          },
        );
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return res.json({
          id: createUserEmail._id,
          token,
          email: data.email,
          role: EUserRoles.USER,
          message: 'verification success',
        });
      }
    } catch (e) {
      console.log(e.message);
      throw new Error('Invalid token');
    }
  }

  async onboarding(userData: {name:string,id:string}) {
    const cleanedId = userData.id.replace(/^"|"$/g, '');
    await this.userRepository.updateOne({_id: cleanedId}, {name: userData.name});
    const getUser = await this.userRepository.findOne({_id: cleanedId}).select('name email role id');
    if(!getUser) throw new NotFoundException('User not found');
    const token = this.jwtService.sign(
      { email: getUser.email, name: getUser.name, id: getUser._id, role: getUser.role },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return {
      auth_token: token,
      name: getUser.name,
      email: getUser.email,
      id: getUser._id,
      role: getUser.role,
    };
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
