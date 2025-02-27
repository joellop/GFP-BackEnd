import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { UsuarioModelo } from 'src/Modelos/usuario/usuario.model';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { CambioContrasena } from 'src/Modelos/usuario/contrasena.model';
import { AutenticacionService } from '../autenticacion/autenticacion.service';



@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService, private readonly autenticacionService: AutenticacionService) { }

  @Post('/crearUsuario')
  async crearUsuario(@Body() usuario: UsuarioModelo): Promise<RespuestaAPI<any>> {
    let usuarioCreado = await this.usuarioService.crearUsuario(usuario);
    console.log('usuario ==>', usuarioCreado);
    let correoEnviado: RespuestaAPI<boolean> = { dato: false, exito: false, mensaje: '' };
    if (usuarioCreado.exito) {
      let codigoGenerado = await this.usuarioService.generarCodigoVerificacion(usuarioCreado);
      console.log('codigo generado ==>', codigoGenerado);
      if (codigoGenerado.exito) {
        correoEnviado = await this.usuarioService.enviarCorreo(usuarioCreado, codigoGenerado);
        console.log('correo enviado ==>', correoEnviado);
      }
    }
    if (usuarioCreado.exito) {
      if(!correoEnviado.exito){
        return correoEnviado;
      }else{
        return correoEnviado;
      }
    }else{
      return usuarioCreado;
    }
  }

  @Put('/CambiarContrasena')
  async cambiarContrasena(@Body() contrasena: CambioContrasena): Promise<RespuestaAPI<number>> {
    let resultado = await this.autenticacionService.cambiarContrasena(contrasena)
    return resultado;
  }

  //EndoPoint para confirmar el codigo
  @Get()
  async verificarCodigoConfirmacion() {
    let resultado = this.autenticacionService
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  actualizarUsuario(@Body() usuario: UsuarioModelo) {
    return { mensaje: 'usuario actualizado' };
  }





}
