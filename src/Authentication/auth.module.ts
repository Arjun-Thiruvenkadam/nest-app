import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService],
})
export class AuthModule {}
