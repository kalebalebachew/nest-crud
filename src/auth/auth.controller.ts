import { Controller, Post, Body } from '@nestjs/common';
import { userDto } from './dto/userDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userDto: userDto): Promise<{ accessToken: string }> {
    const { email, password } = userDto;
    return this.authService.signIn(email, password);
  }

  @Post('register')
  async register(@Body() userDto: userDto): Promise<{ accessToken: string }> {
    return this.authService.register(userDto);
  }
}
