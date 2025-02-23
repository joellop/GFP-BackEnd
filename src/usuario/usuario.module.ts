import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { JwtStrategy } from 'src/autenticacion/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([]),
  JwtModule.register({
    secret: 'your-secret-key', // Cambia esto por una clave secreta más segura
    signOptions: { expiresIn: '60m' }, // Duración del token
  }),],
  controllers: [UsuarioController],
  providers: [UsuarioService, AutenticacionService, JwtStrategy]
})
export class UsuarioModule { }
