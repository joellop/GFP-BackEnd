import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { JwtStrategy } from '../autenticacion/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([]),
  ConfigModule.forRoot(),
  JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' }
  })
],
  controllers: [UsuarioController],
  providers: [UsuarioService, AutenticacionService, JwtStrategy]
})
export class UsuarioModule { }
