import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
    

    @Get()
    getProtectedData() {
      return { mensaje: 'Este es un recurso protegido' };
    }

    
}
