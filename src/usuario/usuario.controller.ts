import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { CambioContrasena } from 'src/Modelos/usuario/contrasena.model';
import { AutenticacionService } from '../autenticacion/autenticacion.service';



@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService, private readonly autenticacionService:AutenticacionService) {}
    
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

    
    @UseGuards(JwtAuthGuard)
    @Put('/CambiarContrasena')
    async cambiarContrasena(@Body() contrasena: CambioContrasena) {
      let resultado = await this.autenticacionService.cambiarContrasena(contrasena)
      return resultado;
    }
}
