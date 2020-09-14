import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { AuthenticatedUser } from './interfaces/authenticatedUser.interface';
import UserService from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.userService.getVerifiedUser(email, password);
    if (user.length > 0) {
      const payload = {
        token: user[0]._id,
        name: user[0].userName,
      };
      return payload;
    }
    return 'Check email and password';
  }

  async signup(user: User): Promise<AuthenticatedUser | string> {
    const result = await this.userService.getUser(user.mail);
    if (result.length > 0) return 'Email already registered';

    const newUser = await this.userService.createUser(user);
    if (!newUser) return 'Registration Failed';
    const payload = {
      name: newUser.userName,
      token: newUser._id,
    };
    return payload;
  }

}
