import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', // La misma clave secreta que usaste en el módulo JwtModule
    });
  }

  async validate(payload: JwtPayload) {
    // Aquí puedes validar el payload, por ejemplo, obtener el usuario de la base de datos usando el `payload.sub` (ID del usuario).
    return { id: payload.id, nombre: payload.nombre };
  }
}
