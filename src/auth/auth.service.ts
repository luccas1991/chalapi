import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) {}
  
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
    //   if (user && user.password === pass) {
        return {name:user.name};
    //   }
    //   return null;
    }
    
    async login(user: any) {
      const payload = { name: user.name };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
