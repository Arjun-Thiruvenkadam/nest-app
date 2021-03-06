import { Model } from 'mongoose';
import AuthPayload from '../authentication/dto/authPayload.dto';
import User from './dto/user.dto';

export default class UserModel {
  constructor(private readonly userModel: Model<User>) {}

  async getUser(mail: string): Promise<User> {
    const user = await this.userModel.findOne({ mail });
    return user;
  }

  async createUser(user: AuthPayload): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async getVerifiedUser(mail: string, password: string): Promise<User[]> {
    const verifiedUser = await this.userModel.find({ mail, password });
    return verifiedUser;
  }

  async getUserWithId(personId: string): Promise<User | string> {
    const user = await this.userModel
      .findById(personId, '-__v -password')
      .exec()
      .catch(() => 'Invalid Id');
    return user;
  }

  async isAdmin(personId: string): Promise<boolean> {
    const user = await this.userModel
      .findById(personId, 'isAdmin -_id')
      .catch(() => undefined);
    return user;
  }
}
