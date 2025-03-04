import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { JwtStrategy } from 'src/autenticacion/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
