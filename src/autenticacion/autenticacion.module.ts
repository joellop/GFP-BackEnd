import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: { expiresIn: '60m' },
    })
  }),
  ],
  providers: [AutenticacionService, JwtStrategy],
  controllers: [AutenticacionController]
})
export class AutenticacionModule { }
