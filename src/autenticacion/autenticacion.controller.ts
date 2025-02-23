import { Controller, Post, Body, Put } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioModelo } from '../Modelos/usuario/usuario.model';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';
import { CambioContrasena } from 'src/Modelos/usuario/contrasena.model';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(private autenticacionService: AutenticacionService) { }

    // Endpoint para login
    @Post()
    async iniciarSesion(@Body() usuario: UsuarioModelo): Promise<RespuestaAPI<UsuarioModelo>> {
        let usuarioEncontrado = await this.autenticacionService.validarUsuario(usuario.nombre);
        if (usuarioEncontrado.exito) {
            usuarioEncontrado = await this.autenticacionService.validarContrasena(usuarioEncontrado, usuario.contrasena);
            if (usuarioEncontrado.exito) {
                const tokenObtenido = await this.autenticacionService.obtenerToken(usuarioEncontrado);
                usuarioEncontrado.dato != null ? usuarioEncontrado.dato.token = tokenObtenido.token : null;
                return usuarioEncontrado;
            } else {
                return usuarioEncontrado;
            }
        } else {
            return usuarioEncontrado;
        }
    }

    //EndPoint para cambiar contraseña sin loguearse
    @Put()
    async cambiarContrasena(@Body() contrasena: CambioContrasena): Promise<RespuestaAPI<number>> {
        let resultado = await this.autenticacionService.cambiarContrasena(contrasena);
        if (resultado.exito) {
            return resultado;
        } else {
            return resultado;
        }
    }
}
