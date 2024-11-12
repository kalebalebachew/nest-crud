import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async register(userData: Partial<User>): Promise<{ accessToken: string }> {
    const newUser = new this.userModel(userData);
    await newUser.save();

    const payload = { email: newUser.email, sub: newUser._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
