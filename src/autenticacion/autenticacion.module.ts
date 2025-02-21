import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Cambia esto por una clave secreta más segura
      signOptions: { expiresIn: '60m' }, // Duración del token
    }),
  ],
  providers: [AutenticacionService, JwtStrategy],
  controllers: [AutenticacionController]
})
export class AutenticacionModule { }
