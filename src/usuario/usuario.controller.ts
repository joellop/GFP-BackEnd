import { Body, Controller, Get, Post, Put, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';


@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
    
    @Post()
    async crearUsuario(@Body() usuario: UsuarioModelo): Promise<RespuestaAPI<UsuarioModelo>>{

        let resultado = await this.usuarioService.crearUsuario(usuario);
        return resultado;
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    actualizarUsuario(@Body() usuario: UsuarioModelo) {
      return { mensaje: 'usuario actualizado' };
    }

    
}
