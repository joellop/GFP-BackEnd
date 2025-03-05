import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { CambioContrasena, UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { AutenticacionService } from '../autenticacion/autenticacion.service';



@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService, private readonly autenticacionService: AutenticacionService) { }

  @Post('/crearUsuario')
  async crearUsuario(@Body() usuario: UsuarioModelo): Promise<RespuestaAPI<UsuarioModelo>> {
    let usuarioCreado = await this.usuarioService.crearUsuario(usuario);
    return usuarioCreado;
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('/actualizarUsuario')
  async actualizarUsuario(@Body() usuario: UsuarioModelo): Promise<RespuestaAPI<UsuarioModelo>> {
    let respuesta = await this.usuarioService.actualizarUsuario(usuario);
    return respuesta;
  }
  
  @Put('/cambiarContrasena')
  async cambiarContrasena(@Body() contrasena: CambioContrasena): Promise<RespuestaAPI<number>> {
    let resultado = await this.autenticacionService.cambiarContrasena(contrasena)
    return resultado;
  }

}
