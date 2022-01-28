import { Injectable } from '@nestjs/common';
import { AdminService } from '../admins/admins.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthAdminService {
  constructor(private usersService: AdminService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const { password: hash, ...result } = user;
    if (user && bcrypt.compare(password, hash)) {
      return result;
    }
    return null;
  }
}
