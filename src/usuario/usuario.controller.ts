import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('iniciar-sesion')
    async iniciarSesion(@Body('nombre') nombre: string, @Body('contrasena') contrasena: string): Promise<RespuestaAPI<UsuarioModelo>>{
        let respuesta = await this.usuarioService.iniciarSesion(nombre, contrasena);
        return respuesta;
    }

    
}
