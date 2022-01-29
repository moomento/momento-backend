import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';
import { AuthAdminsService } from './auth-admins.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth-admins')
export class AuthAdminsController {
  constructor(
    private readonly authAdminsService: AuthAdminsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async register(@Body() data: CreateAdminDto) {
    const user = await this.authAdminsService.create(data);
    if (user) {
      return this.signin(data);
    }
  }

  @Post('signin')
  async signin(@Body() data: AuthAdminDto) {
    const user = await this.authAdminsService.validateUsernameAndPassword(
      data.username,
      data.password,
    );
    const { password, ...userData } = user;
    const token = this.jwtService.sign(userData);
    return {
      token,
      user: userData,
    };
  }
}
