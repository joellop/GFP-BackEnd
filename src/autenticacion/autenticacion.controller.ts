import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioModelo } from '../Modelos/usuario/usuario.model';
import { RespuestaAPI } from 'src/Modelos/respuestaAPI.model';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(private autenticacionService: AutenticacionService) { }

    // Endpoint para login
    @Post()
    async iniciarSesion(@Body() usuario: UsuarioModelo) : Promise<RespuestaAPI<UsuarioModelo>> {
        let resultado = await this.autenticacionService.validarUsuario(usuario.nombre, usuario.contrasena);
        if(resultado.exito){
            const tokenObtenido = await this.autenticacionService.obtenerToken(resultado);
            resultado.dato != null ? resultado.dato.token = tokenObtenido.token : null;
            return resultado;
        }else{
            return resultado;
        }
    }
}
